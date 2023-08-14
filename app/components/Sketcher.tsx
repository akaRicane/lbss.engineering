// component: Sketcher
"use client";

import { useState, useEffect } from "react";
import { sendToCreative } from "../api/utils/creativeApi";

const Sketcher = ({ sketch }: { sketch: string }) => {
  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      sendToCreative({
        target: "cursor",
        message: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    });
  }, []);

  return (
    <div className="-z-10 w-full h-full fixed top-0 left-0 right-0">
      <iframe id="CREATIVE_FRAME" src={`./creative/threedems/index.html`} className="w-full h-full"></iframe>
    </div>
  );
};

export default Sketcher;
