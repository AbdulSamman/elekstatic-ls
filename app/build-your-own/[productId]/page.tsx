"use client";

import { use, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
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
    <div className="py-10 px-2">
      {productDetails?.title && (
        <BreadCrumb
          path={breadcrumbPath}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <div className="mt-10 xl:px-20 flex flex-col md:flex-row items-center md:justify-between xl:justify-evenly gap-4 md:ml-15">
        <ProductBannerOwn productDetails={productDetails} />
        <div className="xl:w-3/5 md:w-2/3  flex items-start w-full">
          <BuildYourOwn productDetails={productDetails} />
        </div>
      </div>
    </div>
  );
}
