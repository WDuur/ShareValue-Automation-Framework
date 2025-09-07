import { pageFixture } from "./../../step-definitions/hooks/browserContextFixture";
import { Locator } from "@playwright/test";
import logger from "../../logger/logger";
//SegmentLocators
import { SEGMENT_SELECTORS } from "../../utils/selectors";
import { getFullUrl } from "../../utils/urlSelector";

//Load env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: "./env/.env" });

//Create a configuration object for easy access to env variables
const config = {
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

export class BasePage {
  get page() {
    return pageFixture.page;
  }

  // Nieuw: directe toegang tot locator()
  public locator(selector: string): Locator {
    return this.page.locator(selector);
  }
  public async navigate(url: string): Promise<void> {
    const response = await this.page.goto(getFullUrl(url));

    if (!response) {
      throw new Error("No response received during navigation");
    }

    if (response.status() === 404) {
      throw new Error(`Test failed: 404 Not Found at ${url}`);
    }

    //await this.page.pause();
  }

  public async waitAndClickByRole(role: string, name: string): Promise<void> {
    const element = await this.page
      .getByRole(role as any, {
        name: name,
        exact: true,
      })
      .first();
    logger.info(`Link: ${await element.textContent()}`);
    await element.click();
  }

  public async waitAndClick(locator: Locator): Promise<void> {
    await locator.isVisible;
    await locator.click();
  }

  public async waitAndClickBySelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  public async switchToNewTab(): Promise<void> {
    await this.page.context().waitForEvent("page");
    const allPages = await this.page.context().pages();
    pageFixture.page = allPages[allPages.length - 1];
    await this.page.bringToFront();

    await this.page.setViewportSize({
      width: config.width,
      height: config.height,
    });
  }

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

  public async getBaseLocator(selector: string): Promise<Locator> {
    if (!selector) {
      throw new Error(`No selector found for segment: ${selector}`);
    }
    return this.page.locator(`${selector}`);
  }

  public async getContent(
    selector: string,
    className: string,
    order: number = 1
  ): Promise<string> {
    const newSelector = SEGMENT_SELECTORS[selector];
    const textContent = await this.page
      .locator(`${newSelector} ${className}`)
      .nth(order - 1)
      .textContent();
    return textContent || "";
  }
  public async clickCtaButton(menuItem: string): Promise<void> {
    await this.waitAndClickByRole("link", menuItem);
  }
}
