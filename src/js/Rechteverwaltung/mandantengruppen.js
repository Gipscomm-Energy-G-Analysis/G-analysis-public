// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_mandantengruppen =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/Mandantengruppen/read.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("mandantenGruppen")   
                )

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Extracts the mandanten ID's from the table
            const getManIDs =
                () =>
                array($("#tblMandantengruppe tbody tr").length)()()
                .map((_, i) => tblMandantengruppe.cell(i, 0).data())
                .join(",")

            const arrayManIDs = 
                () =>
                array($("#tblMandantengruppe tbody tr").length)()()
                .map((_, i) => tblMandantengruppe.cell(i, 0).data())

            // Returns an object that contains the form data
            const getFormData =
                () => (
                    { modus : getFieldValue("manGrpState")
                    , manGrpIdx : getFieldValue("manGrpIdx")
                    , manGrpID : getFieldValue("manGrpID")
                    , name : getFieldValue("nameManGrp")
                    , kurz : getFieldValue("kurz")
                    , notiz : getFieldValue("notiz")
                    , mandantenIDs : getManIDs()
                    }
                )

            // Checks if there are empty input values
            const completeFormData =
                formData => 
                [ "name"
                , "kurz"
                , "mandantenIDs"
                ]
                .map(field(formData))
                .every(a => !emptyString(a))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Rechteverwaltung/Mandantengruppen/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#betrGrpState").val())("new") ?
                    this.readLast() :
                    false
                )

            // If the form data contains empty input elements a
            // dialog is shown which asks if the record should be
            // saved anyways
            const nonCompleteDataDialog =
                formData =>
                $("#saveManGrpDialog").dialog({
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
                        $("#saveManGrpOk").off("click")
                        $("#saveManGrpOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveManGrpDialog").dialog("close")
                            )
                        )

                        $("#saveManGrpCancel").off("click")
                        $("#saveManGrpCancel").on("click",
                            () =>
                            $("#saveManGrpDialog").dialog("close")
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

            // Sets the create new or update state for saving
            const setState =
                state =>
                state === "new" ?
                ( $("#manGrpState").val(state)
                , $(".manGrpForm")
                    .css("background", "antiquewhite")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) :
                ( $("#manGrpState").val(state)
                , $(".manGrpForm")
                    .css("background", "white")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                )

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            this.clearFields =
                () =>
                ( [ "nameManGrp"
                  , "kurzManGrp"
                  ]    
                  .forEach(clearField)
                , clearTable(tblMandantengruppe)
                , setState("new")
                )

            // Returns an array of the Schicht Modelle from indexedDB
            const queryMandantengruppenDataIDB =
                () => 
                idxDB.mandantenGruppen
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const queryMandantenGruppenDataIDB =
                idx =>
                queryMandantenGruppenIDB()
                .then(mandantenGruppen => mandantenGruppen[idx])

            // Prepares the table data for the search dialog
            const prepareTableDataMan =
                records =>
                records.map(
                    (a, i) =>
                    [ a.man_ID
                    , a.nameMan
                    , a.dbName
                    ]
                )

            // Fills the search dialog table with data
            const fillMandantenTbl =
                tbl =>
                data => {
                    clearTable(tbl)
                    intoTable(tbl)(prepareTableDataMan(data))
                }

            const readIntoMandantenTable =
                mandantenGruppe =>
                scpUnternehmensstruktur_mandanten
                .queryMandantenWithIDs(mandantenGruppe.mandantenIDs.split(","))
                .then(fillMandantenTbl(tblMandantengruppe))

            this.removeFromMandantenTbl =
                that =>
                tblMandantengruppe.row(that).remove().draw()

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    queryBetreuerGruppeDataIDB(idx)
                    .then(
                        mandantenGruppe => {

                            $("#betrGrpIdx").val(idx)
                            $("#betrGrpID").val(betreuerGruppe.betrGrp_ID)
                            $("#firmaBetrGrp").val(betreuerGruppe.firma)
                            $("#anzahlMitarbeiterBetrGrp").val(betreuerGruppe.anzahlMitarbeiter)
                            $("#anschriftBetrGrp").val(betreuerGruppe.anschrift)
                            $("#plzBetrGrp").val(betreuerGruppe.plz)
                            $("#ortBetrGrp").val(betreuerGruppe.ort)
                            $("#geschaeftsfuehrerBetrGrp").val(betreuerGruppe.geschaeftsfuehrer)
                            $("#telefonBetrGrp").val(betreuerGruppe.telefon)
                            $("#emailBetrGrp").val(betreuerGruppe.eMail)
                            $("#notizBetrGrp").val(betreuerGruppe.notiz)

                            readIntoMandantenTable(betreuerGruppe)

                            setState("edit")
                        }
                    )
                    .then(scpRechteverwaltung_superAdmins.readFirst)
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                idxDB.mandantenGruppen
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
                greaterZero(getFieldValue("betrGrpIdx")) ?
                readIntoFormFields(decr(getFieldValue("betrGrpIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                idxDB.mandantenGruppen
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("betrGrpIdx")) ?
                    readIntoFormFields(incr(getFieldValue("betrGrpIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                idxDB.mandantenGruppen
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteMandantenGruppe =
                () => {
                    const betrGrpID = $("#betrGrpID").val()

                    ajaxPost("php/Rechteverwaltung/Mandantengruppen/delete.php")({manGrpID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB().then(this.readFirst)
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableDataManGrp =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.name
                    , a.kurz
                    ]
                )

            // Fills the search dialog table with data
            const fillMandantenGruppenTbl =
                data => {
                    clearTable(tblManGrpSuchen)
                    intoTable(tblManGrpSuchen)(prepareTableDataBetrGrp(data))
                }

            // Triggers opening the search dialog
            this.searchMandantenGruppen =
                () => {

                    queryBetreuerGruppenDataIDB()
                    .then(fillMandantenGruppenTbl)

                    $("#betrGrpSuchenContainer").dialog({
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
                            $("#tblBetrGrpSuchen tbody tr").css("cursor", "pointer");
                            $("#tblBetrGrpSuchen tbody").off("dblclick", "tr");
                            $("#tblBetrGrpSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblBetrGrpSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#betrGrpSuchenContainer").dialog("close")
                            })
                        }
                    })
                }

            this.showMandantenTablePopUp =
                () => {

                    scpUnternehmensstruktur_mandanten
                    .queryMandantenWithoutIDs(arrayManIDs())
                    .then(fillMandantenTbl(tblMandantenAuswahl))

                    $("#mandantenlisteAuswahlContainer").dialog({
                    height: 400,
                    width: 600,
                    resize: "auto",
                    show: {
                        effect: "fade",
                        duration: 500
                    },
                    hide: {
                        effect: "fade",
                        duration: 500
                    },
                    open: function() {
                        $("#tblMandantenAuswahl tbody tr").css("cursor", "pointer");
                        $("#tblMandantenAuswahl tbody").off("dblclick", "tr");
                        $("#tblMandantenAuswahl tbody").on("dblclick", "tr", function() {
                            var a = tblMandantenAuswahl.row(this).data();
                            tblMandantengruppen.row.add([a[0], a[1], a[2]]).draw();
                            tblMandantengruppen.column(0).visible(!1).draw();
                            $("#mandantenlisteAuswahlContainer").dialog("close")
                        })
                    }
                })
            }     
        }
    )