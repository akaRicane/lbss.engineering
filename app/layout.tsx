import "./styles/globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CoreContextProvider } from './contexts/CoreContext';

export const metadata: Metadata = {
  title: "engineering-client",
  description: "lbss.engineering client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.clear();
  return (
    <html lang="en">
      <body>
        <CoreContextProvider>
          <Header></Header>
          {children}
          <Footer></Footer>
        </CoreContextProvider>
      </body>
    </html>
  );
}
