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

const charts = {
  chart: 'label[for="graphModeSelector"]',
};

const create_graphs = {
    // Create Graph 
//   create_graph: 'button[id="create_graph"]',

// Create Graph (New Window)
create_graph: 'button[id="create_graph_window"]',

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
  await page.waitForTimeout(loginPage.username);
  await page.type(loginPage.username, "Deepak");
  await page.type(loginPage.password, "ast15jbhMBDV1YJmmCY0");
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
  }
  await delay(10000);

//   Energy Charts 
  await page.select("select#timeFilter", "100");
  await delay(5000);

  //  Energy Charts-> Graph Mode
  await page.click(charts.chart);
  await delay(10000);

  // **Period** 
  await page.select("select#periodFilterInterval", "year");
  await delay(10000);

  // **Type** 
  await page.select("select#typeFilterInterval", "line");
  await delay(10000);

  // **Year** 
  await page.select("select#yearFilterInterval", "2020");
  await delay(10000);  

  // **Create Graph**
  await page.click(create_graphs.create_graph);
  // await delay(10000);  



  console.log("puppeteer test");
});
