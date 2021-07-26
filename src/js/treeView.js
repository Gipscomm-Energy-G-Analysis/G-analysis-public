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

            // TODO : use partition from fpCore to group the menus into children and remaining
            const getChildren = 
                id =>
                partition(nextLvlAndChild(id))({selected : [], unselected : []})

            this.buildTree = 
                nodes => 
                arr => 
                nodes.length > 0 ?
                nodes.map(
                    a => {
                        const children =
                            getChildren(a.id)(arr)

                        const tree =
                            { id : a.id
                            , text : a.text
                            , children : this.buildTree(children.selected)(children.unselected)
                            }

                        return tree
                    }
                ) : nodes

            this.showTreeView =
                divID => 
                treeJson => {
                const data =
                    { data :
                        [ { id : "0"
                          , text : "Menüs"
                          , children : [ treeJson ]
                          }
                     ]
                    }

                return new Tree( 
                    `#${divID}` 
                    , { data : 
                         [ { id : 0
                           , text : "Menüs"
                           , children : treeJson 
                           }
                         ] 
                     } 
                )
            }
            

        }
    )