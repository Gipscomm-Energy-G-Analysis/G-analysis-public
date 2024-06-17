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

const viewmode = {
    view: 'label[class="btn btn-success toggle-on"]'
}

const groupcolumns = {
     groupcolumn_on: 'label[for="modeSelectorColumns"]'
}

const groupcolumn = {
    groupcolumn_off: 'label[class="btn btn-info toggle-off"]'
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

puppeteer.launch(config.launchOptions).then(async browser => {
    // const browser = await puppeteer.launch()

    // Website Main Page 
    const page = await browser.newPage()
    await page.goto('http://g-analysis.de/login.html');
    // Login Page 
    await page.waitFor(loginPage.username);
    await page.type(loginPage.username, "Deepak");
    await page.type(loginPage.password, "sgFPY0rjXfpKBBrvm5X3");
    await page.click(loginPage.login);
    await page.setViewport({ width: 1280, height: 800 });
    await delay(10000);
    // Dashboard Page 
    await page.select('.manPfad', 'HBS-gipshold');
    await delay(10000);
    await page.click(evaluation.auswertungen);
    await page.click('#menuProduktionAusw');
    await page.click(production.product);
    await delay(10000);
    // Production Page 
    await page.click(viewmode.view);
    await delay(10000);
    // Group Columns
    await page.click(groupcolumns.groupcolumn_on);
    await delay(10000);
    await page.click(groupcolumn.groupcolumn_off);
    
    console.log("puppeteer test");
   });