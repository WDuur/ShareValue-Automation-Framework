import { pageFixture } from "./hooks/browserContextFixture";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { App } from "./world/cucumberWorld";

Then("In the main menu there is a ShareValue logo", async function (this: App) {
  const logo = await this.headerComponent.getShareValueLogo();
  await expect(logo).toBeVisible();
});

Then("I click on the logo", async function (this: App) {
  await this.headerComponent.clickOnMenuItem("ShareValue B.V.");
});

When(
  "I click on the {string} in the header",
  async function (this: App, menuItem: string) {
    await this.headerComponent.clickOnMenuItem(menuItem);
  }
);

Then("The page title is {string}", async function (this: App, title: string) {
  const headingText = await this.headerComponent.getPageTitle(title);
  await expect(headingText).toBe(title);
});

When(
  "I hover over the {string} menu item",
  async function (this: App, mainMenu: string) {
    const menuItem = await this.headerComponent.getMenuItem(mainMenu);
    await menuItem.waitFor({ state: "visible" });
    await menuItem.hover();
  }
);

Then(
  "I should see the following submenu items:",
  async function (this: App, dataTable: any) {
    const expectedItems = dataTable.hashes();

    for (const { label, url, pageTitle } of expectedItems) {
      const menuItem = await this.headerComponent.getMenuItemInContainer(
        "header",
        label
      );
      await expect(menuItem).toBeVisible();
      await expect(menuItem).toHaveAttribute("href", url);
      await menuItem.click();
    }
  }
);

When("I click on the hamburger menu in the header", async function (this: App) {
  const button = await this.headerComponent.page
    .getByRole("banner")
    .locator("role=button");
  await button.click();

  const slideinMenu = await this.headerComponent.getMenuSlider();
  await expect(slideinMenu).toBeVisible();
});

Then("I wil have {string} menu header items", async (itemCount: string) => {
  const submenuLinks = await pageFixture.page.locator(
    ".desktop-menu-grid a.text-brand-primary"
  );
  await expect(submenuLinks).toHaveCount(parseInt(itemCount));
});

Then(
  "I Expect that i can close the menu by pressing the close button",
  async function (this: App) {
    await this.headerComponent.page.locator("role=button").first().click();
    const slideinMenu = await this.headerComponent.getMenuSlider();
    await expect(slideinMenu).not.toBeVisible();
  }
);
