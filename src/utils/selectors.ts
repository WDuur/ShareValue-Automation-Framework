export const BASE_DOMAIN = "https://www.sharevalue.nl";

export const BULLET_SELECTOR = ".swiper-pagination-bullet";
export const SLIDE_SELECTOR = "swiper-slide";
export const SLIDE_SELECTOR_ACTIVE = `${SLIDE_SELECTOR}.swiper-slide-active`;

// SECTION SELCTORS
export const HERO_SECTION_SELECTOR =
  'section[__component="hero.primary-slider"]';
export const HERO_IMAGE_SELECTOR = 'section[__component="hero.primary"]';
export const GLOBAL_PAGE_SELECTOR = 'section[__component="global.pagesection"]';
export const EXPERTISE_BLOCK_SELECTOR =
  'section[__component="strapi.expertises-block"]';
export const PARTNER_SELECTOR = 'section[__component="global.partner"]';
export const HERO_SECONDARY_SELECTOR = 'section[__component="hero.secondary"]';
export const HOW_WE_WORK_SELECTOR = 'section[__component="global.how-we-work"]';
export const CUSTOMERS_SELECTOR = 'section[__component="global.customers"]';
export const QUOTES_SELECTOR = 'section[__component="global.quotes"]';
export const PERSONS_CAROUSEL_SELECTOR =
  'section[__component="global.person-carousel"]';
export const LAST_POST_SELECTOR = 'section[__component="strapi.latest-posts"]';
export const CALL_TO_ACTION_SELECTOR =
  'section[__component="call-to-action.double"]';
export const GLOBAL_FOOTER_SELECTOR = "footer";
export const GLOBAL_ALTERNATING_SELECTOR =
  'section[__component="global.alternating-page-section"]';

export const SEGMENT_SELECTORS: Record<string, string> = {
  intro: GLOBAL_PAGE_SELECTOR,
  heroimage: HERO_IMAGE_SELECTOR,
  expertise: EXPERTISE_BLOCK_SELECTOR,
  partner: PARTNER_SELECTOR,
  hero: HERO_SECTION_SELECTOR,
  global: GLOBAL_PAGE_SELECTOR,
  banner: HERO_SECONDARY_SELECTOR,
  work: HOW_WE_WORK_SELECTOR,
  clients: CUSTOMERS_SELECTOR,
  quotes: QUOTES_SELECTOR,
  blogposts: LAST_POST_SELECTOR,
  cta: CALL_TO_ACTION_SELECTOR,
  footer: GLOBAL_FOOTER_SELECTOR,
  persons: PERSONS_CAROUSEL_SELECTOR,
  contentblok: GLOBAL_ALTERNATING_SELECTOR,
};
