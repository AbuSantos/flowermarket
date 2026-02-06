const { describe, it, beforeEach, afterEach } = require("mocha");
const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Petals & Pearls - Buy Flower Bundle", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("firefox").build();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it("should navigate to website and click Start Shopping", async function () {
    await driver.get("https://petalsandpearls.netlify.app");

    const startShoppingButton = await driver.findElement(
      By.xpath("//a[contains(text(), 'Start Shopping')]"),
    );

    const buttonText = await startShoppingButton.getText();
    expect(buttonText).to.equal("Start Shopping");

    await startShoppingButton.click();
  });

  it("should view details of the first product", async function () {
    await driver.get("https://petalsandpearls.netlify.app/products");

    const viewDetailsButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'View Details')]"),
    );

    const buttonText = await viewDetailsButton.getText();
    expect(buttonText).to.equal("View Details");

    await viewDetailsButton.click();
  });
});
