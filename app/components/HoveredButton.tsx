"use client";

import { useEffect, useState } from 'react';
import { useCoreContext } from "../contexts/CoreContext";

const HoveredButton = (props: any) => {

  const [btnId, setBtnId] = useState<string>('noname');
  const { updateCurrentMouseOver } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(btnId);
  };

  const handleMouseOut = (): void => {
    updateCurrentMouseOver(null);
  };

  useEffect(() => {
    setBtnId(props.btnID ? props.btnID : "noname");

    return () => {
      console.log("unmounting hoveredButton", btnId);
    }
  }, [])
  
  return (
    <>
      <button id={btnId} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{btnId}</button>
      <br/>
    </>
  )
}

export default HoveredButton;