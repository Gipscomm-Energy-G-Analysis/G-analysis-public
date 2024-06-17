const puppeteer = require('puppeteer');

let config = {
    launchOptions: {
        headless:false
    }
}

const mouseclk = {
    next: 'button[class="fc-next-button btn btn-primary"]',
    previous: 'button[class="fc-prev-button btn btn-primary"]',
    // login: 'button[id="btnLogin"]'
}

// puppeteer.launch(config.launchOptions).then(async browser => {
//     const page = await browser.newPage();
//     await page.goto('http://g-analysis.de/main.html');
//     // await browser.close();
// });

puppeteer.launch(config.launchOptions).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://g-analysis.de/product-dashboard');
    // await page.waitFor(loginPage.username);
    await page.type(mouseclk.next);
    console.log("test");
    await page.type(mouseclk.previous);
    // await page.click(loginPage.login);
});