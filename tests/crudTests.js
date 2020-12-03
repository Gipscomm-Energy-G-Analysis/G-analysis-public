// CRUD -- CREATE READ UPDATE DELETE
//
const randomInt =
    min =>
    max =>
    ((Math.random() * (max - min + 1)) << 0) + min

const randomFloat =
    min =>
    max =>
    round((Math.random() * (max - min + 1)) + min)

const randomChar =
    chars =>
    chars.charAt(Math.floor(Math.random() * chars.length))

const randomString =
    maxLen =>
    array(randomInt(1)(maxLen))("")()
    .map(() => randomChar(" _-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 "))
    .join("")

const resetFields =
    clearFields

const fillForm =
    elements =>
    elements.forEach(a => $(head(a)).val(last(a)))

const createRecord =
    instanz =>
    $(instanz).trigger("click")


// Test Erweiterungen Anlagen
const testEAnl =
    () => {
        const elementeEAnl =
            [ [ "#nameEAnl", randomString(50) ]
            , [ "#kuerzelEAnl", randomString(50) ]
            , [ "#beschreibungEAnl", randomString(500)]
            ]

        const addOption =
            () => {
                $("#optionEAnl").val(randomString(50))
                $("#btnOptionHinzEAnl").trigger("click")
            }

        const fillOptionTable =
            numberOptions =>
            array(numberOptions)("")()
            .forEach(addOption)


        resetFields("eAnlHinz")
        fillForm(elementeEAnl)
        fillOptionTable(randomInt(1)(50))
        createRecord("#eAnlSpeichern")



        // const optionen =
    }
