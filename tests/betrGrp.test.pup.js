puppeteer = require('puppeteer');
colors = require("colors");

(async () => {

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
            await page.waitForTimeout(1000)
            
            await page.click(selector, { clickCount: 2 }) 

            await page.waitForTimeout(1000)
        }

    click1 =
        async selector => {
            await page.evaluate(selector_ => document.querySelector(selector_).click(), selector)
        }

    value = 
        async selector => {
            await page.waitForSelector(selector)
            element = await page.$(selector)
            return await page.evaluate(el => el.value, element) 
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
    await click1("#betrGrpMenu")

    valBgColor = await css("#tabBetrGrp", "background-color")
    
    prepRgb = 
        val =>
        val.split(",")
        .flatMap(a => a.split("("))
        .flatMap(a => a.split(")"))
        .filter(a => a !== "")
        .filter(a => !isNaN(a)).join(",")

    describe("Test betrGrp tab navigation")
    assert(prepRgb(valBgColor))("206, 214, 222")("Tab navigation")

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
        , [valueNotizBetrGrp, ""]
        ]
        .every(a => a[0] == a[1])

    describe("Test search navigation")
    assert(correctValues())(true)("Search")

    // Test creating a new Betreuergruppe
    //
    // Test clearing fields
    //
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

    // create new betrGrp
    await page.type("#firmaBetrGrp", "Firma", {delay: 200})
    await page.type("#anzahlMitarbeiterBetrGrp", "10", {delay: 200})
    await page.type("#anschriftBetrGrp", "Anschrift", {delay: 200})
    await page.type("#plzBetrGrp", "PLZ", {delay: 200})
    await page.type("#ortBetrGrp", "Ort", {delay: 200})
    await page.type("#geschaeftsfuehrerBetrGrp", "Geschäftsführer", {delay: 200})
    await page.type("#telefonBetrGrp", "Telefon", {delay: 200})
    await page.type("#emailBetrGrp", "Email", {delay: 200})
    await page.type("#notizBetrGrp", "Notiz", {delay: 200})
    
    // click save
    await click("#betrGrpSpeichern")

    // accept dialog
    await click1("#saveBetrGrpOk")

    // navigate to first record
    await click1("#betrGrpFirst")

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
        , [valueNotizBetrGrp, "Notiz"]
        ]
        .every(a => a[0] == a[1])

    describe("Test creating a new Betreuergruppe")
    describe("Test clearing fields")
    assert(allEmpty())(true)("Clear fields")

    describe("Test saving new betrGrp")
    assert(correctValues())(true)("Create new")

    // Test deleting a betrGrp
    await click("#betrGrpLast")

    await click1("#betrGrpLoeschen")

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
        , [valueNotizBetrGrp, "Notiz"]
        ]
        .reduce((acc, a) => Number(acc) + Number(a[0] !== a[1] ? 1 : 0), 0) > 4

    describe("Test deleting a betrGrp")
    assert(correctValues())(true)("Delete")

    await browser.close()
})()