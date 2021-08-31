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

            const getManIDs =
                () =>
                array($("#tblMandantenBetrGrp tbody tr").length)()()
                .map((_, i) => tblMandantenBetrGrp.cell(i, 0).data())
                .join(",")

            const arrayManIDs = 
                () =>
                array($("#tblMandantenBetrGrp tbody tr").length)()()
                .map((_, i) => tblMandantenBetrGrp.cell(i, 0).data())

            const getFormData =
                () => (
                    { modus             : helper.fieldValue("betrGrpState")
                    , betrGrpID         : helper.fieldValue("betrGrpID")
                    , firma             : helper.fieldValue("firmaBetrGrp")
                    , anzahlMitarbeiter : helper.fieldValue("anzahlMitarbeiterBetrGrp")
                    , anschrift         : helper.fieldValue("anschriftBetrGrp")
                    , plz               : helper.fieldValue("plzBetrGrp")
                    , ort               : helper.fieldValue("ortBetrGrp")
                    , geschaeftsfuehrer : helper.fieldValue("geschaeftsfuehrerBetrGrp")
                    , telefon           : helper.fieldValue("telefonBetrGrp")
                    , eMail             : helper.fieldValue("emailBetrGrp")
                    , notiz             : helper.fieldValue("notizBetrGrp")
                    , mandantenIDs      : getManIDs()
                    }
                )

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
            
            const save =
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
                            ( save(formData)
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

            this.validateAndsave =
                    () => {
                        const formData =
                            getFormData()

                        !completeFormData(formData) ?
                        nonCompleteDataDialog(formData) :
                        save(formData) 
                    }

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
                  .forEach(helper.clearField)
                , clearTable(tblMandantenBetrGrp)
                , helper.setState("betrGrp")("new")
                )

            const queryDatasIDB =
                () => 
                idxDB.betreuerGruppen
                .toArray()

            this.queryBetreuerGruppeDataIDB =
                idx =>
                queryDatasIDB()
                .then(records => records[idx])

            const prepareTableDataMan =
                records =>
                records.map(
                    (a, i) =>
                    [ a.man_ID
                    , a.nameMan
                    , a.dbName
                    ]
                )

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

            this.readIntoFormFields =
                idx => {
                    this.queryBetreuerGruppeDataIDB(idx)
                    .then(
                        record => {

                            $("#betrGrpIdx").val(idx)
                            $("#betrGrpID").val(record.betrGrp_ID)
                            $("#firmaBetrGrp").val(record.firma)
                            $("#anzahlMitarbeiterBetrGrp").val(record.anzahlMitarbeiter)
                            $("#anschriftBetrGrp").val(record.anschrift)
                            $("#plzBetrGrp").val(record.plz)
                            $("#ortBetrGrp").val(record.ort)
                            $("#geschaeftsfuehrerBetrGrp").val(record.geschaeftsfuehrer)
                            $("#telefonBetrGrp").val(record.telefon)
                            $("#emailBetrGrp").val(record.eMail)
                            $("#notizBetrGrp").val(record.notiz)
                            $(".betrPfad").prop("selectedIndex", idx)
                            $(".dataBetrGrpAdm").prop("selectedIndex", idx)
                            $(".dataBetrGrpBen").prop("selectedIndex", idx)
                            readIntoMandantenTable(record)

                            helper.setState("betrGrp")("edit")
                        }
                    )
                    .then(scpRechteverwaltung_superAdmins.readFirst)
                    .then(scpRechteverwaltung_mandantengruppen.readFirst)
                    .then(scpRechteverwaltung.readIntoMandantGruppeDropbox)
                    .then(scpRechteverwaltung_admins.readFirst)
                    .then(scpRechteverwaltung_benutzer.readFirst)
                }

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
                
            this.readPrevious =
                () =>
                greaterZero(helper.fieldValue("betrGrpIdx")) ?
                this.readIntoFormFields(decr(helper.fieldValue("betrGrpIdx"))) :
                false

            this.readNext =
                () =>
                idxDB.betreuerGruppen
                .count()
                .then( 
                    count => 
                    greater(decr(count))(helper.fieldValue("betrGrpIdx")) ?
                    this.readIntoFormFields(incr(helper.fieldValue("betrGrpIdx"))) :
                    false
                )

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

            this.deleteBetreuerGruppe =
                () => {
                    const betrGrpID = $("#betrGrpID").val()

                    ajaxPost("php/Rechteverwaltung/Betreuergruppen/deleteBetreuergruppe.php")({betrGrpID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB()
                        .then(betrGrpEinlesen)
                        .then(this.readFirst)
                        )
                    )
                }

            const prepareData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.firma
                    , a.anschrift
                    , a.plz + " " + a.ort
                    ]
                )

            const fillTbl =
                data => {
                    clearTable(tblBetrGrpSuchen)
                    intoTable(tblBetrGrpSuchen)(prepareData(data))
                }

            this.searchBetreuerGruppen =
                () => {

                    queryDatasIDB()
                    .then(fillTbl)

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

                                    scpRechteverwaltung_betreuergruppen
                                    .readIntoFormFields(head(selectedRecord))

                                $("#betrGrpSuchenContainer").dialog("close")
                            })
                        }
                    })
                }

            const getBetrGrpRecord =
                () =>
                scpRechteverwaltung_betreuergruppen
                .queryBetreuerGruppeDataIDB(
                    Number(helper.fieldValue("betrGrpIdx"))
                )

            this.arrayBetrGrpManIDs =
                () =>
                getBetrGrpRecord()
                .then(betreuerGruppe => betreuerGruppe.mandantenIDs)
                .then(ids => ids.split(",").map(Number))


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