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
await delay(5000);
 await page.click("#headingFour");
 //await page.waitForSelector('select#orderFilterProduction',{ visible: true,waitUntil: "option",timeout:0}).then(() => console.log('got it'));

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
  const kpiFormula = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#kpiFormula option')).map(element=>element.value)
  );
console.log(kpiFormula)

  for(let index =0;index<kpiFormula.length;index++){
    let kpiFormulaValue = kpiFormula[index];
    await delay(5000);
    console.log(kpiFormulaValue);
    await page.select("select#kpiFormula", kpiFormulaValue);
    await delay(5000);
  }

/*await delay(2000);
     await page.click(".multiselect-selected-text");
     await delay(2000);
           const els = await page.$$(".multiselect-native-select .form-check input[type=checkbox]");
       await delay(2000);
      const promises = els.map(e => e.checked = true);
       await delay(2000);
      await Promise.all(promises);
      await delay(2000);
      await page.click(".multiselect-selected-text");*/
       /*await page.evaluate(() => {
    for (const checkbox of document.querySelectorAll('.multiselect-native-select .form-check input[type=checkbox]')) {
      if (!checkbox.checked) checkbox.click();
    }
  });
  console.log('Done.');*/
  const kpiTimeFilter = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#kpiTimeFilter option')).map(element=>element.value)
  );
console.log(kpiTimeFilter)

  for(let index =0;index<kpiTimeFilter.length;index++){
    let kpiTimeFilterValue = kpiTimeFilter[index];
    await delay(5000);
    console.log(kpiTimeFilterValue);
     await page.select("select#kpiTimeFilter", kpiTimeFilterValue);
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

  console.log("puppeteer test");
   /*await delay(2000);  
   await browser.close();*/
});
