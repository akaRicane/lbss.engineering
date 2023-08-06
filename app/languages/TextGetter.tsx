'use client';

import { useLanguageContext } from '../contexts/LanguageContext';

type TextBookType = {
  [key: string]: {
    [key: string]: string;
  };
};

const TEXT_BOOK: TextBookType = {
  "HEADER_WELCOME": {
    'en': "Welcome to lbss.engineering!",
    'fr': "Bienvenue sur lbss.engineering!",
  },
  "LINK_TO_HOME": {
    'en': 'To home',
    'fr': 'Retour à l\'acceuil'
  },
  "LINK_TO_BETATEST": {
    'en': 'To betatest',
    'fr': 'Aller à betatest',
  },
  "LINK_TO_PRODUCTS": {
    'en': 'To products',
  },
  "#PRODUCTS_PRESENTATION": {
    'en': 'Product lorem ipsum',
    'fr': 'Mes balls sur la commode'
  },
  "LINK_TO_ASTAR": {
    'en': 'To ASTAR',
  },
  "LINK_TO_LBSSCLOUD": {
    'en': 'To LBSS CLOUD',
  },
  "LINK_TO_ABOUT": {
    'en': 'To about',
  },
  "FAIL_TEXT": {
    'en': 'Fail!',
    'fr': 'Une erreur est survenue!'
  },
}

export default function TextGetter(props: string, language: string = 'en'): string {

  var fetched = 'fail';
  if (TEXT_BOOK[props]) {
    if (TEXT_BOOK[props][language]) {
      fetched = TEXT_BOOK[props][language];
    }
    else {
      fetched = TEXT_BOOK[props]['en'];
    }
    console.log(`Query ${props} ${language}`, 'Found', fetched);
  }
  else {
    console.log(`Fail to fetch query ${props} ${language}`);
  }

  return fetched;
}
