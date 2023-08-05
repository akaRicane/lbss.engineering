// page: betatest
"use client";

import React, { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";

const Betatest = () => {

  const [myNumber, setMyNumber] = useState(0);
  const { counter, updateCounter, getCounter } = useCoreContext();

  const handleMouseOver = (props: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("hovered")
  };

  useEffect(() => {
    console.log("Building betatest bitch");

  }, []);

  return (
    <div>
      <p>Counter: {counter}</p>
      <button id='my-btn' onMouseOver={handleMouseOver} onClick={updateCounter}>myBtn</button>
    </div>
  );
};

export default Betatest;

