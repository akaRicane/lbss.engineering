// page: betatest
"use client";

import React, { useEffect } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";

const Betatest = () => {

  const { counter, updateCounter } = useCoreContext();

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

