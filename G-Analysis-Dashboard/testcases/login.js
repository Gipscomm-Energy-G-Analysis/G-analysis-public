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

puppeteer.launch(config.launchOptions).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://g-analysis.de/login.html');
    await page.waitFor(loginPage.username);
    await page.type(loginPage.username, "Deepak");
    await page.type(loginPage.password, "sgFPY0rjXfpKBBrvm5X3");
    await page.click(loginPage.login);
});


