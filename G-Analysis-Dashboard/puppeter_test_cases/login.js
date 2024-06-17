const puppeteer = require('puppeteer');

let config = {
    launchOptions: {
        headless:false
    }
}

const loginPage = {
    username: 'input[id="user"]',
    password: 'input[id="pw"]',
    login: 'button[id="btnLogin"]'
}

const evaluation = {
    auswertungen: 'button[class="dropbtn text-muted menu_dashboard"]'
}

const production = {
    product: 'a[href="/product-dashboard"]'
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

puppeteer.launch(config.launchOptions).then(async browser => {
    // const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://g-analysis.de/login.html');
    await page.waitFor(loginPage.username);
    await page.type(loginPage.username, "Deepak");
    await page.type(loginPage.password, "sgFPY0rjXfpKBBrvm5X3");
    await page.click(loginPage.login);
    await page.setViewport({ width: 1280, height: 800 });
    await delay(10000);
    await page.select('.manPfad', 'HBS-gipshold');
    await delay(10000);
    await page.click(evaluation.auswertungen);
    // await delay(10000);
    await page.click('#menuProduktionAusw');
    // await delay(10000);
    await page.click(production.product);
    console.log("puppeteer test");
   });