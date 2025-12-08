"use client";

import { useContext } from "react";
import { AppContext } from "../AppContext";

import ProductList from "./ProductList";

function ProductSection() {
  const { products } = useContext(AppContext);

  return (
    <div className="px-6 md:px-15 ">
      <h2 className="my-4 text-2xl font-bold">Brand Neu</h2>
      {/* {products.length > 0 && <ProductList products={products} />} */}
    </div>
  );
}

export default ProductSection;
