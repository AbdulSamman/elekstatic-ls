"use client";

import ProductItem from "./ProductItem";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import SkeletonEffectProducts from "./SkeletonEffectProducts";

const ProductSection = () => {
  const { products }: any = useContext(AppContext);
  return (
    <div className=" ">
      <h1 className="p-6 text-xl">Brand Neu</h1>
      {products.length > 0 ? (
        <ProductItem filteredProducts={[]} />
      ) : (
        <SkeletonEffectProducts />
      )}
    </div>
  );
};

export default ProductSection;
