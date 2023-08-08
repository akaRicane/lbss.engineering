// component: Home
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";
import HoveredLink from "../components/HoveredLink";
import "../styles/components.home.css";

export default function Home() {
  const { language, counter } = useCoreContext();

  return (
    <main className="home">
      <div className="centered-element">
        <p>Counter: {counter}</p>
      </div>
      <div className="centered-element">
        <HoveredLink linkID="LINK_TO_PRODUCTS" linkTarget="/products" language={language}></HoveredLink>
        <HoveredLink linkID="LINK_TO_ABOUT" linkTarget="/about" language={language}></HoveredLink>
      </div>
    </main>
  );
}
