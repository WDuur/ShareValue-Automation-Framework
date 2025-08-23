import { PageManager } from "../../page-objects/base/PageManager";
import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { BasePage } from "../../page-objects/base/BasePage";
import { HomePage } from "../../page-objects/HomePage";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { LoginPage } from "./../../page-objects/LoginPage";
import { HeaderComponent } from "../../page-objects/components/HeaderComponent";
import { CookieComponent } from "../../page-objects/components/CookieComponent";
import { FooterComponent } from "../../page-objects/components/FooterComponent";
import { CarouselComponent } from "../../page-objects/components/CarouselComponent";
import { CTAComponent } from "../../page-objects/components/CTAComponent";

export class App extends World {
  public pageManager: PageManager;
  public basePage: BasePage;
  public homePage: HomePage;
  public contactUsPage: ContactUsPage;
  public loginPage: LoginPage;
  // components
  public headerComponent: HeaderComponent;
  public cookieComponent: CookieComponent;
  public footerComponent: FooterComponent;
  public carouselComponent: CarouselComponent;
  public ctaComponent: CTAComponent;

  // base URL
  private url?: string;

  // Person
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  //{ attach, log, parameters }: IWorldOptions are required in the constructor of your App class to
  //inherit functionalities from the base World class and to initialize your PageManager and BasePage.
  constructor({ attach, log, link, parameters }: IWorldOptions) {
    super({ attach, log, link, parameters }); //Pass the options to the world constructor
    this.pageManager = new PageManager(); // Initialize PageManager
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
  }
  //setters for url, first name and last name
  setUrl(url: string) {
    this.url = url;
  }
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  setLastName(lastName: string) {
    this.lastName = lastName;
  }
  setEmailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }
  //getter for url, first name and last name
  getUrl() {
    return this.url;
  }
  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmailAddress() {
    return this.emailAddress;
  }
}
// Tells cucumber world to use our custom world
setWorldConstructor(App);
