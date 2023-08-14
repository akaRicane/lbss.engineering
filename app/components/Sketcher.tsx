// component: Sketcher
"use client";

// import { useState, useEffect } from "react";
// import { useCoreContext } from "../contexts/CoreContext";
// import { getKeyFromMessage } from "../languages/TextGetter";

const Sketcher = ({ sketch }: { sketch: string }) => {
  // const { getText, language, currentMouseOver } = useCoreContext();
  // const [curSketch, setCurSketch] = useState("threedems");

  // useEffect(() => {
  //   // @ts-ignore
  //   switch (getKeyFromMessage(currentMouseOver, language)) {
  //     case "LINK_TO_PRODUCTS":
  //       setCurSketch("threedems");
  //       break;

  //     case "LINK_TO_ABOUT":
  //       setCurSketch("threedems");
  //       break;
  //   }
  // }, [currentMouseOver, language]);

  return (
    <div className="-z-10 w-full h-full fixed top-0 left-0 right-0">
      <iframe id="CREATIVE_FRAME" src={`./creative/threedems/index.html`} className="w-full h-full"></iframe>
    </div>
  );
};

export default Sketcher;
