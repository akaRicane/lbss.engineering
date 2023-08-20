// context: CoreContext
"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguageContext } from "./LanguageContext";
import { TextGetter } from "../languages/TextGetter";
import EnvGetter from "../components/EnvGetter";
import { getLocation } from "../api/utils/utils";
import { sendToCreative } from "../api/utils/creativeApi";
import * as jose from "jose";

type HoveredHTML = string | null;

type TokenId = string | null;

type coreContextType = {
  version: string;
  curLocation: string;
  updateLocation: (newLocation: string) => void;
  counter: number;
  updateCounter: () => void;
  tokenId: TokenId;
  getTokenId: () => TokenId;
  updateTokenId: (newToken: TokenId) => void;
  language: string;
  updateLanguage: (newLanguage: string) => void;
  currentMouseOver: HoveredHTML;
  isHovering: boolean;
  updateCurrentMouseOver: (htmlElemName: HoveredHTML) => void;
  resetCurrentMouseOver: () => void;
  getText: (props: string, queryLanguage: string) => string;
};

const coreContextDefaultValues: coreContextType = {
  version: "0.0.1",
  curLocation: "/",
  updateLocation: (newLocation) => {},
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
  isHovering: false,
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
  const [curLocation, setCurLocation] = useState<string>(usePathname());
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [currentMouseOver, setCurrentMouseOver] = useState<HoveredHTML>(null);
  const version: string = EnvGetter("APP_VERSION") || "cannot fetch version";

  const updateLanguage = (newLanguage: string): void => {
    setLanguage(newLanguage);
  };

  const updateLocation = (newLocation: string): void => {
    // console.log("Setting new location", newLocation);
    sendToCreative({ target: "location", message: newLocation });
    setCurLocation(newLocation);
    setIsHovering(false);
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
    sendToCreative({ target: "mouseOver", message: htmlElemName });
    setCurrentMouseOver(htmlElemName === null ? getText("HEADER_WELCOME", language) : getText(htmlElemName, language));
    setIsHovering(true);
  };

  const resetCurrentMouseOver = (): void => {
    sendToCreative({ target: "mouseOut", message: "/" });
    setCurrentMouseOver(getText("HEADER_WELCOME", language));
    setIsHovering(false);
  };

  const getText = (props: string, queryLanguage: string): string => {
    return TextGetter(props, queryLanguage);
  };

  useEffect(() => {
    // localStorage.setItem("tokenId", "");
    updateLanguage(currentLanguage);
    const currentStoredToken = localStorage.getItem("tokenId");
    if (currentStoredToken) {
      const tokenObject = jose.decodeJwt(currentStoredToken);
      const authTime = tokenObject.auth_time || 0;
      const currentTime = Date.now();
      const cacheDuration = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
      // @ts-ignore
      const delta = currentTime - authTime * 1000; // Convert auth_time to milliseconds
      if (delta > cacheDuration) {
        localStorage.removeItem("tokenId");
      }
    }
  }, [currentLanguage]);

  // Wrap the values in an object
  const contextValues = {
    language,
    updateLanguage,
    curLocation,
    updateLocation,
    tokenId,
    getTokenId,
    updateTokenId,
    counter,
    updateCounter,
    currentMouseOver,
    updateCurrentMouseOver,
    resetCurrentMouseOver,
    isHovering,
    getText,
    version,
  };

  return <CoreContext.Provider value={contextValues}>{children}</CoreContext.Provider>;
};
