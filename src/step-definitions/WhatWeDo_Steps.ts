import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

const URL = "https://sharevalue.nl/wat-we-doen";
const URL_AZURE = "https://sharevalue.nl/wat-we-doen/azure";

Given("I navigate to the wat we doen page", async function (this: App) {
  try {
    await this.basePage.navigate(URL);
    this.setUrl(URL);
  } catch (error) {
    logger.error(`Error navigating to ${URL}: ${error}`);
    throw new Error(`Failed to navigate to ${URL}`);
  }
});

const headerMapping: Record<string, { section: string; index: number }> = {
  first: { section: "intro", index: 0 },
  second: { section: "intro", index: 1 },
  third: { section: "expertise", index: 0 },
  fourth: { section: "intro", index: 2 },
};

Then(
  "I should see {string} as the {string} paragraph header",
  async function (this: App, headerText: string, order: string) {
    const mapping = headerMapping[order.toLowerCase()];

    if (!mapping) {
      throw new Error(`No mapping found for header order "${order}"`);
    }

    const headerLocator = await this.basePage.getSegmentLocator(
      mapping.section,
      "h2"
    );
    await expect(headerLocator.nth(mapping.index)).toHaveText(headerText);
  }
);

Then(
  "There is one clickable {word} block for {string}",
  async function (this: App, segmentKey: string, expertise: string) {
    const expertiseBlock = await this.basePage.getSegmentLocator(
      segmentKey,
      `ul li a[title="${expertise}"]`
    );

    await expect(expertiseBlock).toBeVisible();
    const expertiseUrl = expertise.replace(/\s+/g, "-").toLowerCase();
    const href = await expertiseBlock.getAttribute("href");
    expect(href).toBe(`/wat-we-doen/${expertiseUrl}`);
  }
);
