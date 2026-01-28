// "use client";

// import { useContext, useEffect, use } from "react";
// import { AppContext } from "../../../AppContext";
// import BreadCrumb from "@/app/_components/BreadCrumb";
// import ProductBanner from "../_components/ProductBanner";
// import ProductInfo from "../_components/ProductInfo";
// import ProductItem from "../../products/_components/PorductItem";
// import { IProduct } from "@/app/interfaces";

// function ProductDetails({ params }: any) {
//   const paramsId: any = use(params);
//   const documentId = paramsId.productId;

//   const { getProductById, productDetails, productListCategory, products }: any =
//     useContext(AppContext);

//   useEffect(() => {
//     if (documentId) getProductById(documentId);
//   }, [documentId]);

//   const filteredProducts =
//     productListCategory?.filter(
//       (product: IProduct) =>
//         product.category === productDetails?.category &&
//         product.documentId !== productDetails?.documentId,
//     ) || [];

//   const filteredProductsFrequently =
//     products?.filter(
//       (product: IProduct) =>
//         product.documentId !== productDetails?.documentId &&
//         product.category !== productDetails?.category,
//     ) || [];

//   return (
//     <div className="pb-26">
//       <BreadCrumb
//         path={`/product-details/${documentId}/build-your-own`}
//         productName={productDetails?.title}
//         buildYourOwnName=""
//       />

//       <div className="my-14 xl:px-20 flex flex-col lg:flex-row items-center lg:justify-evenly  gap-10">
//         <ProductBanner productDetails={productDetails} />
//         <ProductInfo productDetails={productDetails} />
//       </div>

//       <div className="mt-20 ">
//         <h2 className="text-2xl font-semibold px-5 mb-6 text-neutral-400  ">
//           Similar Products
//         </h2>

//         {products.length > 0 && (
//           <>
//             {filteredProducts.length > 0 ? (
//               <ProductItem filteredProducts={filteredProducts} />
//             ) : (
//               <h3 className="mb-6 px-5 text-neutral-500 italic text-md  ">
//                 No Products Related To This Item
//               </h3>
//             )}

//             <h2 className="text-2xl font-semibold px-5 mt-20 mb-6 text-neutral-400 ">
//               Frequently Bought Together
//             </h2>

//             <ProductItem filteredProducts={filteredProductsFrequently} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
"use client";

import { useContext, useEffect, use } from "react";
import { AppContext } from "../../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductItem from "../../products/_components/PorductItem";
import { IProduct } from "@/app/interfaces";

function ProductDetails({ params }: any) {
  const paramsId: any = use(params);
  const documentId = paramsId.productId;

  const { getProductById, productDetails, productListCategory, products }: any =
    useContext(AppContext);

  useEffect(() => {
    if (documentId) getProductById(documentId);
  }, [documentId]);

  const filteredProducts =
    productListCategory?.filter(
      (product: IProduct) =>
        product.category === productDetails?.category &&
        product.documentId !== productDetails?.documentId,
    ) || [];

  const filteredProductsFrequently =
    products?.filter(
      (product: IProduct) =>
        product.documentId !== productDetails?.documentId &&
        product.category !== productDetails?.category,
    ) || [];

  return (
    <div className="pb-32 bg-black min-h-screen">
      {/* Breadcrumb - Path auf Produkt-Ebene halten für sauberen Glow-Effekt */}
      <BreadCrumb
        path={`/product-details/${documentId}`}
        productName={productDetails?.title}
        buildYourOwnName=""
      />

      {/* Main Product Display Area */}
      <div className="mt-12 mb-24 xl:px-20 flex flex-col lg:flex-row items-center lg:justify-center gap-16 lg:gap-32">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>

      {/* Related Products Section */}
      <div className="mt-32 max-w-350 mx-auto">
        <div className="flex flex-col mb-10 px-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-4 h-px bg-[#00BFFF]/50"></span>
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.4em] uppercase">
              Matching Series
            </span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            Similar <span className="text-neutral-800">Products</span>
          </h2>
        </div>

        {products.length > 0 && (
          <div className="space-y-32">
            {/* Sektion 1: Ähnliche Produkte */}
            <div className="relative">
              {filteredProducts.length > 0 ? (
                <ProductItem filteredProducts={filteredProducts} />
              ) : (
                <div className="px-5 py-10 border border-white/5 bg-neutral-900/20 mx-5 italic text-neutral-600 text-sm tracking-widest uppercase">
                  No additional units in this category found.
                </div>
              )}
            </div>

            {/* Sektion 2: Häufig zusammen gekauft */}
            <div>
              <div className="flex flex-col mb-10 px-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-4 h-px bg-[#00BFFF]/50"></span>
                  <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.4em] uppercase">
                    Expert Recommendation
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                  Frequently{" "}
                  <span className="text-neutral-800">Bought Together</span>
                </h2>
              </div>

              <ProductItem filteredProducts={filteredProductsFrequently} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
