// component: Footer
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredLink from "./HoveredLink";
import "../styles/components.header.footer.css";
import { useEffect, useState } from "react";

const Footer = () => {
  const { getText, version, language, updateLanguage, curLocation } = useCoreContext();
  const [pathname, setPathname] = useState(curLocation);

  useEffect(() => {
    console.log(curLocation);
    setPathname(curLocation);
  }, [curLocation]);

  return (
    <main className="footer">
      <div className="centered-element">
        <div>
          <small>Language {language} </small>
          <button onClick={() => updateLanguage("en")}>🇺🇸</button>
          <button onClick={() => updateLanguage("fr")}>🇫🇷</button>
        </div>
      </div>
      <div className="centered-element">
        {pathname !== "/" ? <HoveredLink linkID="LINK_TO_HOME" linkTarget="/" language={language}></HoveredLink> : <p> </p>}
      </div>
      <div className="centered-element">
        <small>{version}</small>
        {/* <HoveredLink linkID="LINK_TO_BETATEST" linkTarget="/betatest" language={language}></HoveredLink> */}
      </div>
    </main>
  );
};

export default Footer;
