// component: Footer
"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import HoveredLink from "./HoveredLink";
import "../styles/components.header.footer.css";

const Footer = () => {
  const { getText, currentMouseOver, version, language, updateLanguage, curLocation, isHovering } = useCoreContext();
  const [pathname, setPathname] = useState(curLocation);
  const [showLanguagesOptions, setShowLanguagesOptions] = useState<boolean>(false);
  const [footerStyle, setFooterStyle] = useState({
    backgroundColor: "var(--bgn-color-2)",
  });

  const handleOnMouseOverLanguage = () => {
    setShowLanguagesOptions(true);
  };

  const handleOnMouseOutLanguage = () => {
    setShowLanguagesOptions(false);
  };

  useEffect(() => {
    setPathname(curLocation);
    isHovering
      ? setFooterStyle({
          backgroundColor: "var(--bgn-color-3)",
        })
      : setFooterStyle({
          backgroundColor: "var(--bgn-color-2)",
        });
  }, [curLocation, isHovering]);

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
