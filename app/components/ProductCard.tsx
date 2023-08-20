// component: Product Card
"use client";

import { useState } from "react";
import { useCoreContext } from "../contexts/CoreContext";
import Link from "next/link";
import HoveredLink from "./HoveredLink";
import "../styles/components.productCard.css";

/*
need:
> link id (to open proper url)
> infos (title, body text)
> main color (font, border and image filter)
> background image (target /public)
*/

const ProductCard = (props: any) => {
  const { updateCurrentMouseOver, resetCurrentMouseOver } = useCoreContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onCardMouseOver = () => {
    setIsHovered(true);
    updateCurrentMouseOver(props.linkID);
  };

  const onCardMouseOut = () => {
    setIsHovered(false);
    resetCurrentMouseOver();
  };

  return (
    <Link className="product-card" href={props.linkTarget} id={props.linkID} onMouseOver={onCardMouseOver} onMouseOut={onCardMouseOut}>
      {isHovered ? <p className="card-title">Discover {props.title}</p> : <p className="card-title">{props.title}</p>}
      <p>{props.bodyContent}</p>
    </Link>
  );
};

export default ProductCard;
