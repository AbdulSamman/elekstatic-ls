// import { FiBox } from "react-icons/fi";
// import SkeletonEffectProductInfo from "./SkeletonEffectProductInfo";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useContext, useState } from "react";
// import { AppContext } from "../../../AppContext";

// function ProductInfo({ productDetails }: any) {
//   const { handleAddToCart } = useContext(AppContext);
//   const [qty, setQty] = useState<Number>(1);

//   const handleClickAddToCart = () => {
//     handleAddToCart({
//       ...productDetails,
//       qty,
//       selectedOptions: [],
//     });
//   };
//   return (
//     <>
//       {productDetails.title ? (
//         <div className="flex flex-col gap-6 items-center text-center lg:text-left">
//           <div className="flex flex-col gap-3 px-2 w-full md:w-150 pt-8">
//             <h2 className="text-3xl font-semibold tracking-tight text-white">
//               {productDetails.title}
//             </h2>

//             <h2 className="text-sm uppercase tracking-wider text-neutral-400">
//               {productDetails.category}
//             </h2>

//             <p className="text-[15px] leading-relaxed text-neutral-300">
//               {productDetails?.description?.[0]?.children?.[0]?.text}
//             </p>

//             {productDetails.lieferStatus === "Vorbestellung" ? (
//               <div className="flex flex-col items-start">
//                 <div className="flex items-center justify-start gap-2 pt-2">
//                   <div className="w-2 h-2 bg-red-800 rounded-full"></div>
//                   <span className="text-red-800 text-xs">Vorbestellung:</span>
//                 </div>
//                 <span className="text-red-800 text-xs py-2 px-4">
//                   Lieferzeit kann 14 bis 28 Arbeitstage dauern
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-start gap-2 pt-2">
//                 <div className="w-2 h-2 bg-green-800 rounded-full"></div>
//                 <span className="text-green-800 text-xs py-2">Auf Lager</span>
//               </div>
//             )}

//             <span className="text-3xl font-bold text-slate-500 mt-4">
//               € {productDetails.price}
//             </span>
//           </div>

//           {productDetails.lieferStatus === "Sofort" ? (
//             <Button
//               size="lg"
//               className=" text-neutral-100 px-15 py-6 text-xl rounded-none text-[18px] bg-transparent border border-white w-full xl:w-auto"
//               onClick={handleClickAddToCart}
//             >
//               <FiBox className="text-xl" />
//               <span>ADD TO CART</span>
//             </Button>
//           ) : (
//             <Link
//               href={`/build-your-own/${productDetails.documentId}`}
//               className="flex items-center justify-center gap-3 border border-neutral-100 hover:border-gray-400 transition px-6 py-3 font-semibold tracking-wide mt-4 hover:bg-neutral-900/40"
//             >
//               <FiBox className="text-xl" />
//               <span>BUILD YOUR OWN</span>
//             </Link>
//           )}
//         </div>
//       ) : (
//         <SkeletonEffectProductInfo />
//       )}
//     </>
//   );
// }

// export default ProductInfo;
"use client";

import { FiBox } from "react-icons/fi";
import SkeletonEffectProductInfo from "./SkeletonEffectProductInfo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";

function ProductInfo({ productDetails }: any) {
  const { handleAddToCart } = useContext(AppContext);
  const [qty, setQty] = useState<Number>(1);

  const handleClickAddToCart = () => {
    handleAddToCart({
      ...productDetails,
      qty,
      selectedOptions: [],
    });
  };

  return (
    <>
      {productDetails.title ? (
        <div className="flex flex-col gap-8 items-start text-left max-w-xl">
          {/* HEADER AREA */}
          <div className="flex flex-col gap-2 w-full border-l-2 border-[#00BFFF]/30 pl-6 py-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
              {productDetails.title}
            </h1>
            <span className="text-xs font-black tracking-[0.4em] text-[#00BFFF] uppercase opacity-80">
              {productDetails.category}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-[15px] leading-relaxed text-neutral-400 font-light tracking-wide">
            {productDetails?.description?.[0]?.children?.[0]?.text}
          </p>

          {/* STATUS INDICATOR */}
          <div className="flex flex-col gap-4 w-full bg-neutral-900/20 p-4 border border-white/5">
            {productDetails.lieferStatus === "Vorbestellung" ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                    Pre-Order Status
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 pl-3.5 italic">
                  Production time: 14 to 28 business days
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00]/60 rounded-full shadow-[0_0_8px_#00FF00]"></div>
                <span className="text-[10px] font-black text-[#00FF00]/60 uppercase tracking-widest">
                  System Ready: In Stock
                </span>
              </div>
            )}
          </div>

          {/* PRICE AREA */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tighter">
              € {productDetails.price}
            </span>
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
              Incl. VAT
            </span>
          </div>

          {/* ACTIONS */}
          <div className="w-full pt-4">
            {productDetails.lieferStatus === "Sofort" ? (
              <Button
                size="lg"
                className="group relative overflow-hidden bg-transparent border border-[#00BFFF]/50 text-white rounded-none w-full xl:w-80 h-16 transition-all duration-500 hover:border-[#00BFFF] hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]"
                onClick={handleClickAddToCart}
              >
                <div className="absolute inset-0 bg-[#00BFFF]/0 group-hover:bg-[#00BFFF]/10 transition-colors" />
                <div className="flex items-center gap-3 relative z-10">
                  <FiBox className="text-xl group-hover:text-[#00BFFF] transition-colors" />
                  <span className="text-xs font-black tracking-[0.3em]">
                    ADD TO CART
                  </span>
                </div>
              </Button>
            ) : (
              <Link
                href={`/build-your-own/${productDetails.documentId}`}
                className="group relative flex items-center justify-center gap-3 border border-white/10 bg-neutral-950 text-white px-10 py-5 w-full xl:w-80 transition-all duration-500 hover:border-[#00BFFF]/50 hover:shadow-[0_0_25px_rgba(0,191,255,0.15)]"
              >
                <FiBox className="text-xl group-hover:text-[#00BFFF] transition-colors" />
                <span className="text-xs font-black tracking-[0.3em]">
                  BUILD YOUR OWN
                </span>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <SkeletonEffectProductInfo />
      )}
    </>
  );
}

export default ProductInfo;
