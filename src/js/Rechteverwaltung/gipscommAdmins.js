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
        }
    )