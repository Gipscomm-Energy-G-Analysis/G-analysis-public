// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_benutzer =
    freeze (
        new function () {

            const updateIndexedDB =
                scpIndexedDB
                .updateIndexedDB("php/Rechteverwaltung/Benutzer/read.php")("benutzer")

            const getMenuAndEditConfig =
                () =>
                JSON.stringify(
                    { values     : treeBen.getValues().join(",")
                    , editValues : treeBen.getEditValues().join(",")
                    }
                )

            const getHash_ = 
                () =>
                emptyString(helper.fieldValue("passwortBen")) ? 
                "" :
                getHash(helper.fieldValue("passwortBen"))

            // Returns an object that contains the form data
            const getFormData =
                () => (
                    { modus          : helper.fieldValue("benState")
                    , benID          : helper.fieldValue("benID")
                    , manID          : helper.fieldValue("abManID")
                    , manGrpID       : helper.fieldValue("abManGrpID")
                    , betrGrpID      : helper.fieldValue("betrGrpID")
                    , titel          : helper.fieldValue("titelBen")
                    , name           : helper.fieldValue("nameBen")
                    , vorname        : helper.fieldValue("vornameBen")
                    , email          : helper.fieldValue("emailBen")
                    , telefon        : helper.fieldValue("telefonBen")
                    , fax            : helper.fieldValue("faxBen")
                    , mobiltelefon   : helper.fieldValue("mobiltelefonBen")
                    , username       : helper.fieldValue("benutzernameBen")
                    , passHash       : getHash_()
                    , rechteTreeView : JSON.stringify(getMenuAndEditConfig())
                    , rechteMenu     : scpTreeView.getSelectedNodes(treeBen).join(",")
                    , rechteEdit     : getMenuAndEditConfig().editValues
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
                !emptyString(helper.fieldValue("passwortBen"))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const save =
                formData =>
                ajaxPost("php/Rechteverwaltung/Benutzer/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(updateIndexedDB)
                .then(
                    () =>
                    equal($("#benState").val())("new") ?
                    this.readLast() :
                    false
                )
                    
            // If the form data contains empty input elements a
            // dialog is shown which asks if the record should be
            // saved anyways
            const nonCompleteDataDialog =
                formData =>
                $("#saveBenDialog").dialog({
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
                        $("#saveBenOk").off("click")
                        $("#saveBenOk").on("click",
                            () =>
                            ( save(formData)
                            , $("#saveBenDialog").dialog("close")
                            )
                        )

                        $("#saveBenCancel").off("click")
                        $("#saveBenCancel").on("click",
                            () =>
                            $("#saveBenDialog").dialog("close")
                        )
                    }
                })                                      

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
                ( [ "benID"
                  , "titelBen"
                  , "nameBen"
                  , "vornameBen"
                  , "emailBen"
                  , "telefonBen"
                  , "faxBen"
                  , "mobiltelefonBen"
                  , "benutzernameBen"
                  , "passwortBen"
                  ]    
                  .forEach(helper.clearField)
                , scpTreeView.clear("#benTreeview")
                , helper.setState("ben")("new")
                )

            const getRef =
                () => 
                idxDB.benutzer
                .where($(".manGrpPfad").val().split("-")[0])
                .equals(Number($(".manGrpPfad").val().split("-")[1]))
            
            const queryDatasIDB =
                () =>
                getRef()
                .toArray()

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

            const readIntoFormFields =
                idx => {
                    queryDataIDB(idx)
                    .then(
                        record => {

                            $("#benIdx").val(idx)
                            $("#benID").val(record.ben_ID)
                            $("#titelBen").val(record.titel)
                            $("#nameBen").val(record.name)
                            $("#vornameBen").val(record.vorname)
                            $("#emailBen").val(record.email)
                            $("#telefonBen").val(record.telefon)
                            $("#faxBen").val(record.fax)
                            $("#mobiltelefonBen").val(record.mobiltelefon)
                            $("#benutzernameBen").val(record.username)
                            $("#passwortBen").val("")

                            helper.setState("ben")("edit")

                            treeBen.setValues(values_(record))
                            treeBen.setEditValues("#benTreeview")(editValues_(record))
                        }
                    )
                }
            
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
                
            this.readPrevious =
                () =>
                greaterZero(helper.fieldValue("benIdx")) ?
                readIntoFormFields(decr(helper.fieldValue("benIdx"))) :
                false

            this.readNext =
                () =>
                getRef()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(helper.fieldValue("benIdx")) ?
                    readIntoFormFields(incr(helper.fieldValue("benIdx"))) :
                    false
                )

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

            this.delete =
                () => {
                    const benID = $("#benID").val()

                    ajaxPost("php/Rechteverwaltung/Benutzer/delete.php")({benID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , updateIndexedDB()
                          .then( this.readFirst )
                        )
                    )
                }

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

            const fillTbl =
                data => {
                    clearTable(tblBenSuchen)
                    intoTable(tblBenSuchen)(prepareData(data))
                }

            this.search =
                () => {

                    queryDatasIDB()
                    .then(fillTbl)

                    $("#benSuchenContainer").dialog({
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
                            $("#tblBenSuchen tbody tr").css("cursor", "pointer");
                            $("#tblBenSuchen tbody").off("dblclick", "tr");
                            $("#tblBenSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblBenSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#benSuchenContainer").dialog("close")
                            })
                        }
                    })
                }  
        }
    )

let treeBen