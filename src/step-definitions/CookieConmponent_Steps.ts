import { pageFixture } from "./hooks/browserContextFixture";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CucumberWorld } from "./world/cucumberWorld";

When("All cookies are cleared", async () => {
  await pageFixture.page.context().clearCookies();
});

Then(
  "The cookie banner should be visible",
  async function (this: CucumberWorld) {
    const banner = await this.cookieComponent.getCookieBanner();
    await expect(banner).toBeVisible();
  }
);
Then(
  "The cookie banner should not be visible",
  async function (this: CucumberWorld) {
    const banner = await this.cookieComponent.getCookieBanner();
    await expect(banner).toBeHidden();
  }
);

When(
  "The user clicks the {string} button",
  async function (this: CucumberWorld, buttonLabel: string) {
    await this.cookieComponent.clickCookieButton(buttonLabel);
  }
);

Then(
  "The {string} cookie should be set to {string}",
  async (cookieName: string, value: string) => {
    const cookies = await pageFixture.page.context().cookies();
    const cookie = cookies.find((c) => c.name === cookieName);
    expect(cookie?.value).toBe(value);
  }
);

When(
  "The user clicks the {string} link",
  async function (this: CucumberWorld, linkText: string) {
    const link = await this.cookieComponent.clickCookieLink();
    await expect(link).toHaveText(linkText);
    await link.click();
    // await pageFixture.page.pause();
  }
);

Then("The cookie settings should be shown", async () => {
  const title = await pageFixture.page
    .getByRole("paragraph")
    .filter({ hasText: "Cookies beheren" });
  await expect(title).toHaveText("Cookies beheren");
});

When(
  "The user clicks the checkbox to accept the cookies",
  async function (this: CucumberWorld) {
    const checkbox = await this.cookieComponent.getCookieCheckbox();
    await expect(checkbox).toHaveCount(1);
    await checkbox.check();
  }
);
