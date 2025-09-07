export const BASE_DOMAIN = "https://www.sharevalue.nl";

// Onze aanpak pages
export const APPROACH = "/onze-aanpak";
export const APPROACH_COPILOT = "/onze-aanpak/microsoft-365-copilot-straat";

// Wat we doen pages
export const WHAT_WE_DO = "/wat-we-doen";
export const WHAT_WE_DO_AZURE = "/wat-we-doen/azure";

export const URL_SELECTORS: Record<string, string> = {
  base: BASE_DOMAIN,
  approach: APPROACH,
  copilot: APPROACH_COPILOT,
  whatwedo: WHAT_WE_DO,
  azure: WHAT_WE_DO_AZURE,
};

export const getFullUrl = (key: string): string => {
  const path = URL_SELECTORS[key];
  if (!path) {
    throw new Error(`Key "${key}" bestaat niet in URL_SELECTORS`);
  }
  if (path.startsWith("http")) {
    return path;
  }
  return `${BASE_DOMAIN}${path}`;
};
