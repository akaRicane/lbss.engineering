// page: products
"use client";

import { useCoreContext } from '../contexts/CoreContext';
import HoveredButton from '../components/HoveredButton';

const Products = () => {

  const { getText } = useCoreContext();

  return (
    <main>
      <div>{getText("#PRODUCTS_PRESENTATION")}</div>
      <HoveredButton btnID="LINK_TO_ASTAR"></HoveredButton>
      <HoveredButton btnID="LINK_TO_LBSSCLOUD"></HoveredButton>
    </main>
  );
};

export default Products;
