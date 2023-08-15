// component: Header
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import "../styles/components.header.footer.css";

const Header = () => {
  const { getText, currentMouseOver, language } = useCoreContext();

  const activeHeaderText = currentMouseOver ? (currentMouseOver ): (getText("HEADER_WELCOME", language));
  const headerStyle = {
    backgroundColor: activeHeaderText == getText("HEADER_WELCOME", language) ? 'var(--bgn-color-2)' : 'var(--bgn-color-3)', 
  };
  
  return (
    <main className="header" style={headerStyle}>
      <p className="rolling-text">{activeHeaderText} </p>
    </main>
  );
};

export default Header;
