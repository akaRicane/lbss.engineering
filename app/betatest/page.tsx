"use client";

import { useState, useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";

const Betatest = () => {
  
  const [myNumber, setMyNumber] = useState(0);
  const { counter, updateCounter, getCounter } = useCoreContext();

  useEffect(() => {
    console.log("Building betatest bitch");
  }, []);

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={updateCounter}>prout</button>
    </div>
  );
};

export default Betatest;

