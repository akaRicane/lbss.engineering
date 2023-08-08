// context: LanguageContext
"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type languageContextType = {
  currentLanguage: string;
  updateCurrentLanguage: (languageTarget: string) => void;
};

const languageContextDefaultValue: languageContextType = {
  currentLanguage: "en",
  updateCurrentLanguage: () => {},
};

const LanguageContext = createContext<languageContextType>(languageContextDefaultValue);

export function useLanguageContext() {
  return useContext(LanguageContext);
}

type Props = {
  children: ReactNode;
};

const AUTHORIZED_LANGUAGES = ["en", "fr"];

export const LanguageContextProvider = ({ children }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const updateCurrentLanguage = (languageTarget: string): void => {
    setCurrentLanguage(AUTHORIZED_LANGUAGES.includes(languageTarget) ? languageTarget : "en");
  };

  // Wrap the values in an object
  const contextValues = {
    currentLanguage,
    updateCurrentLanguage,
  };

  return <LanguageContext.Provider value={contextValues}>{children}</LanguageContext.Provider>;
};
