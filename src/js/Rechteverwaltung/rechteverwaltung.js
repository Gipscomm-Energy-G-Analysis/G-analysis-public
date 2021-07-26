// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung =
    freeze (
        new function () {

            this.populateIndexedDB =
                () =>
                ajaxPost("php/Rechteverwaltung/readRechteverwaltung.php")({})
                .then(
                    result => 
                    [ "gipscommAdmins"
                    , "betreuerGruppen"
                    , "superAdmins"
                    , "mandantenGruppen"
                    , "admins"
                    , "benutzer"
                    ].forEach(scpIndexedDB.dataIntoIDB(result))   
                )

            const hideElement =
                element =>
                $(element).css("display", "none")

            const hideTabsAndMenus =
                position => {
                    switch (position) {

                        case "gipsAdm":
                            break;

                        case "sAdm":
                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            ].forEach(hideElement)
                            break;

                        case "adm":
                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            , "#manGrpMenu"
                            , "#tabManGrp"
                            , "#admMenu"
                            , "#tabAdm"
                            ].forEach(hideElement)
                            break;
                            
                        case "ben":
                            hideElement("#rechtMenuLi")
                            break;
                    
                        default:
                            console.log("Rechteverwaltung -> rechteverwaltung.js -> hideTabsAndMenus : case " + position + " is not covered !")
                            break;
                    }
                }

            const readInMandantenArgs =
                position =>
                equal(position)("sAdm") ?
                [$("#betrGrpID").val(), null, null] :
                equal(position)("adm") || equal(position)("ben") ?
                ($.isNumeric(sessionStorage.getItem("manGrp_ID")) ?
                [null, "manGrp_ID", sessionStorage.getItem("manGrp_ID")] :
                [null, "man_ID", sessionStorage.getItem("man_ID")]) :
                ["alle", null, null]

            this.actionUserPosition =
                position => {
                    const [betrGrpID, ins, manOderManGrpID] = readInMandantenArgs(position)
                
                    hideTabsAndMenus(position)

                    mandantenEinlesen(betrGrpID, ins, manOderManGrpID)
                }

            const getMenuIDs =
                () =>
                array($("[data-menus]").length)()()
                .map((_, i) => $("[data-menus]").eq(i).attr("data-menus"))

            const menuItemText =
                id => 
                ( { id, text : $(`[data-menus=${id}]`).text() } )

            this.getMainMenus =
                menus =>
                menus.filter(a => a.id.split("-").length === 1)
                
            this.menuHtml2Json =
                () => 
                getMenuIDs()
                .map( menuItemText )
        }
    )