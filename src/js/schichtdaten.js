// Depends on fpCore.js
"use strict"

const scpSchichtdaten =
    freeze (
        new function () {
            this.schichtHtml =
                n =>
                `<div class="sectionHeader">
                    <label>Schicht ${n}</label>
                </div>
                <div class="controlDiv">
                   <label for="bezeichnungScht${n}Dat">Bezeichnung</label>
                   <input id="bezeichnungScht${n}Dat" type="text">
                </div>
                <br>
                <div class="controlDiv">
                   <label for="zeitVonScht${n}Dat">Uhrzeit Von</label>
                   <input id="zeitVonScht${n}Dat" type="time">
                </div>
                <div class="controlDiv">
                   <label for="zeitBisScht${n}Dat">Uhrzeit Bis</label>
                   <input id="zeitBisSchtDat" type="time">
                </div>
                <br>
                <div class="controlDiv">
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
                </div>
                <div class="controlDiv">
                   <label for="tagBisScht${n}Dat">Tag Bis</label>
                   <select id="tagBisScht${n}Dat">
                       <option value="monday">Montag</option>
                       <option value="tuesday">Dienstag</option>
                       <option value="wednesday">Mittwoch</option>
                       <option value="thursday">Donnerstag</option>
                       <option value="friday">Freitag</option>
                       <option value="saturday">Samstag</option>
                       <option value="sunday">Sonntag</option>
                   </select>
                </div>
                <br>
                <br>`
        }
    )
