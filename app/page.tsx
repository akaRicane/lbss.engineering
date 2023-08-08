// page: home
"use client";

import { useCoreContext } from "./contexts/CoreContext";
import HoveredButton from "./components/HoveredButton";
import HoveredLink from "./components/HoveredLink";
import "./styles/page.home.css";

export default function Home() {
  const { counter } = useCoreContext();

  return (
    <main className="home">
      <div className="centered-element">
        <p>Counter: {counter}</p>
      </div>
      <div className="centered-element">
        <HoveredLink
          linkID="LINK_TO_PRODUCTS"
          linkTarget="/products"
        ></HoveredLink>
        <HoveredLink linkID="LINK_TO_ABOUT" linkTarget="/about"></HoveredLink>
      </div>
    </main>
  );
}
