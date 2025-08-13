import { Given, When } from "@cucumber/cucumber";
// import { pageFixture } from "../step-definitions/hooks/browserContextFixture";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

const oldbaseUrl = "https://webdriveruniversity.com/";
const url = "https://www.sharevalue.nl/";

Given(
  "I navigate to webdriveruniversity homepage",
  async function (this: CucumberWorld) {
    try {
      await this.homePage.navigate(oldbaseUrl);
      logger.info(`Accessing URL: ${oldbaseUrl}`);
      this.setUrl(oldbaseUrl);
    } catch (error) {
      logger.error(`Error navigating to ${oldbaseUrl}: ${error}`);
    }
  }
);

When("I click on the contact us button", async function (this: CucumberWorld) {
  this.homePage.clickOnContactUsButton();
});

When(
  "I click on the login portal button",
  async function (this: CucumberWorld) {
    this.homePage.clickOnLoginPortalButton();
  }
);

// new sharevalue test below

Given(
  "I navigate to the ShareValue homepage",
  async function (this: CucumberWorld) {
    try {
      await this.headerComponent.navigate(url);
      logger.info(`Accessing URL: ${url}`);
      this.setUrl(url);
      // this.pageManager.page.pause();
    } catch (error) {
      logger.error(`Error navigating to ${url}: ${error}`);
    }
  }
);
