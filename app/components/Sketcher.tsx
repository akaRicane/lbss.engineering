// component: Sketcher
"use client";

import { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import { getKeyFromMessage } from "../languages/TextGetter";

const Sketcher = ({ sketch }: { sketch: string }) => {
  const { getText, language, currentMouseOver } = useCoreContext();
  const [curSketch, setCurSketch] = useState("threedems");

  useEffect(() => {
    // @ts-ignore
    switch (getKeyFromMessage(currentMouseOver, language)) {
      case "LINK_TO_PRODUCTS":
        setCurSketch("poc");
        break;

      case "LINK_TO_ABOUT":
        setCurSketch("threedems");
        break;
    }
  }, [currentMouseOver, language]);

  return (
    <div>
      <iframe src={`./creative/${curSketch}/index.html`} className="w-full h-full"></iframe>
    </div>
  );
};

export default Sketcher;
