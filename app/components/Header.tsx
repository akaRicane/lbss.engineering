// component: Header
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import { useState, useEffect } from "react";
import "../styles/components.header.footer.css";

const Header = () => {
  const { currentMouseOver, isHovering, getText, language } = useCoreContext();
  const [activeHeader, setActiveHeader] = useState(currentMouseOver);
  const [headerStyle, setHeaderStyle] = useState({
    backgroundColor: "var(--bgn-color-2)",
  });

  useEffect(() => {
    setActiveHeader(currentMouseOver || getText("HEADER_WELCOME", language));
    isHovering
      ? setHeaderStyle({
          backgroundColor: "var(--bgn-color-3)",
        })
      : setHeaderStyle({
          backgroundColor: "var(--bgn-color-2)",
        });
  }, [activeHeader, currentMouseOver, isHovering, language, getText]);

  return (
    <main className="header" style={headerStyle}>
      <p className="rolling-text">{activeHeader}</p>
      <p className="header-title" style={headerStyle}>
        LBSS.ENGINEERING
      </p>
      <p className="rolling-text">{activeHeader}</p>
      {/* <p className="rolling-text">{activeHeader}</p> */}
    </main>
  );
};

export default Header;
