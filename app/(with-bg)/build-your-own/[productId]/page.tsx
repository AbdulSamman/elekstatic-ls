// "use client";

// import { use, useContext, useEffect } from "react";
// import { AppContext } from "../../../AppContext";
// import BreadCrumb from "@/app/_components/BreadCrumb";
// import ProductBannerOwn from "../_components/ProductBannerOwn";
// import BuildYourOwn from "../_components/BuildYourOwn";

// export default function BuildYourOwnPage({ params }: any) {
//   const paramsId: any = use(params);
//   const productId = paramsId.productId;

//   const { getProductById, productDetails }: any = useContext(AppContext);

//   useEffect(() => {
//     if (!productId) return;
//     getProductById(productId);
//   }, [productId]);

//   const breadcrumbPath = `/product-details/${productId}/build-your-own`;

//   return (
//     <div className="pb-26">
//       {productDetails?.title && (
//         <BreadCrumb
//           path={breadcrumbPath}
//           productName={productDetails.title}
//           buildYourOwnName="Build Your Own"
//         />
//       )}

//       <div className="my-24 lg:px-20 flex flex-col md:flex-row items-start justify-center gap-12">
//         <ProductBannerOwn productDetails={productDetails} />

//         <div className="xl:w-3/5 md:w-2/3 w-full">
//           <BuildYourOwn productDetails={productDetails} />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { use, useContext, useEffect } from "react";
import { AppContext } from "../../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBannerOwn from "../_components/ProductBannerOwn";
import BuildYourOwn from "../_components/BuildYourOwn";

export default function BuildYourOwnPage({ params }: any) {
  const paramsId: any = use(params);
  const productId = paramsId.productId;

  const { getProductById, productDetails }: any = useContext(AppContext);

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId, getProductById]);

  const breadcrumbPath = `/product-details/${productId}/build-your-own`;

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* Der Breadcrumb markiert nun "Build Your Own" als aktiven (leuchtenden) Punkt */}
      {productDetails?.title && (
        <BreadCrumb
          path={breadcrumbPath}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <div className="max-w-400 mx-auto mt-16 lg:px-10">
        {/* HEADER AREA */}
        <div className="px-6 mb-16 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-[#00BFFF]/50"></div>
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.5em] uppercase">
              Configuration Lab
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Tailor Your <span className="text-neutral-800">System</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-16 lg:gap-24 px-6">
          {/* LEFT SIDE: Sticky Image Preview */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 transition-all duration-700">
            <div className="relative group">
              {/* Ein zusätzlicher Rahmen-Effekt für das Vorschaufenster */}
              <div className="absolute -inset-0.5 bg-linear-to-b from-white/10 to-transparent opacity-20 rounded-lg"></div>
              <div className="relative bg-neutral-950/20 border border-white/5 backdrop-blur-sm overflow-hidden">
                <ProductBannerOwn productDetails={productDetails} />
              </div>

              {/* Technische Specs-Vorschau (optionaler kleiner Text) */}
              <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
                    Model ID
                  </span>
                  <span className="text-xs text-neutral-400 font-mono uppercase">
                    {productDetails?.documentId?.slice(0, 8)}...
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#00BFFF] font-bold uppercase tracking-widest">
                    Handcrafted in Germany
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Configuration Tool */}
          <div className="w-full lg:w-1/2 xl:w-2/5">
            <div className="relative">
              {/* Subtiler Glow hinter dem Tool */}
              <div className="absolute -inset-4 bg-[#00BFFF]/5 blur-3xl opacity-50 pointer-events-none"></div>
              <BuildYourOwn productDetails={productDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
