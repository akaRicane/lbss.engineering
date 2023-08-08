// component: Header
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import "../styles/components.header.footer.css";

const Header = () => {
  const { currentMouseOver, updateCurrentMouseOver, getText } = useCoreContext();

  return (
    <main className="header">
      <p>{currentMouseOver ? currentMouseOver : getText("HEADER_WELCOME")}</p>
    </main>
  );
};

export default Header;
