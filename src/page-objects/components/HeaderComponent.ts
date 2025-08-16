import { BasePage } from "../base/BasePage";
import { Locator } from "@playwright/test";

export class HeaderComponent extends BasePage {
  public async getShareValueLogo() {
    return this.page.locator(".w-full").first();
  }

  public async clickOnMenuItem(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
    // await this.page.pause();
  }

  public async getPageTitle(title: string): Promise<string> {
    const pageUniqueElement = this.page.getByRole("heading", {
      name: title,
    });
    const headingText = await pageUniqueElement.textContent({
      timeout: 2000,
    });
    return headingText?.trim() || "";
  }

  public async getMenuItem(item: string): Promise<Locator> {
    return this.page.locator("header").getByRole("link", {
      name: item,
      exact: true,
    });
  }

  public async getMenuItemInContainer(
    containerSelector: string,
    label: string
  ) {
    const container = this.page.locator(containerSelector);
    return container.getByRole("link", {
      name: label,
      exact: true,
    });
  }
  public async getMenuSlider(): Promise<Locator> {
    return this.page
      .locator("div")
      .filter({
        hasText:
          "Wat we doenOnze aanpakMicrosoft AzureMicrosoft 365Power PlatformDevelopmentWord",
      })
      .nth(2);
  }
}
