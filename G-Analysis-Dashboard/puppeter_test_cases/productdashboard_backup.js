const puppeteer = require("puppeteer");

let config = {
  launchOptions: {
    headless: false,
  },
};

const loginPage = {
  username: 'input[id="user"]',
  password: 'input[id="pw"]',
  login: 'button[id="btnLogin"]',
};

const evaluation = {
  auswertungen: 'button[class="dropbtn text-muted menu_dashboard"]',
};

const production = {
  product: 'a[href="/product-dashboard"]',
};

const viewmode = {
  view: 'label[class="btn btn-success toggle-on"]',
};

const editmode = {
  view: 'label[class="btn btn-info toggle-off"]',
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

puppeteer.launch(config.launchOptions).then(async (browser) => {
  // const browser = await puppeteer.launch()

  // Website Main Page
  const page = await browser.newPage();
  await page.goto("http://g-analysis.de/login.html");

  // Login Page
  await page.waitFor(loginPage.username);
  await page.type(loginPage.username, "Deepak");
  await page.type(loginPage.password, "sgFPY0rjXfpKBBrvm5X3");
  await page.click(loginPage.login);
  await page.setViewport({ width: 1280, height: 800 });
  await delay(10000);

  // Dashboard Page
  await page.select(".manPfad", "HBS-gipshold");
  await delay(5000);
  await page.click(evaluation.auswertungen);
  await page.click("#menuProduktionAusw");
  await page.click(production.product);
  await delay(5000);

  // Production Page
  await page.click(viewmode.view);
  await delay(5000);

  // Edit Sub Group Configuration
  await page.click("#select_group_options");
  await delay(5000);

  // **Anlagengruppe**
  await page.select("select#select_group_options", "1");
  await delay(5000);

  // **Tables**
  await page.select("select#select_group_table", "alarmEMailAdressen");
  await delay(5000);

  // **Primary Key**
  await page.select("select#primary_key_subGroup", "anl_ID");
  await delay(10000);

  // **Foreign Key**
  await page.select("select#foreign_key_subGroup", "almMail_ID");
  await delay(10000);

  // **Save Configuration**
  await page.click("#save_configuration_button");
  await delay(10000);
  await page.click(editmode.view);

//   Auto Scroll
  (async () => {
    await autoScroll(page);
  })();

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 10;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    // await page.waitForSelector(".class_name");
  }

  console.log("puppeteer test");
});
