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
            this.zeitVon =
                n =>
                `<div class="controlDiv">
                   <label for="zeitVonScht${n}Dat">Uhrzeit Von</label>
                   <input id="zeitVonScht${n}Dat" type="time">
                </div>\n`
            this.zeitBis =
                n =>
                `<div class="controlDiv">
                   <label for="zeitBisScht${n}Dat">Uhrzeit Bis</label>
                   <input id="zeitBisScht${n}Dat" type="time">
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
            this.gueltigVon =
                n =>
                `<div class="controlDiv">
                   <label for="gueltigVonScht${n}Dat">Gültig Von</label>
                   <input id="gueltigVonScht${n}Dat" type="date">
                </div>\n`
            this.gueltigBis =
                n =>
                `<div class="controlDiv">
                   <label for="gueltigBisScht${n}Dat">Gültig Bis</label>
                   <input id="gueltigBisScht${n}Dat" type="date" disabled>
                </div>\n`
            this.endeOffen =
                n =>
                `<div class="controlDiv">
                   <label for="bisEndeOffenScht${n}Dat">Ende offen</label>
                   <input id="bisEndeOffenScht${n}Dat" class="openEnd" data-idx="${n}" type="checkbox" checked>
                </div>
                <br>
                <br>\n`
            this.schichtHtml =
                n =>
                [ this.nr
                , this.bezeichnung
                , this.zeitVon
                , this.zeitBis
                , this.tagVon
                , this.tagBis
                , this.gueltigVon
                , this.gueltigBis
                , this.endeOffen
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
                n =>
                $(`#bisEndeOffenScht${n}Dat`).prop("checked")
            this.enableGueltigBis =
                n =>
                $(`#gueltigBisScht${n}Dat`).prop("disabled", false)
            this.disableGueltigBis =
                n =>
                $(`#gueltigBisScht${n}Dat`).prop("disabled", true)
            this.endeOffenOrBis =
                n =>
                this.isEndeOffen(n) ?
                this.disableGueltigBis(n) :
                this.enableGueltigBis(n)
        }
    )
