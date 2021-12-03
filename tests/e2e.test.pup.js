const puppeteer = require('puppeteer');

(async () => {

  const assert = 
    actual => 
    expected =>
    name =>
    console.log(actual === expected ? `${name} passed.` : `${name} failed !! expected -> ${expected}, actual -> ${actual}`)

  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
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


  await browser.close()
})()