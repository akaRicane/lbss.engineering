// component: footer
"use client";

import React, { useState, useEffect } from 'react';
import { useCoreContext } from '../contexts/CoreContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import HoveredLink from "./HoveredLink";

const Footer = () => {

  const [hotLanguage, setHotLanguage] = useState<string | null>('en');
  const { currentLanguage, updateCurrentLanguage } = useLanguageContext();
  const { getText } = useCoreContext();

  const handleUpdateLanguage = (props: string): void => {
    updateCurrentLanguage(props);
    setHotLanguage(props);
    const home = document.getElementById('LINK_TO_HOME');
    const betatest = document.getElementById('LINK_TO_BETATEST');
    home !== null ? home.textContent = getText('LINK_TO_HOME') : null;
    betatest !== null ? betatest.textContent = getText('LINK_TO_BETATEST') : null;
  }

  return (
    <main className="flex flex-col bg-blue-200">
      <HoveredLink linkID='LINK_TO_HOME' linkTarget='/'></HoveredLink>
      <HoveredLink linkID='LINK_TO_BETATEST' linkTarget='/betatest'></HoveredLink>
      <div>
        <p>Language: {currentLanguage}</p>
        <button onClick={() => handleUpdateLanguage("fr")}>🇫🇷</button>
        <button onClick={() => handleUpdateLanguage("en")}>🇺🇸</button>
        <button onClick={() => handleUpdateLanguage("it")}>🇮🇹</button>
      </div>
    </main>
  );
};

export default Footer;
