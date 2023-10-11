const chai = require("chai");
const { WebDriver, By, until } = require("selenium-webdriver");
const mainDriver = require("./utils/mainDrivers");
const Homepage = require("./pageObject/Homepage");
const Detailpage = require("./pageObject/Detailpage");

const expect = chai.expect;

describe("Book For Visa Testing", function () {
  /**@type {WebDriver} */ let driver;
  /**@type {Homepage} */ let homePage;
  /**@type {Detailpage} */ let detailPage;

  before(async function () {
    driver = await mainDriver();
    homePage = new Homepage(driver);
    detailPage = new Detailpage(driver);
  });
  after(async function () {
    // await new Promise((done) => setTimeout(done, 5000));
    await driver.close();
  });
  describe("Home Page", function () {
    it("View Detail Product", async function () {
      await homePage.openPage();
      // await driver.manage().timeouts().implicitlyWait(2000);
      await homePage.closeModal();
      await homePage.selectBook();
    });
    it("Select Format", async function () {
      // await driver.manage().timeouts().implicitlyWait(2000);

      await detailPage.clickFormat();
      await detailPage.selectFormat();
    });
    it("Add To Cart", async function () {
      await driver
        .findElement(
          By.css(
            "#sticky-quantity > div > div > gm-button-add-to-cart > div > div > div > button.cart-btn"
          )
        )
        .click();
    });
    it("Fill Login Form", async function () {
      await driver
        .findElement(By.css("#mat-input-0"))
        .sendKeys("gue.fafa00@gmail.com");
      await driver.findElement(By.css("#mat-input-1")).sendKeys("Bismillah*1");
      await driver
        .findElement(
          By.css(
            "#content > gm-login > div > div.auth-left > div > form > button"
          )
        )
        .click();
    });
    it("View Cart", async function () {
      await driver.wait(until.elementLocated('//*[@id="cart-area"]')).click();
      await driver.sleep(5000);
      await driver.wait(
        until.elementLocated("#cdk-overlay-0 > div > div > div > div > button")
      );
    });
  });
});
