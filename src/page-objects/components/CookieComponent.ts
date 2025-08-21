import { BasePage } from "../base/BasePage";
import { Locator } from "@playwright/test";

const COOKIE_BANNER_SELECTOR = ".cookie-banner";

export class CookieComponent extends BasePage {
  public async getCookieBanner(): Promise<Locator> {
    return this.page.locator(COOKIE_BANNER_SELECTOR);
  }
  public async clickCookieButton(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("button", menuItem);
  }
  public async clickCookieLink(): Promise<Locator> {
    return this.page.locator(`${COOKIE_BANNER_SELECTOR} p:nth-of-type(3)`);
  }
  public async getCookieCheckbox(): Promise<Locator> {
    return this.page.locator(
      `${COOKIE_BANNER_SELECTOR} input[type="checkbox"]`
    );
  }
}
