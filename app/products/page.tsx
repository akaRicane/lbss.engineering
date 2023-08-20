// page: products
"use client";

import { useCoreContext } from "../contexts/CoreContext";
import HoveredButton from "../components/HoveredButton";
import ProductCard from "../components/ProductCard";
import "../styles/page.products.css";

const Products = () => {
  const { getText, language } = useCoreContext();

  return (
    <main className="products-page">
      <div className="products-page-title">{getText("#PRODUCTS_PRESENTATION", language)}</div>
      <div className="products-list">
        <ProductCard
          title="ASTAR"
          bodyContent={getText("#PRODUCTS_PRESENTATION_ASTAR", language)}
          linkID="LINK_TO_ASTAR"
          linkTarget="/astar"
          language={language}
        ></ProductCard>
        <ProductCard
          title="LBSS Cloud"
          bodyContent={getText("#PRODUCTS_PRESENTATION_LBSSCLOUD", language)}
          linkID="LINK_TO_LBSSCLOUD"
          linkTarget="/betatest"
          language={language}
        ></ProductCard>
      </div>
    </main>
  );
};

export default Products;
