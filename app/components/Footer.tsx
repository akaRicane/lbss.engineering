// component: Footer
"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import HoveredLink from "./HoveredLink";
import { TextGetter } from "../languages/TextGetter";
import "../styles/components.header.footer.css";

const Footer = () => {
  const { getText, version, language, updateLanguage, curLocation } = useCoreContext();
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

  return (
    <main className="footer">
      <div className="centered-element">
        <div onMouseOver={handleOnMouseOverLanguage} onMouseOut={handleOnMouseOutLanguage}>
          {showLanguagesOptions ? (
            <div>
              <button onClick={() => updateLanguage("en")}>🇺🇸</button>
              <button onClick={() => updateLanguage("fr")}>🇫🇷</button>
            </div>
          ) : (
            <button>{TextGetter("LANGUAGE", language)}</button>
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
