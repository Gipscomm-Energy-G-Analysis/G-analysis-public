// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpSchichtdaten =
    freeze (
        new function () {
            const nr =
                n =>
                `<div class="sectionHeader">
                    <label>Schicht ${n}</label>
                </div>`

            const bezeichnung =
                n =>
                `<div class="controlDiv">
                   <label for="bezeichnungScht${n}Dat">Bezeichnung</label>
                   <input id="bezeichnungScht${n}Dat" type="text">
                </div>
                <br>\n`

            const uhrzeitVon =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitVonScht${n}Dat">Uhrzeit Von</label>
                   <input id="uhrzeitVonScht${n}Dat" class="timeFrom" data-idx="${n}" type="time">
                </div>\n`

            const uhrzeitBis =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitBisScht${n}Dat">Uhrzeit Bis</label>
                   <input id="uhrzeitBisScht${n}Dat" type="time">
                </div>
                <br>\n`

            const tagVon =
                n =>
                `<div class="controlDiv">
                   <label for="tagVonScht${n}Dat">Tag Von</label>
                   <select id="tagVonScht${n}Dat">
                       <option value="monday">Montag</option>
                       <option value="tuesday">Dienstag</option>
                       <option value="wednesday">Mittwoch</option>
                       <option value="thursday">Donnerstag</option>
                       <option value="friday">Freitag</option>
                       <option value="saturday">Samstag</option>
                       <option value="sunday">Sonntag</option>
                   </select>
                </div>\n`

            const tagBis =
                n =>
                `<div class="controlDiv">
                   <label for="tagBisScht${n}Dat">Tag Bis</label>
                   <select id="tagBisScht${n}Dat">
                       <option value="monday">Montag</option>
                       <option value="tuesday">Dienstag</option>
                       <option value="wednesday">Mittwoch</option>
                       <option value="thursday">Donnerstag</option>
                       <option value="friday" selected>Freitag</option>
                       <option value="saturday">Samstag</option>
                       <option value="sunday">Sonntag</option>
                   </select>
                </div>
                <br>\n`

            const schichtHtml =
                n =>
                [ nr
                , bezeichnung
                , uhrzeitVon
                , uhrzeitBis
                , tagVon
                , tagBis
                ]
                .map(applyRv(n))
                .join("")

            const addSchicht =
                elem =>
                (_, i) =>
                elem.append(schichtHtml(incr(i)))

            this.generateSchichtBlocks =
                elem =>
                m =>
                array(m)()()
                .forEach(addSchicht(elem))

            const isEndeOffen =
                () =>
                $(`#bisEndeOffenSchtDat`).prop("checked")

            const enableGueltigBis =
                () =>
                $(`#gueltigBisSchtDat`).prop("disabled", false)

            const resetGueltigBis =
                () =>
                $("#gueltigBisSchtDat").val("")

            const disableGueltigBis =
                () =>
                ( $(`#gueltigBisSchtDat`).prop("disabled", true)
                , resetGueltigBis()
                )

            this.endeOffenOrBis =
                () =>
                isEndeOffen() ?
                disableGueltigBis() :
                enableGueltigBis()

            this.setMinGueltigBis =
                date =>
                $("#gueltigBisSchtDat")
                .prop("min", date)
                .val("")

            const getFieldValue =
                a =>
                $(`#${a}`).val()

            const tupleSchichtValue =
                a =>
                [a, getFieldValue(a)]

            const getSchicht =
                (_, i) =>
                [ `bezeichnungScht${incr(i)}Dat`
                , `uhrzeitVonScht${incr(i)}Dat`
                , `uhrzeitBisScht${incr(i)}Dat`
                , `tagVonScht${incr(i)}Dat`
                , `tagBisScht${incr(i)}Dat`
                ].map(tupleSchichtValue)

            const getSchichten =
                anzahl =>
                array(anzahl)()()
                .map(getSchicht)

            // Returns an object that contains the form data
            this.getFormData =
                anzahl => (
                    { id :"schtDat"
                    , nameDB : getFieldValue("nameDB")
                    , modus : savedNew ? "new" : "save"
                    , schtMdlID : getFieldValue("schtMdlID")
                    , liegID : getFieldValue("liegID")
                    , modellBezSchtDat : getFieldValue("modellBezSchtDat")
                    , anzahlSchtDat : anzahl
                    , gueltigVonSchtDat : getFieldValue("gueltigVonSchtDat")
                    , gueltigBisSchtDat : getFieldValue("gueltigBisSchtDat")
                    , bisEndeOffenSchtDat : $("#bisEndeOffenSchtDat").prop("checked")
                    , notizSchtDat : getFieldValue("notizSchtDat")
                    , schichten :
                        getSchichten(anzahl)
                        .map(a => a.map(last))
                        .map((a, i) => flatten([[incr(i)], a]))
                    }
                )

            const getBisFormData =
                () =>
                $("#bisEndeOffenSchtDat").prop("checked") ?
                [] : singleton("gueltigBisSchtDat")

            const getGeneralFormData =
                formData =>
                flatten(
                    [ [ "modellBezSchtDat"
                      , "gueltigVonSchtDat"
                      ], getBisFormData()
                    ]

                )
                .map(field(formData))

            const getShiftsFormData =
                formData =>
                formData.schichten

            const completeFormData =
                formData => {

                    const retVal =
                        flatten(
                            [ ...getGeneralFormData(formData)
                            , ...getShiftsFormData(formData)
                            ]
                        )
                        .some(emptyString)

                    return !retVal
                }

            const saveFormData =
                formData =>
                ajaxPost("php/instanzIntoDB.php")(formData)
                .then(console.log)
                // .then(result => alert(datensatzGespeichert(result)))

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
                        $("#saveSchichtOk").off("click")
                        $("#saveSchichtOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveSchichtDialog").dialog("close")
                            )
                        )

                        $("#saveSchichtCancel").off("click")
                        $("#saveSchichtCancel").on("click",
                            () =>
                            $("#saveSchichtDialog").dialog("close")
                        )
                    }
                })

            this.validateFormData =
                formData =>
                !completeFormData(formData) ?
                nonCompleteDataDialog(formData) :
                saveFormData(formData)

            const clearField =
                field =>
                $(`#${field}`).val("")

            const clearGeneralFields =
                () =>
                [ "modellBezSchtDat"
                , "gueltigVonSchtDat"
                , "notizSchtDat"
                ].forEach(clearField)

            // anzahlSchtDat change resets Schichten
            const resetAnzahlAndEndeOffen =
                () =>
                ( $("#anzahlSchtDat").val(3)
                , $("#anzahlSchtDat").trigger("change")
                , $("#bisEndeOffenSchtDat").trigger("click")
                )

            this.clearFields =
                () =>
                ( clearGeneralFields()
                , resetAnzahlAndEndeOffen()
                )

            const dataIntoIDB =
                store =>
                data =>
                ( idxDB[store].clear()
                , idxDB[store].bulkPut(data[store])
                )

            this.populateIndexedDB =
                () =>
                ajaxPost("php/readSchichtdaten.php")({nameDB : $("#nameDB").val()})
                .then(
                    result => {
                        dataIntoIDB("schichtModelle")(result)
                        dataIntoIDB("schichten")(result)
                    }
                )

            const querySchichtModellDataIDB =
                idx =>
                idxDB.schichtModelle.get(idx)

            const querySchichtenDataIDB =
                idx =>
                idxDB.schichten
                .where("schtMdl_ID")
                .equals(idx)
                .toArray()

            const setSchicht =
                (schicht, i) =>
                [ [`bezeichnungScht${incr(i)}Dat`, "bezeichnung"]
                , [`uhrzeitVonScht${incr(i)}Dat`, "uhrzeitVon"]
                , [`uhrzeitBisScht${incr(i)}Dat`, "uhrzeitBis"]
                , [`tagVonScht${incr(i)}Dat`, "tagVon"]
                , [`tagBisScht${incr(i)}Dat`, "tagBis"]
                ].forEach(a => $(`#${a[0]}`).val(schicht[a[1]]))

            const setSchichten =
                schichten =>
                schichten.forEach(setSchicht)

            this.readIntoFormFields =
                idx => {
                    querySchichtModellDataIDB(idx)
                    .then(
                        schichtModell => {

                            $("#schtMdlID").val(schichtModell.schtMdl_ID)
                            $("#modellBezSchtDat").val(schichtModell.modellBez)
                            $("#anzahlSchtDat").val(schichtModell.anzahl)
                            $("#anzahlSchtDat").trigger("change")
                            $("#gueltigVonSchtDat").val(schichtModell.gueltigVon)
                            $("#gueltigBisSchtDat").val(schichtModell.gueltigBis)
                            $("#bisEndeOffenSchtDat").prop("checked", schichtModell.bisEndeOffen)
                            $("#notizSchtDat").val(schichtModell.notiz)

                            this.endeOffenOrBis()

                            querySchichtenDataIDB(idx)
                            .then(setSchichten)
                        }
                    )
                }

            this.deleteSchichtModell =
                () => {
                    const nameDB = $("#nameDB").val()
                    const schtMdlID = $("#schtMdlID").val()

                    ajaxPost("php/deleteSchichtdaten.php")({nameDB, schtMdlID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.populateIndexedDB()
                        )
                    )
                }

            const querySchichtModelleDataIDB =
                () =>
                idxDB.schichtModelle.toArray()

            const prepareTableData =
                records =>
                records.map(
                    a =>
                    [ a.schtMdl_ID
                    , a.modellBez
                    , a.anzahl
                    , a.gueltigVon
                    , a.gueltigBis
                    , a.bisEndeOffen
                    ]
                )

            const fillSchichtmodelleTbl =
                data => {
                    clearTable(tblSchichtmodellSuchen)
                    intoTable(tblSchichtmodellSuchen)(prepareTableData(data))
                }

            this.searchSchichtModell =
                () => {

                    idxDB.schichtModelle.toArray()
                    .then(fillSchichtmodelleTbl)

                    $("#schichtmodellSuchenContainer").dialog({
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
                            $("#tblSchichtmodellSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSchichtmodellSuchen tbody").off("dblclick", "tr");
                            $("#tblSchichtmodellSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSchichtmodellSuchen.row(this).data()

                                scpSchichtdaten.readIntoFormFields(head(selectedRecord))

                                $("#schichtmodellSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )
