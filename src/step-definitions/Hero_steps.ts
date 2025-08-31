import { Then } from "@cucumber/cucumber";
import { App } from "./world/cucumberWorld";
import { expect } from "@playwright/test";
import { pageFixture } from "./hooks/browserContextFixture";

Then("I see a hero image on the page as a hero", async function (this: App) {
  const heroSection = await this.basePage.getSegmentLocator("heroimage", "img");
  await expect(heroSection).toBeVisible();
});

Then("The hero has a title {string}", async function (title: string) {
  const heroTitle = await pageFixture.page.getByRole("heading", {
    name: title,
  });
  await expect(heroTitle).toBeVisible();
});
