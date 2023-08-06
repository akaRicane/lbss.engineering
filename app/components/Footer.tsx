// component: footer
"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useLanguageContext } from '../contexts/LanguageContext';

const Footer = () => {

  const { currentLanguage, updateCurrentLanguage } = useLanguageContext();

  return (
    <main className="flex flex-col bg-blue-200">
      <Link href='/'>home</Link>
      <Link href='/betatest'>betatest</Link>
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
