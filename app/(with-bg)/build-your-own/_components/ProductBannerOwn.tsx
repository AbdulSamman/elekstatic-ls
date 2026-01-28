// "use client";

// import Image from "next/image";

// const ProductBannerOwn = ({ productDetails }: any) => {
//   return (
//     <div className=" max-w-full mx-auto block my-auto">
//       {productDetails?.banner?.url ? (
//         <Image
//           src={productDetails.banner.url}
//           width={100}
//           height={100}
//           style={{ width: "auto" }}
//           priority
//           className="object-contain transition-transform duration-500 hover:scale-[1.1] p-2  max-w-full h-80 sm:h-140"
//           alt="ProductBannerOwn"
//         />
//       ) : (
//         <div className="h-75 w-full max-w-md bg-neutral-800/40 animate-pulse rounded-xl" />
//       )}
//     </div>
//   );
// };

// export default ProductBannerOwn;
"use client";

import Image from "next/image";

const ProductBannerOwn = ({ productDetails }: any) => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-100 bg-black group overflow-hidden">
      {/* TECHNISCHES RASTER (Subtiler Hintergrund-Effekt) */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00BFFF 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* ZENTRALER GLOW-EFFEKT */}
      <div className="absolute w-62.5 h-62.5 bg-[#00BFFF]/5 blur-[100px] rounded-full transition-all duration-1000 group-hover:bg-[#00BFFF]/10" />

      {productDetails?.banner?.url ? (
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src={productDetails.banner.url}
            width={500}
            height={500}
            priority
            className="object-contain transition-all duration-700 ease-in-out hover:scale-[1.03] p-4 max-w-full h-80 sm:h-120"
            alt="Product Configuration Preview"
          />

          {/* ELEKTROSTATISCHE REFLEKTION UNTER DEM PRODUKT */}
          <div className="w-40 h-1 bg-[#00BFFF]/20 blur-md rounded-[100%] mt-4 shadow-[0_0_20px_#00BFFF]"></div>

          {/* STATUS LABEL */}
          <div className="mt-8 flex items-center gap-2 border border-white/10 bg-neutral-950 px-3 py-1">
            <div className="w-1 h-1 bg-[#00BFFF] animate-ping rounded-full"></div>
            <span className="text-[9px] font-black tracking-[0.3em] text-neutral-500 uppercase">
              Live Preview
            </span>
          </div>
        </div>
      ) : (
        /* TECH SKELETON */
        <div className="relative w-64 h-80 border border-white/5 bg-neutral-900/20 animate-pulse flex items-center justify-center">
          <div className="absolute inset-0 border border-[#00BFFF]/10 border-dashed"></div>
          <span className="text-[10px] text-neutral-700 font-bold tracking-widest uppercase italic">
            Loading Data...
          </span>
        </div>
      )}

      {/* DEKORATIVE ECK-ELEMENTE */}
      <div className="absolute top-6 left-6 w-4 h-px bg-white/20"></div>
      <div className="absolute top-6 left-6 w-px h-4 bg-white/20"></div>
    </div>
  );
};

export default ProductBannerOwn;
