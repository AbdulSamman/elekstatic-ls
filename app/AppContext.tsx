"use client";

import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProvider, IProduct } from "./interfaces";
import axiosClient from "./_utils/axiosClient";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [productDetails, setProductDetails] = useState({});

  //get products
  useEffect(() => {
    (async () => {
      try {
        const rawProducts = (await axiosClient.get("/api/products?populate=*"))
          .data;
        console.log("products", rawProducts);
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
      setProductDetails(response.data);
      console.log("productById", response.data.banner.url);
    } catch (error: any) {
      console.error("failed to fetch productsId", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        getProductById,
        productDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
};
