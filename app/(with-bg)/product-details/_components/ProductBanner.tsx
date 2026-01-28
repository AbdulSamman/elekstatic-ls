// "use client";

// import Image from "next/image";

// const ProductBanner = ({ productDetails }: any) => {
//   return (
//     <div className="productBanner flex items-center justify-center">
//       {productDetails?.banner?.url ? (
//         <Image
//           src={productDetails.banner.url}
//           width={100}
//           height={100}
//           style={{ width: "auto" }}
//           priority
//           className="object-contain transition-transform duration-500 hover:scale-[1.1] p-2 max-w-full h-80 sm:h-140"
//           alt="productDetailsBanner"
//         />
//       ) : (
//         <div className="h-75 w-full max-w-md bg-neutral-800/40 animate-pulse rounded-xl" />
//       )}
//     </div>
//   );
// };

// export default ProductBanner;

"use client";

import Image from "next/image";

const ProductBanner = ({ productDetails }: any) => {
  return (
    <div className="productBanner relative flex items-center justify-center w-full min-h-100 lg:min-h-125 bg-black group">
      {/* ELEKTROSTATISCHER HINTERGRUND-GLOW */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-75 h-75 bg-[#00BFFF]/10 blur-[120px] rounded-full group-hover:bg-[#00BFFF]/15 transition-all duration-1000"></div>
      </div>

      {/* PRODUKT-BILD */}
      {productDetails?.banner?.url ? (
        <div className="relative z-10 flex items-center justify-center w-full">
          <Image
            src={productDetails.banner.url}
            width={600} // Größere Basis-Breite für bessere Qualität
            height={600}
            priority
            className="object-contain transition-all duration-1000 ease-out
                       hover:scale-[1.05] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]
                       p-4 max-w-full h-80 sm:h-112.5 lg:h-137.5"
            alt={productDetails?.title || "Product Details Banner"}
          />

          {/* SUBTILER BODEN-SCHATTEN/REFLEKTION */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-[#00BFFF]/5 blur-xl rounded-[100%]"></div>
        </div>
      ) : (
        /* TECH-SKELETON LOADER */
        <div className="relative w-full max-w-md h-80 bg-neutral-900/40 animate-pulse border border-white/5 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin"></div>
        </div>
      )}

      {/* DEKORATIVE ECK-ELEMENTE (Industrial Style) */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-[#00BFFF]/40 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 group-hover:border-[#00BFFF]/40 transition-colors"></div>
    </div>
  );
};

export default ProductBanner;
