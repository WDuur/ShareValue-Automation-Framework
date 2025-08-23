import { BasePage } from "./base/BasePage";
import { Locator } from "@playwright/test";

import {
  BULLET_SELECTOR,
  SLIDE_SELECTOR,
  SEGMENT_SELECTORS,
  HERO_SECTION_SELECTOR,
  GLOBAL_PAGE_SELECTOR,
} from "../utils/selectors";

const HEADER_MAP: Record<string, string> = {
  intro: GLOBAL_PAGE_SELECTOR,
};

export class HomePage extends BasePage {
  public async getContent(
    selector: string,
    className: string
  ): Promise<string> {
    const newSelector = SEGMENT_SELECTORS[selector];
    const textContent = await this.page
      .locator(`${newSelector} ${className}`)
      .textContent();
    return textContent || "";
  }
}
