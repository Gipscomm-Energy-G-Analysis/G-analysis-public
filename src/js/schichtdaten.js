// Depends on fpCore.js
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

            const getFormData =
                anzahl => (
                    { modellBezSchtDat : $("#modellBezSchtDat").val()
                    , anzahlSchtDat : anzahl
                    , gueltigVonSchtDat : $("#gueltigVonSchtDat").val()
                    , gueltigBisSchtDat : $("#gueltigBisSchtDat").val()
                    , bisEndeOffenSchtDat : $("#bisEndeOffenSchtDat").prop("checked")
                    , schichten : getSchichten(anzahl)
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
                .map(a => a.map(last))

            this.validFormData =
                () => {
                    const formData =
                        getFormData(getFieldValue("anzahlSchtDat"))

                    const retVal =
                        flatten(
                            [ ...getGeneralFormData(formData)
                            , ...getShiftsFormData(formData)
                            ]
                        )
                        .some(emptyString)

                    return !retVal
                }
        }
    )
