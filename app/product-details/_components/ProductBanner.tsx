"use client";

import { IProduct } from "@/app/interfaces";
import Image from "next/image";

const ProductBanner = ({ productDetails }: any) => {
  console.log("productDetails1", productDetails);
  if (!productDetails) {
    console.log("no yet");
  } else {
    console.log("here we are");
  }
  return (
    <div className="productBanner ">
      {productDetails?.banner?.url ? (
        <Image
          src={productDetails?.banner?.url}
          width={100}
          height={100}
          style={{ width: "auto", height: "340px" }}
          priority
          className="object-contain transition duration-500 group-hover:scale-110 p-0.5 max-[605px]:w-full "
          alt="productDetailsBanner"
        />
      ) : (
        <div className="h-[300px] lg:w-[450px] bg-slate-200 animate-pulse rounded-lg md:w-[300]"></div>
      )}
    </div>
  );
};

export default ProductBanner;
