import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import {
  Browser,
  chromium,
  BrowserType,
  firefox,
  webkit,
} from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeouts";
import { PageManager } from "../../page-objects/base/PageManager";

//Load env variables from .env file
import { config as loadEnv } from "dotenv";
import logger from "../../logger/logger";
const env = loadEnv({ path: "./env/.env" });

//Create a configuration object for easy access to env variables
const config = {
  headless: env.parsed?.HEADLESS === "true",
  browser:
    process.env.BROWSER_CHOICE ||
    env.parsed?.UI_AUTOMATION_BROWSER ||
    "chromium",
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

//Create dictionary mapping browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(
  selectedBrowser: string
): Promise<Browser> {
  const launchBrowser = browsers[selectedBrowser];
  if (!launchBrowser) {
    throw new Error(`Invalid browser selected: ${selectedBrowser}`);
  }

  return await launchBrowser.launch({ headless: config.headless });
}

async function initializePage(): Promise<void> {
  if (!browserInstance) {
    throw new Error("Browser instance is null");
  }
  pageFixture.context = await browserInstance.newContext({
    ignoreHTTPSErrors: true,
  });
  pageFixture.page = await pageFixture.context.newPage();
  setGlobalSettings(pageFixture.page);
  await pageFixture.page.setViewportSize({
    width: config.width,
    height: config.height,
  });
}

//BeforeAll hook: Runs once before all scenarios
BeforeAll(async function () {
  console.log("\nExecuting test suite...");
});

//AfterAll hook: Runs once after all scenarios
AfterAll(async function () {
  console.log("\nFinished execution of test suite!");
});

// Before hook: Runs before each scenario
Before(async function () {
  try {
    browserInstance = await initializeBrowserContext(config.browser);
    //console.log(`Browser context initialized for: ${config.browser}`);
    await initializePage();

    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
    this.contactUsPage = this.pageManager.createContactUsPage();
    this.loginPage = this.pageManager.createLoginPage();
    //components
    this.headerComponent = this.pageManager.createHeaderComponent();
    this.cookieComponent = this.pageManager.createCookieComponent();
    this.footerComponent = this.pageManager.createFooterComponent();
    this.carouselComponent = this.pageManager.createCarouselComponent();
    this.ctaComponent = this.pageManager.createCTAComponent();
  } catch (error) {
    console.error("Browser context initialization failed:", error);
  }
});

// After hook: Runs after each scenario
After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    console.log(`❌ Failed test: ${pickle.name}`);

    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${
        pickle.name
      }-${Date.now()}.png`;
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
      });
      await this.attach(image, "image/png");
    } else {
      console.error("pageFixture.page is undefined");
    }
    logger.error(`Failed test: ${pickle.name}`);
  } else {
    console.log(`✅ Successful test: ${pickle.name}`);
  }

  if (browserInstance) {
    await pageFixture.page?.close();
    await browserInstance.close();
  }
});
