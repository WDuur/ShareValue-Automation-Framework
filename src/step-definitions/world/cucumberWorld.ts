import { PageManager } from "../../page-objects/base/PageManager";
import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { BasePage } from "../../page-objects/base/BasePage";
import { HomePage } from "../../page-objects/HomePage";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { LoginPage } from "../../page-objects/LoginPage";
import { HeaderComponent } from "../../page-objects/components/HeaderComponent";
import { CookieComponent } from "../../page-objects/components/CookieComponent";
import { FooterComponent } from "../../page-objects/components/FooterComponent";
import { CarouselComponent } from "../../page-objects/components/CarouselComponent";
import { CTAComponent } from "../../page-objects/components/CTAComponent";
import { HeroComponent } from "../../page-objects/components/HeroComponent";
import { ContentBlockComponent } from "../../page-objects/components/ContentBlockComponent";

/**
 * Custom World for Cucumber tests. Bevat page objects en componenten.
 */
export class App extends World {
  public pageManager: PageManager;
  public basePage: BasePage;
  public homePage: HomePage;
  public contactUsPage: ContactUsPage;
  public loginPage: LoginPage;
  public headerComponent: HeaderComponent;
  public cookieComponent: CookieComponent;
  public footerComponent: FooterComponent;
  public carouselComponent: CarouselComponent;
  public ctaComponent: CTAComponent;
  public heroComponent: HeroComponent;
  public contentBlockComponent: ContentBlockComponent;

  private url?: string;
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
    this.contactUsPage = this.pageManager.createContactUsPage();
    this.loginPage = this.pageManager.createLoginPage();
    this.headerComponent = this.pageManager.createHeaderComponent();
    this.cookieComponent = this.pageManager.createCookieComponent();
    this.footerComponent = this.pageManager.createFooterComponent();
    this.carouselComponent = this.pageManager.createCarouselComponent();
    this.ctaComponent = this.pageManager.createCTAComponent();
    this.heroComponent = this.pageManager.createHeroComponent();
    this.contentBlockComponent = this.pageManager.createContentBlockComponent();
  }

  setUrl(url: string) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  getFirstName() {
    return this.firstName;
  }
  setLastName(lastName: string) {
    this.lastName = lastName;
  }
  getLastName() {
    return this.lastName;
  }
  setEmailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }
  getEmailAddress() {
    return this.emailAddress;
  }
}
setWorldConstructor(App);
