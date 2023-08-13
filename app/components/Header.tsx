// component: Header
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import "../styles/components.header.footer.css";

const Header = () => {
  const { getText, currentMouseOver, language } = useCoreContext();

  const handleOnClickLogin = () => {
    const loginUrl = process.env.ENGINE_API_LOGIN_URL;

    if (loginUrl) {
      window.location.assign(loginUrl);
    } else {
      console.error("ENGINE_API_LOGIN_URL is not defined in the environment variables.");
    }
  };

  return (
    <main className="header">
      <button onClick={handleOnClickLogin}>login</button>
      <p className="rolling-text">{currentMouseOver ? currentMouseOver : getText("HEADER_WELCOME", language)}</p>
    </main>
  );
};

export default Header;
