"use client";

import { use, useContext, useEffect } from "react";
import { AppContext } from "../../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBannerOwn from "../_components/ProductBannerOwn";
import BuildYourOwn from "../_components/BuildYourOwn";

export default function BuildYourOwnPage({ params }: any) {
  const paramsId: any = use(params);
  const productId = paramsId.productId;

  const { getProductById, productDetails }: any = useContext(AppContext);

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId]);

  const breadcrumbPath = `/product-details/${productId}/build-your-own`;

  return (
    <div className="pb-26 px-2">
      {productDetails?.title && (
        <BreadCrumb
          path={breadcrumbPath}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <div className="my-24 xl:px-20 flex flex-col md:flex-row items-start justify-center gap-12">
        <ProductBannerOwn productDetails={productDetails} />

        <div className="xl:w-3/5 md:w-2/3 w-full">
          <BuildYourOwn productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}
