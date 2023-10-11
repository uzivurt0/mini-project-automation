const { WebDriver, By } = require("selenium-webdriver");
class Routes {
  constructor(driver) {
    /**@type {WebDriver} */ this.driver = driver;
  }

  async openUrl(path = "/") {
    await this.driver.get("https://www.gramedia.com" + path);
  }

  async getTextByCss(selector) {
    return await this.driver.findElement(By.css(selector)).getText();
  }

  async getAttributeByCss(selector, attribute) {
    return await this.driver
      .findElement(By.css(selector))
      .getAttribute(attribute);
  }
}

module.exports = Routes;
