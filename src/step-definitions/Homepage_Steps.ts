import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

import { BASE_DOMAIN } from "../utils/selectors";

Given("I navigate to the ShareValue homepage", async function (this: App) {
  try {
    await this.headerComponent.navigate(BASE_DOMAIN);
    logger.info(`Accessing URL: ${BASE_DOMAIN}`);
    this.setUrl(BASE_DOMAIN);
    // this.pageManager.page.pause();
  } catch (error) {
    logger.error(`Error navigating to ${BASE_DOMAIN}: ${error}`);
  }
});

Then("I see a slider on the page as a hero image", async function (this: App) {
  const heroSection = await this.homePage.getHeroSection();
  await expect(heroSection).toBeVisible();
});

Then(
  "The hero image should have exactly {string} slides",
  async function (this: App, expectedCount: string) {
    const slides = await this.homePage.getHeroSlides();
    await expect(slides).toHaveCount(parseInt(expectedCount));
  }
);

When("I click on every bullet at the hero image", async function (this: App) {
  await this.homePage.clickOnHeroBullet();
});

Then("The corresponding slide is active", async function (this: App) {
  const activeSegments = await this.homePage.getActiveSegments();
  for (const activeSegment of activeSegments) {
    await expect(activeSegment).toHaveClass(/swiper-slide-active/);
  }
});

Then(
  "I should see a header with the text {string}",
  async function (this: App, headerText: string) {
    const header = await this.homePage.getContent("intro", "h2");
    await expect(header).toBe(headerText);
  }
);

Then(
  "I should see a paragraph containing the description about the {string} segment",
  async function (this: App, segmentKey: string) {
    const text = await this.homePage.getContent(segmentKey, " p");
    await expect(text && text.trim().length).toBeGreaterThan(0);
  }
);

Then(
  "I see the {string} segment on the homepage",
  async function (this: App, segmentKey: string) {
    const segment = await this.homePage.getSegment(segmentKey);
    await expect(segment).toBeVisible();
  }
);

Then(
  "The {string} segment has {string} as {string}",
  async function (
    this: App,
    segmentKey: string,
    expectedText: string,
    type: string
  ) {
    const locator =
      type === "title"
        ? await this.homePage.getSegmentTitle(segmentKey)
        : await this.homePage.getSegmentLabel(segmentKey);

    expect(await locator.textContent()).toBe(expectedText);
  }
);

Then(
  "There is one {string} block for {string}",
  async function (this: App, segmentKey: string, expertise: string) {
    const expertiseBlock = await this.homePage.getExpertiseBlok(
      segmentKey,
      expertise
    );

    await expect(expertiseBlock).toBeVisible();
    const expertiseUrl = expertise.replace(/\s+/g, "-").toLowerCase();
    const href = await expertiseBlock.getAttribute("href");
    expect(href).toBe(`/wat-we-doen/${expertiseUrl}`);
  }
);

Then(
  "This {string} segment has {string} images",
  async function (this: App, segmentKey: string, count: string) {
    const images = await this.homePage.getSegmentImages(segmentKey);
    await expect(images).toHaveCount(parseInt(count));
  }
);

Then(
  "On the {string} is a cta with a link to {string}",
  async function (this: App, segmentKey: string, link: string) {
    const cta = await this.homePage.getSegmentUrl(segmentKey);
    await expect(cta).toHaveAttribute("href", `/${link}`);
  }
);

Then(
  "There are {string} blocks to explain how we {string} with a image, title and paragraph",
  async function (this: App, count: string, segmentKey: string) {
    const container = await this.homePage.getContainer(segmentKey);
    const expectedCount = parseInt(count);

    await expect(container).toHaveCount(expectedCount);

    for (let i = 0; i < expectedCount; i++) {
      const block = container.nth(i);
      const img = block.locator("img");
      const title = block.locator("h3");
      const paragraph = block.locator("p");

      await expect(img, `Missing <img> in block ${i + 1}`).toHaveAttribute(
        "src",
        /.+/
      );
      await expect(title, `Missing <h3> in block ${i + 1}`).toHaveText(/.+/);
      await expect(paragraph, `Missing <p> in block ${i + 1}`).toHaveText(/.+/);
    }
  }
);

Then(
  "There is a client logo for {string}",
  async function (this: App, customerKey: string) {
    const image = await this.homePage.page.getByRole("img", {
      name: customerKey,
    });
    await expect(image).toBeVisible();
  }
);
