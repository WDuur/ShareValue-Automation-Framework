import { BasePage } from "../base/BasePage";

export class HeaderComponent extends BasePage {
  public async getShareValueLogo() {
    return this.page.locator(".w-full").first();
  }

  public async clickOnMenuItem(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
    //  await this.page.pause();
  }

  public async getPageTitle(title: string): Promise<string> {
    const pageUniqueElement = this.page.getByRole("heading", {
      name: title,
    });
    const headingText = await pageUniqueElement.textContent({
      timeout: 1000,
    });
    return headingText?.trim() || "";
  }
}
