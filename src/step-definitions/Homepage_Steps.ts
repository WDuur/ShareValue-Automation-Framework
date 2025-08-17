import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

import { BASE_DOMAIN } from "../utils/selectors";

Given(
  "I navigate to the ShareValue homepage",
  async function (this: CucumberWorld) {
    try {
      await this.headerComponent.navigate(BASE_DOMAIN);
      logger.info(`Accessing URL: ${BASE_DOMAIN}`);
      this.setUrl(BASE_DOMAIN);
      // this.pageManager.page.pause();
    } catch (error) {
      logger.error(`Error navigating to ${BASE_DOMAIN}: ${error}`);
    }
  }
);

Then(
  "I see a slider on the page as a hero image",
  async function (this: CucumberWorld) {
    const heroSection = await this.homePage.getHeroSection();
    await expect(heroSection).toBeVisible();
  }
);

Then(
  "The hero image should have exactly {string} slides",
  async function (this: CucumberWorld, expectedCount: string) {
    const slides = await this.homePage.getHeroSlides();
    await expect(slides).toHaveCount(parseInt(expectedCount));
  }
);

When(
  "I click on every bullet at the hero image",
  async function (this: CucumberWorld) {
    await this.homePage.clickOnHeroBullet();
  }
);

Then("The corresponding slide is active", async function (this: CucumberWorld) {
  const activeSegments = await this.homePage.getActiveSegments();
  for (const activeSegment of activeSegments) {
    await expect(activeSegment).toHaveClass(/swiper-slide-active/);
  }
});

Then(
  "I should see a header with the text {string}",
  async function (this: CucumberWorld, headerText: string) {
    const header = await this.homePage.getContent("GLOBAL_PAGE_SELECTOR", "h2");
    await expect(header).toBe(headerText);
  }
);

Then(
  "I should see a paragraph containing the description about the header",
  async function (this: CucumberWorld) {
    const text = await this.homePage.getContent(
      "GLOBAL_PAGE_SELECTOR",
      ".content p"
    );
    await expect(text && text.trim().length).toBeGreaterThan(0);
  }
);

Then(
  "I see the {string} segment on the homepage",
  async function (this: CucumberWorld, segmentKey: string) {
    const segment = await this.homePage.getSegment(segmentKey);
    await expect(segment).toBeVisible();
  }
);

Then(
  "The {string} segment has {string} as {string}",
  async function (
    this: CucumberWorld,
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
  async function (this: CucumberWorld, segmentKey: string, expertise: string) {
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
