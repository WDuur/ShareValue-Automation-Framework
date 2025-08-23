import { When, Given, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";

When("I switch to the new browser tab", async function (this: App) {
  await this.basePage.switchToNewTab();
});

Given("I wait for {int} seconds", async (seconds: number) => {
  await pageFixture.page.waitForTimeout(seconds * 1000);
});
