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

const machineTableConfiguration = {
    machineTableConfiguration: 'button[id="machine_table_configuration"]'
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
    // Machine Table Congfiguration
    await page.click(machineTableConfiguration.machineTableConfiguration);
    await delay(15000);
    // Non Selected Columns
    await page.select("select#bootstrap-duallistbox-nonselected-list_", "werkzeug");
    await delay(5000);
    await page.select("select#bootstrap-duallistbox-nonselected-list_", "gutmenge");
    await delay(5000);
    // Selected Columns
    await page.select("select#bootstrap-duallistbox-selected-list_", "werkzeug");
    await delay(5000);
     // **Save Configuration**
    await page.click("#save_table_configuration_button");
    await delay(10000);

    console.log("puppeteer test");
   });