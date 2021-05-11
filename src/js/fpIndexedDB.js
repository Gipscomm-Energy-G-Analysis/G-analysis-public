// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
"use strict"

const scpIndexedDB =
    freeze (
        new function () {

            const storesExist =
                storesDef =>
                Object.keys(storesDef)
                .every((a, i) => a === idxDB.tables.map(b => b.name)[i])

            const getVersion =
                () =>
                idxDB._versions.length

            this.populateIndexedDB =
                storesDef =>
                store =>
                data => {

                    if (storesExist(storesDef)) {

                        // Iterate db version
                        idxDB.close()
                        idxDB.version(incr(getVersion()))
                        idxDB.open()

                        idxDB[store].bulkPut(data)
                    }
                    else {

                        idxDB.version(1).stores(storesDef)
                        idxDB[store].bulkPut(data)
                    }
                }
        }
    )
