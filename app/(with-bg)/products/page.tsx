"use client";

import ProductItem from "./_components/PorductItem";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import SkeletonEffectProducts from "../../_components/SkeletonEffectProducts";

const page = () => {
  const { products }: any = useContext(AppContext);
  return (
    <div className="py-28 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold text-neutral-400">PRODUCTS</h2>
      <p className="max-w-2xl text-center py-10">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni eaque
        provident amet quo rem autem dolor itaque! Consequatur, incidunt veniam.
        Enim quod animi perspiciatis placeat. Voluptas pariatur molestias
        sapiente alias.
      </p>
      {products.length > 0 ? (
        <ProductItem filteredProducts={[]} />
      ) : (
        <SkeletonEffectProducts />
      )}
    </div>
  );
};

export default page;
