// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
"use strict"

const scpIndexedDB =
    freeze (
        new function () {

            this.populateIndexedDB =
                version =>
                storesDef =>
                store =>
                data => {

                    idxDB.version(version).stores(storesDef)

                    idxDB[store].bulkAdd(data)
                }
        }
    )
