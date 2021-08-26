// Depends on fpCore.js
// Depends on https://unpkg.com/dexie@latest/dist/dexie.js
// idxDB is initialized in main.html

"use strict"

const helper =
    freeze (
        new function () {

            // Returns an input value depending on the elements id
            this.fieldValue =
                a =>
                $(`#${a}`).val()
            
            // In the edit mode the bg-color of the fields changes
            const colorState =
                state =>
                state === "new" ? 
                "antiquewhite" :
                "white"

            // Sets the create new or update state for saving
            this.setState =
                ins =>
                state => 
                    ( $(`#${ins}State`).val(state)
                    , $(`.${ins}Form`)
                        .css("background", colorState(state))
                        .css("border", "1px solid black")
                        .css("padding", "1px")
                    )

            // Resets the value of a given input to an empty string
            this.clearField =
                field =>
                $(`#${field}`).val("")
        }
    )