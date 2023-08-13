// component: Header
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import "../styles/components.header.footer.css";

const Header = () => {
  const { getText, currentMouseOver, language } = useCoreContext();

  return (
    <main className="header">
      <p className="rolling-text">{currentMouseOver ? currentMouseOver : getText("HEADER_WELCOME", language)}</p>
    </main>
  );
};

export default Header;
