// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpSchichtdaten =
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

            // Append Schicht Html to div
            const addSchicht =
                elem =>
                (_, i) =>
                elem.append(schichtHtml(incr(i)))

            // Append n Schichten to Html
            this.generateSchichtBlocks =
                elem =>
                m =>
                array(m)()()
                .forEach(addSchicht(elem))

            // Checks if Ende offen is selected
            const isEndeOffen =
                () =>
                $(`#bisEndeOffenSchtDat`).prop("checked")

            // Enables the Gueltig Bis input
            const enableGueltigBis =
                () =>
                $(`#gueltigBisSchtDat`).prop("disabled", false)

            // Resets the Gueltig Bis input
            const resetGueltigBis =
                () =>
                $("#gueltigBisSchtDat").val("")

            // Disables the Gueltig Bis input
            const disableGueltigBis =
                () =>
                ( $(`#gueltigBisSchtDat`).prop("disabled", true)
                , resetGueltigBis()
                )

            // Checks if Gueltig Bis is set(not empty string)
            const isSetGueltigBis =
                () =>
                !emptyString($("#gueltigBisSchtDat").val())

            // Enables Anzahl input
            const enableAnzahl =
                () =>
                $("#anzahlSchtDat").prop("disabled", false)

            // Disables the Anzahl input
            const disableAnzahl =
                () =>
                $("#anzahlSchtDat").prop("disabled", true)

            // Enables/Disables the Gueltig Bis input depending
            // on the selection state of Ende offen
            this.endeOffenOrBis =
                () =>
                isEndeOffen() ?
                disableGueltigBis() :
                enableGueltigBis()

            // Sets the lower limit of the Gueltig bis date
            // as the Gueltig von date
            this.setMinGueltigBis =
                date =>
                $("#gueltigBisSchtDat")
                .prop("min", date)
                .val("")

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Returns a tuple of an elements id and its input value
            const tupleSchichtValue =
                a =>
                [a, getFieldValue(a)]

            // Returns an array of (id, value) pairs of a Schicht
            const getSchicht =
                (_, i) =>
                [ `bezeichnungScht${incr(i)}Dat`
                , `uhrzeitVonScht${incr(i)}Dat`
                , `uhrzeitBisScht${incr(i)}Dat`
                , `tagVonScht${incr(i)}Dat`
                , `tagBisScht${incr(i)}Dat`
                ].map(tupleSchichtValue)

            // Returns an array of arrays of (id, value) pairs
            const getSchichten =
                anzahl =>
                array(anzahl)()()
                .map(getSchicht)

            // Returns an object that contains the form data
            const getFormData =
                anzahl => (
                    { nameDB : getFieldValue("nameDB")
                    , modus : getFieldValue("schtMdlState")
                    , archived : isSetGueltigBis()
                    , schtMdlID : getFieldValue("schtMdlID")
                    , liegID : getFieldValue("liegID")
                    , modellBezSchtDat : getFieldValue("modellBezSchtDat")
                    , anzahlSchtDat : anzahl
                    , gueltigVonSchtDat : getFieldValue("gueltigVonSchtDat")
                    , gueltigBisSchtDat : getFieldValue("gueltigBisSchtDat")
                    , notizSchtDat : getFieldValue("notizSchtDat")
                    , schichten :
                        getSchichten(anzahl)
                        .map(a => a.map(last))
                        .map((a, i) => flatten([[incr(i)], a]))
                    }
                )

            // Returns an array depending on the Ende offen state
            const getBisFormData =
                () =>
                isEndeOffen() ?
                [] : singleton("gueltigBisSchtDat")

            // Returns form data of Schicht Modell (first section)
            const getGeneralFormData =
                formData =>
                flatten(
                    [ [ "modellBezSchtDat"
                      , "gueltigVonSchtDat"
                      ], getBisFormData()
                    ]

                )
                .map(field(formData))

            // Returns form data of Schichten
            const getShiftsFormData =
                formData =>
                formData.schichten

            // Checks if there are empty input values
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

            // Inserts data into a provided indexedDB store(table)
            const dataIntoIDB =
                data =>
                store =>
                ( idxDB[store].clear()
                , idxDB[store].bulkPut(data[store])
                )

            // Syncs the indexedDB with the sql srv DB
            this.populateIndexedDB =
                () =>
                ajaxPost("php/Schichtdaten/readSchichtdaten.php")({nameDB : $("#nameDB").val()})
                .then(
                    result => 
                    [ "schichtModelle"
                    , "schichten"
                    , "schichtModelleHist"
                    , "schichtenHist"
                    ].forEach(dataIntoIDB(result))   
                )

            // Dialog which asks the user if the Schichtmodell should
            // be closed and archived.
            const closeSchichtmodellDialog =
                formData =>
                $("#saveClosedSchichtDialog").dialog({
                    height: 223,
                    width: 568,
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
                        $("#saveClosedSchichtOk").off("click")
                        $("#saveClosedSchichtOk").on("click",
                            () =>
                            ( saveFormData(formData)
                            , $("#saveClosedSchichtDialog").dialog("close")
                            )
                        )

                        $("#saveClosedSchichtCancel").off("click")
                        $("#saveClosedSchichtCancel").on("click",
                            () =>
                            $("#saveClosedSchichtDialog").dialog("close")
                        )
                    }
                })

            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Schichtdaten/saveSchichtdaten.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.populateIndexedDB)
                .then(
                    () =>
                    equal($("#schtMdlState").val())("new") ?
                    this.readLast() :
                    !isEndeOffen() ?
                    this.readLast() :
                    false
                )
                .then(scpSchichtdaten_historie.readLast)

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
                        $("#saveSchichtOk").off("click")
                        $("#saveSchichtOk").on("click",
                            () =>
                            ( isSetGueltigBis() ?
                              closeSchichtmodellDialog(formData) :
                              saveFormData(formData)
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

            // Checks if all input elements are set and either shows the
            // dialog which asks if the record should be saved anyways
            // or if complete directly saves the record
            this.validateAndSaveFormData =
                () => {
                    const formData =
                        getFormData($("#anzahlSchtDat").val())

                    !completeFormData(formData) ?
                    nonCompleteDataDialog(formData) :
                    isSetGueltigBis() ?
                    closeSchichtmodellDialog(formData) :
                    saveFormData(formData)
                }

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            // Resets all of the first section input elements to an
            // empty string
            const clearGeneralFields =
                () =>
                [ "schtMdlID"
                , "modellBezSchtDat"
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

            // Sets the create new or update state for saving
            const setState =
                state =>
                state === "new" ?
                ( $("#schtMdlState").val(state)
                , enableAnzahl()
                , $(".schtDatForm")
                    .css("background", "antiquewhite")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) :
                ( $("#schtMdlState").val(state)
                , disableAnzahl()
                , $(".schtDatForm")
                    .css("background", "white")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                )

            // Resets all input elements to their initial empty state
            // and sets the save state to create new
            this.clearFields =
                () =>
                ( clearGeneralFields()
                , resetAnzahlAndEndeOffen()
                , setState("new")
                )

            // Returns an array of the Schicht Modelle from indexedDB
            const querySchichtModelleDataIDB =
                () => 
                idxDB.schichtModelle.toArray()

            // Returns a certain Schicht Modell depending on an index
            const querySchichtModellDataIDB =
                idx =>
                querySchichtModelleDataIDB()
                .then(schichtModelle => schichtModelle[idx])

            // Returns the Schichten of a given Schicht Modell
            const querySchichtenDataIDB =
                idx =>
                idxDB.schichten
                .where("schtMdl_ID")
                .equals(idx)
                .toArray()

            // Sets the input values of a given Schicht
            const setSchicht =
                (schicht, i) =>
                [ [`bezeichnungScht${incr(i)}Dat`, "bezeichnung"]
                , [`uhrzeitVonScht${incr(i)}Dat`, "uhrzeitVon"]
                , [`uhrzeitBisScht${incr(i)}Dat`, "uhrzeitBis"]
                , [`tagVonScht${incr(i)}Dat`, "tagVon"]
                , [`tagBisScht${incr(i)}Dat`, "tagBis"]
                ].forEach(a => $(`#${a[0]}`).val(schicht[a[1]]))

            // Sets the input values of all Schichten
            const setSchichten =
                schichten =>
                schichten.forEach(setSchicht)

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    querySchichtModellDataIDB(idx)
                    .then(
                        schichtModell => {

                            $("#schtMdlIdx").val(idx)
                            $("#schtMdlID").val(schichtModell.schtMdl_ID)
                            $("#modellBezSchtDat").val(schichtModell.modellBez)
                            $("#anzahlSchtDat").val(schichtModell.anzahl)
                            $("#anzahlSchtDat").trigger("change")
                            $("#gueltigVonSchtDat").val(schichtModell.gueltigVon)
                            $("#notizSchtDat").val(schichtModell.notiz)
                            $("#bisEndeOffenSchtDat").prop("checked", true)

                            this.endeOffenOrBis()

                            querySchichtenDataIDB(schichtModell.schtMdl_ID)
                            .then(setSchichten)

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
                greaterZero(getFieldValue("schtMdlIdx")) ?
                readIntoFormFields(decr(getFieldValue("schtMdlIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                idxDB.schichtModelle.count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("schtMdlIdx")) ?
                    readIntoFormFields(incr(getFieldValue("schtMdlIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                idxDB.schichtModelle.count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    ( this.clearFields()
                    , setState("new")
                    )
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteSchichtModell =
                () => {
                    const nameDB = $("#nameDB").val()
                    const schtMdlID = $("#schtMdlID").val()

                    ajaxPost("php/Schichtdaten/deleteSchichtdaten.php")({nameDB, schtMdlID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.populateIndexedDB().then(this.readLast)
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.modellBez
                    , a.anzahl
                    , a.gueltigVon
                    ]
                )

            // Fills the search dialog table with data
            const fillSchichtmodelleTbl =
                data => {
                    clearTable(tblSchichtmodellSuchen)
                    intoTable(tblSchichtmodellSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchSchichtModell =
                () => {

                    querySchichtModelleDataIDB()
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

                                readIntoFormFields(head(selectedRecord))

                                $("#schichtmodellSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )
