import { BasePage } from "./base/BasePage";
import { Locator } from "@playwright/test";

import {
  BULLET_SELECTOR,
  SLIDE_SELECTOR,
  SLIDE_SELECTOR_ACTIVE,
  SEGMENT_SELECTORS,
  HERO_SECTION_SELECTOR,
  GLOBAL_PAGE_SELECTOR,
} from "../utils/selectors";

const HEADER_MAP: Record<string, string> = {
  intro: GLOBAL_PAGE_SELECTOR,
};

export class HomePage extends BasePage {
  public clickedBulletIndexes: number[] = [];

  //SegmentLocator - helper
  public async getSegmentLocator(
    segmentKey: string,
    subSelector: string = ""
  ): Promise<Locator> {
    const segment = SEGMENT_SELECTORS[segmentKey.toLowerCase()];
    if (!segment) {
      throw new Error(`No selector found for segment: ${segmentKey}`);
    }
    return this.page.locator(`${segment} ${subSelector}`);
  }

  public get heroSection(): Locator {
    return this.page.locator(HERO_SECTION_SELECTOR);
  }

  public async getHeroSection(): Promise<Locator> {
    return this.page.locator(HERO_SECTION_SELECTOR);
  }
  //######
  public async getHeroSlides(): Promise<Locator> {
    return this.heroSection.locator(SLIDE_SELECTOR);
  }

  public async clickOnHeroBullet(): Promise<void> {
    const bullets = this.heroSection.locator(BULLET_SELECTOR);
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

  public async getSegment(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey);
  }

  public async getSegmentTitle(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, " h2");
  }

  public async getSegmentLabel(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, " aside div");
  }

  public async getExpertiseBlok(
    segmentKey: string,
    expertise: string
  ): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, `ul li a[title="${expertise}"]`);
  }

  public async getSegmentImages(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, `img`);
  }

  public async getSegmentUrl(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, `a`);
  }

  public async getContainer(segmentKey: string): Promise<Locator> {
    return this.getSegmentLocator(segmentKey, `li`);
  }
}
