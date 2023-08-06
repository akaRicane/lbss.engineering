// component: Header
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";

const Header = () => {

  const { currentMouseOver, updateCurrentMouseOver, getText } = useCoreContext();

  return (
    <main>
      <p>{currentMouseOver ? currentMouseOver : getText('HEADER_WELCOME')}</p>
    </main>
  );
};

export default Header;
