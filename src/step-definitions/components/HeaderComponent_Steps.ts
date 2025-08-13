import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CucumberWorld } from "../world/cucumberWorld";

Then(
  "In the main menu there is a SharValue logo",
  async function (this: CucumberWorld) {
    const logo = await this.headerComponent.getShareValueLogo();
    await expect(logo).toBeVisible();
  }
);
Then("I click on the logo", async function (this: CucumberWorld) {
  await this.headerComponent.clickOnMenuItem("ShareValue B.V.");
});

When(
  "I click on the {string} in the header",
  async function (this: CucumberWorld, menuItem: string) {
    console.log(menuItem);
    await this.headerComponent.clickOnMenuItem(menuItem);
  }
);

Then(
  "The page title is {string}",
  async function (this: CucumberWorld, title: string) {
    const headingText = await this.headerComponent.getPageTitle(title);
    await expect(headingText).toBe(title);
  }
);
