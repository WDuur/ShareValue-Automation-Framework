import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";
import { base } from "@faker-js/faker/.";

Given(
  "I navigate to the our {string} page",
  async function (this: App, page: string) {
    try {
      await this.basePage.navigate(page);
    } catch (error) {
      logger.error(`Error navigating to ${page}: ${error}`);
      throw new Error(`Failed to navigate to ${page}`);
    }
  }
);

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
    const section = await this.contentBlockComponent.getContentBlockByHeading(
      heading
    );
    await expect(section.locator("img")).toHaveCount(1);
  }
);

Then(
  "This contentblok with heading {string} has an paragraph",
  async function (this: App, heading: string) {
    const section = await this.contentBlockComponent.getContentBlockByHeading(
      heading
    );
    await expect(section.locator("p").first()).toHaveCount(1);
  }
);

Then(
  "This contentblok has a button with text {string}",
  async function (this: App, label: string) {
    await this.contentBlockComponent.waitAndClickByRole("link", label);
  }
);

// Helper function to get a visible section
async function getVisibleSection(this: App, segmentKey: string) {
  const section = await this.basePage.getSegmentLocator(segmentKey);
  await expect(section).toBeVisible();
  return section;
}

// contact Persons
Then(
  "The {string} contact segment has a title {string}",
  async function (this: App, segmentKey: string, title: string) {
    const section = await getVisibleSection.call(this, segmentKey);
    const headerTxt = section.getByRole("heading", { name: title });
    await expect(headerTxt).toHaveText(title);
  }
);

Then(
  "On the {string} segment there is contact with the name {string}",
  async function (this: App, segmentKey: string, contactperson: string) {
    const section = await getVisibleSection.call(this, segmentKey);
    const person = section.getByRole("heading", { name: contactperson });
    await expect(person).toHaveText(contactperson);
  }
);

Then(
  "This {string} has a function title {string}",
  async function (this: App, segmentKey: string, functiontitle: string) {
    const section = await getVisibleSection.call(this, segmentKey);
    const functietitle = section.getByText(functiontitle);
    await expect(functietitle).toHaveText(functiontitle);
  }
);

Then(
  "The {string} contact card has an image for {string}",
  async function (this: App, segmentKey: string, contactperson: string) {
    const section = await getVisibleSection.call(this, segmentKey);
    const personImage = section.getByRole("img", { name: contactperson });
    await expect(personImage).toBeVisible();
  }
);

Then(
  "I should see an approach introduction paragraph",
  async function (this: App) {
    const article = (await this.basePage.getSegmentLocator("global")).first();
    const articleHeader = article.locator("h2").first();
    await expect(articleHeader).toBeVisible();
    await expect(articleHeader).not.toBeEmpty();

    const introParagraph = article.locator("p").first();
    await expect(introParagraph).toBeVisible();
    await expect(introParagraph).not.toBeEmpty();
  }
);
