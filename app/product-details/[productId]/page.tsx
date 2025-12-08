"use client";

import { useContext, useEffect, use } from "react";
import { AppContext } from "../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";

function ProductDetails({ params }: any) {
  const paramsId: any = use(params);
  const documentId = paramsId.productId;
  const { getProductById, productDetails } = useContext(AppContext);
  console.log("qwe", productDetails);

  useEffect(() => {
    if (!documentId) return;
    if (documentId) {
      getProductById(documentId);
    }
  }, [documentId]);

  return (
    <div className="py-8 px-10">
      <BreadCrumb />
      <div className="flex flex-col items-center justify-center">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>
    </div>
  );
}

export default ProductDetails;
