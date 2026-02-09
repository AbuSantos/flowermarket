import { describe, it, beforeEach, afterEach } from "mocha";
import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";

describe("Petals & Pearls - Buy Flower Bundle", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("firefox").build();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  // it("should navigate to website and click Start Shopping", async function () {
  //   await driver.get("http://localhost:3000/");

  //   const startShoppingButton = await driver.findElement(
  //     By.xpath("//a[contains(text(), 'Start Shopping')]"),
  //   );

  //   const buttonText = await startShoppingButton.getText();
  //   expect(buttonText).to.equal("Start Shopping");

  //   await startShoppingButton.click();
  // });

  // it("should view details of the first product", async function () {
  //   await driver.get("http://localhost:3000/products");

  //   const viewDetailsButton = await driver.findElement(
  //     By.xpath("//button[contains(text(), 'View Details')]"),
  //   );

  //   const buttonText = await viewDetailsButton.getText();
  //   expect(buttonText).to.equal("View Details");

  //   await viewDetailsButton.click();
  // });

  // it("should add the product to the cart", async function () {
  //   await driver.get("http://localhost:3000/products/1");

  //   const addToCartButton = await driver.findElement(
  //     By.xpath("//button[contains(text(), 'Add to Cart')]"),
  //   );
  //   const buttonText = await addToCartButton.getText();
  //   expect(buttonText).to.equal("Add to Cart");

  //   await addToCartButton.click();

  //   const addedToCartButton = await driver.findElement(
  //     By.xpath("//button[contains(text(), '✓ Added to Cart')]"),
  //   );
  //   const addedButtonText = await addedToCartButton.getText();
  //   expect(addedButtonText).to.equal("✓ Added to Cart");
  // });

  // it("should navigate to cart page", async function () {
  //   await driver.get("http://localhost:3000/products/1");

  //   const cartLink = await driver.findElement(
  //     By.xpath("//span[contains(text(), 'View Cart')]"),
  //   );

  //   const linkText = await cartLink.getText();

  //   expect(linkText).to.equal("View Cart");

  //   await cartLink.click();

  //   const currentUrl = await driver.getCurrentUrl();
  //   expect(currentUrl).to.include("/cart");
  // });

  //testing the increase in quantity of the product in the cart
  it("should increase the quantities of the product in the cart", async function () {
    await driver.get("http://localhost:3000/products/1");
    //button[normalize-space()='+']

    const increaseButton = await driver.findElement(
      By.xpath("//button[contains(text(), '+')]"),
    );

    await increaseButton.click();

    const quantityElement = await driver.findElement(
      By.xpath("//span[normalize-space()='2']"),
    );

    const quantityText = await quantityElement.getText();
    expect(quantityText).to.equal("2");
  });

  //testing the decrease in quantity of the product in the cart
  it("should decrease the quantities of the product in the cart", async function () {
    await driver.get("http://localhost:3000/products/1");

    //we increase the quantity first to make sure that we have at least 2 products in the cart before we decrease it
    const increaseButton = await driver.findElement(
      By.xpath("//button[contains(text(), '+')]"),
    );

    await increaseButton.click();

    const decreaseButton = await driver.findElement(
      By.xpath("//button[contains(text(), '−')]"),
    );

    await decreaseButton.click();

    const quantityElement = await driver.findElement(
      By.xpath("//span[normalize-space()='1']"),
    );

    const quantityText = await quantityElement.getText();
    expect(quantityText).to.equal("1");
  });
});
