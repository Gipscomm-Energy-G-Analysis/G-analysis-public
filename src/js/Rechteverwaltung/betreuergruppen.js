// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_betreuergruppen =
    freeze (
        new function () {

            this.updateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/readBetreuergruppen.php")({})
                .then(
                    result => 
                    scpIndexedDB.dataIntoIDB(result)("betreuerGruppen")   
                )

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

            // Returns an object that contains the form data
            const getFormData =
                () => (
                    { modus : getFieldValue("betrGrpState")
                    , betrGrpID : getFieldValue("betrGrpID")
                    , firma : getFieldValue("firmaBetrGrp")
                    , anzahlMitarbeiter : getFieldValue("anzahlMitarbeiterBetrGrp")
                    , anschrift : getFieldValue("anschriftBetrGrp")
                    , plz : getFieldValue("plzBetrGrp")
                    , ort : getFieldValue("ortBetrGrp")
                    , geschaeftsfuehrer : getFieldValue("geschaeftsfuehrerBetrGrp")
                    , telefon : getFieldValue("telefonBetrGrp")
                    , eMail : getFieldValue("emailBetrGrp")
                    , notiz : getFieldValue("notizBetrGrp")
                    }
                )

            // Checks if there are empty input values
            const completeFormData =
                formData => 
                [ "firma"
                , "anzahlMitarbeiter"
                , "anschrift"
                , "plz"
                , "ort"
                , "geschaeftsfuehrer"
                , "telefon"
                , "eMail"
                , "notiz"
                ]
                .map(field(formData))
                .every(a => !emptyString(a))
            
            // Inserts or updates the given record into the sql srv DB
            // and then updates the indexedDB
            const saveFormData =
                formData =>
                ajaxPost("php/Rechteverwaltung/saveBetreuergruppe.php")(formData)
                .then(result => alert(datensatzGespeichert(result)))
                .then(this.updateIndexedDB)
                .then(
                    () =>
                    equal($("#gipscAdmState").val())("new") ?
                    this.readLast() :
                    false
                )

            // Checks if all input elements are set and either shows the
            // dialog which asks if the record should be saved anyways
            // or if complete directly saves the record
            this.validateAndSaveFormData =
                    () => 
                    completeFormData() ?
                    saveFormData(getFormData()) :
                    alert("Benutzername oder Passwort wurden nicht definiert !")

            // Sets the create new or update state for saving
            const setState =
                state =>
                state === "new" ?
                ( $("#gipscAdmState").val(state)
                , $(".gipscAdmForm")
                    .css("background", "antiquewhite")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                ) :
                ( $("#schtMdlState").val(state)
                , $(".gipscAdmForm")
                    .css("background", "white")
                    .css("border", "1px solid black")
                    .css("padding", "1px")
                )

            // Resets the value of a given input to an empty string
            const clearField =
                field =>
                $(`#${field}`).val("")

            this.clearFields =
                () =>
                ( [ "benutzernameGipscAdm"
                  , "passwortGipscAdm"
                  ].forEach(clearField)
                , setState("new")
                )

            // Returns an array of the Schicht Modelle from indexedDB
            const queryGipscommAdminsDataIDB =
                () => 
                idxDB.gipscommAdmins
                .toArray()

            // Returns a certain Schicht Modell depending on an index
            const queryGipscommAdminDataIDB =
                idx =>
                queryGipscommAdminsDataIDB()
                .then(gipscommAdmins => gipscommAdmins[idx])

            // Sets the form data retrieved from indexedDB
            const readIntoFormFields =
                idx => {
                    queryGipscommAdminDataIDB(idx)
                    .then(
                        gipscommAdmin => {

                            $("#gipscAdmIdx").val(idx)
                            $("#gipscAdmID").val(gipscommAdmin.gipsAdm_ID)
                            $("#benutzernameGipscAdm").val(gipscommAdmin.username)
                            clearField("passwortGipscAdm")

                            setState("edit")
                        }
                    )
                }

            // Sets the form data input values of the first Schicht Modell
            this.readFirst =
                () =>
                idxDB.gipscommAdmins
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(0) :
                    this.clearFields()
                )
                
            // Sets the form data input values of the previous Schicht Modell
            // depending on the current records index
            this.readPrevious =
                () =>
                greaterZero(getFieldValue("gipscAdmIdx")) ?
                readIntoFormFields(decr(getFieldValue("gipscAdmIdx"))) :
                false

            // Sets the form data input values of the next Schicht Modell
            // depending on the current records index
            this.readNext =
                () =>
                idxDB.gipscommAdmins
                .count()
                .then( 
                    count => 
                    greater(decr(count))(getFieldValue("gipscAdmIdx")) ?
                    readIntoFormFields(incr(getFieldValue("gipscAdmIdx"))) :
                    false
                )

            // Sets the form data input values of the last Schicht Modell
            this.readLast =
                () =>
                idxDB.gipscommAdmins
                .count()
                .then(
                    count =>
                    greaterZero(count) ?
                    readIntoFormFields(decr(count)) :
                    false
                )

            // Deletes the current Schicht Modell(sets col deleted = true)
            this.deleteGipscommAdmin =
                () => {
                    const gipscAdmID = $("#gipscAdmID").val()

                    ajaxPost("php/Rechteverwaltung/deleteGipscommAdmin.php")({gipscAdmID})
                    .then(
                        () =>
                        ( alert("erfolgreich gelöscht!")
                        , this.updateIndexedDB().then(this.readFirst)
                        )
                    )
                }

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.username
                    ]
                )

            // Fills the search dialog table with data
            const fillGipscommAdminsTbl =
                data => {
                    clearTable(tblGipscAdmSuchen)
                    intoTable(tblGipscAdmSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchGipscommAdmin =
                () => {

                    queryGipscommAdminsDataIDB()
                    .then(fillGipscommAdminsTbl)

                    $("#gipscAdmSuchenContainer").dialog({
                        height: 450,
                        width: 875,
                        resize: "auto",
                        show: {
                            effect: "fade",
                            duration: 500
                        },
                        hide: {
                            effect: "fade",
                            duration: 500
                        },
                        modal: true,
                        open: function() {
                            $("#tblGipscAdmSuchen tbody tr").css("cursor", "pointer");
                            $("#tblGipscAdmSuchen tbody").off("dblclick", "tr");
                            $("#tblGipscAdmSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblGipscAdmSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#gipscAdmSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )