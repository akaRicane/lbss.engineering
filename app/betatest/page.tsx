// page: betatest
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";

const Betatest = () => {

  const [myNumber, setMyNumber] = useState(0);
  const { counter, updateCounter } = useCoreContext();

  useEffect(() => {
    console.log("Building betatest");

  }, []);

  return (
    <div>
      <p>Counter: {counter}</p>
      <HoveredButton btnID="zeBtn"></HoveredButton>
      <HoveredButton btnID="proute"></HoveredButton>
      <HoveredButton btnID="zebi"></HoveredButton>
      <button onClick={updateCounter}>update counter</button>
    </div>
  );
};

export default Betatest;

