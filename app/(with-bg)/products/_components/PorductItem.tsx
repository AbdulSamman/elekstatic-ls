// "use client";

// import Image from "next/image";
// import { CiCircleList } from "react-icons/ci";
// import { IProduct } from "../../../interfaces";
// import Link from "next/link";
// import { useContext } from "react";
// import { AppContext } from "../../../AppContext";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronsRight } from "lucide-react";

// function PorductItem({ filteredProducts }: any) {
//   const { products } = useContext(AppContext);

//   const listToRender = filteredProducts?.length ? filteredProducts : products;

//   return (
//     <section id="produkte" className="bg-neutral-950/50 w-full p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-350 mx-auto">
//         {listToRender.map((product: IProduct) => (
//           <Card
//             key={product.documentId}
//             className="bg-neutral-900/50 border-neutral-800 w-full"
//           >
//             <CardContent className="product-6">
//               <div className="h-40 rounded-lg mb-4">
//                 <div className="w-full flex items-center justify-center transition duration-500 hover:scale-105">
//                   <Image
//                     src={product?.banner?.url || "/logo2.png"}
//                     alt={product?.title || "bannerProducts"}
//                     width={100}
//                     height={100}
//                     style={{ width: "auto", height: "160px" }}
//                     priority
//                     className="object-cover w-full "
//                   />
//                 </div>
//               </div>
//               <h3 className="font-medium text-white">{product.title}</h3>
//               {product?.lieferStatus === "Vorbestellung" ? (
//                 <div className="h-15">
//                   <div className="flex items-center justify-start gap-2 pt-2">
//                     <div className="w-2 h-2 bg-red-800 rounded-full"></div>
//                     <span className="text-red-800 text-xs">Vorbestellung:</span>
//                   </div>
//                   <p className="text-red-800 text-xs  px-4">
//                     Lieferzeit kann 14 bis 28 Arbeitstage dauern
//                   </p>
//                 </div>
//               ) : (
//                 <div className="h-15">
//                   <div className="flex items-center justify-start gap-2 pt-2 h-10">
//                     <div className="w-2 h-2 bg-green-800 rounded-full"></div>
//                     <span className="text-green-800 text-xs py-2">
//                       Auf Lager
//                     </span>
//                   </div>
//                 </div>
//               )}
//               <div className="text-sm text-neutral-400 mt-2">
//                 <div className="flex items-center justify-between italic w-full">
//                   <h2 className="text-[14px] font-medium text-gray-400 flex gap-2 items-center">
//                     <CiCircleList className="text-xl text-gray-600" />{" "}
//                     {product.category}
//                   </h2>
//                   <h2 className="font-medium px-4">{product.price} €</h2>
//                 </div>
//               </div>
//               <Link
//                 className="mt-4 w-full text-sm text-neutral-600 flex items-center justify-end hover:scale-105 hover:text-neutral-400"
//                 href={`/product-details/${product?.documentId}`}
//               >
//                 Configure Product <ChevronsRight className="" />
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default PorductItem;
"use client";

import Image from "next/image";
import { CiCircleList } from "react-icons/ci";
import { IProduct } from "../../../interfaces";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronsRight } from "lucide-react";

function PorductItem({ filteredProducts }: any) {
  const { products } = useContext(AppContext);
  const listToRender = filteredProducts?.length ? filteredProducts : products;

  return (
    <section className="bg-black w-full py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-350 mx-auto px-4">
        {listToRender.map((product: IProduct) => (
          <Card
            key={product.documentId}
            className="group bg-neutral-950 border-white/5 rounded-none hover:border-[#00BFFF]/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Dekorativer Hintergrund-Glow beim Hover */}
            <div className="absolute inset-0 bg-[#00BFFF]/0 group-hover:bg-[#00BFFF]/5 transition-colors duration-500 pointer-events-none" />

            <CardContent className="p-0 flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-64 bg-neutral-900/30 flex items-center justify-center border-b border-white/5 overflow-hidden">
                <Image
                  src={product?.banner?.url || "/logo2.png"}
                  alt={product?.title || "bannerProducts"}
                  width={300}
                  height={300}
                  priority
                  className="object-contain w-full h-full p-6 transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col grow">
                <h3 className="font-black text-[13px] tracking-[0.15em] uppercase text-white group-hover:text-[#00BFFF] transition-colors">
                  {product.title}
                </h3>

                {/* Status Indicator */}
                <div className="mt-4 h-12 flex items-start">
                  {product?.lieferStatus === "Vorbestellung" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                          Pre-Order
                        </span>
                      </div>
                      <p className="text-[9px] text-neutral-600 pl-3.5 leading-tight italic">
                        14-28 business days
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00FF00]/60 rounded-full shadow-[0_0_8px_#00FF00]"></div>
                      <span className="text-[10px] font-bold text-[#00FF00]/60 uppercase tracking-widest">
                        In Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Category & Price */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <CiCircleList className="text-lg" />
                    <span className="text-[11px] uppercase tracking-tighter font-medium">
                      {product.category}
                    </span>
                  </div>
                  <span className="text-white font-black text-sm tracking-tighter">
                    {product.price} <span className="text-[#00BFFF]">€</span>
                  </span>
                </div>

                {/* Link Action */}
                <Link
                  className="mt-6 w-full py-3 bg-neutral-900 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 flex items-center justify-center gap-2 hover:bg-[#00BFFF] hover:text-black transition-all duration-300"
                  href={`/product-details/${product?.documentId}`}
                >
                  Configure Product <ChevronsRight size={14} />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default PorductItem;
