// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_admins =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/Admins/read.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("admins")   
                )

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Returns an object that contains the form data
            const getFormData =
                 () => (
                    { modus : getFieldValue("admState")
                    , admID : getFieldValue("admID")
                    , manID : getFieldValue("manID")
                    , manGrpID : getFieldValue("manGrpID")
                    , titel : getFieldValue("titelAdm")
                    , name : getFieldValue("nameAdm")
                    , vorname : getFieldValue("vornameAdm")
                    , email : getFieldValue("emailAdm")
                    , telefon : getFieldValue("telefonAdm")
                    , fax : getFieldValue("faxAdm")
                    , mobiltelefon : getFieldValue("mobiltelefonAdm")
                    , username : getFieldValue("benutzernameAdm")
                    , passHash : getHash(getFieldValue("passwortAdm"))
                    , rechte : treeAdm.getValues().join(",")
                    }
                )

            // Checks if there are empty input values
            const completeFormData =
                formData => 
                [ "titelAdm"
                , "nameAdm"
                , "vornameAdm"
                , "emailAdm"
                , "telefonAdm"
                , "faxAdm"
                , "mobiltelefonAdm"
                , "username"
                ]
                .map(field(formData))
                .every(a => !emptyString(a)) &&
                !emptyString(getFieldValue("passwortSAdm"))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Rechteverwaltung/Admins/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#admState").val())("new") ?
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
                        $("#saveAdmOk").off("click")
                        $("#saveAdmOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveAdmDialog").dialog("close")
                            )
                        )

                        $("#saveAdmCancel").off("click")
                        $("#saveAdmCancel").on("click",
                            () =>
                            $("#saveAdmDialog").dialog("close")
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
                ( $("#admState").val(state)
                , $(".admForm")
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
                ( [ "admID"
                  , "titelAdm"
                  , "nameAdm"
                  , "vornameAdm"
                  , "emailAdm"
                  , "telefonAdm"
                  , "faxAdm"
                  , "mobiltelefonAdm"
                  , "benutzernameAdm"
                  , "passwortAdm"
                  ]    
                  .forEach(clearField)
                , setState("new")
                )

            const getManManGrpRefRecords =
                () => {
                    let manGrpOrManID

                    if (getFieldValue("manGrpOrMan") === "man") {
                        manGrpOrManID = "man_ID"
                    }
                    else {
                        manGrpOrManID = "manGrp_ID"
                    }

                    return idxDB.admins
                          .where(manGrpOrManID)
                          .equals(Number(getFieldValue(manGrpOrManID)))
                }

            // Returns an array of the Schicht Modelle from indexedDB
            const queryAdminsDataIDB =
                () => 
                getManManGrpRefRecords()
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const queryAdminDataIDB =
                idx =>
                queryAdminsDataIDB()
                .then(admins => admins[idx])

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    queryAdminDataIDB(idx)
                    .then(
                        admin => {

                            $("#sAdmIdx").val(idx)
                            $("#sAdmID").val(admin.sAdm_ID)
                            $("#titelAdm").val(admin.titel)
                            $("#nameAdm").val(admin.name)
                            $("#vornameAdm").val(admin.vorname)
                            $("#emailAdm").val(admin.email)
                            $("#telefonAdm").val(admin.telefon)
                            $("#faxAdm").val(admin.fax)
                            $("#mobiltelefonAdm").val(admin.mobiltelefon)
                            $("#benutzernameAdm").val(admin.username)

                            setState("edit")

                            treeSAdm.setValues(admin.rechte.split(","))
                        }
                    )
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                getManManGrpRefRecords()
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
                greaterZero(getFieldValue("admIdx")) ?
                readIntoFormFields(decr(getFieldValue("admIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                getManManGrpRefRecords()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("admIdx")) ?
                    readIntoFormFields(incr(getFieldValue("admIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                getManManGrpRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteAdmin =
                () => {
                    const sAdmID = $("#sAdmID").val()

                    ajaxPost("php/Rechteverwaltung/Admins/delete.php")({sAdmID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB()
                          .then( 
                              readIntoFormFields( getFieldValue( "admIdx" ) ) 
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
                    , a.titel
                    , a.vorname + " " + a.name
                    , a.username
                    ]
                )

            // Fills the search dialog table with data
            const fillAdminsTbl =
                data => {
                    clearTable(tblAdmSuchen)
                    intoTable(tblAdmSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchAdmins =
                () => {

                    queryAdminsDataIDB()
                    .then(fillAdminsTbl)

                    $("#admSuchenContainer").dialog({
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
                            $("#tblAdmSuchen tbody tr").css("cursor", "pointer");
                            $("#tblAdmSuchen tbody").off("dblclick", "tr");
                            $("#tblAdmSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSAdmSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#admSuchenContainer").dialog("close")
                            })
                        }
                    })
                }

            this.showTreeView = 
                () => {
                    const menus = scpRechteverwaltung.menuHtml2Json()
                    const mainMenus = scpRechteverwaltung.getMainMenus(menus)
                    const treeJson = scpTreeView.buildTree(mainMenus)(menus)

                    return scpTreeView.showTreeView("admTreeview")(treeJson)
                }   
        }
    )

// Initialize Permissions TreeView
//
const treeAdm = scpRechteverwaltung_admins.showTreeView()