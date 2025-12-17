"use client";

import ProductBannerOwn from "../build-your-own/_components/ProductBannerOwn";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import BreadCrumb from "../_components/BreadCrumb";
import { useParams, useSearchParams } from "next/navigation";

export default function ViewSummaryPage() {
  const { productDetails, getProductById }: any = useContext(AppContext);

  const { productId } = useParams<{ productId: string }>();
  const searchParams = useSearchParams();

  const selected = JSON.parse(searchParams.get("selected") || "{}");

  if (Object.keys(selected).length === 0) return <div>No selections made</div>;

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId]);

  return (
    <div className="py-8 px-2">
      {productDetails?.title && (
        <BreadCrumb
          path={`/product-details/${productId}/build-your-own/view-summary`}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}
      <div>
        <ProductBannerOwn productDetails={productDetails} />
      </div>

      {Object.keys(selected).map((section) => (
        <div key={section}>
          <strong>{section}</strong>:{" "}
          <span
            className={`${
              selected[section].label === "None" ? "text-red-500" : "text-black"
            }`}
          >
            {selected[section].label}
          </span>
        </div>
      ))}
    </div>
  );
}
