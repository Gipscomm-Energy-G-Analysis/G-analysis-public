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
  // await page.setViewport({ width: 1280, height: 1600 });
  await delay(10000);

  // Dashboard Page
  // await page.select(".manPfad", "HBS-gipshold");
   await delay(5000);
  await page.click(evaluation.auswertungen);
  await page.click("#menuProduktionAusw");
  await delay(5000);

await page.evaluate(() => {
    document.querySelector('img[event-type="next"]').click();
});
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

 await page.click("#headingFour");
const kpiRecordFilter = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#kpiRecordFilter option')).map(element=>element.value)
  );
console.log(kpiRecordFilter)

  for(let index =0;index<kpiRecordFilter.length;index++){
     //   Auto Scroll
  (async () => {
    await autoScroll(page);
  })();
    let kpiRecordFilterValue = kpiRecordFilter[index];
    await delay(5000);
    console.log(kpiRecordFilterValue);
    await page.select("select#kpiRecordFilter", kpiRecordFilterValue);
    await delay(5000);
  }

  const timeFilterIntervalMixed = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#timeFilterIntervalMixed option')).map(element=>element.value)
  );
console.log(timeFilterIntervalMixed)

  for(let index =0;index<timeFilterIntervalMixed.length;index++){
    let timeFilterIntervalMixedValue = timeFilterIntervalMixed[index];
    await delay(5000);
    console.log(timeFilterIntervalMixedValue);
    await page.select("select#timeFilterIntervalMixed", timeFilterIntervalMixedValue);
    await delay(5000);
  }

  const orderFilterMixed = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#orderFilterMixed option')).map(element=>element.value)
  );
console.log(orderFilterMixed)

  for(let index =0;index<orderFilterMixed.length;index++){
    let orderFilterMixedValue = orderFilterMixed[index];
    await delay(5000);
    console.log(orderFilterMixedValue);
     await page.select("select#orderFilterMixed", orderFilterMixedValue);
     await delay(5000);
  }
//   Production Charts 
 /* await page.select("select#orderFilterProduction", "100899404");
  await delay(5000);*/

  // **Graph Name** 
  /*await page.select("select#timeFilterIntervalProduction", "Total Goods");
  await delay(5000);*/

  // **No. of Records** 
  /*await page.select("select#timeFilterProduction", "100");
  await delay(5000);*/

  // **Create Graph**
  //await page.click(create_graphs.create_graph);
  // await delay(10000);  

 await page.click('label[for="mixedGraphModeSelector"]');
 await delay(2000);
 /*const productPeriodFilterInterval = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#productPeriodFilterInterval option')).map(element=>element.value)
  );
 console.log(productPeriodFilterInterval)

  for(let index =0;index<productPeriodFilterInterval.length;index++){
    let productPeriodFilterIntervalValue = productPeriodFilterInterval[index];
    await delay(5000);
    console.log(productPeriodFilterIntervalValue);
    await page.select("select#productPeriodFilterInterval", productPeriodFilterIntervalValue);
    await delay(5000);
  }*/
  console.log("puppeteer test");
   await delay(2000);  
   await browser.close();
});
