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
                .then(result => scpIndexedDB.dataIntoIDB(result)("mandanten")) 
                
            // Returns an array of the Schicht Modelle from indexedDB
            this.queryMandantenDataIDB =
                () => 
                idxDB.mandanten
                .toArray()

            const idExists =
                ids =>
                man =>
                ids.some(a => Number(a) === man.man_ID)

            const notIdExists =
                ids =>
                man =>
                ids.every(a => Number(a) !== man.man_ID)

            const filterForIds =
                fn =>
                ids =>
                mans =>
                mans.filter(fn(ids))

            this.queryMandantenWithIDs =
                ids =>
                this.queryMandantenDataIDB()
                .then(filterForIds(idExists)(ids))

            this.queryMandantenWithoutIDs =
                ids =>
                this.queryMandantenDataIDB()
                .then(filterForIds(notIdExists)(ids))
        }
    )