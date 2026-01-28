"use client";

import ProductItem from "./_components/PorductItem";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import SkeletonEffectProducts from "../../_components/SkeletonEffectProducts";
import BreadCrumb from "@/app/_components/BreadCrumb";

const Page = () => {
  const { products }: any = useContext(AppContext);

  // Der Pfad endet hier bei /products, damit BreadCrumb weiß: Das ist die Endstation.
  const breadcrumbPath = `/products`;

  return (
    <div className="bg-black min-h-screen">
      {/* Breadcrumb mit korrektem Namen für die aktuelle Position */}
      <BreadCrumb
        path={breadcrumbPath}
        productName="Inventory"
        buildYourOwnName="PRODUCTS"
      />

      <div className="flex flex-col items-center justify-center pb-28 pt-16">
        {/* Hauptüberschrift im Technical-Branding Style */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#00BFFF]/40"></span>
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.5em] uppercase">
              Audio Solutions
            </span>
            <span className="w-6 h-px bg-[#00BFFF]/40"></span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center uppercase leading-none">
            Our <span className="text-neutral-800">Products</span>
          </h1>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-[#00BFFF] to-transparent mt-8 shadow-[0_0_15px_#00BFFF]"></div>
        </div>

        {/* Beschreibungstext mit besserer Lesbarkeit */}
        <p className="max-w-2xl text-center px-6 text-neutral-500 text-sm leading-relaxed font-light tracking-wide mb-20">
          Entdecken Sie unsere Auswahl an hochpräzisen Audiokomponenten. Jedes
          Produkt wurde mit dem Fokus auf maximale Klangreinheit und langlebige
          Technik entwickelt – handgefertigt für Enthusiasten, die keine
          Kompromisse eingehen.
        </p>

        {/* Produkt-Liste oder Loader */}
        <div className="w-full">
          {products.length > 0 ? (
            <ProductItem filteredProducts={[]} />
          ) : (
            <div className="max-w-350 mx-auto px-4">
              <SkeletonEffectProducts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
