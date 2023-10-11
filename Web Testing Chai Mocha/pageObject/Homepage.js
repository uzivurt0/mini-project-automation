const { By } = require("selenium-webdriver");
const Routes = require("./Routes");

class Homepage extends Routes {
  constructor(driver) {
    super(driver);
  }

  selectBook = By.css(
    "#carousel-section-0 > div.home-category-container > div.items-section > gm-carousel-list > div > div > div > div > div.carousel-cell.is-selected > a"
  );
  async openPage() {
    await this.openUrl();
  }
  async closeModal() {
    await this.driver.wait(
      until.elementLocated(By.css("#close-button-1454703513202 > span"))
    );
  }
  async selectBook() {
    await this.driver.wait(until.elementLocated(this.selectBook)).click();
  }
}

module.exports = Homepage;
