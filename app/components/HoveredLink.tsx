"use client";

import { useEffect, useState } from 'react';
import { useCoreContext } from "../contexts/CoreContext";
import Link from 'next/link';

const HoveredLink = (props: any) => {

  const [linkId, setLinkId] = useState<string>('');
  const [linkTarget, setLinkTarget] = useState<string>('/');
  const [linkText, setLinkText] = useState<string>('');
  const { updateCurrentMouseOver, resetCurrentMouseOver, getText } = useCoreContext();

  const handleMouseOver = (): void => {
    updateCurrentMouseOver(linkId);
  };

  const handleMouseOut = (): void => {
    resetCurrentMouseOver();
  };

  useEffect(() => {
    setLinkId(props.linkID);
    setLinkTarget(props.linkTarget ? props.linkTarget : "/");
    setLinkText(getText(props.linkID));
  }, [])
  
  return (
    <>
      <Link id={linkId} href={linkTarget} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{linkText}</Link>
      <br/>
    </>
  )
}

export default HoveredLink;