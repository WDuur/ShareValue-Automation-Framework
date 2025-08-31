import { PageManager } from "../../page-objects/base/PageManager";

export const initializers: [string, (this: PageManager) => any][] = [
  [
    "basePage",
    function () {
      return this.createBasePage();
    },
  ],
  [
    "homePage",
    function () {
      return this.createHomePage();
    },
  ],
  [
    "contactUsPage",
    function () {
      return this.createContactUsPage();
    },
  ],
  [
    "loginPage",
    function () {
      return this.createLoginPage();
    },
  ],
  [
    "headerComponent",
    function () {
      return this.createHeaderComponent();
    },
  ],
  [
    "cookieComponent",
    function () {
      return this.createCookieComponent();
    },
  ],
  [
    "footerComponent",
    function () {
      return this.createFooterComponent();
    },
  ],
  [
    "carouselComponent",
    function () {
      return this.createCarouselComponent();
    },
  ],
  [
    "ctaComponent",
    function () {
      return this.createCTAComponent();
    },
  ],
  [
    "heroComponent",
    function () {
      return this.createHeroComponent();
    },
  ],
  [
    "contentBlockComponent",
    function () {
      return this.createContentBlockComponent();
    },
  ],
];
