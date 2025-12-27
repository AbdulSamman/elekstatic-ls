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

  const [sectionImages, setSectionImages] = useState([]);

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
    console.log("categors", response);

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
        const payload = {
          data: {
            userName: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            products: [
              {
                id: product.id, // numeric ID aus Strapi, nicht documentId
                qty: product.qty ?? 1,
                selectedOptions: product.selectedOptions ?? [],
              },
            ],
          },
        };

        const res = (await CartApis.addToCart(payload)).data;

        setCart((prevCart: any[]) => [
          ...prevCart,
          {
            documentId: res?.documentId, // <-- Strapi generiert id

            cart: {
              product: product,
              qty: product.qty ?? 1,
              selectedOptions: product.selectedOptions ?? [],
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
    if (user) {
      getCartItems();
    }
  }, [user]);

  // get products from Cart
  const getCartItems = async () => {
    if (!user) return;

    try {
      const rawCart = (
        await CartApis.getUserCartItems(user.primaryEmailAddress?.emailAddress)
      ).data.data;

      const cartItems = rawCart.map((cartItem: any) => {
        const product = cartItem.products?.[0] || {}; // erstes Produkt aus Array
        const selected = cartItem.selectedOptions?.[0] || {}; // erstes selectedOption-Objekt

        return {
          documentId: cartItem.documentId,
          cart: {
            product: product,
            qty: selected.qty ?? 1,
            selectedOptions: selected.selectedOptions ?? [],
          },
        };
      });

      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart items", error);
      setCart([]);
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

  // get secion Images
  useEffect(() => {
    try {
      (async () => {
        const res = (await axiosClient.get("/api/sectionimages?populate=*"))
          .data;
        setSectionImages(res.data);
      })();
    } catch (error) {
      console.error("failed to fetch sectionImages", error);
    }
  }, []);

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
        sectionImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
