// component: footer
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import { useLanguageContext } from "../contexts/LanguageContext";
import HoveredLink from "./HoveredLink";
import "../styles/components.header.footer.css";

const Footer = () => {
  const { currentLanguage, updateCurrentLanguage } = useLanguageContext();
  const { getText, version } = useCoreContext();

  const handleUpdateLanguage = (props: string): void => {
    updateCurrentLanguage(props);
    const home = document.getElementById("LINK_TO_HOME");
    const betatest = document.getElementById("LINK_TO_BETATEST");
    home !== null ? (home.textContent = getText("LINK_TO_HOME")) : null;
    betatest !== null
      ? (betatest.textContent = getText("LINK_TO_BETATEST"))
      : null;
  };

  return (
    <main className="footer">
      <div className="centered-element">
        <div>
          <small>Language: {currentLanguage}</small>
          <button onClick={() => handleUpdateLanguage("en")}>🇺🇸</button>
          <button onClick={() => handleUpdateLanguage("fr")}>🇫🇷</button>
        </div>
      </div>
      <div className="centered-element">
        <HoveredLink linkID="LINK_TO_HOME" linkTarget="/"></HoveredLink>
      </div>
      <div className="centered-element">
        <HoveredLink
          linkID="LINK_TO_BETATEST"
          linkTarget="/betatest"
        ></HoveredLink>
        <small>{version}</small>
      </div>
    </main>
  );
};

export default Footer;
