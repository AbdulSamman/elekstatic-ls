"use client";

import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProvider, IProduct } from "./interfaces";
import axiosClient from "./_utils/axiosClient";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [productDetails, setProductDetails] = useState({});

  const [productListCategory, setProductListCategory] = useState<any>([]);
  //get products
  useEffect(() => {
    (async () => {
      try {
        const rawProducts = (await axiosClient.get("/api/products?populate=*"))
          .data;
        console.log("products", rawProducts.data);
        setProducts(rawProducts.data);
      } catch (error) {
        console.error("failed to fetch products", error);
      }
    })();
  }, []);

  // get product by Id
  const getProductById = async (documentId: string) => {
    try {
      const response = (
        await axiosClient.get(`/api/products/${documentId}?populate=*`)
      ).data;


  console.log("getProductById",response);
      setProductDetails(response.data);

      getProductsbyCategory(response.data.category);
    } catch (error: any) {
      console.error("failed to fetch productsId", error);
    }
  };



  // all categories holen
  const getProductsbyCategory = async (category: string) => {
    const response = (
      await axiosClient.get(
        `/api/products?filters[category][$eq]=${category}&populate=*`
      )
    ).data;
console.log("getProductsbyCategory",response);

    setProductListCategory(response.data);
  };

  console.log("productDetails",productDetails);
  console.log("productListCategory",productListCategory);

  return (
    <AppContext.Provider
      value={{
        products,
        getProductById,
        productDetails,

        productListCategory,
      }}>
      {children}
    </AppContext.Provider>
  );
};
