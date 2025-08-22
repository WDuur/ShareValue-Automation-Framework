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
  public clickedBulletIndexes: number[] = [];

  public get heroSection(): Locator {
    return this.page.locator(HERO_SECTION_SELECTOR);
  }

  public async clickOnSliderBullets(segmentKey: string): Promise<void> {
    const bullets = await this.getSegmentLocator(segmentKey, BULLET_SELECTOR);
    const bulletCount = await bullets.count();
    const clickedBulletIndexes = [];

    for (let i = 0; i < bulletCount; i++) {
      const bullet = bullets.nth(i);
      await bullet.click();
      await this.page.waitForTimeout(500);
      clickedBulletIndexes.push(i);
    }
  }

  public async getActiveSegments(): Promise<Locator[]> {
    const swiperSlides = this.heroSection.locator(SLIDE_SELECTOR);
    const activeSlides: Locator[] = [];

    for (const index of this.clickedBulletIndexes) {
      const activeSlide = swiperSlides.nth(index);
      activeSlides.push(activeSlide);
    }

    return activeSlides;
  }

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
  public async clickCtaButton(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
  }
}
