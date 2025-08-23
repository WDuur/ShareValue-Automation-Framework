import { When, Then } from "@cucumber/cucumber";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

Then(
  "I see the {string} segment on the page",
  async function (this: App, segmentKey: string) {
    const segment = await this.basePage.getSegmentLocator(segmentKey);
    await expect(segment).toBeVisible();
  }
);

Then(
  "The {string} image should have exactly {string} slides",
  async function (this: App, segmentKey: string, expectedCount: string) {
    const slides = await this.basePage.getSegmentLocator(
      segmentKey,
      "swiper-slide"
    );
    await expect(slides).toHaveCount(parseInt(expectedCount));
  }
);

When(
  "I click on every bullet at the {string} images",
  async function (this: App, segmentKey: string) {
    await this.carouselComponent.clickOnSliderBullets(segmentKey);
  }
);

Then("The corresponding slide is active", async function (this: App) {
  const activeSegments = await this.carouselComponent.getActiveSegments();
  for (const activeSegment of activeSegments) {
    await expect(activeSegment).toHaveClass(/swiper-slide-active/);
  }
});
