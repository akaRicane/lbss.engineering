// entry point: layout

import "./styles/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { CoreContextProvider } from "./contexts/CoreContext";
import { LanguageContextProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sketcher from "./components/Sketcher";

export const metadata: Metadata = {
  title: "engineering-client",
  description: "lbss.engineering client",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.clear();
  return (
    <html lang="en">
      <body>
        <LanguageContextProvider>
          <CoreContextProvider>
            <Sketcher sketch="threedems"></Sketcher>
            <Header></Header>
            {children}
            <Footer></Footer>
          </CoreContextProvider>
        </LanguageContextProvider>
      </body>
    </html>
  );
}
