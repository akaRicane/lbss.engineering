// context: template
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type coreContextType = {
  counter: number;
  setCounter: () => void;
  getCounter: () => void;
  updateCounter: () => void;
};

const coreContextDefaultValues: coreContextType = {
  counter: 0,
  setCounter: () => {},
  getCounter: () => {},
  updateCounter: () => {},
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
  const updateCounter = (): void => {
    setCounter((prev) => (prev += 1));
  };
  const getCounter = (): void => {
    console.log("getCounter");
  };

  // Wrap the values in an object
  const contextValues = {
    counter,
    updateCounter,
    getCounter,
  };

  return (
    <CoreContext.Provider value={contextValues}>
      {children}
    </CoreContext.Provider>
  );
};
