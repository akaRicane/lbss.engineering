type TextBookType = {
  [key: string]: {
    [key: string]: string;
  };
};

const TEXT_BOOK: TextBookType = {
  HEADER_WELCOME: {
    en: "Welcome to lbss.engineering!",
    fr: "Bienvenue sur lbss.engineering!",
  },
  LINK_TO_HOME: {
    en: "To home",
    fr: "Retour à l'acceuil",
  },
  LINK_TO_BETATEST: {
    en: "To betatest",
    fr: "Aller à betatest",
  },
  LINK_TO_PRODUCTS: {
    en: "To products",
    fr: "Voir les produits",
  },
  "#PRODUCTS_PRESENTATION": {
    en: "Our products",
    fr: "Nos solutions",
  },
  LINK_TO_ASTAR: {
    en: "To ASTAR",
    fr: "Aller à ASTAR",
  },
  LINK_TO_LBSSCLOUD: {
    en: "To LBSS CLOUD",
    fr: "Aller à LBSS CLOUD",
  },
  LINK_TO_ABOUT: {
    en: "To about",
    fr: "En savoir plus",
  },
  LINK_TO_ACCOUNT: {
    en: "My account",
    fr: "Mon profil",
  },
  LINK_TO_LBSSART: {
    en: "visit lbss.art website",
    fr: "jette un oeil à lbss.art",
  },
  FAIL_TEXT: {
    en: "Fail!",
    fr: "Une erreur est survenue!",
  },
};

export function TextGetter(props: string, language: string = "en"): string {
  var fetched = "fail";
  if (TEXT_BOOK[props]) {
    if (TEXT_BOOK[props][language]) {
      fetched = TEXT_BOOK[props][language];
    } else {
      fetched = TEXT_BOOK[props]["en"];
    }
    // console.log(`Query ${props} ${language}`, "Found", fetched);
  } else {
    // console.log(`Fail to fetch query ${props} ${language}`);
  }

  return fetched;
}

export function getKeyFromMessage(message: string, language: string = "en"): string | undefined {
  for (const key in TEXT_BOOK) {
    if (TEXT_BOOK[key][language] === message) {
      return key;
    }
  }
  return undefined; // Return undefined if no key matches the provided message
}
