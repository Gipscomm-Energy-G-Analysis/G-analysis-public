const puppeteer = require('puppeteer');

(async () => {

  const assert = 
    actual => 
    expected =>
    name =>
    console.log(actual === expected ? `${name} passed.` : `${name} failed !! expected -> ${expected}, actual -> ${actual}`)

  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto('http://localhost:8080', {
    waitUntil: 'networkidle0',
  })


  // Test getting to login from landing page
  //
  await page.click("#loginButton")

  const urlLogin = await page.url()

  console.log("")
  console.log("Test landingpage to login navigation")
  assert(urlLogin)("http://localhost:8080/login.html")("Landing page") 

  
  // Test login
  //
  await page.waitForSelector('#user')
  await page.waitForSelector('#pw')

  await page.type("#user", "sdm", {delay: 100})
  await page.type("#pw", "eug34=JC_#8ZR6zegts@", {delay: 100})
  
  await page.click("#btnLogin")

  await page.waitForNavigation()

  const urlMain = await page.url()

  console.log("")
  console.log("Test login")
  assert(urlMain)("http://localhost:8080/main.html")("Login")

  // Test navigation to betreuergruppen tab
  //
  await page.evaluate(() => document.querySelector("#betrGrpMenu").click(), "#betrGrpMenu")

  const valBgColor = await page.evaluate(() => window.getComputedStyle(document.querySelector('#tabBetrGrp')).getPropertyValue("background-color"))
  
  prepRgb = 
    val =>
    valBgColor.split(",")
    .flatMap(a => a.split("("))
    .flatMap(a => a.split(")"))
    .filter(a => a !== "")
    .filter(a => !isNaN(a)).join(",")

  console.log("")
  console.log("Test betrGrp tab navigation")
  assert(prepRgb(valBgColor))("206, 214, 222")("Tab navigation")

  // Test creating a new Betreuergruppe
  //
  // Test clearing fields
  //
  await page.click("#betrGrpHinz")

  await page.waitForSelector("#firmaBetrGrp")
  const elementFirma = await page.$("#firmaBetrGrp")
  const valueFirma = await page.evaluate(el => el.textContent, elementFirma)

  await page.waitForSelector("#anzahlMitarbeiterBetrGrp")
  const elementMitarbeiter = await page.$("#anzahlMitarbeiterBetrGrp")
  const valueMitarbeiter = await page.evaluate(el => el.textContent, elementMitarbeiter)

  await page.waitForSelector("#anschriftBetrGrp")
  const elementAnschrift = await page.$("#anschriftBetrGrp")
  const valueAnschrift = await page.evaluate(el => el.textContent, elementAnschrift)

  await page.waitForSelector("#plzBetrGrp")
  const elementPlz = await page.$("#plzBetrGrp")
  const valuePlz = await page.evaluate(el => el.textContent, elementPlz)

  await page.waitForSelector("#ortBetrGrp")
  const elementOrt = await page.$("#ortBetrGrp")
  const valueOrt = await page.evaluate(el => el.textContent, elementOrt)

  await page.waitForSelector("#geschaeftsfuehrerBetrGrp")
  const elementGeschaeftsfuehrer = await page.$("#geschaeftsfuehrerBetrGrp")
  const valueGeschaeftsfuehrer = await page.evaluate(el => el.textContent, elementGeschaeftsfuehrer)

  await page.waitForSelector("#telefonBetrGrp")
  const elementTelefon = await page.$("#telefonBetrGrp")
  const valueTelefon = await page.evaluate(el => el.textContent, elementTelefon)

  await page.waitForSelector("#emailBetrGrp")
  const elementEmail = await page.$("#emailBetrGrp")
  const valueEmail = await page.evaluate(el => el.textContent, elementEmail)

  await page.waitForSelector("#notizBetrGrp")
  const elementNotiz = await page.$("#notizBetrGrp")
  const valueNotiz = await page.evaluate(el => el.textContent, elementNotiz)

  const allEmpty =
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
    ].every(a => a === "")

  console.log("")
  console.log("Test creating a new Betreuergruppe")
  console.log("")
  console.log("## Test clearing fields")
  assert(allEmpty())(true)("Clear fields")

  await browser.close()
})()