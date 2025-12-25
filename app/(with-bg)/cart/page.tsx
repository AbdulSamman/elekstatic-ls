"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
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
        const price = parseFloat(item?.cart?.product?.price ?? 0);
        const qty = item?.cart?.qty ?? 1;
        prices.push(price * qty);
      });
      setTotalPrice(
        prices.reduce((total: number, price: number) => total + price, 0)
      );
    } catch (error) {
      console.error("error go get total price", error);
    }
  };

  return (
    <section className="pb-26">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl p-2 flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-slate-500 sm:text-5xl pt-30 uppercase">
              Your Selection
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
                          className="cartImage object-contain rounded w-35 h-25"
                          priority={true}
                        />
                      )}

                      <div>
                        <h3 className="text-xl text-slate-600 line-clamp-1">
                          {cartItem?.cart?.product?.title}
                        </h3>

                        <div className="my-0.5 space-y-px text-md text-gray-400">
                          <div>
                            Category: {cartItem?.cart?.product?.category}
                          </div>
                          <input
                            type="text"
                            disabled
                            className="h-7 w-9 bg-gray-100 text-center rounded-md"
                            value={`${cartItem?.cart?.qty}x`}
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
