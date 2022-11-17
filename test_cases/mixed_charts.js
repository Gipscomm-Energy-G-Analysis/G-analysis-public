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

 await page.click("#headingThree");
const timeFilterMixed = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#timeFilterMixed option')).map(element=>element.value)
  );
console.log(timeFilterMixed)

  for(let index =0;index<timeFilterMixed.length;index++){
     //   Auto Scroll
  (async () => {
    await autoScroll(page);
  })();
    let timeFilterMixedValue = timeFilterMixed[index];
    await delay(5000);
    console.log(timeFilterMixedValue);
    await page.select("select#timeFilterMixed", timeFilterMixedValue);
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
await page.evaluate( () => {
                window.scrollTo(300, 400);
            });
await delay(2000);
 await page.click('label[for="mixedGraphModeSelector"]');
 await delay(2000);
 await page.evaluate( () => {
    window.scrollTo(300, 400);
  });
 const mixedGraphFilterHistory = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#mixedGraphFilter option')).map(element=>element.value)
  );
 mixedGraphFilterArray = mixedGraphFilterHistory.filter(item => item);
 console.log(mixedGraphFilterArray)

  for(let index =0;index<mixedGraphFilterArray.length;index++){
    let mixedGraphFilterValue = mixedGraphFilterArray[index];
    await delay(5000);
    console.log(mixedGraphFilterValue);
    await page.select("select#mixedPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#mixedTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#mixedYearFilterInterval", "2022");
    await delay(2000);
    await page.select("select#mixedGraphFilter", mixedGraphFilterValue);
    await delay(5000);
    await page.click('button[id="mixed_create_graph"]');
      await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<mixedGraphFilterArray.length;index++){
    let mixedGraphFilterValue = mixedGraphFilterArray[index];
    await delay(5000);
    console.log(mixedGraphFilterValue);
    await page.select("select#mixedPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#mixedTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#mixedYearFilterInterval", "2021");
    await delay(2000);
    await page.select("select#mixedGraphFilter", mixedGraphFilterValue);
    await delay(5000);
    await page.click('button[id="mixed_create_graph"]');
      await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<mixedGraphFilterArray.length;index++){
    let mixedGraphFilterValue = mixedGraphFilterArray[index];
    await delay(5000);
    console.log(mixedGraphFilterValue);
    await page.select("select#mixedPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#mixedTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#mixedYearFilterInterval", "2020");
    await delay(2000);
    await page.select("select#mixedGraphFilter", mixedGraphFilterValue);
    await delay(5000);
    await page.click('button[id="mixed_create_graph"]');
     await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }

  for(let index =0;index<mixedGraphFilterArray.length;index++){
    let mixedGraphFilterValue = mixedGraphFilterArray[index];
    await delay(5000);
    console.log(mixedGraphFilterValue);
    await page.select("select#mixedPeriodFilterInterval", "year");
    await delay(2000);
    await page.select("select#mixedTypeFilterInterval", "line");
    await delay(2000);
    await page.select("select#mixedYearFilterInterval", "2019");
    await delay(2000);
    await page.select("select#mixedGraphFilter", mixedGraphFilterValue);
    await delay(5000);
    await page.click('button[id="mixed_create_graph"]');
     await page.evaluate( () => {
      window.scrollTo(300, 600);
    });
  }
  console.log("puppeteer test");
   await delay(2000);  
   await browser.close();
});
