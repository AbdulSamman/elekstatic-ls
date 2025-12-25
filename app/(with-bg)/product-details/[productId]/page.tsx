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
        product.documentId !== productDetails?.documentId
    ) || [];

  const filteredProductsFrequently =
    products?.filter(
      (product: IProduct) =>
        product.documentId !== productDetails?.documentId &&
        product.category !== productDetails?.category
    ) || [];

  return (
    <div className="pb-26">
      <BreadCrumb
        path={`/product-details/${documentId}/build-your-own`}
        productName={productDetails?.title}
        buildYourOwnName="...."
      />

      <div className="my-14 xl:px-20 flex flex-col lg:flex-row items-center xl:justify-evenly gap-10">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>

      <div className="mt-20 ">
        <h2 className="text-2xl font-semibold px-5 mb-6 text-neutral-400  ">
          Similar Products
        </h2>

        {products.length > 0 && (
          <>
            {filteredProducts.length > 0 ? (
              <ProductItem filteredProducts={filteredProducts} />
            ) : (
              <h3 className="mb-6 px-5 text-neutral-500 italic text-md  ">
                No Products Related To This Item
              </h3>
            )}

            <h2 className="text-2xl font-semibold px-5 mt-20 mb-6 text-neutral-400 ">
              Frequently Bought Together
            </h2>

            <ProductItem filteredProducts={filteredProductsFrequently} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
