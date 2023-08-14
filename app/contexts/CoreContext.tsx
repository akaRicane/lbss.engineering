// context: CoreContext
"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { useLanguageContext } from "./LanguageContext";
import TextGetter from "../languages/TextGetter";
import { useEffect } from "react";
import * as jose from "jose";

type HoveredHTML = string | null;
type TokenId = string | null;
type coreContextType = {
  version: string;
  counter: number;
  updateCounter: () => void;
  tokenId: TokenId;
  getTokenId: () => TokenId;
  updateTokenId: (newToken: TokenId) => void;
  language: string;
  updateLanguage: (newLanguage: string) => void;
  currentMouseOver: HoveredHTML;
  updateCurrentMouseOver: (htmlElemName: HoveredHTML) => void;
  resetCurrentMouseOver: () => void;
  getText: (props: string, queryLanguage: string) => string;
};

const coreContextDefaultValues: coreContextType = {
  version: "0.0.1",
  counter: 0,
  updateCounter: () => {},
  tokenId: null,
  getTokenId: () => {
    return null;
  },
  updateTokenId: (newToken) => {},
  language: "en",
  updateLanguage: (newLanguage) => {},
  currentMouseOver: null,
  updateCurrentMouseOver: (htmlElemName) => {},
  resetCurrentMouseOver: () => {},
  getText: (props, queryLanguage) => {
    return "fail";
  },
};

const CoreContext = createContext<coreContextType>(coreContextDefaultValues);

export function useCoreContext() {
  return useContext(CoreContext);
}

type Props = {
  children: ReactNode;
};

export const CoreContextProvider = ({ children }: Props) => {
  const { currentLanguage } = useLanguageContext();
  const [language, setLanguage] = useState<string>("en");
  const [tokenId, setTokenId] = useState<TokenId>(null);
  const [counter, setCounter] = useState<number>(0);
  const [currentMouseOver, setCurrentMouseOver] = useState<HoveredHTML>(null);
  const version: string = "0.2.2";

  const updateLanguage = (newLanguage: string): void => {
    setLanguage(newLanguage);
  };

  const getTokenId = (): TokenId => {
    const localStored = localStorage.getItem("tokenId");
    return tokenId || localStored;
  };

  const updateTokenId = (newToken: TokenId): void => {
    setTokenId(newToken);
    // @ts-ignore
    localStorage.setItem("tokenId", newToken);
  };

  const updateCounter = (): void => {
    setCounter((prev) => (prev += 1));
  };

  const updateCurrentMouseOver = (htmlElemName: HoveredHTML): void => {
    setCurrentMouseOver(htmlElemName === null ? getText("HEADER_WELCOME", language) : getText(htmlElemName, language));
  };

  const resetCurrentMouseOver = (): void => {
    setCurrentMouseOver(getText("HEADER_WELCOME", language));
  };

  const getText = (props: string, queryLanguage: string): string => {
    return TextGetter(props, queryLanguage);
  };

  useEffect(() => {
    updateLanguage(currentLanguage);
  }, [currentLanguage]);

  // Wrap the values in an object
  const contextValues = {
    language,
    updateLanguage,
    tokenId,
    getTokenId,
    updateTokenId,
    counter,
    updateCounter,
    currentMouseOver,
    updateCurrentMouseOver,
    resetCurrentMouseOver,
    getText,
    version,
  };

  return <CoreContext.Provider value={contextValues}>{children}</CoreContext.Provider>;
};
