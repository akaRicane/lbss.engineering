// page astar section: Overview
"use client";

import { useCoreContext } from "../../contexts/CoreContext";
import "../../styles/page.astar.css";

const Overview = () => {
  const { getText, language } = useCoreContext();

  return (
    <>
      <div className="astar-paragraph">{getText("#ASTAR_OVERVIEW_1", language)}</div>
      <div className="astar-paragraph">{getText("#ASTAR_OVERVIEW_2", language)}</div>
      <div className="astar-paragraph">{getText("#ASTAR_OVERVIEW_3", language)}</div>
    </>
  );
};

export default Overview;
