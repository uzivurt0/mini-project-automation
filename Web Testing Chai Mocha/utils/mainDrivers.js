const { Builder, Browser } = require("selenium-webdriver");

async function mainDrivers() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().window().maximize();
  return driver;
}

module.exports = mainDrivers;
