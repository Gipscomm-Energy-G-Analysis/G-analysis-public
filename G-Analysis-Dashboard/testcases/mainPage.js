const puppeteer = require('puppeteer');

let config = {
    launchOptions: {
        headless:false
    }
}

puppeteer.launch(config.launchOptions).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://g-analysis.de/');
    // await browser.close();
});