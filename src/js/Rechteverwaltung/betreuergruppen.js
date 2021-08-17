// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_betreuergruppen =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/Betreuergruppen/readBetreuergruppen.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("betreuerGruppen")   
                )

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Extracts the mandanten ID's from the table
            const getManIDs =
                () =>
                array($("#tblMandantenBetrGrp tbody tr").length)()()
                .map((_, i) => tblMandantenBetrGrp.cell(i, 0).data())
                .join(",")

            const arrayManIDs = 
                () =>
                array($("#tblMandantenBetrGrp tbody tr").length)()()
                .map((_, i) => tblMandantenBetrGrp.cell(i, 0).data())

            // Returns an object that contains the form data
            const getFormData =
                () => (
                    { modus : getFieldValue("betrGrpState")
                    , betrGrpID : getFieldValue("betrGrpID")
                    , firma : getFieldValue("firmaBetrGrp")
                    , anzahlMitarbeiter : getFieldValue("anzahlMitarbeiterBetrGrp")
                    , anschrift : getFieldValue("anschriftBetrGrp")
                    , plz : getFieldValue("plzBetrGrp")
                    , ort : getFieldValue("ortBetrGrp")
                    , geschaeftsfuehrer : getFieldValue("geschaeftsfuehrerBetrGrp")
                    , telefon : getFieldValue("telefonBetrGrp")
                    , eMail : getFieldValue("emailBetrGrp")
                    , notiz : getFieldValue("notizBetrGrp")
                    , mandantenIDs : getManIDs()
                    }
                )

            // Checks if there are empty input values
            const completeFormData =
                formData => 
                [ "firma"
                , "anzahlMitarbeiter"
                , "anschrift"
                , "plz"
                , "ort"
                , "geschaeftsfuehrer"
                , "telefon"
                , "eMail"
                , "notiz"
                , "mandantenIDs"
                ]
                .map(field(formData))
                .every(a => !emptyString(a))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Rechteverwaltung/Betreuergruppen/saveBetreuergruppe.php")(formData)
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
                $("#saveBetrGrpDialog").dialog({
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
                        $("#saveBetrGrpOk").off("click")
                        $("#saveBetrGrpOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveBetrGrpDialog").dialog("close")
                            )
                        )

                        $("#saveSchichtCancel").off("click")
                        $("#saveSchichtCancel").on("click",
                            () =>
                            $("#saveBetrGrpDialog").dialog("close")
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
                ( $("#betrGrpState").val(state)
                , $(".betrGrpForm")
                    .css("background", "antiquewhite")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) :
                ( $("#betrGrpState").val(state)
                , $(".betrGrpForm")
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
                ( [ "betrGrpID"
                  , "firmaBetrGrp"
                  , "anzahlMitarbeiterBetrGrp"
                  , "anschriftBetrGrp"
                  , "plzBetrGrp"
                  , "ortBetrGrp"
                  , "geschaeftsfuehrerBetrGrp"
                  , "telefonBetrGrp"
                  , "emailBetrGrp"
                  , "notizBetrGrp"
                  ]    
                  .forEach(clearField)
                , clearTable(tblMandantenBetrGrp)
                , setState("new")
                )

            // Returns an array of the Schicht Modelle from indexedDB
            const queryBetreuerGruppenDataIDB =
                () => 
                idxDB.betreuerGruppen
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            this.queryBetreuerGruppeDataIDB =
                idx =>
                queryBetreuerGruppenDataIDB()
                .then(betreuerGruppen => betreuerGruppen[idx])

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
                betreuerGruppe =>
                scpUnternehmensstruktur_mandanten
                .queryMandantenWithIDs(betreuerGruppe.mandantenIDs.split(","))
                .then(fillMandantenTbl(tblMandantenBetrGrp))

            this.removeFromMandantenTbl =
                that =>
                tblMandantenBetrGrp.row(that).remove().draw()

            // Sets the form data retrieved from indexedDB
            this.readIntoFormFields =
                idx => {
                    this.queryBetreuerGruppeDataIDB(idx)
                    .then(
                        betreuerGruppe => {

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
                            $(".betrPfad").prop("selectedIndex", idx)
                            readIntoMandantenTable(betreuerGruppe)

                            setState("edit")
                        }
                    )
                    .then(scpRechteverwaltung_superAdmins.readFirst)
                    .then(scpRechteverwaltung_mandantengruppen.readFirst)
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                idxDB.betreuerGruppen
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    this.readIntoFormFields(0) :
                    this.clearFields()
                )
                
            // Sets the form data input values of the previous Schicht Modell
            // depending on the current records index
            this.readPrevious =
                () =>
                greaterZero(getFieldValue("betrGrpIdx")) ?
                this.readIntoFormFields(decr(getFieldValue("betrGrpIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                idxDB.betreuerGruppen
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("betrGrpIdx")) ?
                    this.readIntoFormFields(incr(getFieldValue("betrGrpIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                idxDB.betreuerGruppen
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    this.readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteBetreuerGruppe =
                () => {
                    const betrGrpID = $("#betrGrpID").val()

                    ajaxPost("php/Rechteverwaltung/Betreuergruppen/deleteBetreuergruppe.php")({betrGrpID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB().then(this.readFirst)
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableDataBetrGrp =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.firma
                    , a.anschrift
                    , a.plz + " " + a.ort
                    ]
                )

            // Fills the search dialog table with data
            const fillBetreuerGruppenTbl =
                data => {
                    clearTable(tblBetrGrpSuchen)
                    intoTable(tblBetrGrpSuchen)(prepareTableDataBetrGrp(data))
                }

            // Triggers opening the search dialog
            this.searchBetreuerGruppen =
                () => {

                    queryBetreuerGruppenDataIDB()
                    .then(fillBetreuerGruppenTbl)

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

                                this.readIntoFormFields(head(selectedRecord))

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
                            tblMandantenBetrGrp.row.add([a[0], a[1], a[2]]).draw();
                            tblMandantenBetrGrp.column(0).visible(!1).draw();
                            $("#mandantenlisteAuswahlContainer").dialog("close")
                        })
                    }
                })
            }     
        }
    )