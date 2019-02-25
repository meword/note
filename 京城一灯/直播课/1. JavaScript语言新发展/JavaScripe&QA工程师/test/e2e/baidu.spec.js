const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('向日葵', Key.RETURN);
    await driver.wait(until.titleIs('向日葵_百度搜索'), 1000);
  } finally {
    await driver.quit();
  }
})();