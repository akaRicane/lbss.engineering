// context: CoreContext
"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { useLanguageContext } from "./LanguageContext";
import TextGetter from "../languages/TextGetter";
import { version } from "../../package.json";

type HoveredHTML = string | null;
type coreContextType = {
  counter: number;
  updateCounter: () => void;
  currentMouseOver: HoveredHTML;
  updateCurrentMouseOver: (htmlElemName: HoveredHTML) => void;
  resetCurrentMouseOver: () => void;
  getText: (props: string) => string;
};

const coreContextDefaultValues: coreContextType = {
  counter: 0,
  updateCounter: () => {},
  currentMouseOver: null,
  updateCurrentMouseOver: (htmlElemName) => {},
  resetCurrentMouseOver: () => {},
  getText: (props) => { return 'fail'},
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
  const [counter, setCounter] = useState<number>(0);
  const [currentMouseOver, setCurrentMouseOver] = useState<HoveredHTML>(null);

  const updateCounter = (): void => {
    setCounter((prev) => (prev += 1));
  };

  const updateCurrentMouseOver = (htmlElemName: HoveredHTML): void => {
    setCurrentMouseOver(htmlElemName === null ? getText("HEADER_WELCOME") : getText(htmlElemName));
  }

  const resetCurrentMouseOver = (): void => {
    setCurrentMouseOver(getText("HEADER_WELCOME"));
  }

  const getText = (props: string): string => {
    return TextGetter(props, currentLanguage);
  }

  // Wrap the values in an object
  const contextValues = {
    counter,
    updateCounter,
    currentMouseOver,
    updateCurrentMouseOver,
    resetCurrentMouseOver,
    getText,
    version
  };

  return (
    <CoreContext.Provider value={contextValues}>
      {children}
    </CoreContext.Provider>
  );
};
