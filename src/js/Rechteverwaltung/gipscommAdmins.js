// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung_gipscommAdmins =
    freeze (
        new function () {

            const validateHash =
                input =>
                equal(getHash(input))

            const backToBetreuergruppenTab =
                () =>
                ( $("#tabGipscAdm").css("background-color", "#B9C0C7")
                , $("#infosGipscommAdmins").css("display", "none")
                , $("#activeInstance").val("gipscAdm")
                , $("#tabBetrGrp").trigger("click")
                )

            const enterGipscommAdminsTab =
                () => 
                ( $("#tabGipscAdm").css("background-color", "#CED6DE")
                , $("#infosGipscommAdmins").css("display", "block")
                , $("#activeInstance").val("gipscAdm")
                , this.readFirst()
                )

            const actionWrongPassword =
                () =>
                ( alert("Das Passwort ist falsch!")
                , backToBetreuergruppenTab()
                )

            const validatePasswordAndAct =
                result => 
                validateHash($("#pwGipscAdm").val())(head(result).pw) ?
                enterGipscommAdminsTab() :
                actionWrongPassword()

            const validatePassword =
                () =>
                ajaxPost("php/Rechteverwaltung/confirmPassword.php")()
                .then(validatePasswordAndAct)
                .then(() => $("#gipscAdmZugang").dialog("close"))

            const cancelAccess =
                () =>
                ( backToBetreuergruppenTab()
                , $("#gipscAdmZugang").dialog("close")
                )
                              
            this.confirmPassword =
                () => {
                        $("#gipscAdmZugang").dialog({
                            height: 180,
                            width: 250,
                            resize: "auto",
                            classes: {"ui-dialog-titlebar-close" : "closeButton"},
                            show: {
                                effect: "fade",
                                duration: 500
                            },
                            hide: {
                                effect: "fade",
                                duration: 500
                            },
                            modal: true,
                            open : () => {
                                $("#zugangOk").off("click")
                                $("#zugangOk").on("click", validatePassword)

                                $("#zugangAbbrechen").off("click")
                                $("#zugangAbbrechen").on("click", cancelAccess)

                                $(".closeButton").off("click")
                                $(".closeButton").on("click", cancelAccess)
                            }
                        })
                }

            this.updateIndexedDB =
                {}

            // Returns an input value depending on the elements id
            const getFieldValue =
                a =>
                $(`#${a}`).val()

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

            // Prepares the table data for the search dialog
            const prepareTableData =
                records =>
                records.map(
                    (a, i) =>
                    [ i
                    , a.modellBez
                    , a.anzahl
                    , a.gueltigVon
                    ]
                )

            // Fills the search dialog table with data
            const fillSchichtmodelleTbl =
                data => {
                    clearTable(tblSchichtmodellSuchen)
                    intoTable(tblSchichtmodellSuchen)(prepareTableData(data))
                }

            // Triggers opening the search dialog
            this.searchSchichtModell =
                () => {

                    querySchichtModelleDataIDB()
                    .then(sortByPrimKey)
                    .then(fillSchichtmodelleTbl)

                    $("#schichtmodellSuchenContainer").dialog({
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
                            $("#tblSchichtmodellSuchen tbody tr").css("cursor", "pointer");
                            $("#tblSchichtmodellSuchen tbody").off("dblclick", "tr");
                            $("#tblSchichtmodellSuchen tbody").on("dblclick", "tr",
                            function() {

                                const selectedRecord =
                                    tblSchichtmodellSuchen.row(this).data()

                                readIntoFormFields(head(selectedRecord))

                                $("#schichtmodellSuchenContainer").dialog("close")
                            })
                        }
                    })
                }
        }
    )