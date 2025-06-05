// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpProdukte =
    freeze (
        new function () {
            // Returns an object that contains the form data
            const getFormData =
                archiviert => {
                    if(!archiviert) {
                        return { nameDB : getFieldValue("nameDB")
                        , modus : getFieldValue("schtMdlState")
                        , artikelnummer : getFieldValue("artklnrPrd")
                        , bezeichnung : getFieldValue("bezeichnungPrd")
                        , orgID : getFieldValue("orgID")
                        , custom1 : getFieldValue("custom1Prd")
                        , custom2 : getFieldValue("custom2Prd")
                        , custom3 : getFieldValue("custom3Prd")
                        , custom4 : getFieldValue("custom4Prd")
                        , custom5 : getFieldValue("custom5Prd")
                        , custom6 : getFieldValue("custom6Prd")
                        , anl01 : getFieldValue("inpAnlage1IDPrd")
                        , anl02 : getFieldValue("inpAnlage2IDPrd")
                        , anl03 : getFieldValue("inpAnlage3IDPrd")
                        , anl04 : getFieldValue("inpAnlage4IDPrd")
                        , anl05 : getFieldValue("inpAnlage5IDPrd")
                        , anl06 : getFieldValue("inpAnlage6IDPrd")
                        , anl07 : getFieldValue("inpAnlage7IDPrd")
                        , anl08 : getFieldValue("inpAnlage8IDPrd")
                        , anl09 : getFieldValue("inpAnlage9IDPrd")
                        }
                    }
                    else {
                        return { archiviert : getFieldValue("archiviertPrdHist")   
                        , prdID : getFieldValue("prdID")
                        , bemerkung : getFieldValue("bemerkungHistFenster")
                        , gueltigVon : getFieldValue("gueltigVonHistFenster")
                        , gueltigBis : getFieldValue("gueltigBisHistFenster")
                        }
                    }
                }

            // Syncs the indexedDB with the sql srv DB
            this.updateIndexedDB =
                () =>
                ajaxPost("php/Produkteverwaltung/read.php")({nameDB : $("#nameDB").val()})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("produkte")   
                )

            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const save =
                formData =>
                ajaxPost("php/Produkteverwaltung/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#prdState").val())("new") ?
                    this.readLast() :
                    false
                )
                .then(scpProdukte.readLast)

            // If the form data contains empty input elements a
            // dialog is shown which asks if the record should be
            // saved anyways
            const nonCompleteDataDialog =
                formData =>
                $("#saveSchichtDialog").dialog({
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
                        $("#savePrdOk").off("click")
                        $("#savePrdOk").on("click",
                            () =>
                            $("#savePrdDialog").dialog("close")
                        )

                        $("#savePrdCancel").off("click")
                        $("#savePrdCancel").on("click",
                            () =>
                            $("#savePrdDialog").dialog("close")
                        )
                    }
                })

            // Checks if all input elements are set and either shows the
            // dialog which asks if the record should be saved anyways
            // or if complete directly saves the record
            this.validateAndSaveFormData =
                () => {
                    const formData =
                        getFormData(getFieldValue("archiviertPrdHist"))

                    !completeFormData(formData) ?
                    nonCompleteDataDialog(formData) :
                    save(formData)
                }

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            // Resets all of the first section input elements to an
            // empty string
            const clearFields =
                () =>
                [ "prdID"
                , "artklnrPrd"
                , "bezeichnungPrd"
                , "custom1Prd"
                , "custom2Prd"
                , "custom3Prd"
                , "custom4Prd"
                , "custom5Prd"
                , "custom6Prd"
                , "inpAnlage1Prd"
                , "inpAnlage2Prd"
                , "inpAnlage3Prd"
                , "inpAnlage4Prd"
                , "inpAnlage5Prd"
                , "inpAnlage6Prd"
                , "inpAnlage7Prd"
                , "inpAnlage8Prd"
                , "inpAnlage9Prd"
                ].forEach(clearField)

            // Sets the create new or update state for saving
            const setState =
                state =>
                state === "new" ?
                ( $("#prdState").val(state)
                , $(".prdForm")
                    .css("background", "antiquewhite")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) :
                ( $("#prdState").val(state)
                , $(".prdForm")
                    .css("background", "white")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                )

            // Resets all input elements to their initial empty state
            // and sets the save state to create new
            this.clearFields =
                () =>
                ( clearFields()
                , setState("new")
                )

            // Sorts records by primary key
            const sortByPrimKey =
                lst =>
                lst.sort(
                    (a, b) =>
                    a.prd_ID - b.prd_ID
                )

            // Returns an array of the Schicht Modelle from indexedDB
            const queryDatasIDB =
                () => 
                idxDB.produkte
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const queryDataIDB =
                idx =>
                queryDatasIDB()
                .then(records => records[idx])

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    queryDataIDB(idx)
                    .then(
                        record => {

                            $("#artklnrPrd").val()
                            $("#bezeichnungPrd").val()
                            
                            $("#custom1Prd").val()
                            $("#custom2Prd").val()
                            $("#custom3Prd").val()
                            $("#custom4Prd").val()
                            $("#custom5Prd").val()
                            $("#custom6Prd").val()
                            
                            $("#inpAnlage1Prd").val(record.anl01)
                            $("#inpAnlage2Prd").val(record.anl02)
                            $("#inpAnlage3Prd").val(record.anl03)
                            $("#inpAnlage4Prd").val(record.anl04)
                            $("#inpAnlage5Prd").val(record.anl05)
                            $("#inpAnlage6Prd").val(record.anl06)
                            $("#inpAnlage7Prd").val(record.anl07)
                            $("#inpAnlage8Prd").val(record.anl08)
                            $("#inpAnlage9Prd").val(record.anl09)

                            setState("edit")
                        }
                    )
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                readIntoFormFields(0)
                
            // Sets the form data input values of the previous Schicht Modell
            // depending on the current records index
            this.readPrevious =
                () =>
                greaterZero(getFieldValue("prdIdx")) ?
                readIntoFormFields(decr(getFieldValue("prdIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                idxDB.produkte
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("prdIdx")) ?
                    readIntoFormFields(incr(getFieldValue("prdIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                idxDB.produkte
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    this.clearFields()
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteSchichtModell =
                () => {
                    const nameDB = $("#nameDB").val()
                    const prdID = $("#prdID").val()

                    ajaxPost("php/Produkteverwaltung/delete.php")({nameDB, prdID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB().then(this.readLast)
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.namePrd
                    , a.artikelNrPrd
                    , a.custom1
                    , a.custom2
                    , a.custom3
                    ]
                )

            // Fills the search dialog table with data
            const fillTbl =
                data => {
                    clearTable(tblProdukteSuchen)
                    intoTable(tblProdukteSuchen)(prepareTableData(data))
                }
            
            const fillNotYetAssignedTbl =
                data => {
                    clearTable(tblProdukteSuchen)
                    intoTable(tblProdukteSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchProduktModell =
                () => {

                    queryDatasIDB()
                    .then(sortByPrimKey)
                    .then(fillTbl)

                    $("#produkteSuchenContainer").dialog({
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
                            $("#tblProdukteSuchen tbody tr").css("cursor", "pointer");
                            $("#tblProdukteSuchen tbody").off("dblclick", "tr");
                            $("#tblProdukteSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblProdukteSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#produkteSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )
