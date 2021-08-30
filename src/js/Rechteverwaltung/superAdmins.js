// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_superAdmins =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/SuperAdmins/readSuperAdmins.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("superAdmins")   
                )

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Returns an object that contains the form data
            const getFormData =
                 () => (
                    { modus            : getFieldValue("sAdmState")
                    , sAdmID           : getFieldValue("sAdmID")
                    , betrGrpID        : getFieldValue("betrGrpID")
                    , titelSAdm        : getFieldValue("titelSAdm")
                    , nameSAdm         : getFieldValue("nameSAdm")
                    , vornameSAdm      : getFieldValue("vornameSAdm")
                    , emailSAdm        : getFieldValue("emailSAdm")
                    , telefonSAdm      : getFieldValue("telefonSAdm")
                    , faxSAdm          : getFieldValue("faxSAdm")
                    , mobiltelefonSAdm : getFieldValue("mobiltelefonSAdm")
                    , username         : getFieldValue("benutzernameSAdm")
                    , passHash         : getHash(getFieldValue("passwortSAdm"))
                    , rechteTreeView   : treeSAdm.getValues().join(",")
                    , rechteMenu       : scpTreeView.getSelectedNodes(treeSAdm).join(",")
                    }
                )

            // Checks if there are empty input values
            const completeFormData =
                formData => 
                [ "titelSAdm"
                , "nameSAdm"
                , "vornameSAdm"
                , "emailSAdm"
                , "telefonSAdm"
                , "faxSAdm"
                , "mobiltelefonSAdm"
                , "username"
                ]
                .map(field(formData))
                .every(a => !emptyString(a)) &&
                !emptyString(getFieldValue("passwortSAdm"))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Rechteverwaltung/SuperAdmins/saveSuperAdmin.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#sAdmState").val())("new") ?
                    this.readLast() :
                    false
                )

            // If the form data contains empty input elements a
            // dialog is shown which asks if the record should be
            // saved anyways
            const nonCompleteDataDialog =
                formData =>
                $("#saveSAdmDialog").dialog({
                    height: 203,
                    width: 329,
                    resize: "auto",
                    show: {
                        effect: "fade",
                        duration: 500
                    },
                    hide: {
                        effect: "fade",
                        duration: 500
                    },
                    modal: true,
                    open: () => {
                        $("#saveSAdmOk").off("click")
                        $("#saveSAdmOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveSAdmDialog").dialog("close")
                            )
                        )

                        $("#saveSAdmCancel").off("click")
                        $("#saveSAdmCancel").on("click",
                            () =>
                            $("#saveSAdmDialog").dialog("close")
                        )
                    }
                })

            // Checks if all input elements are set and either shows the
            // dialog which asks if the record should be saved anyways
            // or if complete directly saves the record
            this.validateAndSaveFormData =
                    () => {
                        const formData =
                            getFormData()

                        !completeFormData(formData) ?
                        nonCompleteDataDialog(formData) :
                        saveFormData(formData) 
                    }

            const colorState =
                state =>
                state === "new" ? 
                "antiquewhite" :
                "white"

            // Sets the create new or update state for saving
            const setState =
                state =>
                ( $("#sAdmState").val(state)
                , $(".sAdmForm")
                    .css("background", colorState(state))
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) 

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            this.clearFields =
                () =>
                ( [ "sAdmID"
                  , "titelSAdm"
                  , "nameSAdm"
                  , "vornameSAdm"
                  , "emailSAdm"
                  , "telefonSAdm"
                  , "faxSAdm"
                  , "mobiltelefonSAdm"
                  , "benutzernameSAdm"
                  , "passwortSAdm"
                  ]    
                  .forEach(clearField)
                , scpTreeView.clear(treeSAdm)
                , setState("new")
                )

            const getBetrGrpRefRecords =
                () => 
                idxDB.superAdmins
                .where("betrGrp_ID")
                .equals(Number(getFieldValue("betrGrpID")))

            // Returns an array of the Schicht Modelle from indexedDB
            const querySuperAdminsDataIDB =
                () => 
                getBetrGrpRefRecords()
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const querySuperAdminDataIDB =
                idx =>
                querySuperAdminsDataIDB()
                .then(superAdmins => superAdmins[idx])

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    querySuperAdminDataIDB(idx)
                    .then(
                        superAdmin => {

                            $("#sAdmIdx").val(idx)
                            $("#sAdmID").val(superAdmin.sAdm_ID)
                            $("#titelSAdm").val(superAdmin.titelSAdm)
                            $("#nameSAdm").val(superAdmin.nameSAdm)
                            $("#vornameSAdm").val(superAdmin.vornameSAdm)
                            $("#emailSAdm").val(superAdmin.emailSAdm)
                            $("#telefonSAdm").val(superAdmin.telefonSAdm)
                            $("#faxSAdm").val(superAdmin.faxSAdm)
                            $("#mobiltelefonSAdm").val(superAdmin.mobiltelefonSAdm)
                            $("#benutzernameSAdm").val(superAdmin.username)

                            setState("edit")

                            treeSAdm.setValues(record.rechteTreeView.split(","))
                        }
                    )
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(0) :
                    this.clearFields()
                )
                
            // Sets the form data input values of the previous Schicht Modell
            // depending on the current records index
            this.readPrevious =
                () =>
                greaterZero(getFieldValue("sAdmIdx")) ?
                readIntoFormFields(decr(getFieldValue("sAdmIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("sAdmIdx")) ?
                    readIntoFormFields(incr(getFieldValue("sAdmIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteSuperAdmin =
                () => {
                    const sAdmID = $("#sAdmID").val()

                    ajaxPost("php/Rechteverwaltung/SuperAdmins/deleteSuperAdmin.php")({sAdmID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB()
                          .then( 
                              readIntoFormFields( getFieldValue( "sAdmIdx" ) ) 
                          )
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.titelSAdm
                    , a.vornameSAdm + " " + a.nameSAdm
                    , a.username
                    ]
                )

            // Fills the search dialog table with data
            const fillSuperAdminsTbl =
                data => {
                    clearTable(tblSAdmSuchen)
                    intoTable(tblSAdmSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchSuperAdmins =
                () => {

                    querySuperAdminsDataIDB()
                    .then(fillSuperAdminsTbl)

                    $("#sAdmSuchenContainer").dialog({
                        height: 450,
                        width: 875,
                        resize: "auto",
                        show: {
                            effect: "fade",
                            duration: 500
                        },
                        hide: {
                            effect: "fade",
                            duration: 500
                        },
                        modal: true,
                        open: function() {
                            $("#tblSAdmSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSAdmSuchen tbody").off("dblclick", "tr");
                            $("#tblSAdmSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSAdmSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#sAdmSuchenContainer").dialog("close")
                            })
                        }
                    })
                }  
        }
    )

// Initialize Permissions TreeViewscpRechteverwaltung_superAdmins.showTreeView()
//
const treeSAdm = scpTreeView.show("sAdmTreeview")