// page: products
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";

const Products = () => {
  const { getText, language } = useCoreContext();

  return (
    <main>
      <div>{getText("#PRODUCTS_PRESENTATION", language)}</div>
      <HoveredButton btnID="LINK_TO_ASTAR" language={language}></HoveredButton>
      <HoveredButton btnID="LINK_TO_LBSSCLOUD" language={language}></HoveredButton>
    </main>
  );
};

export default Products;
