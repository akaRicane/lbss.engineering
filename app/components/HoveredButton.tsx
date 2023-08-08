"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import "../styles/components.hovered.css";

const HoveredButton = (parentProps: any) => {
  const [btnId, setBtnId] = useState<string>("");
  const [btnText, setBtnText] = useState<string>("");
  const { updateCurrentMouseOver, resetCurrentMouseOver, getText } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(btnId);
  };

  const handleMouseOut = (): void => {
    resetCurrentMouseOver();
  };

  useEffect(() => {
    setBtnId(parentProps.btnID);
    setBtnText(getText(parentProps.btnID, parentProps.language));
  }, [parentProps]);

  return (
    <>
      <button id={btnId} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="hovered-button">
        {btnText}
      </button>
    </>
  );
};

export default HoveredButton;
