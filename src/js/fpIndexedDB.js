// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
"use strict"

const scpIndexedDB =
    freeze (
        new function () {

            const request =
                name =>
                version =>
                indexedDB.open(name, version)

            this.createDB =
                name =>
                version => {

                    const db = new Dexie(name)

                    db.version(version).stores(

                    )

                    db.schichtModell.put(
                        { schtMdl_ID : 1
                        , lieg_ID : 2
                        , modellBez : "TestModell"
                        , anzahl : 4
                        , gueltigVon : "2021-05-05"
                        , gueltigBis : "2021-05-27"
                        , bisEndeOffen : false
                        , notiz : "Test Notiz"
                        }
                    )
                }

            this.addStore =
                db =>
                db.stores

            this.addRecord =
                db =>
                store =>
                db.[`${store}`].put

            this.addSchichtModellRecord =
                addStore(this.createDB("Test")(1))(
                    { schichtModell : "schtMdl_ID, lieg_ID, modellBez, anzahl, gueltigVon, gueltigBis, bisEndeOffen, notiz"
                    , schichten : "schtDat_ID, schtMdl_ID, nr, bezeichnung, uhrzeitVon, uhrzeitBis, tagVon, tagBis"
                    }
                )

        }
    )
