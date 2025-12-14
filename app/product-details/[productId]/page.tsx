"use client";

import { useContext, useEffect, use } from "react";
import { AppContext } from "../../AppContext";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductItem from "@/app/_components/ProductItem";
import { IProduct } from "@/app/interfaces";
import { usePathname } from "next/navigation";

function ProductDetails({ params }: any) {
  const paramsId: any = use(params);
  const documentId = paramsId.productId;
  // for breadCrumb
  const path = usePathname();
  console.log("path", path);

  const { getProductById, productDetails, productListCategory, products }: any =
    useContext(AppContext);

  useEffect(() => {
    if (!documentId) return;
    if (documentId) {
      getProductById(documentId);
    }
  }, [documentId]);

  //ausgewählte product simiral product auftauchen || [] undefined zu vermeiden
  const filteredProducts =
    productListCategory?.filter(
      (product: IProduct) =>
        product.category === productDetails?.category &&
        product.documentId !== productDetails?.documentId
    ) || [];

  //ausgewählte product nicht simiral product auftauchen
  const filteredProductsFrequently =
    products?.filter(
      (product: IProduct) =>
        product.documentId !== productDetails?.documentId &&
        product.category !== productDetails?.category
    ) || [];

  return (
    <div className="py-8 px-2">
      <BreadCrumb path={path} />
      <div className="flex flex-col items-center justify-center">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>
      <div className=" mt-10">
        <h2 className="text-xl p-5">Similar Products</h2>

        {products.length > 0 && (
          <>
            {filteredProducts.length > 0 ? (
              <ProductItem filteredProducts={filteredProducts} />
            ) : (
              <h3 className="mb-4">No Products Related To This Item!</h3>
            )}
            <div>
              <h2 className="text-xl p-5">Frequently Bought Together</h2>
              <ProductItem filteredProducts={filteredProductsFrequently} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
