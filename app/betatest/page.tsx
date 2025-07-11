// page: betatest
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";
import HoveredLink from "../components/HoveredLink";

const Betatest = () => {
  const { counter, updateCounter } = useCoreContext();

  return (
    <div className="page">
      <p>Counter: {counter}</p>
      <button onClick={updateCounter}>update counter</button>
    </div>
  );
};

export default Betatest;
