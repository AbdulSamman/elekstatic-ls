"use client";

import Image from "next/image";

const ProductBannerOwn = ({ productDetails }: any) => {
  return (
    <div className="object-contain p-2   mx-auto block">
      {productDetails?.banner?.url ? (
        <Image
          src={productDetails.banner.url}
          width={100}
          height={100}
          style={{ width: "auto", height: "440px" }}
          priority
          className="object-contain p-2 "
          alt="ProductBannerOwn"
        />
      ) : (
        <div className="h-75 w-full max-w-md bg-neutral-800/40 animate-pulse rounded-xl" />
      )}
    </div>
  );
};

export default ProductBannerOwn;
