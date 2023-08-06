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
  }
}

export default function TextGetter(props: string, language: string = 'en'): string {

  // const { currentLanguage } = useLanguageContext();
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
