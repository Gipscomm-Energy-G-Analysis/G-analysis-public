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

const production_charts = {
    production_chart: 'div[data-target="#graphCollapseTwo"]',
};

const charts = {
    chart: 'label[for="productGraphModeSelector"]',
  };

const efficency_graphs = {
    efficency_graph: 'a[data_key="1"]',
  };

const power_graphs = {
    power_graph: 'a[data_key="0"]',
  };

const create_graphs = {
    // Create Graph 
//   create_graph: 'button[id="product_create_graph"]',

// ***Or***

// Create Graph (New Window)
create_graph: 'button[id="product_create_graph_window"]',

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

// Production Charts 
  await page.click(production_charts.production_chart);
  await delay(10000);

// No. of Records
  await page.select("select#timeFilterProduction", "100");
  await delay(10000);

//   Efficency_graph
  await page.click(efficency_graphs.efficency_graph);
  await delay(10000);

//   Power Graph 
  await page.click(power_graphs.power_graph);
  await delay(10000);


  //  Production Charts-> Graph Mode
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
