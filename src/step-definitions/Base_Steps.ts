import { When, Given } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { App } from "./world/cucumberWorld";

When("I switch to the new browser tab", async function (this: App) {
  await this.basePage.switchToNewTab();
});

Given("I wait for {int} seconds", async (seconds: number) => {
  await pageFixture.page.waitForTimeout(seconds * 1000);
});
