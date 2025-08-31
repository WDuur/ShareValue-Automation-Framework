import { BasePage } from "../base/BasePage";

export class HeroComponent extends BasePage {
  public async clickCtaButton(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
  }
}
