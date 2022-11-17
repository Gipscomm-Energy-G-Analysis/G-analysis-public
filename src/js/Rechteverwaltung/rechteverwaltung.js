// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung =
    freeze (
        new function () {

            const POSITION =
                { GipscommAdmin : "gipsAdm"
                , SuperAdmin    : "sAdm"
                , Admin         : "adm"
                , Benutzer      : "ben"
                }
            
            const readRechteverwaltung =
                position => {

                    const ajaxRechte = 
                        ajaxPost("php/Rechteverwaltung/readRechteverwaltung.php")
                    let betrGrpID
                      , manGrpID
                      , manID

                    switch (position) {

                        case POSITION.GipscommAdmin:
                            return ajaxRechte({position})
                        
                        case POSITION.SuperAdmin:
                            betrGrpID = itemSessionGet("betrGrp_ID")

                            return ajaxRechte({position, betrGrpID})
                        
                        case POSITION.Admin:
                            betrGrpID = itemSessionGet("betrGrp_ID")
                            manGrpID  = itemSessionGet("manGrp_ID")
                            manID     = itemSessionGet("man_ID")

                            return ajaxRechte({position, betrGrpID, manGrpID, manID})
                        
                        case POSITION.Benutzer:
                            betrGrpID = itemSessionGet("betrGrp_ID")
                            manGrpID  = itemSessionGet("manGrp_ID")
                            manID     = itemSessionGet("man_ID")

                            return ajaxRechte({position, betrGrpID, manGrpID, manID})
                    }
                }

            this.populateIndexedDB =
                () =>
                readRechteverwaltung(itemSessionGet("position"))
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

            const getRechteArray =
                () =>
                itemSessionGet("rechteMenu").split(",")
                
            const remove =
                id => 
                $(`[data-menus="${id}"]`).remove()

            const removeMenus =
                () =>
                difference(getMenuIDs())(getRechteArray())
                .forEach(remove)

            const hideElement =
                element =>
                $(element).css("display", "none")

            const setManManGrp =
                manGrpID =>
                manID =>
                () =>
                ( manGrpID !== "null" ?
                  $(".manGrpPfad").val(`manGrp_ID-${manGrpID}`) :
                  $(".manGrpPfad").val(`man_ID-${manID}`)
                , $(".manGrpPfad").trigger("change")
                )

            const hideTabsAndMenus =
                position => {
                    switch (position) {

                        case POSITION.GipscommAdmin:

                            break;

                        case POSITION.SuperAdmin:

                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            , ".hideBetrGrp"
                            ].forEach(hideElement)

                            scpRechteverwaltung_betreuergruppen
                            .readIntoFormFields(0)

                            break;

                        case POSITION.Admin:

                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            , "#manGrpMenu"
                            , "#tabManGrp"
                            , "#admMenu"
                            , "#tabAdm"
                            , ".hideBetrGrp"
                            , ".manGrpPfad"
                            , "#hideManManGrpLbl"
                            ].forEach(hideElement)

                            scpRechteverwaltung_betreuergruppen
                            .readIntoFormFields(0)
                            .then(
                                setManManGrp(
                                    itemSessionGet("manGrp_ID")
                                )(
                                    itemSessionGet("man_ID")
                                )
                            )

                            break;
                            
                        case POSITION.Benutzer:
                            hideElement("#rechtMenuLi")

                            scpRechteverwaltung_betreuergruppen
                            .readIntoFormFields(0)
                            break;
                    }

                    if (!equal(position)(POSITION.GipscommAdmin)) {
                        removeMenus()
                    }
                    else {
                        // Nothing
                    }
                    treeSAdm = scpTreeView.show("sAdmTreeview")
                    treeAdm  = scpTreeView.show("admTreeview")
                    treeBen  = scpTreeView.show("benTreeview")
                }

            const readInMandantenArgs =
                position =>
                equal(position)(POSITION.SuperAdmin) ?
                [itemSessionGet("betrGrp_ID"), null, null] :
                equal(position)(POSITION.Admin) || equal(position)(POSITION.Benutzer) ?
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
                array($("a[data-menus]").length)()()
                .map((_, i) => $("a[data-menus]").eq(i).attr("data-menus"))

            const notBetreuergruppen =
                a => a.text !== "Betreuergruppen"

            const menuItemText =
                id => 
                ( { id, text : $(`a[data-menus=${id}]`).text() } )

            this.getMainMenus =
                menus =>
                menus.filter(a => a.id.split("-").length === 1)
                
            this.menuHtml2Json =
                () => 
                getMenuIDs()
                .map( menuItemText )
                .filter( notBetreuergruppen )
            
            const Type =
                { Mandant : 0
                , Mandantengruppe : 1
                }

            const getIDAndName =
                type =>
                ins =>
                equal(type)(Type.Mandant) ? 
                { id : ins.man_ID, name : ins.nameMan, type : "man_ID" } :
                equal(type)(Type.Mandantengruppe) ?
                { id : ins.manGrp_ID, name : ins.name, type : "manGrp_ID" } :
                false

            const addOption =
                ins_ =>
                `<option value='${ins_.type}-${ins_.id}'>${ins_.name}</option>`

            this.readIntoMandantGruppeDropbox =
                async () => {
                    const betrGrpManIDs    = await scpRechteverwaltung_betreuergruppen.arrayBetrGrpManIDs()
                    const mandanten        = await scpUnternehmensstruktur_mandanten.queryMandantenWithIDs(betrGrpManIDs)
                    const mandantengruppen = await scpRechteverwaltung_mandantengruppen.queryMandantengruppenDataIDB()

                    $(".manGrpPfad").empty()

                    $(".manGrpPfad").append("<optgroup label='Mandantengruppen'></optgroup>")
                    $(".manGrpPfad [label='Mandantengruppen']").append(
                            mandantengruppen.map( 
                                manGrp => 
                                    pipe( manGrp
                                        , getIDAndName(Type.Mandantengruppe)
                                        , addOption
                                        )[2]
                            ).join("")
                    )
                    
                    $(".manGrpPfad").append("<optgroup label='Mandanten'></optgroup>")
                    $(".manGrpPfad [label='Mandanten']").append(
                            mandanten.map( 
                                man_ => 
                                    pipe( man_
                                        , getIDAndName(Type.Mandant)
                                        , addOption
                                        )[2]
                            ).join("")  
                    )
                }
        }
    )