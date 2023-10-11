const { By, until } = require("selenium-webdriver");
const Routes = require("./Routes");

class Detailpage extends Routes {
  constructor(driver) {
    super(driver);
  }

  baca = By.css(
    "#col-info > div > div.col-md-8.p-3 > div > gm-product-detail-tabs > div:nth-child(1) > div > div:nth-child(3) > a"
  );
  viewFormat = By.css(
    "#col-info > div > div.col-md-8.p-3 > div > div:nth-child(4) > gm-product-view-format > div > div.format-carousel.flickity-enabled.is-draggable > div > div > div > div > button"
  );
  selectFormat = By.css(
    "#mat-dialog-0 > gm-product-view-format-store > div > div > div:nth-child(1) > div.modal-body > div > ul > li:nth-child(1) > div > button"
  );

  async openPage() {
    await this.openUrl("/products/one-piece-04-2023");
  }
  async clickBaca() {
    await this.driver.findElement(this.baca).click;
  }

  async clickFormat() {
    await this.driver.wait(until.elementLocated(this.viewFormat)).click();
  }

  async selectFormat() {
    await this.driver.wait(until.elementLocated(this.viewFormat)).click();
  }
}

module.exports = Detailpage;
