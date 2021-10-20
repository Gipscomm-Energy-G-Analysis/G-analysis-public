// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const scpTreeView =
    freeze (
        new function () {

            const nextLevelNode =
                id =>
                a => 
                a.id.length === id.length + 2

            const isChild =
                id =>
                a =>
                a.id.slice(0, id.length) === id

            const nextLvlAndChild =
                id =>
                a =>
                nextLevelNode(id)(a) && isChild(id)(a)

            const getChildren = 
                id =>
                partition(nextLvlAndChild(id))({selected : [], unselected : []})

            this.getSelectedNodes =
                tree =>
                tree.selectedNodes
                .map(a => a.id)

            this.build = 
                nodes => 
                arr => 
                greaterZero(nodes.length) ?
                nodes.map(
                    ({ id, text, edit }) => 
                    (({ selected, unselected } = getChildren(id)(arr)) =>
                    ({ id, text, edit, children : this.build(selected)(unselected)}))()
                ) : nodes

            this.clear =
                that =>
                that.setValues([])   

            this.show =
                divID => {
                    const menus = scpRechteverwaltung.menuHtml2Json()
                    const mainMenus = scpRechteverwaltung.getMainMenus(menus)
                    const treeJson = scpTreeView.build(mainMenus)(menus)
                    const data =
                        [ 
                          { id : "0"
                          , text : "Menüs"
                          , edit : false
                          , children : treeJson 
                          }
                        ]

                    return new Tree( 
                        `#${divID}` 
                        , { data } 
                    )
            }
        }
    )