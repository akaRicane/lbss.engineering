// component: header
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";


const Header = () => {

  const { currentMouseOver, updateCurrentMouseOver } = useCoreContext();

  return (
    <main>
      <p>{currentMouseOver ? currentMouseOver : 'Welcome to lbss.engineering!'}</p>
    </main>
  );
};

export default Header;
