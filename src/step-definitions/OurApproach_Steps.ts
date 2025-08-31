import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";
import { base } from "@faker-js/faker/.";

const URL = "https://www.sharevalue.nl/onze-aanpak";

Given("I navigate to the our approach page", async function (this: App) {
  try {
    await this.basePage.navigate(URL);
    this.setUrl(URL);
  } catch (error) {
    logger.error(`Error navigating to ${URL}: ${error}`);
    throw new Error(`Failed to navigate to ${URL}`);
  }
});

Then(
  "I should see a paragraph containing the description about the {string}",
  async function (this: App, segmentKey: string) {
    const text = await this.basePage.getContent(segmentKey, " p", 2);
    await expect(text && text.trim().length).toBeGreaterThan(0);
  }
);
Then(
  "There is an image with the {string}",
  async function (this: App, segmentKey: string) {
    const image = await this.basePage.getSegmentLocator(segmentKey, "img");
    await expect(image).toBeVisible();
  }
);

Then(
  "I see {string} {string} segments on the page",
  async function (this: App, count: string, segmentKey: string) {
    const segments = await this.basePage.getSegmentLocator(segmentKey);
    await expect(segments).toHaveCount(parseInt(count));
  }
);

Then(
  "A content blok has a heading {string}",
  async function (this: App, title: string) {
    const heading = await pageFixture.page.getByRole("heading", {
      name: title,
    });

    await expect(heading).toBeVisible();
  }
);

Then(
  "This contentblok with heading {string} has an image",
  async function (this: App, heading: string) {
    const section = await this.basePage.page.locator(
      `section:has(h3:text-is("${heading}"))`
    );

    await expect(section.locator("img")).toHaveCount(1);
  }
);

Then(
  "This contentblok with heading {string} has an paragraph",
  async function (this: App, heading: string) {
    const section = await this.basePage.page.locator(
      `section:has(h3:text-is("${heading}"))`
    );

    await expect(section.locator("p").first()).toHaveCount(1);
  }
);

Then(
  "This contentblok has a button with text {string} and link to {string}",
  async function (this: App, label: string, link: string) {
    const button = await pageFixture.page.getByRole("link", { name: label });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("href", new RegExp(link));
  }
);
