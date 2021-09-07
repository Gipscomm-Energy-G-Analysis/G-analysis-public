// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpRechteverwaltung =
    freeze (
        new function () {

            const POSITION =
                { GipscommAdmin : 0
                , SuperAdmin    : 1
                , Admin         : 2
                , Benutzer      : 3
                }

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

            const User = 
                { GipscommAdmin : "gipsAdm"
                , SuperAdmin    : "sAdm"
                , Admin         : "adm"
                , Benutzer      : "ben"
                }

            const getRechteArray =
                () =>
                itemSessionGet("rechteMenu").split(",")

            const getBetrGrpID = 
                () =>
                itemSessionGet("betrGrp_ID")
                
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

            const hideTabsAndMenus =
                position => {
                    switch (position) {

                        case User.GipscommAdmin:
                            break;

                        case User.SuperAdmin:
                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            , ".hideBetrGrp"
                            ].forEach(hideElement)
                            break;

                        case User.Admin:
                            [ "#tabGipscAdm"
                            , "#tabBetrGrp"
                            , "#betrGrpMenu"
                            , "#sAdmMenuLi"
                            , "#manGrpMenu"
                            , "#tabManGrp"
                            , "#admMenu"
                            , "#tabAdm"
                            , ".hideBetrGrp"
                            ].forEach(hideElement)
                            break;
                            
                        case User.Benutzer:
                            hideElement("#rechtMenuLi")
                            break;
                    }

                    if (!equal(position)(User.GipscommAdmin)) {
                        removeMenus()

                        console.log("betrGrpID from sessionStorage with getBetrGrpID() in hideTabsAndMenus")
                        console.log(getBetrGrpID())

                        scpRechteverwaltung_betreuergruppen
                        .readIntoFormFieldsByID(getBetrGrpID())
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
                equal(position)("sAdm") ?
                [itemSessionGet("betrGrp_ID"), null, null] :
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
                array($("a[data-menus]").length)()()
                .map((_, i) => $("a[data-menus]").eq(i).attr("data-menus"))

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