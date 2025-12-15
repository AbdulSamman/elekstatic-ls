"use client";

import Image from "next/image";

const ProductBannerOwn = ({ productDetails }: any) => {
  return (
    <div className="ProductBannerOwn px-2 py-4">
      {productDetails?.banner?.url ? (
        <Image
          src={productDetails?.banner?.url}
          width={100}
          height={100}
          style={{ width: "auto", height: "440px" }}
          priority
          className="object-contain transition duration-500 group-hover:scale-110 p-0.5 max-[605px]:w-full "
          alt="ProductBannerOwn"
        />
      ) : (
        <div className="h-75 lg:w-112.5 bg-slate-200 animate-pulse rounded-lg md:w-[300]"></div>
      )}
    </div>
  );
};

export default ProductBannerOwn;
