"use client";

import { useContext } from "react";
import { AppContext } from "../AppContext";

function ProductSection() {
  const { products }: any = useContext(AppContext);

  return (
    <div className="px-2 py-20 lg:px-20 ">
      <h1 className="px-2 mb-4">Brand Neu</h1>
      {/* {products.length > 0 && <ProductList />} */}
    </div>
  );
}

export default ProductSection;
