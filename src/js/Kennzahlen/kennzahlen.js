// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpKennzahlen_kennzahlen =
    freeze (
        new function () {

            this.delete =
                () => {
                    const nameDB   = helper.fieldValue("nameDB")
                    const knzInsID = helper.fieldValue("knzInsID")

                    ajaxPost("php/Kennzahlen/Kennzahlen/delete.php")({nameDB, knzInsID})
                    .then(
                        () => alert("erfolgreich gelöscht!") 
                    )
                    .then(readInstanzen("knzFirst", 0))
                }
        }
    )