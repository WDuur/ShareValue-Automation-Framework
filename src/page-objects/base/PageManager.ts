import { Page } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { BasePage } from "./BasePage";
import { HomePage } from "../HomePage";
import { ContactUsPage } from "../ContactUsPage";
import { LoginPage } from "../LoginPage";
import { HeaderComponent } from "../components/HeaderComponent";
import { CookieComponent } from "../components/CookieComponent";
import { FooterComponent } from "../components/FooterComponent";
import { CarouselComponent } from "../components/CarouselComponent";
import { CTAComponent } from "../components/CTAComponent";
import { HeroComponent } from "../components/HeroComponent";

export class PageManager {
  get page(): Page {
    return pageFixture.page;
  }
  createBasePage(): BasePage {
    return new BasePage();
  }
  createHomePage(): HomePage {
    return new HomePage();
  }

  createContactUsPage(): ContactUsPage {
    return new ContactUsPage();
  }

  createLoginPage(): LoginPage {
    return new LoginPage();
  }

  //components
  createHeaderComponent(): HeaderComponent {
    return new HeaderComponent();
  }
  createCookieComponent(): CookieComponent {
    return new CookieComponent();
  }

  createFooterComponent(): FooterComponent {
    return new FooterComponent();
  }

  createCarouselComponent(): CarouselComponent {
    return new CarouselComponent();
  }

  createCTAComponent(): CTAComponent {
    return new CTAComponent();
  }

  createHeroComponent(): HeroComponent {
    return new HeroComponent();
  }
}
