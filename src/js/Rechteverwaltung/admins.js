// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_admins =
    freeze (
        new function () {

            const updateIndexedDB =
                scpIndexedDB
                .updateIndexedDB("php/Rechteverwaltung/Admins/read.php")("admins")

            const getMenuAndEditConfig =
                () =>
                JSON.stringify(
                    { values     : treeAdm.getValues().join(",")
                    , editValues : treeAdm.getEditValues().join(",")
                    }
                )

            const getHash_ = 
                () =>
                emptyString(helper.fieldValue("passwortAdm")) ? 
                "" :
                getHash(helper.fieldValue("passwortAdm"))

            // Returns an object that contains the form data
            const getFormData =
                () => (
                    // eslint-disable-next-line no-undef
                    { modus          : helper.fieldValue("admState")
                    , admID          : helper.fieldValue("admID")
                    , manID          : helper.fieldValue("abManID")
                    , manGrpID       : helper.fieldValue("abManGrpID")
                    , betrGrpID      : helper.fieldValue("betrGrpID")
                    , titel          : helper.fieldValue("titelAdm")
                    , name           : helper.fieldValue("nameAdm")
                    , vorname        : helper.fieldValue("vornameAdm")
                    , email          : helper.fieldValue("emailAdm")
                    , telefon        : helper.fieldValue("telefonAdm")
                    , fax            : helper.fieldValue("faxAdm")
                    , mobiltelefon   : helper.fieldValue("mobiltelefonAdm")
                    , username       : helper.fieldValue("benutzernameAdm")
                    , passHash       : getHash_()
                    , rechteTreeView : getMenuAndEditConfig()
                    , rechteMenu     : scpTreeView.getSelectedNodes(treeAdm).join(",")
                    }
                )

            // Checks if there are empty input values
            const isComplete =
                formData => 
                [ "titel"
                , "name"
                , "vorname"
                , "email"
                , "telefon"
                , "fax"
                , "mobiltelefon"
                , "username"
                ]
                .map(field(formData))
                .every(a => !emptyString(a)) &&
                !emptyString(helper.fieldValue("passwortAdm"))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const save =
                formData =>
                ajaxPost("php/Rechteverwaltung/Admins/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(updateIndexedDB)
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
                $("#saveAdmDialog").dialog({
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
                            ( save(formData)
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
            this.validateAndSave =
                    () => {
                        const formData =
                            getFormData()

                        !isComplete(formData) ?
                        nonCompleteDataDialog(formData) :
                        save(formData) 
                    }

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
                  .forEach(helper.clearField)
                , scpTreeView.clear(treeAdm)
                , helper.setState("adm")("new")
                )

            const getRef =
                  () => {
                  idxDB.admins
                  .where($(".manGrpPfad").val().split("-")[0])
                  .equals(`${Number($(".manGrpPfad").val().split("-")[1])}`)
                  }
            
            // Returns an array of the Schicht Modelle from indexedDB
            const queryDatasIDB =
                () =>
                getRef()
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const queryDataIDB =
                idx =>
                queryDatasIDB()
                .then(records => records[idx])

            const values_ =
                record =>
                json(record.rechteTreeView).values.split(",")

            const editValues_ =
                record =>
                json(record.rechteTreeView).editValues.split(",")

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    queryDataIDB(idx)
                    .then(
                        record => {

                            $("#admIdx").val(idx)
                            $("#admID").val(record.adm_ID)
                            $("#titelAdm").val(record.titel)
                            $("#nameAdm").val(record.name)
                            $("#vornameAdm").val(record.vorname)
                            $("#emailAdm").val(record.email)
                            $("#telefonAdm").val(record.telefon)
                            $("#faxAdm").val(record.fax)
                            $("#mobiltelefonAdm").val(record.mobiltelefon)
                            $("#benutzernameAdm").val(record.username)
                            $("#passwortAdm").val("")

                            helper.setState("adm")("edit")

                            treeAdm.setValues(values_(record))
                            treeAdm.setEditValues(editValues_(record))
                        }
                    )
                }
            
            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                getRef()
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
                greaterZero(helper.fieldValue("admIdx")) ?
                readIntoFormFields(decr(helper.fieldValue("admIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                getRef()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(helper.fieldValue("admIdx")) ?
                    readIntoFormFields(incr(helper.fieldValue("admIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                getRef()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.delete =
                () => {
                    const admID = $("#admID").val()

                    ajaxPost("php/Rechteverwaltung/Admins/delete.php")({admID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , updateIndexedDB()
                          .then( this.readFirst )
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareData =
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
            const fillTbl =
                data => {
                    clearTable(tblAdmSuchen)
                    intoTable(tblAdmSuchen)(prepareData(data))
                }

            // Triggers opening the search dialog
            this.search =
                () => {

                    queryDatasIDB()
                    .then(fillTbl)

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
                                    tblAdmSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#admSuchenContainer").dialog("close")
                            })
                        }
                    })
                }  
        }
    )

// Initialize Permissions TreeView
//
let treeAdm 