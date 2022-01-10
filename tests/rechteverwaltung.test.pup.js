puppeteer = require('puppeteer');
colors = require("colors");

(async () => {

    describeTest =
        text => {
            console.log("")
            console.log("")
            console.log(colors.blue(`o ${text}`))
            console.log("")
        }

    describe =
        text => {
            console.log("")
            console.log(text)
        }

    assert = 
        actual => 
        expected => 
        name => {
            if (actual === expected) {
                console.log(colors.green(`✔ ${name} passed.`))
            }
            else {
                console.log(colors.red(`✘ ${name} failed !!`))
                throw new Error(colors.red(`expected -> ${expected}, actual -> ${actual}`))
            }
        }

    css =
        async (selector, property) => {
            return await page.evaluate(selectorAndProperty_ => window.getComputedStyle(document.querySelector(selectorAndProperty_.selector)).getPropertyValue(selectorAndProperty_.property), {selector, property})
        }
        
    click =
        async selector => {
            await page.waitForTimeout(1000)
            
            await page.click(selector) 

            await page.waitForTimeout(1000)
        }
        
    dblclick =
        async selector => {
            await page.waitForTimeout(500)
            
            await page.click(selector, { clickCount: 2 }) 

            await page.waitForTimeout(500)
        }

    click1 =
        async selector => {
            await page.evaluate(selector_ => document.querySelector(selector_).click(), selector)
        }

    select =
        async (selector, value) => {
            await page.waitForTimeout(500)

            await page.select(selector, value)
        
            await page.waitForTimeout(500)
        }

    value = 
        async selector => {
            await page.waitForSelector(selector)
            element = await page.$(selector)
            return await page.evaluate(el => el.value, element) 
        }

    content =
        async selector => {
            await page.waitForSelector(selector)
            element = await page.$(selector)
            return await page.evaluate(el => el.textContent, element) 
        }

    testTabNavigation = 
        async (selectorMenu, selectorTab, name) => {
            await click1(selectorMenu)

            valBgColor = await css(selectorTab, "background-color")
            
            prepRgb = 
                val =>
                val.split(",")
                .flatMap(a => a.split("("))
                .flatMap(a => a.split(")"))
                .filter(a => a !== "")
                .filter(a => !isNaN(a)).join(",")

            describe(`Test ${name} tab navigation`)
            assert(prepRgb(valBgColor))("206, 214, 222")("Tab navigation")

        }

    browser = await puppeteer.launch({headless: true})
    page = await browser.newPage()
    
    // accept alert
    page.on( 'dialog', async dialog => {

        console.log( dialog.type() )

        console.log( dialog.message() )

        await dialog.accept()

    })

    await page.setDefaultNavigationTimeout(0)
    await page.goto('http://localhost:8080', {
        waitUntil: 'networkidle0',
    })


    // Test getting to login from landing page
    //
    await click("#loginButton")

    urlLogin = await page.url()

    describe("Test landingpage to login navigation")
    assert(urlLogin)("http://localhost:8080/login.html")("Landing page") 

    
    // Test login
    //
    await page.waitForSelector('#user')
    await page.waitForSelector('#pw')

    await page.type("#user", "sdm", {delay: 100})
    await page.type("#pw", "eug34=JC_#8ZR6zegts@", {delay: 100})
    
    await click("#btnLogin")

    await page.waitForNavigation()

    urlMain = await page.url()

    describe("Test login")
    assert(urlMain)("http://localhost:8080/main.html")("Login")

    // Test navigation to betreuergruppen tab
    //
    describeTest("TEST BETREUERGRUPPEN")

    await testTabNavigation("#betrGrpMenu", "#tabBetrGrp", "betrGrp")

    // Test search navigation

    // navigate to last record
    await click("#betrGrpLast")

    // click magnifying glass to open search popup
    await click("#betrGrpSuchen")
    
    // dblclick first record in list
    await dblclick("#tblBetrGrpSuchen > tbody > tr.odd")
            
    // betreuergruppe form fields
    valueFirmaBetrGrp = await value("#firmaBetrGrp")
    valueMitarbeiterBetrGrp = await value("#anzahlMitarbeiterBetrGrp")
    valueAnschriftBetrGrp = await value("#anschriftBetrGrp")
    valuePlzBetrGrp = await value("#plzBetrGrp")
    valueOrtBetrGrp = await value("#ortBetrGrp")
    valueGeschaeftsfuehrerBetrGrp = await value("#geschaeftsfuehrerBetrGrp")
    valueTelefonBetrGrp = await value("#telefonBetrGrp")
    valueEmailBetrGrp = await value("#emailBetrGrp")
    valueNotizBetrGrp = await value("#notizBetrGrp")
    firstMandanten = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(1) > td:nth-child(2)")
    middleMandanten = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(12) > td:nth-child(2)")
    lastMandanten = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(22) > td:nth-child(2)")

    correctValues =
        () =>
        [ [valueFirmaBetrGrp, "Gipscomm-Energie"]
        , [valueMitarbeiterBetrGrp, 7]
        , [valueAnschriftBetrGrp, "Fuhr 12"]
        , [valuePlzBetrGrp, "42499"]
        , [valueOrtBetrGrp, "Hückeswagen"]
        , [valueGeschaeftsfuehrerBetrGrp, "A.Wieland"]
        , [valueTelefonBetrGrp, "+49 (2192) 791986-16"]
        , [valueEmailBetrGrp, "info@energie-gipscomm.de"]
        , [valueNotizBetrGrp, "Fürs Testen notwendig !"]
        , [firstMandanten, "Mustermandant"]
        , [middleMandanten, "HBS-Herholz-Tueren"]
        , [lastMandanten, "Huendgen Swisttal"]
        ]
        .every(a => a[0] == a[1])

    describe("Test search navigation")
    assert(correctValues())(true)("Search")

    // Test creating a new Betreuergruppe
    //
    // Test clearing fields
    //
    // clear fields and Mandanten list
    await click("#betrGrpHinz")

    // fill fields
    await page.type("#firmaBetrGrp", "Firma")
    await page.type("#anzahlMitarbeiterBetrGrp", "23")
    await page.type("#anschriftBetrGrp", "Anschrift")
    await page.type("#plzBetrGrp", "PLZ")
    await page.type("#ortBetrGrp", "Ort")
    await page.type("#geschaeftsfuehrerBetrGrp", "Geschäftsführer")
    await page.type("#telefonBetrGrp", "Telefon")
    await page.type("#emailBetrGrp", "Email")
    await page.type("#notizBetrGrp", "Notiz")
    await page.type("#titelSAdm", "Titel")
    await page.type("#nameSAdm", "Name")
    await page.type("#vornameSAdm", "Vorname")
    await page.type("#emailSAdm", "Email")
    await page.type("#telefonSAdm", "Telefon")
    await page.type("#faxSAdm", "Fax")
    await page.type("#mobiltelefonSAdm", "Mobiltelefon")
    await page.type("#benutzernameSAdm", "Benutzername")
    await page.type("#passwortSAdm", "Passwort")

    // fill Mandanten list
    // add Mandant 1
    await click("#manZuBetrGrpHinz")
    await page.waitForSelector("#tblMandantenAuswahl > tbody > tr:nth-child(8) > td:nth-child(2)")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(8) > td:nth-child(2)")
    
    // add Mandant 2
    await click("#manZuBetrGrpHinz")
    await page.waitForSelector("#tblMandantenAuswahl > tbody > tr:nth-child(10) > td:nth-child(2)")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(10) > td:nth-child(2)")
    
    // add Mandant 3
    await click("#manZuBetrGrpHinz")
    await page.waitForSelector("#tblMandantenAuswahl > tbody > tr:nth-child(20) > td:nth-child(2)")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(20) > td:nth-child(2)")

    // clear fields and Mandanten list
    await click("#betrGrpHinz")

    // betreuergruppe form fields
    valueFirma = await value("#firmaBetrGrp")
    valueMitarbeiter = await value("#anzahlMitarbeiterBetrGrp")
    valueAnschrift = await value("#anschriftBetrGrp")
    valuePlz = await value("#plzBetrGrp")
    valueOrt = await value("#ortBetrGrp")
    valueGeschaeftsfuehrer = await value("#geschaeftsfuehrerBetrGrp")
    valueTelefon = await value("#telefonBetrGrp")
    valueEmail = await value("#emailBetrGrp")
    valueNotiz = await value("#notizBetrGrp")
    valueMandantenlist = await content("#tblMandantenBetrGrp > tbody > tr > td")
    
    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueNotizFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")
    valuePasswortSAdm = await value("#passwortSAdm")

    allEmpty =
        () =>
        [ valueFirma
        , valueMitarbeiter
        , valueAnschrift
        , valuePlz
        , valueOrt
        , valueGeschaeftsfuehrer
        , valueTelefon
        , valueEmail
        , valueNotiz
        , valueTitelSAdm
        , valueNameSAdm
        , valueVornameSAdm
        , valueEmailSAdm
        , valueTelefonSAdm
        , valueNotizFaxSAdm
        , valueMobiltelefonSAdm
        , valueBenutzernameSAdm
        , valuePasswortSAdm
        ].every(a => String(a) === "") 
        && valueMandantenlist === "No data available in table"

    // create new betrGrp
    await page.type("#firmaBetrGrp", "Firma", {delay: 200})
    await page.type("#anzahlMitarbeiterBetrGrp", "10", {delay: 200})
    await page.type("#anschriftBetrGrp", "Anschrift", {delay: 200})
    await page.type("#plzBetrGrp", "PLZ", {delay: 200})
    await page.type("#ortBetrGrp", "Ort", {delay: 200})
    await page.type("#geschaeftsfuehrerBetrGrp", "Geschäftsführer", {delay: 200})
    await page.type("#telefonBetrGrp", "Telefon", {delay: 200})
    await page.type("#emailBetrGrp", "Email", {delay: 200})
    await page.type("#notizBetrGrp", "", {delay: 200})

    // fill Mandanten list
    // add Mandant 1
    // Heute + Comp
    await click("#manZuBetrGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(2) > td:nth-child(2)")
    
    // add Mandant 2
    // AST
    await click("#manZuBetrGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(9) > td:nth-child(2)")

    // add Mandant 3
    // Spies
    await click("#manZuBetrGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(12) > td:nth-child(2)")
    
    // click save
    await click1("#betrGrpSpeichern")

    // accept dialog
    await click("#saveBetrGrpOk")

    // navigate to first record
    await click("#betrGrpFirst")

    // navigate to newly created(last)
    await click("#betrGrpLast")

    // betreuergruppe form fields
    valueFirmaBetrGrp = await value("#firmaBetrGrp")
    valueMitarbeiterBetrGrp = await value("#anzahlMitarbeiterBetrGrp")
    valueAnschriftBetrGrp = await value("#anschriftBetrGrp")
    valuePlzBetrGrp = await value("#plzBetrGrp")
    valueOrtBetrGrp = await value("#ortBetrGrp")
    valueGeschaeftsfuehrerBetrGrp = await value("#geschaeftsfuehrerBetrGrp")
    valueTelefonBetrGrp = await value("#telefonBetrGrp")
    valueEmailBetrGrp = await value("#emailBetrGrp")
    valueNotizBetrGrp = await value("#notizBetrGrp")
    contentMandant1 = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(1) > td:nth-child(1)")
    contentMandant2 = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(2) > td:nth-child(1)")
    contentMandant3 = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(3) > td:nth-child(1)")
    
    // compare values
    correctValues =
        () =>
        [ [valueFirmaBetrGrp, "Firma"]
        , [valueMitarbeiterBetrGrp, 10]
        , [valueAnschriftBetrGrp, "Anschrift"]
        , [valuePlzBetrGrp, "PLZ"]
        , [valueOrtBetrGrp, "Ort"]
        , [valueGeschaeftsfuehrerBetrGrp, "Geschäftsführer"]
        , [valueTelefonBetrGrp, "Telefon"]
        , [valueEmailBetrGrp, "Email"]
        , [valueNotizBetrGrp, ""]
        , [contentMandant1, "Heute + Comp"]
        , [contentMandant2, "AST"]
        , [contentMandant3, "Spies"]
        ]
        .every(a => a[0] == a[1])

    describe("Test creating a new Betreuergruppe")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    describe("Test saving new betrGrp")
    assert(correctValues())(true)("Create new")

    // Test changing a betrGrp

    // changes to apply
    changeFirmaBetrGrp = "Neu"
    changeAnzahlMitarbeiterBetrGrp = "1"
    changeAnschriftBetrGrp = "22"
    changePlzBetrGrp = "876"
    changeOrtBetrGrp = "Hueck"
    changeGeschaeftsfuehrerBetrGrp = "1"
    changeTelefonBetrGrp = "nummer"
    changeEmailBetrGrp = " 25"
    changeNotizBetrGrp = "ohne Sinn"
    changeMandantenlist1BetrGrp = "Henkedruck"
    changeMandantenlist2BetrGrp = "InduRade"

    // Changing values
    await page.type("#firmaBetrGrp", changeFirmaBetrGrp, {delay: 200})
    await page.type("#anzahlMitarbeiterBetrGrp", changeAnzahlMitarbeiterBetrGrp, {delay: 200})
    await page.type("#anschriftBetrGrp", changeAnschriftBetrGrp, {delay: 200})
    await page.type("#plzBetrGrp", changePlzBetrGrp, {delay: 200})
    await page.type("#ortBetrGrp", changeOrtBetrGrp, {delay: 200})
    await page.type("#geschaeftsfuehrerBetrGrp", changeGeschaeftsfuehrerBetrGrp, {delay: 200})
    await page.type("#telefonBetrGrp", changeTelefonBetrGrp, {delay: 200})
    await page.type("#emailBetrGrp", changeEmailBetrGrp, {delay: 200})
    await page.type("#notizBetrGrp", changeNotizBetrGrp, {delay: 200})
    
    // add Mandant 4
    // Henkedruck
    await click("#manZuBetrGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(15) > td:nth-child(2)")
    
    // add Mandant 5
    // InduRade
    await click("#manZuBetrGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(10) > td:nth-child(2)")

    // save changed betrGrp
    await click1("#betrGrpSpeichern")

    // betreuergruppe form fields
    valueFirmaBetrGrp = await value("#firmaBetrGrp")
    valueMitarbeiterBetrGrp = await value("#anzahlMitarbeiterBetrGrp")
    valueAnschriftBetrGrp = await value("#anschriftBetrGrp")
    valuePlzBetrGrp = await value("#plzBetrGrp")
    valueOrtBetrGrp = await value("#ortBetrGrp")
    valueGeschaeftsfuehrerBetrGrp = await value("#geschaeftsfuehrerBetrGrp")
    valueTelefonBetrGrp = await value("#telefonBetrGrp")
    valueEmailBetrGrp = await value("#emailBetrGrp")
    valueNotizBetrGrp = await value("#notizBetrGrp")
    contentMandant4BetrGrp = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(4) > td:nth-child(1)")
    contentMandant5BetrGrp = await content("#tblMandantenBetrGrp > tbody > tr:nth-child(5) > td:nth-child(1)")
    
    // compare values
    correctValues =
        () =>
        [ [valueFirmaBetrGrp, "Firma" + changeFirmaBetrGrp]
        , [valueMitarbeiterBetrGrp, "10" + changeAnzahlMitarbeiterBetrGrp]
        , [valueAnschriftBetrGrp, "Anschrift" + changeAnschriftBetrGrp]
        , [valuePlzBetrGrp, "PLZ" + changePlzBetrGrp]
        , [valueOrtBetrGrp, "Ort" + changeOrtBetrGrp]
        , [valueGeschaeftsfuehrerBetrGrp, "Geschäftsführer" + changeGeschaeftsfuehrerBetrGrp]
        , [valueTelefonBetrGrp, "Telefon" + changeTelefonBetrGrp]
        , [valueEmailBetrGrp, "Email" + changeEmailBetrGrp]
        , [valueNotizBetrGrp, changeNotizBetrGrp]
        , [contentMandant4BetrGrp, "Alfried Krupp KH"]
        , [contentMandant5BetrGrp, "HBS-Herholz-Tueren"]
        ]
        .every(a => a[0] == a[1])

    describe("Test changing a betrGrp")
    assert(correctValues())(true)("Change existing")

    // Test deleting a betrGrp

    // navigate to last record
    await click("#betrGrpLast")
    
    // click löschen
    await click1("#betrGrpLoeschen")
    
    // navigate to last record
    await click("#betrGrpLast")

    // betreuergruppe form fields
    valueFirmaBetrGrp = await value("#firmaBetrGrp")
    valueMitarbeiterBetrGrp = await value("#anzahlMitarbeiterBetrGrp")
    valueAnschriftBetrGrp = await value("#anschriftBetrGrp")
    valuePlzBetrGrp = await value("#plzBetrGrp")
    valueOrtBetrGrp = await value("#ortBetrGrp")
    valueGeschaeftsfuehrerBetrGrp = await value("#geschaeftsfuehrerBetrGrp")
    valueTelefonBetrGrp = await value("#telefonBetrGrp")
    valueEmailBetrGrp = await value("#emailBetrGrp")
    valueNotizBetrGrp = await value("#notizBetrGrp")
    
    // check if at least 5 values differ
    correctValues =
        () =>
        [ [valueFirmaBetrGrp, "Firma" + changeFirmaBetrGrp]
        , [valueMitarbeiterBetrGrp, "10" + changeAnzahlMitarbeiterBetrGrp]
        , [valueAnschriftBetrGrp, "Anschrift" + changeAnschriftBetrGrp]
        , [valuePlzBetrGrp, "PLZ" + changePlzBetrGrp]
        , [valueOrtBetrGrp, "Ort" + changeOrtBetrGrp]
        , [valueGeschaeftsfuehrerBetrGrp, "Geschäftsführer" + changeGeschaeftsfuehrerBetrGrp]
        , [valueTelefonBetrGrp, "Telefon" + changeTelefonBetrGrp]
        , [valueEmailBetrGrp, "Email" + changeEmailBetrGrp]
        , [valueNotizBetrGrp, "Notiz" + changeNotizBetrGrp]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 4

    describe("Test deleting a betrGrp")
    assert(correctValues())(true)("Delete")


    // Test superadmins
    describeTest("TEST SUPERADMINS")
    //
    // Test search navigation

    // navigate to next record
    await click1("#betrGrpNext")

    await click("#sAdmSuchen")
    
    // dblclick second record in list
    await dblclick("#tblSAdmSuchen > tbody > tr.even > td:nth-child(3)")
            
    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")

    correctValues =
        () =>
        [ [valueTitelSAdm, "Herr"]
        , [valueNameSAdm, "Tiemann"]
        , [valueVornameSAdm, "Dirk"]
        , [valueEmailSAdm, "info@seymour-energy.de"]
        , [valueTelefonSAdm, ""]
        , [valueFaxSAdm, ""]
        , [valueMobiltelefonSAdm, ""]
        , [valueBenutzernameSAdm, "D.Tiemann"]
        ]
        .every(a => a[0] == a[1])

    describe("Test search navigation")
    assert(correctValues())(true)("Search")

    // Test creating a new Superadmin
    //
    // Test clearing fields

    // fill fields
    await page.type("#titelSAdm", "Titel")
    await page.type("#nameSAdm", "Name")
    await page.type("#vornameSAdm", "Vorname")
    await page.type("#emailSAdm", "Email")
    await page.type("#telefonSAdm", "Telefon")
    await page.type("#faxSAdm", "Fax")
    await page.type("#mobiltelefonSAdm", "Mobiltelefon")
    await page.type("#benutzernameSAdm", "Benutzername")
    await page.type("#passwortSAdm", "Passwort")
    
    // clear fields and Mandanten list
    await click("#sAdmHinz")

    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")
    valuePasswortSAdm = await value("#passwortSAdm")

    allEmpty =
        () =>
        [ valueTitelSAdm
        , valueNameSAdm
        , valueVornameSAdm
        , valueEmailSAdm
        , valueTelefonSAdm
        , valueFaxSAdm
        , valueMobiltelefonSAdm
        , valueBenutzernameSAdm
        , valuePasswortSAdm
        ]
        .every(a => String(a) === "") 

    describe("Test creating a new Superadmin")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    // create new sAdm
    await page.type("#titelSAdm", "Titel", {delay: 200})
    await page.type("#nameSAdm", "Name", {delay: 200})
    await page.type("#vornameSAdm", "Vorname", {delay: 200})
    await page.type("#emailSAdm", "Email", {delay: 200})
    await page.type("#telefonSAdm", "Telefon", {delay: 200})
    await page.type("#faxSAdm", "Fax", {delay: 200})
    await page.type("#mobiltelefonSAdm", "Mobiltelefon", {delay: 200})
    await page.type("#benutzernameSAdm", "Benutzername", {delay: 200})
    await page.type("#passwortSAdm", "Passwort", {delay: 200})

    // click save
    await click1("#sAdmSpeichern")

    // navigate to previous record
    await click("#sAdmPrevious")

    // navigate to newly created(next)
    await click("#sAdmNext")

    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")
    valuePasswortSAdm = await value("#passwortSAdm")  

    // compare values
    correctValues =
        () =>
        [ [valueTitelSAdm, "Titel"]
        , [valueNameSAdm, "Name"]
        , [valueVornameSAdm, "Vorname"]
        , [valueEmailSAdm, "Email"]
        , [valueTelefonSAdm, "Telefon"]
        , [valueFaxSAdm, "Fax"]
        , [valueMobiltelefonSAdm, "Mobiltelefon"]
        , [valueBenutzernameSAdm, "Benutzername"]
        ]
        .every(a => a[0] == a[1])

    describe("Test saving new sAdm")
    assert(correctValues())(true)("Create new")


    // Test changing a sAdm

    // changes to apply
    changeTitelSAdm = "Fest"
    changeNameSAdm = "Rest"
    changeVornameSAdm = "200"
    changeEmailSAdm = "96"
    changeTelefonSAdm = "Hueckeswagen"
    changeFaxSAdm = "11"
    changeMobiltelefonSAdm = "nummer"
    changeBenutzernameSAdm = "mann"

    // Changing values
    await page.type("#titelSAdm", changeTitelSAdm, {delay: 200})
    await page.type("#nameSAdm", changeNameSAdm, {delay: 200})
    await page.type("#vornameSAdm", changeVornameSAdm, {delay: 200})
    await page.type("#emailSAdm", changeEmailSAdm, {delay: 200})
    await page.type("#telefonSAdm", changeTelefonSAdm, {delay: 200})
    await page.type("#faxSAdm", changeFaxSAdm, {delay: 200})
    await page.type("#mobiltelefonSAdm", changeMobiltelefonSAdm, {delay: 200})
    await page.type("#benutzernameSAdm", changeBenutzernameSAdm, {delay: 200})
    
    // save changed betrGrp
    await click("#sAdmSpeichern")

    // accept dialog
    await click("#saveSAdmOk")

    // navigate to previous record
    await click("#sAdmPrevious")

    // navigate to changed record(next)
    await click("#sAdmNext")

    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")

    // compare values
    correctValues =
        () =>
        [ [valueTitelSAdm, "Titel" + changeTitelSAdm]
        , [valueNameSAdm, "Name" + changeNameSAdm]
        , [valueVornameSAdm, "Vorname" + changeVornameSAdm]
        , [valueEmailSAdm, "Email" + changeEmailSAdm]
        , [valueTelefonSAdm, "Telefon" + changeTelefonSAdm]
        , [valueFaxSAdm, "Fax" + changeFaxSAdm]
        , [valueMobiltelefonSAdm, "Mobiltelefon" + changeMobiltelefonSAdm]
        , [valueBenutzernameSAdm, "Benutzername" + changeBenutzernameSAdm]
        ]
        .every(a => a[0] == a[1])

    describe("Test changing a sAdm")
    assert(correctValues())(true)("Change existing")

    // Test deleting a sAdm

    // navigate to last record
    await click("#sAdmLast")
    
    // click löschen
    await click1("#sAdmLoeschen")
    
    // navigate to last record
    await click("#sAdmLast")

    // superadmin form fields
    valueTitelSAdm = await value("#titelSAdm")
    valueNameSAdm = await value("#nameSAdm")
    valueVornameSAdm = await value("#vornameSAdm")
    valueEmailSAdm = await value("#emailSAdm")
    valueTelefonSAdm = await value("#telefonSAdm")
    valueFaxSAdm = await value("#faxSAdm")
    valueMobiltelefonSAdm = await value("#mobiltelefonSAdm")
    valueBenutzernameSAdm = await value("#benutzernameSAdm")
    
    // check if at least 4 values differ
    correctValues =
        () =>
        [ [valueTitelSAdm, "Titel" + changeTitelSAdm]
        , [valueNameSAdm, "Name" + changeNameSAdm]
        , [valueVornameSAdm, "Vorname" + changeVornameSAdm]
        , [valueEmailSAdm, "Email" + changeEmailSAdm]
        , [valueTelefonSAdm, "Telefon" + changeTelefonSAdm]
        , [valueFaxSAdm, "Fax" + changeFaxSAdm]
        , [valueMobiltelefonSAdm, "Mobiltelefon" + changeMobiltelefonSAdm]
        , [valueBenutzernameSAdm, "Benutzername" + changeBenutzernameSAdm]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 3

    describe("Test deleting a sAdm")
    assert(correctValues())(true)("Delete")

    // navigate to first betrGrp
    await click1("#betrGrpFirst")

    // Test Mandantengruppen
    describeTest("TEST MANDANTENGRUPPEN")

    // Test navigation to mandantengruppen tab
    //
    await testTabNavigation("#manGrpMenu", "#tabManGrp", "manGrp")
    
    // Test creating a new Mandantengruppe
    //
    // Test clearing fields

    // clear fields and Mandanten list
    await click("#manGrpHinz")

    // fill fields
    await page.type("#nameManGrp", "Name")
    await page.type("#kurzManGrp", "Kurz")

    // fill Mandanten list
    // add Mandant 1
    // Mustermandant
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(1) > td:nth-child(2)")
    
    // add Mandant 2
    // Raderplast
    await click1("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(6) > td:nth-child(2)")

    // add Mandant 3
    // ELB
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(19) > td:nth-child(2)")


    // clear fields and Mandanten list
    await click("#manGrpHinz")

    // mandantengruppe form fields
    valueNameManGrp = await value("#nameManGrp")
    valueKurzManGrp = await value("#kurzManGrp")
    valueMandantenlist = await content("#tblMandantengruppe > tbody > tr > td")

    allEmpty =
        () =>
        [ valueNameManGrp
        , valueKurzManGrp
        ]
        .every(a => String(a) === "") 
        && valueMandantenlist  === "No data available in table" 

    describe("Test creating a new Mandantengruppe")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    // create new sAdm
    await page.type("#nameManGrp", "Name", {delay: 200})
    await page.type("#kurzManGrp", "Kurz", {delay: 200})

    // fill Mandanten list
    // add Mandant 1
    // Agrodur Bad Berleburg
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(3) > td:nth-child(2)")
    
    // add Mandant 2
    // K.H.Schumacher
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(12) > td:nth-child(2)")

    // add Mandant 3
    // hpg plastics gmbh
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(14) > td:nth-child(2)")


    // click save
    await click1("#manGrpSpeichern")

    // navigate to previous record
    await click("#manGrpPrevious")

    // navigate to newly created(next)
    await click("#manGrpNext")

    // mandantengruppe form fields
    valueNameManGrp = await value("#nameManGrp")
    valueKurzManGrp = await value("#kurzManGrp")
    valueMandanten1 = await content("#tblMandantengruppe > tbody > tr:nth-child(1) > td:nth-child(1)")
    valueMandanten2 = await content("#tblMandantengruppe > tbody > tr:nth-child(2) > td:nth-child(1)")
    valueMandanten3 = await content("#tblMandantengruppe > tbody > tr:nth-child(3) > td:nth-child(1)")
 

    // compare values
    correctValues =
        () =>
        [ [valueNameManGrp, "Name"]
        , [valueKurzManGrp, "Kurz"]
        , [valueMandanten1, "Agrodur Bad Berleburg"]
        , [valueMandanten2, "K.H.Schumacher"]
        , [valueMandanten3, "hpg plastics gmbh"]
        ]
        .every(a => a[0] == a[1])

    describe("Test saving new manGrp")
    assert(correctValues())(true)("Create new")

     // Test changing a manGrp

    // changes to apply
    changeNameManGrp = "Neu"
    changeKurzManGrp = "22"

    // Changing values
    await page.type("#nameManGrp", changeNameManGrp, {delay: 200})
    await page.type("#kurzManGrp", changeKurzManGrp, {delay: 200})
    
    // add Mandant 4
    // Linsen Druckcenter GmbH
    await click1("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(7) > td:nth-child(2)")
    
    // add Mandant 5
    // Familie Derichsweiler
    await click("#manZuManGrpHinz")
    await dblclick("#tblMandantenAuswahl > tbody > tr:nth-child(4) > td:nth-child(2)")
    
    // save changed betrGrp
    await click("#manGrpSpeichern")

    // navigate to last record
    await click1("#manGrpLast")

    // betreuergruppe form fields
    valueNameManGrp = await value("#nameManGrp")
    valueKurzManGrp = await value("#kurzManGrp")
    contentMandant4ManGrp = await content("#tblMandantengruppe > tbody > tr:nth-child(4) > td:nth-child(1)")
    contentMandant5ManGrp = await content("#tblMandantengruppe > tbody > tr:nth-child(5) > td:nth-child(1)")
    
    // compare values
    correctValues =
        () =>
        [ [valueNameManGrp, "Name" + changeNameManGrp]
        , [valueKurzManGrp, "Kurz" + changeKurzManGrp]
        , [contentMandant4ManGrp, "K.H.Schumacher"]
        , [contentMandant5ManGrp, "hpg plastics gmbh"]
        ]
        .every(a => a[0] == a[1])

    describe("Test changing a manGrp")
    assert(correctValues())(true)("Change existing")

    // Test deleting a betrGrp

    // navigate to last record
    await click("#manGrpLast")
    
    // click löschen
    await click1("#manGrpLoeschen")
    
    // navigate to last record
    await click("#manGrpLast")

    // betreuergruppe form fields
    valueNameManGrp = await value("#firmaBetrGrp")
    valueKurzManGrp = await value("#anzahlMitarbeiterBetrGrp")
    
    // check if at least 1 value differs
    correctValues =
        () =>
        [ [valueNameManGrp, "Neu" + changeNameManGrp]
        , [valueKurzManGrp, "Kurz" + changeKurzManGrp]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 0

    describe("Test deleting a manGrp")
    assert(correctValues())(true)("Delete")

    // Test Admins
    //
    
    describeTest("TEST ADMINS")
    
    // Test navigation to Admin tab
    //
    await testTabNavigation("#admMenu", "#tabAdm", "adm")

    // Test creating a new Admin
    //
    // Test clearing fields
    //
    // fill fields
    await page.type("#titelAdm", "Titel")
    await page.type("#nameAdm", "Name")
    await page.type("#vornameAdm", "Vorname")
    await page.type("#emailAdm", "EMail")
    await page.type("#telefonAdm", "Telefon")
    await page.type("#faxAdm", "Fax")
    await page.type("#mobiltelefonAdm", "Mobiltelefon")
    await page.type("#benutzernameAdm", "Benutzername")
    await page.type("#passwortAdm", "Passwort")

    // clear fields
    await click("#admHinz")

    // admin form fields
    valueTitelAdm = await value("#titelAdm")
    valueNameAdm = await value("#nameAdm")
    valueVornameAdm = await value("#vornameAdm")
    valueEmailAdm = await value("#emailAdm")
    valueTelefonAdm = await value("#telefonAdm")
    valueFaxAdm = await value("#faxAdm")
    valueMobiltelefonAdm = await value("#mobiltelefonAdm")
    valueBenutzernameAdm = await value("#benutzernameAdm")
    valuePasswortAdm = await value("#passwortAdm")

    allEmpty =
        () =>
        [ valueTitelAdm
        , valueNameAdm
        , valueVornameAdm
        , valueEmailAdm
        , valueTelefonAdm
        , valueFaxAdm
        , valueMobiltelefonAdm
        , valueBenutzernameAdm
        , valuePasswortAdm
        ]
        .every(a => String(a) === "") 

    describe("Test creating a new Admin")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    // create new adm
    //
    // switch select to Mustermandant
    //
    await select(".manGrpPfad", "man_ID-3")
    await select(".manGrpPfad", "man_ID-5")
    await select(".manGrpPfad", "man_ID-1")

    // Test search navigation
    await click("#admSuchen")
    
    // dblclick second record in list
    await dblclick("#tblAdmSuchen > tbody > tr.even > td:nth-child(3)")
            
    // admin form fields
    valueTitelAdm = await value("#titelAdm")
    valueNameAdm = await value("#nameAdm")
    valueVornameAdm = await value("#vornameAdm")
    valueEmailAdm = await value("#emailAdm")
    valueTelefonAdm = await value("#telefonAdm")
    valueFaxAdm = await value("#faxAdm")
    valueMobiltelefonAdm = await value("#mobiltelefonAdm")
    valueBenutzernameAdm = await value("#benutzernameAdm")

    correctValues =
        () =>
        [ [valueTitelAdm, "Frau"]
        , [valueNameAdm, "Musterfrau"]
        , [valueVornameAdm, "Erika"]
        , [valueEmailAdm, "email@web.de"]
        , [valueTelefonAdm, "465756"]
        , [valueFaxAdm, "567534"]
        , [valueMobiltelefonAdm, "56756"]
        , [valueBenutzernameAdm, "User"]
        ]
        .every(a => a[0] == a[1])

    describe("Test search navigation")
    assert(correctValues())(true)("Search")


    // clear fields
    await click("#admHinz")

    await page.type("#titelAdm", "Titel", {delay: 200})
    await page.type("#nameAdm", "Name", {delay: 200})
    await page.type("#vornameAdm", "Vorname", {delay: 200})
    await page.type("#emailAdm", "Email", {delay: 200})
    await page.type("#telefonAdm", "Telefon", {delay: 200})
    await page.type("#faxAdm", "Fax", {delay: 200})
    await page.type("#mobiltelefonAdm", "Mobiltelefon", {delay: 200})
    await page.type("#benutzernameAdm", "Benutzername", {delay: 200})
    await page.type("#passwortAdm", "Passwort", {delay: 200})

    // click save
    await click("#admSpeichern")

    // navigate to previous record
    await click("#admPrevious")

    // navigate to newly created(next)
    await click("#admNext")

    // admin form fields
    valueTitelAdm = await value("#titelAdm")
    valueNameAdm = await value("#nameAdm")
    valueVornameAdm = await value("#vornameAdm")
    valueEmailAdm = await value("#emailAdm")
    valueTelefonAdm = await value("#telefonAdm")
    valueFaxAdm = await value("#faxAdm")
    valueMobiltelefonAdm = await value("#mobiltelefonAdm")
    valueBenutzernameAdm = await value("#benutzernameAdm")

    // compare values
    correctValues =
        () =>
        [ [valueTitelAdm, "Titel"]
        , [valueNameAdm, "Name"]
        , [valueVornameAdm, "Vorname"]
        , [valueEmailAdm, "Email"]
        , [valueTelefonAdm, "Telefon"]
        , [valueFaxAdm, "Fax"]
        , [valueMobiltelefonAdm, "Mobiltelefon"]
        , [valueBenutzernameAdm, "Benutzername"]
        ]
        .every(a => a[0] == a[1])

    describe("Test saving new adm")
    assert(correctValues())(true)("Create new")

    // Test changing an adm

    // changes to apply
    changeTitelAdm = "Fest"
    changeNameAdm = "Rest"
    changeVornameAdm = "200"
    changeEmailAdm = "96"
    changeTelefonAdm = "Hueckeswagen"
    changeFaxAdm = "11"
    changeMobiltelefonAdm = "nummer"
    changeBenutzernameAdm = "mann"

    // Changing values
    await page.type("#titelAdm", changeTitelAdm, {delay: 200})
    await page.type("#nameAdm", changeNameAdm, {delay: 200})
    await page.type("#vornameAdm", changeVornameAdm, {delay: 200})
    await page.type("#emailAdm", changeEmailAdm, {delay: 200})
    await page.type("#telefonAdm", changeTelefonAdm, {delay: 200})
    await page.type("#faxAdm", changeFaxAdm, {delay: 200})
    await page.type("#mobiltelefonAdm", changeMobiltelefonAdm, {delay: 200})
    await page.type("#benutzernameAdm", changeBenutzernameAdm, {delay: 200})
    
    // save changed adm
    await click("#admSpeichern")

    // accept dialog
    await click("#saveAdmOk")

    // navigate to previous record
    await click("#admPrevious")

    // navigate to changed record(next)
    await click("#admNext")

    // admin form fields
    valueTitelAdm = await value("#titelAdm")
    valueNameAdm = await value("#nameAdm")
    valueVornameAdm = await value("#vornameAdm")
    valueEmailAdm = await value("#emailAdm")
    valueTelefonAdm = await value("#telefonAdm")
    valueFaxAdm = await value("#faxAdm")
    valueMobiltelefonAdm = await value("#mobiltelefonAdm")
    valueBenutzernameAdm = await value("#benutzernameAdm")

    // compare values
    correctValues =
        () =>
        [ [valueTitelAdm, "Titel" + changeTitelAdm]
        , [valueNameAdm, "Name" + changeNameAdm]
        , [valueVornameAdm, "Vorname" + changeVornameAdm]
        , [valueEmailAdm, "Email" + changeEmailAdm]
        , [valueTelefonAdm, "Telefon" + changeTelefonAdm]
        , [valueFaxAdm, "Fax" + changeFaxAdm]
        , [valueMobiltelefonAdm, "Mobiltelefon" + changeMobiltelefonAdm]
        , [valueBenutzernameAdm, "Benutzername" + changeBenutzernameAdm]
        ]
        .every(a => a[0] == a[1])

    describe("Test changing an adm")
    assert(correctValues())(true)("Change existing")

    // Test deleting an adm

    // navigate to last record
    await click("#admLast")
    
    // click löschen
    await click1("#admLoeschen")
    
    // navigate to last record
    await click("#admLast")

    // admin form fields
    valueTitelAdm = await value("#titelAdm")
    valueNameAdm = await value("#nameAdm")
    valueVornameAdm = await value("#vornameAdm")
    valueEmailAdm = await value("#emailAdm")
    valueTelefonAdm = await value("#telefonAdm")
    valueFaxAdm = await value("#faxAdm")
    valueMobiltelefonAdm = await value("#mobiltelefonAdm")
    valueBenutzernameAdm = await value("#benutzernameAdm")
    
    // check if at least 4 values differ
    correctValues =
        () =>
        [ [valueTitelAdm, "Titel" + changeTitelAdm]
        , [valueNameAdm, "Name" + changeNameAdm]
        , [valueVornameAdm, "Vorname" + changeVornameAdm]
        , [valueEmailAdm, "Email" + changeEmailAdm]
        , [valueTelefonAdm, "Telefon" + changeTelefonAdm]
        , [valueFaxAdm, "Fax" + changeFaxAdm]
        , [valueMobiltelefonAdm, "Mobiltelefon" + changeMobiltelefonAdm]
        , [valueBenutzernameAdm, "Benutzername" + changeBenutzernameAdm]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 3

    describe("Test deleting an adm")
    assert(correctValues())(true)("Delete")

    // Test Benutzer
    //
    
    describeTest("TEST BENUTZER")
    
    // Test navigation to Benutzer tab
    //
    await testTabNavigation("#benMenu", "#tabBen", "ben")

    // Test creating a new Benutzer
    //
    // Test clearing fields
    //
    // fill fields
    await page.type("#titelBen", "Titel")
    await page.type("#nameBen", "Name")
    await page.type("#vornameBen", "Vorname")
    await page.type("#emailBen", "EMail")
    await page.type("#telefonBen", "Telefon")
    await page.type("#faxBen", "Fax")
    await page.type("#mobiltelefonBen", "Mobiltelefon")
    await page.type("#benutzernameBen", "Benutzername")
    await page.type("#passwortBen", "Passwort")

    // clear fields
    await click("#benHinz")

    // benutzer form fields
    valueTitelBen = await value("#titelBen")
    valueNameBen = await value("#nameBen")
    valueVornameBen = await value("#vornameBen")
    valueEmailBen = await value("#emailBen")
    valueTelefonBen = await value("#telefonBen")
    valueFaxBen = await value("#faxBen")
    valueMobiltelefonBen = await value("#mobiltelefonBen")
    valueBenutzernameBen = await value("#benutzernameBen")
    valuePasswortBen = await value("#passwortBen")

    allEmpty =
        () =>
        [ valueTitelBen
        , valueNameBen
        , valueVornameBen
        , valueEmailBen
        , valueTelefonBen
        , valueFaxBen
        , valueMobiltelefonBen
        , valueBenutzernameBen
        , valuePasswortBen
        ]
        .every(a => String(a) === "") 

    describe("Test creating a new Benutzer")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    // create new ben
    //
    // switch select to Mustermandant
    //
    await select(".manGrpPfad", "man_ID-3")
    await select(".manGrpPfad", "man_ID-5")
    await select(".manGrpPfad", "man_ID-1")

    // Test search navigation
    await click("#benSuchen")
    
    // dblclick second record in list
    await dblclick("#tblBenSuchen > tbody > tr.even > td:nth-child(3)")
            
    // benutzer form fields
    valueTitelBen = await value("#titelBen")
    valueNameBen = await value("#nameBen")
    valueVornameBen = await value("#vornameBen")
    valueEmailBen = await value("#emailBen")
    valueTelefonBen = await value("#telefonBen")
    valueFaxBen = await value("#faxBen")
    valueMobiltelefonBen = await value("#mobiltelefonBen")
    valueBenutzernameBen = await value("#benutzernameBen")

    correctValues =
        () =>
        [ [valueTitelBen, "Herr"]
        , [valueNameBen, "Tekniepe"]
        , [valueVornameBen, "Alfred"]
        , [valueEmailBen, ""]
        , [valueTelefonBen, ""]
        , [valueFaxBen, ""]
        , [valueMobiltelefonBen, ""]
        , [valueBenutzernameBen, "A.Tekniepe"]
        ]
        .every(a => a[0] == a[1])

    describe("Test search navigation")
    assert(correctValues())(true)("Search")


    // clear fields
    await click("#benHinz")

    await page.type("#titelBen", "Titel", {delay: 200})
    await page.type("#nameBen", "Name", {delay: 200})
    await page.type("#vornameBen", "Vorname", {delay: 200})
    await page.type("#emailBen", "Email", {delay: 200})
    await page.type("#telefonBen", "Telefon", {delay: 200})
    await page.type("#faxBen", "Fax", {delay: 200})
    await page.type("#mobiltelefonBen", "Mobiltelefon", {delay: 200})
    await page.type("#benutzernameBen", "Benutzername", {delay: 200})
    await page.type("#passwortBen", "Passwort", {delay: 200})

    // click save
    await click("#benSpeichern")

    // navigate to previous record
    await click("#benLast")

    // benutzer form fields
    valueTitelBen = await value("#titelBen")
    valueNameBen = await value("#nameBen")
    valueVornameBen = await value("#vornameBen")
    valueEmailBen = await value("#emailBen")
    valueTelefonBen = await value("#telefonBen")
    valueFaxBen = await value("#faxBen")
    valueMobiltelefonBen = await value("#mobiltelefonBen")
    valueBenutzernameBen = await value("#benutzernameBen")

    // compare values
    correctValues =
        () =>
        [ [valueTitelBen, "Titel"]
        , [valueNameBen, "Name"]
        , [valueVornameBen, "Vorname"]
        , [valueEmailBen, "Email"]
        , [valueTelefonBen, "Telefon"]
        , [valueFaxBen, "Fax"]
        , [valueMobiltelefonBen, "Mobiltelefon"]
        , [valueBenutzernameBen, "Benutzername"]
        ]
        .every(a => a[0] == a[1])

    describe("Test saving new ben")
    assert(correctValues())(true)("Create new")

    // Test changing a ben

    // changes to apply
    changeTitelBen = "Fest"
    changeNameBen = "Rest"
    changeVornameBen = "200"
    changeEmailBen = "96"
    changeTelefonBen = "Hueckeswagen"
    changeFaxBen = "11"
    changeMobiltelefonBen = "nummer"
    changeBenutzernameBen = "mann"

    // Changing values
    await page.type("#titelBen", changeTitelBen, {delay: 200})
    await page.type("#nameBen", changeNameBen, {delay: 200})
    await page.type("#vornameBen", changeVornameBen, {delay: 200})
    await page.type("#emailBen", changeEmailBen, {delay: 200})
    await page.type("#telefonBen", changeTelefonBen, {delay: 200})
    await page.type("#faxBen", changeFaxBen, {delay: 200})
    await page.type("#mobiltelefonBen", changeMobiltelefonBen, {delay: 200})
    await page.type("#benutzernameBen", changeBenutzernameBen, {delay: 200})
    
    // save changed ben
    await click("#benSpeichern")

    // accept dialog
    await click("#saveBenOk")

    // navigate to changed record(next)
    await click1("#benLast")

    // benutzer form fields
    valueTitelBen = await value("#titelBen")
    valueNameBen = await value("#nameBen")
    valueVornameBen = await value("#vornameBen")
    valueEmailBen = await value("#emailBen")
    valueTelefonBen = await value("#telefonBen")
    valueFaxBen = await value("#faxBen")
    valueMobiltelefonBen = await value("#mobiltelefonBen")
    valueBenutzernameBen = await value("#benutzernameBen")

    // compare values
    correctValues =
        () =>
        [ [valueTitelBen, "Titel" + changeTitelBen]
        , [valueNameBen, "Name" + changeNameBen]
        , [valueVornameBen, "Vorname" + changeVornameBen]
        , [valueEmailBen, "Email" + changeEmailBen]
        , [valueTelefonBen, "Telefon" + changeTelefonBen]
        , [valueFaxBen, "Fax" + changeFaxBen]
        , [valueMobiltelefonBen, "Mobiltelefon" + changeMobiltelefonBen]
        , [valueBenutzernameBen, "Benutzername" + changeBenutzernameBen]
        ]
        .every(a => a[0] == a[1])

    describe("Test changing a ben")
    assert(correctValues())(true)("Change existing")

    // Test deleting a ben

    // navigate to last record
    await click("#benLast")
    
    // click löschen
    await click1("#benLoeschen")
    
    // navigate to last record
    await click("#benLast")

    // benutzer form fields
    valueTitelBen = await value("#titelBen")
    valueNameBen = await value("#nameBen")
    valueVornameBen = await value("#vornameBen")
    valueEmailBen = await value("#emailBen")
    valueTelefonBen = await value("#telefonBen")
    valueFaxBen = await value("#faxBen")
    valueMobiltelefonBen = await value("#mobiltelefonBen")
    valueBenutzernameBen = await value("#benutzernameBen")
    
    // check if at least 4 values differ
    correctValues =
        () =>
        [ [valueTitelBen, "Titel" + changeTitelBen]
        , [valueNameBen, "Name" + changeNameBen]
        , [valueVornameBen, "Vorname" + changeVornameBen]
        , [valueEmailBen, "Email" + changeEmailBen]
        , [valueTelefonBen, "Telefon" + changeTelefonBen]
        , [valueFaxBen, "Fax" + changeFaxBen]
        , [valueMobiltelefonBen, "Mobiltelefon" + changeMobiltelefonBen]
        , [valueBenutzernameBen, "Benutzername" + changeBenutzernameBen]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 3

    describe("Test deleting a ben")
    assert(correctValues())(true)("Delete")

    await browser.close()
})()