// component: Sketcher

import React from "react";

const Sketcher = ({ sketch }: { sketch: string }) => {
  return (
    <div>
      <iframe src={`./creative/${sketch}/index.html`} className="w-full h-full"></iframe>
    </div>
  );
};

export default Sketcher;
