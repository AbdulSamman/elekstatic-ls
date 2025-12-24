"use client";

import ProductItem from "./_components/PorductItem";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import SkeletonEffectProducts from "../_components/SkeletonEffectProducts";

const page = () => {
  const { products }: any = useContext(AppContext);
  return (
    <div className="max-w-7xl mx-auto px-2 py-28">
      <h2 className="text-3xl font-semibold mb-12 text-white">PRODUCTS</h2>
      {products.length > 0 ? (
        <ProductItem filteredProducts={[]} />
      ) : (
        <SkeletonEffectProducts />
      )}
    </div>
  );
};

export default page;
