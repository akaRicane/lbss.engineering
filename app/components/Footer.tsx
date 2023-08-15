// component: Footer
"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import HoveredLink from "./HoveredLink";
import "../styles/components.header.footer.css";

const Footer = () => {
  const { getText, currentMouseOver, version, language, updateLanguage, curLocation } = useCoreContext();
  const [pathname, setPathname] = useState(curLocation);
  const [showLanguagesOptions, setShowLanguagesOptions] = useState<boolean>(false);

  const handleOnMouseOverLanguage = () => {
    setShowLanguagesOptions(true);
  };

  const handleOnMouseOutLanguage = () => {
    setShowLanguagesOptions(false);
  };

  useEffect(() => {
    setPathname(curLocation);
  }, [curLocation]);

  const activeHeaderText = currentMouseOver ? currentMouseOver : getText("HEADER_WELCOME", language);
  const footerStyle = {
    backgroundColor: activeHeaderText == getText("HEADER_WELCOME", language) ? 'var(--bgn-color-2)' : 'var(--bgn-color-3)', 
  };

  return (
    <main className="footer" style={footerStyle}>
      <div className="centered-element">
        <div onMouseOver={handleOnMouseOverLanguage} onMouseOut={handleOnMouseOutLanguage}>
          {showLanguagesOptions ? (
            <div>
              <button onClick={() => updateLanguage("en")}>🇺🇸</button>
              <button onClick={() => updateLanguage("fr")}>🇫🇷</button>
            </div>
          ) : (
            <button>{getText("LANGUAGE", language)}</button>
          )}
        </div>
      </div>
      <div className="centered-element">
        {pathname !== "/" ? <HoveredLink linkID="LINK_TO_HOME" linkTarget="/" language={language}></HoveredLink> : <p> </p>}
      </div>
      <div className="centered-element">
        <small>{version}</small>
      </div>
    </main>
  );
};

export default Footer;
