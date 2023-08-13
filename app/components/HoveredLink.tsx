"use client";

import { useEffect, useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import Link from "next/link";
import "../styles/components.hovered.css";

const HoveredLink = (parentProps: any) => {
  const [linkId, setLinkId] = useState<string>("");
  const [linkTarget, setLinkTarget] = useState<string>("/");
  const [linkText, setLinkText] = useState<string>("");
  const { updateCurrentMouseOver, resetCurrentMouseOver, getText } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(linkId);
  };

  const handleMouseOut = (): void => {
    resetCurrentMouseOver();
  };

  useEffect(() => {
    setLinkId(parentProps.linkID);
    setLinkTarget(parentProps.linkTarget ? parentProps.linkTarget : "/");
    setLinkText(getText(parentProps.linkID, parentProps.language));
  }, [parentProps, getText]);

  return (
    <>
      <Link id={linkId} href={linkTarget} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="hovered-link">
        {linkText}
      </Link>
    </>
  );
};

export default HoveredLink;
