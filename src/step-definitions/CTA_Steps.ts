import { When, Then } from "@cucumber/cucumber";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

Then(
  "The {string} wil have {string} call to actions",
  async function (this: App, segmentKey: string, count: string) {
    const callToActions = await this.homePage.getSegmentLocator(
      segmentKey,
      `.call-to-action-wrapper`
    );

    await expect(callToActions).toHaveCount(parseInt(count));
  }
);

When(
  "I can click on the {string} button",
  async function (this: App, buttonLabel: string) {
    await this.homePage.clickCtaButton(buttonLabel);
  }
);
