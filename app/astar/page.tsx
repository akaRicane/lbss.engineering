// page product: astar
"use client";

import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Overview from "./sections/Overview";
import Features from "./sections/Features";
import Usages from "./sections/Usages";
import Specifications from "./sections/Specifications";
import Download from "./sections/Download";
import More from "./sections/More";
import "../styles/page.astar.css";

interface NotifyAstarProductPageProps {
  target: string;
  section?: string;
}

const AstarProductPage = () => {
  const [curLocation, setCurLocation] = useState<string>("overview");

  const notifyAstarProductPage = (props: NotifyAstarProductPageProps) => {
    switch (props.target) {
      case "navigation":
        setCurLocation(props.section || "overview");
        break;

      default:
        console.log(props);
        break;
    }
    // setCurLocation()
  };

  const sectionProvider = () => {
    switch (curLocation) {
      case "features":
        return <Features></Features>;
      case "usages":
        return <Usages></Usages>;
      case "specifications":
        return <Specifications></Specifications>;
      case "download":
        return <Download></Download>;
      case "more":
        return <More></More>;

      default:
        return <Overview></Overview>;
    }
  };

  return (
    <div className="astar-page">
      <Navigation callback={notifyAstarProductPage}></Navigation>
      {sectionProvider()}
    </div>
  );
};

export default AstarProductPage;
