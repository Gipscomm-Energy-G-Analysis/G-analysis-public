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

            const getManIDs =
                () =>
                array($("#tblMandantengruppe tbody tr").length)()()
                .map((_, i) => tblMandantengruppe.cell(i, 0).data())
                .join(",")

            const arraySelectedManIDs = 
                () =>
                array($("#tblMandantengruppe tbody tr").length)()()
                .map((_, i) => tblMandantengruppe.cell(i, 0).data())

            const getFormData =
                () => (
                    { modus        : helper.fieldValue("manGrpState")
                    , manGrpIdx    : helper.fieldValue("manGrpIdx")
                    , manGrpID     : helper.fieldValue("manGrpID")
                    , betrGrpID    : helper.fieldValue("betrGrpID")
                    , name         : helper.fieldValue("nameManGrp")
                    , kurz         : helper.fieldValue("kurzManGrp")
                    , notiz        : helper.fieldValue("notizManGrp")
                    , mandantenIDs : getManIDs()
                    }
                )

            const completeFormData =
                formData => 
                [ "name"
                , "kurz"
                , "mandantenIDs"
                ]
                .map(field(formData))
                .every(a => !emptyString(a))
            
            const save =
                formData =>
                ajaxPost("php/Rechteverwaltung/Mandantengruppen/save.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(() => $(".dataBetrGrpAdm").trigger("change"))
                .then(
                    () =>
                    equal($("#betrGrpState").val())("new") ?
                    this.readLast() :
                    false
                )

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
                            ( save(formData)
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

            this.validateAndSave =
                    () => {
                        const formData =
                            getFormData()

                        !completeFormData(formData) ?
                        nonCompleteDataDialog(formData) :
                        save(formData) 
                    }

            this.clearFields =
                () =>
                ( [ "nameManGrp"
                  , "kurzManGrp"
                  ]    
                  .forEach(helper.clearField)
                , clearTable(tblMandantengruppe)
                , helper.setState("manGrp")("new")
                )

            const getBetrGrpRefRecords =
                () =>   
                idxDB.mandantenGruppen   
                .where("betrGrp_ID")    
                .equals(`${Number(helper.fieldValue("betrGrpID"))}`) 

            this.queryMandantengruppenDataIDB =
                () => 
                getBetrGrpRefRecords()
                .toArray()

            const queryMandantenGruppeDataIDB =
                idx =>
                this.queryMandantengruppenDataIDB()
                .then(records => records[idx])

            const prepareDataMan =
                records =>
                records.map(
                    a =>
                    [ a.man_ID
                    , a.nameMan
                    , a.dbName
                    ]
                )

            const fillMandantenTbl =
                tbl =>
                data => {
                    clearTable(tbl)
                    intoTable(tbl)(prepareDataMan(data))
                }

            const readIntoMandantenTable =
                mandantenGruppe =>
                scpUnternehmensstruktur_mandanten
                .queryMandantenWithIDs(mandantenGruppe.mandantenIDs.split(","))
                .then(fillMandantenTbl(tblMandantengruppe))

            this.removeFromMandantenTbl =
                that =>
                tblMandantengruppe.row(that).remove().draw()

            const readIntoFormFields =
                idx => {
                    queryMandantenGruppeDataIDB(idx)
                    .then(
                        record => {

                            $("#manGrpIdx").val(idx)
                            $("#manGrpID").val(record.manGrp_ID)
                            $("#nameManGrp").val(record.name)
                            $("#kurzManGrp").val(record.kurz)
                            $("#notizManGrp").val(record.notiz)

                            readIntoMandantenTable(record)

                            helper.setState("manGrp")("edit")
                        }
                    )
                }

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
                
            this.readPrevious =
                () =>
                greaterZero(helper.fieldValue("manGrpIdx")) ?
                readIntoFormFields(decr(helper.fieldValue("manGrpIdx"))) :
                false

            this.readNext =
                () =>
                getBetrGrpRefRecords()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(helper.fieldValue("manGrpIdx")) ?
                    readIntoFormFields(incr(helper.fieldValue("manGrpIdx"))) :
                    false
                )

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

            this.delete =
                () => {
                    const manGrpID = $("#manGrpID").val()

                    ajaxPost("php/Rechteverwaltung/Mandantengruppen/delete.php")({manGrpID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB().then(this.readFirst)
                        )
                    )
                }

            const prepareData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.name
                    , a.kurz
                    ]
                )

            const fillTbl =
                data => {
                    clearTable(tblManGrpSuchen)
                    intoTable(tblManGrpSuchen)(prepareData(data))
                }

            this.search =
                () => {

                    this.queryMandantengruppenDataIDB()
                    .then(fillTbl)

                    $("#manGrpSuchenContainer").dialog({
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
                            $("#tblManGrpSuchen tbody tr").css("cursor", "pointer");
                            $("#tblManGrpSuchen tbody").off("dblclick", "tr");
                            $("#tblManGrpSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblManGrpSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#manGrpSuchenContainer").dialog("close")
                            })
                        }
                    })
                }

            const notSelected =
                selectedManIDs =>
                id =>
                !selectedManIDs.some(equal(id))
            
            const filterManIDs =
                selectedManIDs =>
                betrGrpManIDs =>
                betrGrpManIDs
                .filter(notSelected(selectedManIDs))
                
            this.showMandantenTablePopUp =
                async () => {

                    const betrGrpManIDs = await scpRechteverwaltung_betreuergruppen.arrayBetrGrpManIDs()
                    const selectedManIDs = arraySelectedManIDs()
                    const filteredManIDs = filterManIDs(selectedManIDs)(betrGrpManIDs)      

                    scpUnternehmensstruktur_mandanten
                    .queryMandantenWithIDs(filteredManIDs)
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
                            tblMandantengruppe.row.add([a[0], a[1], a[2]]).draw();
                            tblMandantengruppe.column(0).visible(!1).draw();
                            $("#mandantenlisteAuswahlContainer").dialog("close")
                        })
                    }
                })
            }
            this.changeManManGrp = 
                () =>  {
                    const manManGrp = $(".manGrpPfad").val()

                    switch (head(manManGrp.split("-"))) {
                        case "manGrp_ID":
                            $("#abManGrpID").val(manManGrp.split("-")[1])
                            $("#abManID").val(0)
                            break;
                        case "man_ID":
                            $("#abManID").val(manManGrp.split("-")[1])
                            $("#abManGrpID").val(0)
                            break;
                    }
                }
        }
    )