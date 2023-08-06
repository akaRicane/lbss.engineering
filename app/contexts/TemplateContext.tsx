// context: template
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type HoveredHTML = string | null;
type coreContextType = {
  counter: number;
  updateCounter: () => void;
  currentMouseOver: HoveredHTML;
  updateCurrentMouseOver: (htmlElemName: HoveredHTML) => void;
};

const coreContextDefaultValues: coreContextType = {
  counter: 0,
  updateCounter: () => {},
  currentMouseOver: null,
  updateCurrentMouseOver: (htmlElemName) => {},
};

const CoreContext = createContext<coreContextType>(coreContextDefaultValues);

export function useCoreContext() {
  return useContext(CoreContext);
}

type Props = {
  children: ReactNode;
};


export const CoreContextProvider = ({ children }: Props) => {
  const [counter, setCounter] = useState<number>(0);
  const [currentMouseOver, setCurrentMouseOver] = useState<HoveredHTML>(null);

  const updateCounter = (): void => {
    setCounter((prev) => (prev += 1));
  };

  const updateCurrentMouseOver = (htmlElemName: HoveredHTML): void => {
    setCurrentMouseOver(htmlElemName === null ? 'Welcome to lbss.engineering!' : htmlElemName);
  }

  // Wrap the values in an object
  const contextValues = {
    counter,
    updateCounter,
    currentMouseOver,
    updateCurrentMouseOver
  };

  return (
    <CoreContext.Provider value={contextValues}>
      {children}
    </CoreContext.Provider>
  );
};
