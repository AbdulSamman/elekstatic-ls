"use client";

import { useContext } from "react";
import { AppContext } from "../AppContext";

import ProductList from "./ProductList";

function ProductSection() {
  const { products } = useContext(AppContext);

  return (
    <div className="px-2 py-20 lg:px-20 ">
      <h1 className="px-2 mb-4">Brand Neu</h1>
      {products.length > 0 && <ProductList products={products} />}
    </div>
  );
}

export default ProductSection;
