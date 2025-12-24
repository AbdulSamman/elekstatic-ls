import { IoClose } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import Image from "next/image";
import Link from "next/link";
import { CartProps } from "../../../interfaces";

const Cart = ({ setIsCartOpen }: CartProps) => {
  const { cart, handleDeleteCartItem } = useContext(AppContext);

  return (
    <div className="w-75 border bg-gray-100 shadow-sm absolute rounded-md right-27 top-15 px-2 overflow-auto z-1">
      <button
        className="absolute end-1.5 top-2 text-gray-600 transition hover:scale-110 hover:text-blue-500"
        onClick={() => setIsCartOpen(false)}
      >
        <IoClose className="text-xl" />
      </button>

      <div className="mt-10 space-y-6">
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((cartItem: any) => {
              return (
                <div key={cartItem?.documentId}>
                  <li className="flex items-center gap-4 ">
                    {cartItem?.cart?.product?.banner?.url && (
                      <Image
                        src={cartItem?.cart?.product?.banner?.url}
                        alt={
                          cartItem?.cart?.product?.banner?.name || "cartImage"
                        }
                        width={100}
                        height={100}
                        className="cartImage object-contain rounded w-20 h-20"
                        priority={true}
                      />
                    )}
                    <div>
                      <h3 className="text-sm text-gray-900 line-clamp-1">
                        {cartItem?.cart?.product?.title}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                        <div>Category: {cartItem?.cart?.product?.category}</div>

                        <div>Price: {cartItem?.cart?.product?.price} €</div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <button
                        className="text-gray-600 transition hover:text-red-600 "
                        onClick={() =>
                          handleDeleteCartItem(cartItem?.documentId)
                        }
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        ) : (
          <h2 className="text-center">Your Cart is Empty!</h2>
        )}

        <div
          className="space-y-2 text-center"
          onClick={() => setIsCartOpen(false)}
        >
          <Link
            href="/cart"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            View my cart ({cart.length})
          </Link>

          <Link
            href="/"
            className="inline-block text-sm text-gray-500 transition hover:text-gray-600 py-2"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
