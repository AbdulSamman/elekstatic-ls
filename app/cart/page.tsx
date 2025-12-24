"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { CiShoppingCart } from "react-icons/ci";

const Cart = () => {
  const { cart, handleDeleteCartItem } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    getTotalPrice();
  }, [cart]);

  const getTotalPrice = () => {
    try {
      const prices: number[] = [];
      cart.forEach((item: any) => {
        prices.push(parseFloat(item?.cart?.product?.price) * 1);
      });
      setTotalPrice(
        prices.reduce((total: number, price: number) => total + price, 0)
      );
    } catch (error) {
      console.error("error go get total price", error);
    }
  };

  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl p-2 flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-4">
              <div>
                <CiShoppingCart className="text-[120px]" />
              </div>

              <h2 className="text-3xl text-center">
                There are no items in your shopping cart.
              </h2>
            </div>
          ) : (
            <div className="mt-8">
              <ul className="space-y-4">
                {cart?.map((cartItem: any) => {
                  return (
                    <li
                      className="flex items-center gap-4 p-2"
                      key={cartItem.documentId}
                    >
                      {cartItem?.cart?.product?.banner?.url && (
                        <Image
                          src={cartItem?.cart?.product?.banner?.url}
                          alt="cartImage"
                          width={65}
                          height={70}
                          className="cartImage object-contain rounded w-25 h-20"
                          priority={true}
                        />
                      )}

                      <div>
                        <h3 className="text-md text-gray-900 line-clamp-1">
                          {cartItem?.cart?.product?.title}
                        </h3>

                        <div className="mt-0.5 space-y-px text-[14px] text-gray-600">
                          <div>
                            Category: {cartItem?.cart?.product?.category}
                          </div>
                          <input
                            type="text"
                            disabled
                            className="h-7 w-9 bg-gray-100 text-center rounded-md"
                            placeholder="1x"
                          />
                        </div>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2 px-1">
                        <div className="bg-gray-100 p-2 rounded-md text-gray-500 w-20">
                          {cartItem?.cart?.product?.price} €
                        </div>

                        <button
                          className=" transition hover:text-red-500 hover:scale-110 text-[20px]"
                          onClick={() =>
                            handleDeleteCartItem(cartItem.documentId)
                          }
                        >
                          <FaRegTrashCan />
                        </button>
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
              <h2 className="text-red-400 text-[12px] bg-gray-200 p-2 rounded-md mb-2">
                Note: All Items will be sent together and with same color.
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
