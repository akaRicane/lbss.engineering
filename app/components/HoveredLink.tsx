"use client";

import { useEffect, useState } from 'react';
import { useCoreContext } from "../contexts/CoreContext";
import Link from 'next/link';

const HoveredLink = (props: any) => {

  const [linkId, setLinkId] = useState<string>('noname');
  const [linkTarget, setLinkTarget] = useState<string>('/');
  const { updateCurrentMouseOver, resetCurrentMouseOver } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(linkId);
  };

  const handleMouseOut = (): void => {
    resetCurrentMouseOver();
  };

  useEffect(() => {
    setLinkId(props.linkID ? props.linkID : "noname");
    setLinkTarget(props.linkTarget ? props.linkTarget : "/");
    console.log(props);
  }, [])
  
  return (
    <>
      <Link href={linkTarget} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{linkId}</Link>
      <br/>
    </>
  )
}

export default HoveredLink;