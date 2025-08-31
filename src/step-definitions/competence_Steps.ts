import { Given, When, Then } from "@cucumber/cucumber";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

const URL = "https://sharevalue.nl/wat-we-doen";

// AZURE PAGE
Given(
  "I navigate to the {string} competence page",
  async function (this: App, expertise: string) {
    try {
      await this.basePage.navigate(`${URL}/${expertise.toLowerCase()}`);
      logger.info(`Navigating to ${URL}/${expertise}`);
      this.setUrl(`${URL}/${expertise.toLowerCase()}`);
    } catch (error) {
      logger.error(`Error navigating to ${URL}/${expertise}: ${error}`);
      throw new Error(`Failed to navigate to  ${URL}/${expertise}`);
    }
  }
);

Then("I should see an introduction paragraph", async function (this: App) {
  const article = await this.basePage.getBaseLocator("article");
  const introParagraph = article.locator("p").first();
  await expect(introParagraph).toBeVisible();
});

Then("That paragraph has a image for the intro", async function (this: App) {
  const article = await this.basePage.getBaseLocator("article");
  const introImage = article.locator("img");
  await expect(introImage).toBeVisible();
});
