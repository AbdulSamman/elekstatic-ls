// "use client";

// import ProductBannerOwn from "../../build-your-own/_components/ProductBannerOwn";
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../../AppContext";
// import BreadCrumb from "../../../_components/BreadCrumb";
// import { useParams, useSearchParams } from "next/navigation";

// export default function ViewSummaryPage() {
//   const { productDetails, getProductById, handleAddToCart, sections }: any =
//     useContext(AppContext);

//   const { productId } = useParams<{ productId: string }>();
//   const searchParams = useSearchParams();

//   // Füge title für jede Section hinzu
//   const selectedFromUrl = JSON.parse(searchParams.get("selected") || "{}");
//   // Map: sectionId -> Section Title
//   const sectionMap: Record<string, string> = {};
//   sections?.forEach((section: any) => {
//     sectionMap[section.id] = section.title;
//   });

//   // --- Neu: selected mit korrektem title aufbauen ---
//   const selected: Record<string, any> = {};
//   Object.keys(selectedFromUrl).forEach((key) => {
//     selected[key] = {
//       ...selectedFromUrl[key],
//       title: sectionMap[key] ?? key, // Section Name als title setzen
//     };
//   });

//   // // Füge title für jede Section hinzu
//   // const selected: Record<string, any> = {};
//   // Object.keys(selectedFromUrl).forEach((key) => {
//   //   selected[key] = {
//   //     ...selectedFromUrl[key],
//   //     title: selectedFromUrl[key].title ?? selectedFromUrl[key].label,
//   //   };
//   // });
//   // calculate price
//   const [qty, setQty] = useState<number>(1);
//   const [total, setTotal] = useState<number>(0);
//   if (Object.keys(selected).length === 0) return <div>No selections made</div>;

//   useEffect(() => {
//     if (!productId) return;
//     getProductById(productId);
//   }, [productId]);

//   useEffect(() => {
//     if (!productDetails?.price) return;
//     const _total = qty * productDetails.price;
//     setTotal(_total);
//   }, [qty, productDetails?.price]);

//   const handleQtyChange = (e: any) => {
//     const value = e.target.value;
//     if (value.length <= 2 && value <= 10) {
//       // maximal 2 Ziffern
//       setQty(Number(value));
//     }
//   };

//   return (
//     <div className="pb-26">
//       {productDetails?.title && (
//         <BreadCrumb
//           path={`/product-details/${productId}/build-your-own/view-summary`}
//           productName={productDetails.title}
//           buildYourOwnName="Build Your Own"
//         />
//       )}

//       <section className="w-full">
//         <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-12 my-10">
//           <div className="lg:w-1/3 flex justify-center">
//             <ProductBannerOwn productDetails={productDetails} />
//           </div>

//           <div className="xl:w-2/3 w-full flex flex-col items-center">
//             <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-neutral-200 mb-6 xl:w-2/3">
//               Review Order
//             </h1>

//             <table className="xl:w-2/3 w-full border border-neutral-800 border-collapse table-fixed bg-neutral-900/40 rounded-xl overflow-hidden">
//               <thead>
//                 <tr className="bg-neutral-800 text-neutral-300 text-sm font-semibold">
//                   <th
//                     scope="col"
//                     className="px-4 py-4 text-left text-base"
//                     colSpan={2}
//                   >
//                     Items
//                   </th>
//                   <th scope="col" className="px-4 py-4 text-center text-base">
//                     Qty
//                     <span className="block text-xs text-neutral-400">
//                       (max. 10)
//                     </span>
//                   </th>
//                   <th scope="col" className="px-4 py-4 text-center text-base">
//                     Price
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr className="border-t border-neutral-800 text-neutral-300">
//                   {/* Items */}
//                   <td colSpan={2} className="px-4 py-8 align-top">
//                     <h2 className="text-xl font-medium mb-5 text-neutral-200">
//                       {productDetails?.title}
//                     </h2>

//                     <div className="flex flex-col gap-3 py-2 w-full md:w-2/3">
//                       {Object.keys(selected).map((section) => (
//                         <div
//                           key={section}
//                           className="flex items-center justify-between font-medium capitalize"
//                         >
//                           <strong className="text-sm md:text-base text-neutral-400 w-40">
//                             {section}:
//                           </strong>
//                           <span className="text-sm md:text-base text-neutral-200">
//                             {selected[section].label}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </td>

//                   {/* Qty */}
//                   <td className="py-8 align-top text-center">
//                     <input
//                       type="text"
//                       maxLength={2}
//                       min="1"
//                       max="10"
//                       value={qty}
//                       onChange={(e) => handleQtyChange(e)}
//                       className="w-15 bg-neutral-900 border border-neutral-700 px-2 py-1 text-center text-neutral-200 outline-none focus:border-neutral-400 rounded"
//                     />
//                   </td>

//                   {/* Total */}
//                   <td className="py-8 align-top text-center">
//                     <input
//                       type="text"
//                       value={total}
//                       disabled
//                       className="w-24 bg-neutral-900 border border-neutral-700 px-2 py-1 text-center text-neutral-300 rounded"
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <p className="text-xs italic text-neutral-500 my-4 text-center">
//               “Please contact your local dealer for pricing in your country”
//             </p>

//             <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto px-4">
//               <button className="bg-neutral-200 text-neutral-900 px-6 py-3 rounded-md font-semibold hover:bg-neutral-300 transition w-full md:w-auto">
//                 Print Summary
//               </button>

//               <button
//                 className="bg-neutral-800 text-neutral-200 px-6 py-3 rounded-md font-semibold hover:bg-neutral-700 transition w-full md:w-auto"
//                 onClick={() =>
//                   handleAddToCart({
//                     ...productDetails,
//                     qty,
//                     selectedOptions: Object.keys(selected).map((key) => ({
//                       ...selected[key],
//                       title: selected[key].title, // <-- eingefügt: title bleibt Section Name
//                     })),
//                   })
//                 }
//               >
//                 Add to Wish List
//               </button>

//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import ProductBannerOwn from "../../build-your-own/_components/ProductBannerOwn";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import BreadCrumb from "../../../_components/BreadCrumb";
import { useParams, useSearchParams } from "next/navigation";
import { Printer, Heart, Info } from "lucide-react";

export default function ViewSummaryPage() {
  const { productDetails, getProductById, handleAddToCart, sections }: any =
    useContext(AppContext);
  const { productId } = useParams<{ productId: string }>();
  const searchParams = useSearchParams();

  const selectedFromUrl = JSON.parse(searchParams.get("selected") || "{}");
  const sectionMap: Record<string, string> = {};
  sections?.forEach((section: any) => {
    sectionMap[section.id] = section.title;
  });

  const selected: Record<string, any> = {};
  Object.keys(selectedFromUrl).forEach((key) => {
    selected[key] = {
      ...selectedFromUrl[key],
      title: sectionMap[key] ?? key,
    };
  });

  const [qty, setQty] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId, getProductById]);

  useEffect(() => {
    if (!productDetails?.price) return;
    setTotal(qty * productDetails.price);
  }, [qty, productDetails?.price]);

  const handleQtyChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || (Number(value) <= 10 && Number(value) >= 0)) {
      setQty(value === "" ? 0 : Number(value));
    }
  };

  if (Object.keys(selected).length === 0)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00BFFF] font-black tracking-[0.3em]">
        INITIALIZING DATA...
      </div>
    );

  return (
    <div className="pb-32 bg-black min-h-screen">
      {productDetails?.title && (
        <BreadCrumb
          path={`/product-details/${productId}/build-your-own/view-summary`}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <section className="max-w-350 mx-auto px-6 mt-16">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* LEFT: VISUAL CONFIRMATION */}
          <div className="lg:w-1/3 w-full">
            <div className="relative border border-white/5 bg-neutral-950/30 p-4">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00BFFF]/40"></div>
              <ProductBannerOwn productDetails={productDetails} />
              <div className="mt-8 text-center">
                <span className="text-[10px] font-black tracking-[0.4em] text-neutral-500 uppercase">
                  Configured Model
                </span>
                <h2 className="text-xl font-black text-white uppercase mt-2">
                  {productDetails?.title}
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT: DATA SHEET */}
          <div className="lg:w-2/3 w-full">
            <div className="mb-12">
              <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.5em] uppercase">
                Step 03
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic mt-2">
                Review <span className="text-neutral-800">Order</span>
              </h1>
            </div>

            <div className="border border-white/5 bg-neutral-950 overflow-hidden shadow-2xl">
              {/* TABLE HEADER */}
              <div className="grid grid-cols-4 bg-neutral-900/50 border-b border-white/5 px-6 py-4">
                <div className="col-span-2 text-[10px] font-black tracking-[0.2em] text-[#00BFFF] uppercase">
                  Specification
                </div>
                <div className="text-center text-[10px] font-black tracking-[0.2em] text-neutral-500 uppercase">
                  Quantity
                </div>
                <div className="text-right text-[10px] font-black tracking-[0.2em] text-neutral-500 uppercase">
                  Net Price
                </div>
              </div>

              {/* PRODUCT INFO ROW */}
              <div className="p-8 space-y-10">
                <div className="grid grid-cols-4 items-start">
                  <div className="col-span-2">
                    <h3 className="text-lg font-black text-white uppercase mb-6 tracking-tight">
                      Technical Selection
                    </h3>
                    <div className="space-y-4">
                      {Object.keys(selected).map((sectionKey) => (
                        <div
                          key={sectionKey}
                          className="flex flex-col border-l border-white/10 pl-4"
                        >
                          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">
                            {selected[sectionKey].title}
                          </span>
                          <span className="text-sm text-neutral-300 font-medium uppercase tracking-wider">
                            {selected[sectionKey].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QTY INPUT */}
                  <div className="flex flex-col items-center justify-center">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={qty}
                      onChange={handleQtyChange}
                      className="w-16 bg-black border border-white/10 text-white text-center py-2 font-mono focus:border-[#00BFFF] outline-none transition-colors"
                    />
                    <span className="text-[8px] text-neutral-700 mt-2 font-bold uppercase tracking-tighter italic">
                      Limit: 10 units
                    </span>
                  </div>

                  {/* PRICE DISPLAY */}
                  <div className="text-right">
                    <span className="text-2xl font-black text-white tracking-tighter italic">
                      € {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER INFO */}
              <div className="px-8 py-4 bg-neutral-900/20 border-t border-white/5 flex items-center gap-3">
                <Info size={14} className="text-[#00BFFF]" />
                <p className="text-[9px] italic text-neutral-500 uppercase tracking-widest">
                  Please contact your local dealer for finalized pricing and
                  regional taxes.
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row gap-4 mt-12">
              <button className="flex-1 flex items-center justify-center gap-3 border border-white/10 text-neutral-400 py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-white/5 hover:text-white transition-all">
                <Printer size={16} /> Print Report
              </button>

              <button
                onClick={() =>
                  handleAddToCart({
                    ...productDetails,
                    qty,
                    selectedOptions: Object.keys(selected).map((key) => ({
                      ...selected[key],
                      title: selected[key].title,
                    })),
                  })
                }
                className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#00BFFF] transition-all shadow-[0_10px_30px_rgba(0,191,255,0.1)]"
              >
                <Heart size={16} /> Add to Wish List
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
