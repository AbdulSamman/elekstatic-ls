"use client";

import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProvider, IProduct } from "./interfaces";
import axiosClient from "./_utils/axiosClient";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  //get products
  useEffect(() => {
    try {
      (async () => {
        const rawProducts = (await axiosClient.get("/api/products?populate=*"))
          .data;

        setProducts(rawProducts.data);
      })();
    } catch (error) {
      console.error("feld to fetch products", error);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
      }}>
      {children}
    </AppContext.Provider>
  );
};
