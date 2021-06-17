// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpSchichtdaten_historie =
    freeze (
        new function () {
            // Schicht Html
            const nr =
                n =>
                `<div class="sectionHeader">
                    <label>Schicht ${n}</label>
                </div>`

            const bezeichnung =
                n =>
                `<div class="controlDiv">
                   <label for="bezeichnungScht${n}DatHist">Bezeichnung</label>
                   <input id="bezeichnungScht${n}DatHist" type="text">
                </div>
                <br>\n`

            const uhrzeitVon =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitVonScht${n}DatHist">Uhrzeit Von</label>
                   <input id="uhrzeitVonScht${n}DatHist" class="timeFrom" data-idx="${n}" type="time">
                </div>\n`

            const uhrzeitBis =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitBisScht${n}DatHist">Uhrzeit Bis</label>
                   <input id="uhrzeitBisScht${n}DatHist" type="time">
                </div>
                <br>\n`

            const tagVon =
                n =>
                `<div class="controlDiv">
                   <label for="tagVonScht${n}DatHist">Tag Von</label>
                   <select id="tagVonScht${n}DatHist">
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
                   <label for="tagBisScht${n}DatHist">Tag Bis</label>
                   <select id="tagBisScht${n}DatHist">
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

            const schichtHistHtml =
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

            // Append Schicht Html to div
            const addSchichtHist =
                elem =>
                (_, i) =>
                elem.append(schichtHistHtml(incr(i)))

            // Append n Schichten to Html
            this.generateSchichtHistBlocks =
                elem =>
                m =>
                array(m)()()
                .forEach(addSchichtHist(elem))

             // Returns an input value depending on the elements id
             const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            // Resets all of the first section input elements to an
            // empty string
            const clearGeneralFields =
                () =>
                [ "schtMdlHistID"
                , "modellBezSchtDatHist"
                , "gueltigVonSchtDatHist"
                , "notizSchtDatHist"
                ].forEach(clearField)

            // anzahlSchtDat change resets Schichten
            const resetAnzahl =
                () =>
                ( $("#anzahlSchtDatHist").val(3)
                , $("#anzahlSchtDatHist").trigger("change")
                )
                
            // Resets all input elements to their initial empty state
            // and sets the save state to create new
            this.clearFields =
                () =>
                ( clearGeneralFields()
                , resetAnzahl()
                )

            // Filters by Liegenschaften refs
            const getLiegRefRecords =
                () =>
                idxDB.schichtModelleHist
                .where("lieg_ID")
                .equals(Number(getFieldValue("liegID")))
                .or("liegRef")
                .equals(0)

            // Sorts records by primary key
            const sortByPrimKey =
                lst =>
                lst.sort(
                    (a, b) =>
                    a.schtMdl_ID - b.schtMdl_ID
                )


            // Returns an array of the Schicht Modelle from indexedDB
            const querySchichtModelleHistDataIDB =
                () =>
                getLiegRefRecords()
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const querySchichtModellHistDataIDB =
                idx =>
                querySchichtModelleHistDataIDB()
                .then(sortByPrimKey)
                .then(schichtModelleHist => schichtModelleHist[idx])

            // Returns the Schichten of a given Schicht Modell
            const querySchichtenHistDataIDB =
                idx =>
                idxDB.schichtenHist
                .where("schtMdl_ID")
                .equals(idx)
                .toArray()

            // Sets the input values of a given Schicht
            const setSchichtHist =
                (schichtHist, i) =>
                [ [`bezeichnungScht${incr(i)}DatHist`, "bezeichnung"]
                , [`uhrzeitVonScht${incr(i)}DatHist`, "uhrzeitVon"]
                , [`uhrzeitBisScht${incr(i)}DatHist`, "uhrzeitBis"]
                , [`tagVonScht${incr(i)}DatHist`, "tagVon"]
                , [`tagBisScht${incr(i)}DatHist`, "tagBis"]
                ].forEach(a => $(`#${a[0]}`).val(schichtHist[a[1]]))

            // Sets the input values of all Schichten
            const setSchichtenHist =
                schichtenHist =>
                schichtenHist.forEach(setSchichtHist)

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    querySchichtModellHistDataIDB(idx)
                    .then(
                        schichtModellHist => {

                            $("#schtMdlHistIdx").val(idx)
                            $("#schtMdlHistID").val(schichtModellHist.schtMdl_ID)
                            $("#modellBezSchtDatHist").val(schichtModellHist.modellBez)
                            $("#anzahlSchtDatHist").val(schichtModellHist.anzahl)
                            $("#anzahlSchtDatHist").trigger("change")
                            $("#gueltigVonSchtDatHist").val(schichtModellHist.gueltigVon)
                            $("#gueltigBisSchtDatHist").val(schichtModellHist.gueltigBis)
                            $("#notizSchtDatHist").val(schichtModellHist.notiz)
                            $("#liegSchtDatHist").prop("checked", schichtModellHist.liegRef)

                            querySchichtenHistDataIDB(schichtModellHist.schtMdl_ID)
                            .then(setSchichtenHist)
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
                greaterZero(getFieldValue("schtMdlHistIdx")) ?
                readIntoFormFields(decr(getFieldValue("schtMdlHistIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                getLiegRefRecords()
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("schtMdlHistIdx")) ?
                    readIntoFormFields(incr(getFieldValue("schtMdlHistIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                getLiegRefRecords()
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    this.clearFields()
                )

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.modellBez
                    , a.anzahl
                    , a.gueltigVon
                    , a.gueltigBis
                    ]
                )

            // Fills the search dialog table with data
            const fillSchichtmodelleHistTbl =
                data => {
                    clearTable(tblSchichtmodellHistSuchen)
                    intoTable(tblSchichtmodellHistSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchSchichtModellHist =
                () => {

                    querySchichtModelleHistDataIDB()
                    .then(sortByPrimKey)
                    .then(fillSchichtmodelleHistTbl)

                    $("#schichtmodellHistSuchenContainer").dialog({
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
                            $("#tblSchichtmodellHistSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSchichtmodellHistSuchen tbody").off("dblclick", "tr");
                            $("#tblSchichtmodellHistSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSchichtmodellHistSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#schichtmodellHistSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )
    