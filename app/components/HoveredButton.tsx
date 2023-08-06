"use client";

import { useEffect, useState } from 'react';
import { useCoreContext } from "../contexts/CoreContext";

const HoveredButton = (props: any) => {

  const [btnId, setBtnId] = useState<string>('noname');
  const { updateCurrentMouseOver, resetCurrentMouseOver } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(btnId);
  };

  const handleMouseOut = (): void => {
    resetCurrentMouseOver();
  };

  useEffect(() => {
    setBtnId(props.btnID ? props.btnID : "noname");
  }, [])
  
  return (
    <>
      <button id={btnId} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{btnId}</button>
      <br/>
    </>
  )
}

export default HoveredButton;