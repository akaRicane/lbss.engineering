// component: footer
"use client";

import React, { useState, useEffect } from 'react';
import { useLanguageContext } from '../contexts/LanguageContext';
import HoveredLink from "./HoveredLink";

const Footer = () => {

  const { currentLanguage, updateCurrentLanguage } = useLanguageContext();

  return (
    <main className="flex flex-col bg-blue-200">
      <HoveredLink linkID='home' linkTarget='/'></HoveredLink>
      <HoveredLink linkID='betatest' linkTarget='/betatest'></HoveredLink>
      <div>
        <p>Language: {currentLanguage}</p>
        <button onClick={() => updateCurrentLanguage("fr")}>🇫🇷</button>
        <button onClick={() => updateCurrentLanguage("en")}>🇺🇸</button>
        <button onClick={() => updateCurrentLanguage("it")}>🇮🇹</button>
      </div>
    </main>
  );
};

export default Footer;
