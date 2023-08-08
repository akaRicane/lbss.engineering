// component: Product Card
"use client";

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
  return (
    <Link className="product-card" href={props.linkTarget} id={props.linkID}>
      <p className="card-title">{props.title}</p>
      <p>{props.bodyContent}</p>
    </Link>
  );
};

export default ProductCard;
