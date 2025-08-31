import { BasePage } from "../base/BasePage";
import { Locator } from "@playwright/test";

export class ContentBlockComponent extends BasePage {
  public async getContentBlockByHeading(heading: string): Promise<Locator> {
    return this.page.locator(`section:has(h3:text-is("${heading}"))`);
  }
}
