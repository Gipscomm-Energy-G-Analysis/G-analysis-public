// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpUnternehmensstruktur_mandanten =
    freeze (
        new function () {

            // Syncs the indexedDB with the sql srv DB
            this.populateIndexedDB =
                () =>
                ajaxPost("php/Unternehmensstruktur/readMandanten.php")({})
                .then(flip(scpIndexedDB.dataIntoIDB)("mandanten"))              
        }
    )