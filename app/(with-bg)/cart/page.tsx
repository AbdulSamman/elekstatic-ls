"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { CiShoppingCart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Cart = () => {
  //bezahlung
  const router = useRouter();
  const { cart, handleDeleteCartItem, handleSendToDashboard, totalPrice } =
    useContext(AppContext);

  // const [totalPrice, setTotalPrice] = useState<number>(0);

  // useEffect(() => {
  //   getTotalPrice();
  // }, [cart]);

  // const getTotalPrice = () => {
  //   try {
  //     const prices: number[] = [];
  //     cart.forEach((item: any) => {
  //       const price = parseFloat(item?.cart?.product?.price ?? 0);
  //       const qty = item?.cart?.qty ?? 1;
  //       prices.push(price * qty);
  //     });
  //     setTotalPrice(
  //       prices.reduce((total: number, price: number) => total + price, 0)
  //     );
  //   } catch (error) {
  //     console.error("error go get total price", error);
  //   }
  // };

  return (
    <section className="pb-26 flex items-center justify-center mt-24">
      <div className="mx-auto">
        <div className="flex flex-col gap-6  w-screen items-center bg-neutral-950/50 pb-10">
          <header className="text-center py-10">
            <h1 className="text-3xl font-bold text-slate-500 sm:text-5xl uppercase">
              Your Selection
            </h1>
          </header>
          {cart?.length === 0 ? (
            <div className="flex flex-col items-center gap-4 ">
              <div>
                <CiShoppingCart className="text-[120px]" />
              </div>

              <h2 className="text-3xl text-center">
                There are no items in your shopping cart.
              </h2>
            </div>
          ) : (
            <div className="max-w-7xl">
              <ul className="space-y-4 ">
                {cart?.map((cartItem: any, i: any) => {
                  return (
                    <li
                      className="flex flex-col items-center  px-2 sm:flex-row bg-neutral-900/50 mx-2 py-5"
                      key={i}
                    >
                      <div className="">
                        {cartItem?.cart?.product?.banner?.url && (
                          <Image
                            src={cartItem?.cart?.product?.banner?.url}
                            alt="cartImage"
                            width={100}
                            height={100}
                            className="cartImage object-contain rounded w-200 h-50"
                            priority={true}
                          />
                        )}
                      </div>

                      <div className="flex flex-col  sm:flex-row sm:items-center w-full px-5">
                        <div>
                          <h3 className="text-xl text-slate-600 py-2">
                            {cartItem?.cart?.product?.title}
                          </h3>
                          {/* selectedOptions anzeigen */}
                          {cartItem?.cart?.selectedOptions?.map(
                            (option: any, idx: number) => {
                              return (
                                <div
                                  key={idx}
                                  className="text-sm text-neutral-400"
                                >
                                  <strong>{option?.title}</strong>:{" "}
                                  {option?.label}
                                </div>
                              );
                            },
                          )}
                          <div className="my-0.5 space-y-px text-md text-gray-400">
                            <div className="my-4">
                              Category: {cartItem?.cart?.product?.category}
                            </div>

                            {cartItem?.cart?.product?.lieferStatus ===
                            "Sofort" ? (
                              <div className="flex items-center justify-start gap-2 pt-2">
                                <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                                <span className="text-green-800 text-xs py-2">
                                  Auf Lager
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-start">
                                <div className="flex items-center justify-start gap-2 pt-2">
                                  <div className="w-2 h-2 bg-red-800 rounded-full"></div>
                                  <span className="text-red-800 text-xs">
                                    Vorbestellung:
                                  </span>
                                </div>
                                <span className="text-red-800 text-xs py-2 px-4">
                                  Lieferzeit kann 14 bis 28 Arbeitstage dauern
                                </span>
                              </div>
                            )}

                            <input
                              type="text"
                              disabled
                              className="bg-neutral-800/40 text-center p-2 text-neutral-400 w-15 "
                              value={`${cartItem?.cart?.qty}x`}
                            />
                          </div>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-4 px-1">
                          <div className="bg-neutral-800/40 p-3 text-neutral-400 w-25 line-clamp-1 text-center shrink-0">
                            {cartItem?.cart?.product?.price} €
                          </div>

                          <button
                            className=" transition hover:text-neutral-400 hover:scale-110 text-[20px] cursor-pointer"
                            onClick={() =>
                              handleDeleteCartItem(cartItem.documentId)
                            }
                          >
                            <FaRegTrashCan />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-400 pt-8 ">
                <div className="w-screen max-w-full space-y-4  px-4 p-2">
                  <div className="flex justify-between px-2">
                    <dt>SUBTOTAL:</dt>
                    <dd>222€</dd>
                  </div>

                  <div className="flex justify-between px-2">
                    <dt>DISCOUNT:</dt>
                    <dd>- 10 %</dd>
                  </div>
                  <div className="flex justify-between px-2">
                    <dt>TOTAL:</dt>
                    <dd>{totalPrice.toFixed(2)} €</dd>
                  </div>
                </div>
              </div>
              <h2 className="text-red-800 text-md bg-neutral-500/10 p-2 mb-2 mx-2">
                Note: All Items will be sent together and with same color if you
                dont choose your color.
              </h2>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center px-2">
          {/* <Button
            size="lg"
            className=" text-neutral-300 px-15 py-6 text-xl rounded-none text-[18px] bg-slate-900 border border-neutral-600 w-full  lg:w-auto "
            onClick={handleSendToDashboard}
          >
            <span className="flex items-center justify-center gap-2">
              SEND ORDER <ChevronRight />
            </span>
          </Button> */}
          <Button
            size="lg"
            className=" text-neutral-300 px-15 py-6 text-xl rounded-none text-[18px] bg-slate-900 border border-neutral-600 w-full  lg:w-auto "
            onClick={() => router.push(`/checkout`)}
          >
            <span className="flex items-center justify-center gap-2">
              CHECKOUT
              <ChevronRight />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
