// CRUD -- CREATE READ UPDATE DELETE
//
// disable alert
alert = () => {}

 randomInt =
    min =>
    max =>
    ((Math.random() * (max - min + 1)) << 0) + min

 randomFloat =
    min =>
    max =>
    round((Math.random() * (max - min + 1)) + min)

 randomChar =
    chars =>
    chars.charAt(Math.floor(Math.random() * chars.length))

 randomString =
    maxLen =>
    array(randomInt(1)(maxLen))("")()
    .map(() => randomChar(" _-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 "))
    .join("")

 fillForm =
    elements =>
    elements.forEach(a => $(head(a)).val(last(a)))

 getFormData =
    elements =>
    elements.map(a => $(head(a)).val())

 getTableData =
    tbl =>
    tbl.rows().data()

 simulateClick =
    instanz =>
    $(instanz).trigger("click")

 navigate =
    instanz =>
    nav =>
    simulateClick(`#${instanz}${nav}`)

 compareData =
    data1 =>
    data2 =>
    data1.every((a, i) => a === data2[i])

 isDialogShown =
    element =>
    $(element).css("display") === "block"

jumpToRecord =
    element =>
    idx =>
    $(`${element} tbody tr:nth-child(${idx})`).trigger("dblclick")

delete_ =
    ins => {
        simulateClick(`#${ins}Loeschen`)
        simulateClick("#loeschenOk")
    }

// Test Erweiterungen Anlagen
 testEAnl =
    tout => {
         elementsEAnl =
            () =>
            [ [ "#nameEAnl", randomString(50) ]
            , [ "#kuerzelEAnl", randomString(50) ]
            , [ "#beschreibungEAnl", randomString(500)]
            ]

         optionsEAnl =
            () =>
            array(randomInt(1)(50))("")()
            .map(() => randomString(50))

         addOption =
            opt => {
                $("#optionEAnl").val(opt)
                $("#btnOptionHinzEAnl").trigger("click")
            }

         fillOptionTable =
            opts =>
            opts.forEach(addOption)

         newInstanz =
            () =>
            simulateClick("#eAnlHinz")

         saveInstanz =
            () =>
            simulateClick("#eAnlSpeichern")

         showSearchDialog =
            () =>
            simulateClick("#eAnlSuchen")

         clearOptionTable =
            () =>
            tblOptionenEAnl.clear().draw()

         create =
            () => {
                 [elements, options]  = [elementsEAnl(), optionsEAnl()]

                newInstanz()
                fillForm(elements)
                fillOptionTable(options)
                saveInstanz()

                return [elements, options]
            }

         read =
            data => {
                 [elements, options] = data

                 formData =
                    () =>
                    getFormData(elements)

                 optionsTable =
                    () =>
                    flatten(getTableData(tblOptionenEAnl))

                 compareElements =
                    () =>
                    compareData(elements.map(last))(formData())

                 compareOptions =
                    () =>
                    compareData(options)(optionsTable())

                return compareElements() && compareOptions()
            }

         update =
            () => {
                 [elements, options]  = [elementsEAnl(), optionsEAnl()]

                fillForm(elements)
                fillOptionTable(options)
                saveInstanz()

                return [elements, options]
            }

        search =
            type =>
            data => {
            [elements, options] = [data.map(a => a[0]), data.map(a => a[1].join())]

            dataTable =
                getTableData(tblEAnlSuchen)

            dataSearchTable =
                () =>
                [ dataTable[0]
                , dataTable[1]
                , dataTable[2]
                ]

            dataRecords =
                records =>
                records[0].map((a, i) => [i, last(head(a)), last(last(a)), records[1][i]])

            validTableData =
                () =>
                compareData(
                   dataSearchTable(tblEAnlSuchen).map(a => a.join())
                )(
                   dataRecords([elements, options]).map(a => a.join())
                )

            jumpToSecondRecord =
                () =>
                jumpToRecord("#tblEAnlSuchen")(2)

            switch (type) {
                case "isDialogShown":
                    return isDialogShown("#eAnlagenSuchenContainer")
                    break;
                case "validTableData":
                    return validTableData()
                    break;
                case "jumpToSecondRecord":
                    return jumpToSecondRecord()
                    break;
                default:
                    return "No Valid Search arg passed for -> type"
            }
        }

        records =
            [create(), create(), create()]

        console.log("-- Please empty 'erweiterungenAnlagen' table in DB before running the tests ! --")
        console.log("Tests eAnl start.")

        setTimeout(() => {
            navigate("eAnl")("First")
        }, 1 * tout)
        setTimeout(() => {
            console.log(read(records[0]) ? "Nav First passed." : "Nav First FAILED ! !")
        }, 2 * tout)

        setTimeout(() => {
            navigate("eAnl")("Next")
        }, 3 * tout)
        setTimeout(() => {
            console.log(read(records[1]) ? "Nav Next passed." : "Nav Next FAILED ! !")
        }, 4 * tout)

        setTimeout(() => {
            navigate("eAnl")("Last")
        }, 5 * tout)
        setTimeout(() => {
            console.log(read(records[2]) ? "Nav Last passed." : "Nav Last FAILED ! !")
        }, 6 * tout)

        setTimeout(() => {
            navigate("eAnl")("Previous")
        }, 7 * tout)
        setTimeout(() => {
            console.log(read(records[1]) ? "Nav Previous passed." : "Nav Previous FAILED ! !")
        }, 8 * tout)

        let updateData = []
        setTimeout(() => {
            navigate("eAnl")("First")
        }, 9 * tout)
        setTimeout(() => {
            clearOptionTable()
            records[0] = update()
        }, 10 * tout)
        setTimeout(() => {
            navigate("eAnl")("First")
        }, 11 * tout)
        setTimeout(() => {
            console.log(read(records[0]) ? "Update passed." : "Update FAILED ! !")
        }, 12 * tout)

        setTimeout(() => {
            showSearchDialog()
        }, 13 * tout)
        setTimeout(() => {
            console.log(search("isDialogShown")(records) ? "Search dialog shown passed." : "Search dialog shown FAILED ! !")
        }, 14 * tout)
        setTimeout(() => {
            console.log(search("validTableData")(records) ? "Search valid table data passed." : "Search valid table data FAILED ! !")
        }, 15 * tout)
        setTimeout(() => {
            search("jumpToSecondRecord")(records)
        }, 16 * tout)
        setTimeout(() => {
            console.log(read(records[1]) ? "Search jump to second record passed." : "Search jump to second record FAILED ! !")
        }, 17 * tout)
        setTimeout(() => {
            navigate("eAnl")("First")
        }, 18 * tout)
        setTimeout(() => {
            delete_("eAnl")
        }, 19 * tout)
        setTimeout(() => {
            navigate("eAnl")("First")
        }, 20 * tout)
        setTimeout(() => {
            console.log(read(records[1]) ? "Delete passed." : "Delete FAILED ! !")
        }, 21 * tout)
        setTimeout(() => {
            console.log("Tests eAnl end.")
        }, 22 * tout)
    }
