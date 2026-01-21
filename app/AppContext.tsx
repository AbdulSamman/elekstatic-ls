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

        // sortiere Produkte: sofortlieferbar zuerst
        const sortedProducts = rawProducts.data.sort((a: any, b: any) => {
          if (a.lieferStatus === "Sofort" && b.lieferStatus !== "Sofort") {
            return -1;
          }
          if (a.lieferStatus !== "Sofort" && b.lieferStatus === "Sofort") {
            return 1;
          }
          return 0;
        });

        //setProducts(rawProducts.data);
        setProducts(sortedProducts);
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
        `/api/products?filters[category][$eq]=${category}&populate=*`,
      )
    ).data;

    setProductListCategory(response.data);
  };

  // buildYourOwn auswahl
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/buildsummaries`,
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

        //       setCart((prevCart: any[]) => [
        //         ...prevCart,
        //         {
        //           documentId: res?.documentId, // <-- Strapi generiert id

        //           cart: {
        //             product: product,
        //             qty: product.qty ?? 1,
        //             selectedOptions: product.selectedOptions ?? [],
        //           },
        //         },
        //       ]);
        //     } catch (error) {
        //       console.error("Error adding to cart", error);
        //     }
        //   }
        // };
        setCart((prevCart: any[]) => {
          // 🔎 Gleiches Produkt + gleiche Optionen suchen
          const existingIndex = prevCart.findIndex(
            (item) =>
              item.cart.product.id === product.id &&
              JSON.stringify(item.cart.selectedOptions ?? []) ===
                JSON.stringify(product.selectedOptions ?? []),
          );

          // ✅ Produkt existiert → qty erhöhen
          if (existingIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingIndex] = {
              ...updatedCart[existingIndex],
              cart: {
                ...updatedCart[existingIndex].cart,
                qty: updatedCart[existingIndex].cart.qty + (product.qty ?? 1),
              },
            };
            return updatedCart;
          }

          // 🆕 Produkt existiert nicht → neu hinzufügen
          return [
            ...prevCart,
            {
              documentId: res?.documentId,
              cart: {
                product: product,
                qty: product.qty ?? 1,
                selectedOptions: product.selectedOptions ?? [],
              },
            },
          ];
        });
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    }
  };

  // [user] => wenn user sich ändert, soll cart auch geändert werden
  useEffect(() => {
    if (user) {
      getCartItems();
    } else {
      setCart([]);
    }
  }, [user]);

  //get products from Cart

  const getCartItems = async () => {
    if (!user) return;

    try {
      const rawCart = (
        await CartApis.getUserCartItems(user.primaryEmailAddress?.emailAddress)
      ).data.data; // Backend liefert data.data

      const mergedCart: any[] = [];

      rawCart.forEach((cartItem: any) => {
        const product = cartItem.products?.[0] || {}; // erstes Produkt aus Array
        const selected = cartItem.selectedOptions?.[0] || {}; // erstes selectedOption-Objekt
        const selectedOptions = selected.selectedOptions ?? [];
        const qty = selected.qty ?? 1;

        // Prüfe, ob dieses Produkt + Options schon im mergedCart ist
        const existingIndex = mergedCart.findIndex(
          (c) =>
            c.cart.product.id === product.id &&
            JSON.stringify(c.cart.selectedOptions ?? []) ===
              JSON.stringify(selectedOptions),
        );

        if (existingIndex !== -1) {
          // Produkt existiert → qty erhöhen
          mergedCart[existingIndex].cart.qty += qty;
        } else {
          // Neues Produkt hinzufügen
          mergedCart.push({
            documentId: cartItem.documentId,
            cart: {
              product: product,
              qty: qty,
              selectedOptions: selectedOptions,
            },
          });
        }
      });

      setCart(mergedCart);
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
        prev.filter((item) => item.documentId !== documentId),
      );
    } catch (error) {
      console.error("failed to delete cart item", error);
    }
  };

  // get section Images
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

  // dashboard

  // const handleSendToDashboard = async () => {
  //   if (!user || cart.length === 0) return;

  //   const payload = {
  //     userId: user.id,
  //     userName: user.fullName,
  //     email: user.primaryEmailAddress?.emailAddress,
  //     items: cart.map((item: any) => ({
  //       product: item.cart.product,
  //       qty: item.cart.qty,
  //       selectedOptions: item.cart.selectedOptions,
  //     })),
  //     orderStatus: "pending",
  //   };

  //   try {
  //     const res = (await CartApis.sendCartToDashboard(payload)).data;

  //     setFillDashboard((prev) => [res.data, ...prev]);
  //   } catch (err) {
  //     console.error("Failed to send order to dashboard:", err);
  //   }
  // };

  // const handleSendToDashboard = async () => {
  //   if (!user || cart.length === 0) return;

  //   const payload = {
  //     userId: user.id,
  //     userName: user.fullName,
  //     email: user.primaryEmailAddress?.emailAddress,
  //     items: cart.map((item: any) => ({
  //       product: item.cart.product,
  //       qty: item.cart.qty,
  //       selectedOptions: item.cart.selectedOptions,
  //     })),
  //     orderStatus: "pending",
  //   };

  //   try {
  //     const res = (await CartApis.sendCartToDashboard(payload)).data;

  //     const optimisticOrder = {
  //       documentId: res.documentId,
  //       items: res.items,
  //       userName: res.userName,
  //       email: res.email,
  //       orderStatus: res.orderStatus,
  //     };

  //     setFillDashboard((prev) => [optimisticOrder, ...prev]);

  //   } catch (err) {
  //     console.error("Failed to send order to dashboard:", err);
  //   }
  // };
  // const [fillDashbaord, setFillDashboard] = useState<any[]>([]);

  // const handleSendToDashboard = async () => {
  //   if (!user || cart.length === 0) return;

  //   const payload = {
  //     userId: user.id,
  //     userName: user.fullName,
  //     email: user.primaryEmailAddress?.emailAddress,
  //     items: cart.map((item: any) => ({
  //       product: item.cart.product,
  //       qty: item.cart.qty,
  //       selectedOptions: item.cart.selectedOptions,
  //     })),
  //     orderStatus: "pending",
  //   };

  //   try {
  //     const res = (await CartApis.sendCartToDashboard(payload)).data;

  //     const firstItem = payload.items[0];

  //     const dashboardItem = {
  //       documentId: res.documentId,
  //       // cart: {
  //       //   product: firstItem.product,
  //       //   qty: firstItem.qty,
  //       //   selectedOptions: firstItem.selectedOptions,
  //       // },
  //       items: payload.items,
  //       userName: payload.userName,
  //       email: payload.email,
  //       orderStatus: "pending",
  //     };

  //     setFillDashboard((prev) => [...prev, dashboardItem]);
  //   } catch (err) {
  //     console.error("Failed to send order to dashboard:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     getDashboardItems();
  //   }
  // }, [user]);

  // const getDashboardItems = async () => {
  //   try {
  //     const res = (await CartApis.getCartDashboard()).data;

  //     const dashboardItems = res.data.map((item: any) => {
  //       return {
  //         documentId: item.documentId,
  //         // cart: {
  //         //   product: item.product,
  //         //   qty: item.qty ?? 1,
  //         //   selectedOptions: item.selectedOptions ?? [],
  //         // },
  //         items: item.items,
  //         userName: item.userName,
  //         email: item.email,
  //         orderStatus: item.orderStatus,
  //       };
  //     });

  //     setFillDashboard(dashboardItems);
  //     console.log("Dashboard Response:", dashboardItems);
  //   } catch (err) {
  //     console.error("Failed to fetch dashboard orders:", err);
  //     setFillDashboard([]);
  //   }
  // };
  const [fillDashbaord, setFillDashboard] = useState<any[]>([]);

  // Submit Order in Dashboard
  // const handleSendToDashboard = async () => {
  //   if (!user || cart.length === 0) return;

  //   const payload = {
  //     userId: user.id,
  //     userName: user.fullName,
  //     email: user.primaryEmailAddress?.emailAddress,
  //     items: cart.map((item: any) => ({
  //       product: item.cart.product,
  //       selectedOptions: item.cart.selectedOptions,
  //       qty: item.cart.qty,
  //       totalPrice: totalPrice * item.cart.qty,
  //     })),
  //     orderStatus: "pending",
  //   };

  //   try {
  //     // const res = (await CartApis.sendCartToDashboard(payload)).data;

  //     // const dashboardItem = {
  //     //   documentId: res.documentId,
  //     //   items: payload.items,
  //     //   userName: payload.userName,
  //     //   email: payload.email,
  //     //   orderStatus: payload.orderStatus,
  //     // };

  //     // // Optimistisches Update direkt nach Submit
  //     // setFillDashboard((prev) => [...prev, dashboardItem]);

  //     await CartApis.sendCartToDashboard(payload);

  //     // Danach Dashboard neu laden
  //     await getDashboardItems();
  //     // setCart([]);
  //   } catch (err) {
  //     console.error("Failed to send order to dashboard:", err);
  //   }
  // };
  const handleSendToDashboard = async () => {
    if (!user || cart.length === 0) return;

    const items = cart.map((item: any) => {
      const price = Number(item.cart.product.price);
      const qty = Number(item.cart.qty ?? 1);

      return {
        product: item.cart.product,
        selectedOptions: item.cart.selectedOptions,
        qty,
        totalPrice: Number((price * qty).toFixed(2)),
      };
    });

    const orderTotal = items.reduce(
      (sum: number, i: any) => sum + i.totalPrice,
      0,
    );

    const payload = {
      userId: user.id,
      userName: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      items,
      totalPrice: Number(orderTotal.toFixed(2)),
      orderStatus: "pending",
    };

    try {
      await CartApis.sendCartToDashboard(payload);
      await getDashboardItems();
    } catch (err) {
      console.error("Failed to send order to dashboard:", err);
    }
  };
  // Fetch Dashboard Items
  const getDashboardItems = async () => {
    try {
      const res = (await CartApis.getCartDashboard()).data;

      const dashboardItems = res.data.map((item: any) => ({
        documentId: item.documentId,
        items: item.items,
        userName: item.userName,
        email: item.email,
        orderStatus: item.orderStatus,
        totalPrice: item.totalPrice,
      }));

      // nur update, wenn sich Daten geändert haben
      // setFillDashboard((prev) => {
      //   const prevIds = prev.map((o) => o.documentId).join(",");
      //   const newIds = dashboardItems.map((o: any) => o.documentId).join(",");
      //   return prevIds !== newIds ? dashboardItems : prev;
      // });
      setFillDashboard(dashboardItems);
    } catch (err) {
      console.error("Failed to fetch dashboard orders:", err);
      setFillDashboard([]);
    }
  };

  // Initial Load + Auto Polling für neue Orders
  useEffect(() => {
    if (user) {
      getDashboardItems();
      // Polling alle 5 Sekunden für neue Orders
      const interval = setInterval(async () => {
        await getDashboardItems();
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // price handlen
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);

  useEffect(() => {
    getTotalPrice();
  }, [cart]);

  const getTotalPrice = () => {
    try {
      const total = cart.reduce((sum: number, item: any) => {
        const price = Number(item?.cart?.product?.price);
        const qty = Number(item?.cart?.qty ?? 1);

        if (isNaN(price) || isNaN(qty)) return sum;

        return sum + price * qty;
      }, 0);

      setTotalPrice(Number(total.toFixed(2)));
    } catch (error) {
      console.error("error get total price", error);
    }
  };

  const getTotalAmountInCents = () => {
    return Math.round((totalPrice + shipping) * 100);
  };

  const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShipping(3.99);
    } else {
      setShipping(0);
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
        sectionImages,
        handleSendToDashboard,
        fillDashbaord,

        totalPrice,
        shipping,
        getTotalAmountInCents,
        handleShipping,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
