import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from "../logger/logger";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

import { BASE_DOMAIN } from "../utils/selectors";

Then(
  "I see {string} information containers in the {string}",
  async function (this: App, count: string, segmentKey: string) {
    const footerElements = await this.footerComponent.getSegmentLocator(
      segmentKey,
      `.footer-block`
    );
    await expect(footerElements).toHaveCount(parseInt(count));
  }
);

Then(
  "There is a footer ending with essential navigation",
  async function (this: App) {
    const footerContainers = await this.footerComponent.getSegmentLocator(
      "footer",
      ".container"
    );
    const secondContainer = footerContainers.nth(1);
    await expect(secondContainer).toBeVisible();
  }
);
Then(
  "There is a footerlink to {string}",
  async function (this: App, url: string) {
    await this.footerComponent.waitAndClickByRole("link", url);
  }
);
