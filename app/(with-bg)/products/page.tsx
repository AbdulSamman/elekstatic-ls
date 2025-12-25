"use client";

import ProductItem from "./_components/PorductItem";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import SkeletonEffectProducts from "../../_components/SkeletonEffectProducts";
import BreadCrumb from "@/app/_components/BreadCrumb";

const page = () => {
  const { products }: any = useContext(AppContext);

  const breadcrumbPath = `/products`;
  return (
    <div className="">
      <BreadCrumb
        path={breadcrumbPath}
        productName={products.title}
        buildYourOwnName="PRODUCTS"
      />

      <div className="flex flex-col items-center justify-center pb-28 ">
        <h2 className="text-4xl font-semibold text-neutral-400 pt-10">
          PRODUCTS
        </h2>
        <p className="max-w-2xl text-center py-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni eaque
          provident amet quo rem autem dolor itaque! Consequatur, incidunt
          veniam. Enim quod animi perspiciatis placeat. Voluptas pariatur
          molestias sapiente alias.
        </p>
        {products.length > 0 ? (
          <ProductItem filteredProducts={[]} />
        ) : (
          <SkeletonEffectProducts />
        )}
      </div>
    </div>
  );
};

export default page;
