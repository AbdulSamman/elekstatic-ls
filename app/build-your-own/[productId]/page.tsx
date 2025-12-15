"use client";

import { use, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBannerOwn from "../_components/ProductBannerOwn";

export default function BuildYourOwn({ params }: any) {
  const paramsId: any = use(params);
  const productId = paramsId.productId;

  const { getProductById, productDetails }: any = useContext(AppContext);

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId]);

  const breadcrumbPath = `/product-details/${productId}/build-your-own`;

  return (
    <div className="py-8 px-2">
      {productDetails?.title && (
        <BreadCrumb
          path={breadcrumbPath}
          productName={productDetails.title} // ✅ direkt aus Context
          buildYourOwnName="Build Your Own"
        />
      )}

      <div className="mt-10 flex flex-col md:flex-row items-center justify-around">
        <ProductBannerOwn productDetails={productDetails} />
        <h1>{productDetails?.title}</h1>
      </div>
    </div>
  );
}
