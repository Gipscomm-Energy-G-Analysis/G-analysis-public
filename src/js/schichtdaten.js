// Depends on fpCore.js
"use strict"

const scpSchichtdaten =
    freeze (
        new function () {
            this.nr =
                n =>
                `<div class="sectionHeader">
                    <label>Schicht ${n}</label>
                </div>`

            this.bezeichnung =
                n =>
                `<div class="controlDiv">
                   <label for="bezeichnungScht${n}Dat">Bezeichnung</label>
                   <input id="bezeichnungScht${n}Dat" type="text">
                </div>
                <br>\n`

            this.uhrzeitVon =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitVonScht${n}Dat">Uhrzeit Von</label>
                   <input id="uhrzeitVonScht${n}Dat" class="timeFrom" data-idx="${n}" type="time">
                </div>\n`

            this.uhrzeitBis =
                n =>
                `<div class="controlDiv">
                   <label for="uhrzeitBisScht${n}Dat">Uhrzeit Bis</label>
                   <input id="uhrzeitBisScht${n}Dat" type="time">
                </div>
                <br>\n`

            this.tagVon =
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

            this.tagBis =
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

            this.schichtHtml =
                n =>
                [ this.nr
                , this.bezeichnung
                , this.uhrzeitVon
                , this.uhrzeitBis
                , this.tagVon
                , this.tagBis
                ]
                .map(a => a(n))
                .join("")

            this.addSchicht =
                elem =>
                n =>
                elem.append(this.schichtHtml(n))

            this.generateSchichtBlocks =
                elem =>
                m =>
                array(m)()()
                .forEach((_, i) => this.addSchicht(elem)(incr(i)))

            this.isEndeOffen =
                () =>
                $(`#bisEndeOffenSchtDat`).prop("checked")

            this.enableGueltigBis =
                () =>
                $(`#gueltigBisSchtDat`).prop("disabled", false)

            this.resetGueltigBis =
                () =>
                $("#gueltigBisSchtDat").val("")

            this.disableGueltigBis =
                () =>
                ( $(`#gueltigBisSchtDat`).prop("disabled", true)
                , this.resetGueltigBis()
                )

            this.endeOffenOrBis =
                () =>
                this.isEndeOffen() ?
                this.disableGueltigBis() :
                this.enableGueltigBis()

            this.setMinGueltigBis =
                date =>
                $("#gueltigBisSchtDat")
                .prop("min", date)
                .val("")

            this.tupleSchichtValue =
                a =>
                [a, $(`#${a}`).val()]

            this.getSchicht =
                (_, i) =>
                [ `bezeichnungScht${incr(i)}Dat`
                , `uhrzeitVonScht${incr(i)}Dat`
                , `uhrzeitBisScht${incr(i)}Dat`
                , `tagVonScht${incr(i)}Dat`
                , `tagBisScht${incr(i)}Dat`
                ].map(this.tupleSchichtValue)

            this.getSchichten =
                anzahl =>
                array(anzahl)()()
                .map(this.getSchicht)

            this.getFormData =
                () => {
                    const anzahl = $("#anzahlSchtDat").val()
                    const data =
                        { modellBezSchtDat : $("#modellBezSchtDat").val()
                        , anzahlSchtDat : anzahl
                        , gueltigVonSchtDat : $("#gueltigVonSchtDat").val()
                        , gueltigBisSchtDat : $("#gueltigBisSchtDat").val()
                        , bisEndeOffenSchtDat : $("#bisEndeOffenSchtDat").prop("checked")
                        , schichten : this.getSchichten(anzahl)
                        }
                    return data
                }
        }
    )
