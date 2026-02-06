const { describe } = require("mocha");
const { Builder, By, key } = require("selenium-webdriver");
var should = require("chai").should();

describe("Buy Flower Bundle Test", async function () {
  //navigate to flower bundle page

  it("should navigate to the website and select start shopping", async function () {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("https://petalsandpearls.netlify.app");

    //assert that the page button is present
    let startShoppingButton = await driver.findElement(
      By.xpath("//a[contains(text(), 'Start Shopping')]"),
    );

    // Get text and assert
    let buttonText = await startShoppingButton.getText();
    buttonText.should.equal("Start Shopping");

    // Click the element (still have the reference)
    await startShoppingButton.click();
  });

  //lets get all the actions buttons
  //   let startShoppingButton = await driver.findElement(
  //     By.xpath("//a[contains(text(), 'Start Shopping')]"),
  //   );

  //   let viewDetailsButton = await driver.findElement(
  //     By.xpath("//button[contains(text(), 'View Details')]"),
  //   );

  //   let addToCartButton = await driver.findElement(
  //     By.xpath("//button[contains(text(), 'Add to Cart')]"),
  //   );

  //   let buttonShouldChangeToAddedToCart = await driver.findElement(
  //     By.xpath("//button[contains(text(), '✓ Added to Cart')]"),
  //   );

  //view details of the first product
  // let detailsValue = await driver
  //   .findElement(By.xpath("//button[contains(text(), 'View Details')]"))
  //   .getText()
  //   .then(function (value) {
  //     return value;
  //   });

  // detailsValue.should.equal("View Details");

  // //click on the view details button
  // await detailsValue.click();

  // await driver.quit();
});

// buyFlowerBundleTest();
