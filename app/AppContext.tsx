"use client";

import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProvider, IProduct, Section } from "./interfaces";
import axiosClient from "./_utils/axiosClient";
import CartApis from "./_utils/CartApis";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";

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

    setProductListCategory(response.data);
  };

  // buildYourOwn auswahl
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/buildsummaries`
      );
      const data = res.data.data[0].options;
      setSections(data);
    })();
  }, []);

  // add to Cart
  const { user } = useUser();
  const router = useRouter();

  const [cart, setCart] = useState<any>([]);

  const handleAddToCart = async (product: any) => {
    if (!user) {
      router.push("/sign-in");
    } else {
      try {
        const data = {
          data: {
            userName: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            products: [product?.documentId],
            selectedOptions: sections,
          },
        };

        const res = (await CartApis.addToCart(data)).data;

        setCart((prevCart: any[]) => [
          ...prevCart,
          {
            documentId: res?.data?.documentId,
            cart: {
              product: product,
            },
          },
        ]);
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    }
  };

  // [user] => wenn user sich ändert, soll cart auch geändert werden
  useEffect(() => {
    user && getCartItems();
  }, [user]);
  // get products from Cart
  const getCartItems = () => {
    try {
      (async () => {
        const cartItems: any = [];
        const rawCart = (
          await CartApis.getUserCartItems(
            user?.primaryEmailAddress?.emailAddress
          )
        ).data.data;

        // site refresh cart items bleiben
        rawCart.forEach((cartItem: any) => {
          const _cartItem: any = {
            ...cartItem,
            cart: {
              id: cartItem.products.documentId,
              product: cartItem?.products[0],
            },
          };
          cartItems.push(_cartItem);
        });

        return setCart(cartItems);
      })();
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  // delete cart Item

  const handleDeleteCartItem = async (documentId: string) => {
    try {
      await CartApis.deleteCartItem(documentId);

      setCart((prev: any[]) =>
        prev.filter((item) => item.documentId !== documentId)
      );
    } catch (error) {
      console.error("failed to delete cart item", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        getProductById,
        productDetails,
        productListCategory,
        handleAddToCart,
        sections,
        cart,
        handleDeleteCartItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
