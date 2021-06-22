// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpIndexedDB =
    freeze (
        new function () {

            // Inserts data into a provided indexedDB store(table)
            this.dataIntoIDB =
                data =>
                store =>
                ( idxDB[store].clear()
                , idxDB[store].bulkPut(data[store])
                )

            // Syncs the indexedDB with the sql srv DB
            this.populateIndexedDB =
                () =>
                ajaxPost("php/populateIndexedDB.php")({nameDB : $("#nameDB").val()})
                .then(
                    result => 
                    [ "schichtModelle"
                    , "schichten"
                    , "schichtModelleHist"
                    , "schichtenHist"
                    ].forEach(this.dataIntoIDB(result))   
                )
        }
    )