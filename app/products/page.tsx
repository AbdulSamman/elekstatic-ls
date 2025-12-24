"use client";

import ProductItem from "./_components/PorductItem";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import SkeletonEffectProducts from "../_components/SkeletonEffectProducts";

const page = () => {
  const { products }: any = useContext(AppContext);
  return (
    <div className="h-full pb-6">
      {products.length > 0 ? (
        <ProductItem filteredProducts={[]} />
      ) : (
        <SkeletonEffectProducts />
      )}
    </div>
  );
};

export default page;
