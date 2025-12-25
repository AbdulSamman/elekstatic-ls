"use client";

import Image from "next/image";

const ProductBannerOwn = ({ productDetails }: any) => {
  return (
    <div className=" max-w-full mx-auto block my-auto">
      {productDetails?.banner?.url ? (
        <Image
          src={productDetails.banner.url}
          width={100}
          height={100}
          style={{ width: "auto" }}
          priority
          className="object-contain transition-transform duration-500 hover:scale-[1.1]  max-w-full h-80 sm:h-140"
          alt="ProductBannerOwn"
        />
      ) : (
        <div className="h-75 w-full max-w-md bg-neutral-800/40 animate-pulse rounded-xl" />
      )}
    </div>
  );
};

export default ProductBannerOwn;
