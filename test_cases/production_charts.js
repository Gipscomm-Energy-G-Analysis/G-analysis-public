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

 await page.click("#headingTwo");

const timeFilterProduction = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#timeFilterProduction option')).map(element=>element.value)
  );
console.log(timeFilterProduction)

  for(let index =0;index<timeFilterProduction.length;index++){
     //   Auto Scroll
  (async () => {
    await autoScroll(page);
  })();
    let timeFilter = timeFilterProduction[index];
    await delay(5000);
    console.log(timeFilter);
    await page.select("select#timeFilterProduction", timeFilter);
    await delay(5000);
  }

  const timeFilterIntervalProduction = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#timeFilterIntervalProduction option')).map(element=>element.value)
  );
console.log(timeFilterIntervalProduction)

  for(let index =0;index<timeFilterIntervalProduction.length;index++){
    let timeFilterInterval = timeFilterIntervalProduction[index];
    await delay(5000);
    console.log(timeFilterInterval);
    await page.select("select#timeFilterIntervalProduction", timeFilterInterval);
    await delay(5000);
  }

  const orderFilterProduction = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#orderFilterProduction option')).map(element=>element.value)
  );
console.log(orderFilterProduction)

  for(let index =0;index<orderFilterProduction.length;index++){
    let orderFilter = orderFilterProduction[index];
    await delay(5000);
    console.log(orderFilter);
     await page.select("select#orderFilterProduction", orderFilter);
     await delay(5000);
  }
  // **No. of Records** 
  /*await page.select("select#timeFilterProduction", "100");
  await delay(5000);*/ 
await page.evaluate( () => {
    window.scrollTo(300, 400);
  });
await delay(2000);
 await page.click('label[for="productGraphModeSelector"]');
 await delay(2000);
 await page.evaluate( () => {
    window.scrollTo(300, 400);
  });
 const productGraphFilter = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#productGraphFilter option')).map(element=>element.value)
  );
 productGraphFilterArray = productGraphFilter.filter(item => item);
 console.log(productGraphFilterArray)

  for(let index =0;index<productGraphFilterArray.length;index++){
    let productGraphFilterValue = productGraphFilterArray[index];
    await delay(5000);
    console.log(productGraphFilterValue);
    await page.select("select#productPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#productTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#productYearFilterInterval", "2022");
    await delay(2000);
    await page.select("select#productGraphFilter", productGraphFilterValue);
    await delay(5000);
    await page.click('button[id="product_create_graph"]');
      await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<productGraphFilterArray.length;index++){
    let productGraphFilterValue = productGraphFilterArray[index];
    await delay(5000);
    console.log(productGraphFilterValue);
    await page.select("select#productPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#productTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#productYearFilterInterval", "2021");
    await delay(2000);
    await page.select("select#productGraphFilter", productGraphFilterValue);
    await delay(5000);
    await page.click('button[id="product_create_graph"]');
      await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<productGraphFilterArray.length;index++){
    let productGraphFilterValue = productGraphFilterArray[index];
    await delay(5000);
    console.log(productGraphFilterValue);
    await page.select("select#productPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#productTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#productYearFilterInterval", "2020");
    await delay(2000);
    await page.select("select#productGraphFilter", productGraphFilterValue);
    await delay(5000);
    await page.click('button[id="product_create_graph"]');
     await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<productGraphFilterArray.length;index++){
    let productGraphFilterValue = productGraphFilterArray[index];
    await delay(5000);
    console.log(productGraphFilterValue);
    await page.select("select#productPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#productTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#productYearFilterInterval", "2019");
    await delay(2000);
    await page.select("select#productGraphFilter", productGraphFilterValue);
    await delay(5000);
    await page.click('button[id="product_create_graph"]');
     await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }
  console.log("puppeteer test");
   await delay(2000);  
   await browser.close();
});
