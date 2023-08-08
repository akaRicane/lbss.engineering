// component: Product Card
"use client";

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
    <div className="product-card">
      <p>{props.bodyContent}</p>
    </div>
  );
};

export default ProductCard;
