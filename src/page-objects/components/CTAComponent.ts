import { BasePage } from "../base/BasePage";
// import { Locator } from "@playwright/test";

export class CTAComponent extends BasePage {
  public async clickCtaButton(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
  }
}
