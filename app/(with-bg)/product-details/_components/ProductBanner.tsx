"use client";

import Image from "next/image";

const ProductBanner = ({ productDetails }: any) => {
  return (
    <div className="productBanner flex items-center justify-center">
      {productDetails?.banner?.url ? (
        <Image
          src={productDetails.banner.url}
          width={100}
          height={100}
          style={{ width: "auto" }}
          priority
          className="object-contain transition-transform duration-500 hover:scale-[1.1] p-2 max-w-full h-80 sm:h-140"
          alt="productDetailsBanner"
        />
      ) : (
        <div className="h-75 w-full max-w-md bg-neutral-800/40 animate-pulse rounded-xl" />
      )}
    </div>
  );
};

export default ProductBanner;
