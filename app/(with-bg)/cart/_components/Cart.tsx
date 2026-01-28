// import { IoClose } from "react-icons/io5";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { useContext } from "react";
// import { AppContext } from "../../../AppContext";
// import Image from "next/image";
// import Link from "next/link";
// import { CartProps } from "../../../interfaces";

// const Cart = ({ setIsCartOpen }: CartProps) => {
//   const { cart, handleDeleteCartItem } = useContext(AppContext);

//   return (
//     <div className="w-75 border bg-gray-100 shadow-sm absolute rounded-md right-27 top-15 px-2 overflow-auto z-1">
//       <button
//         className="absolute end-1.5 top-2 text-gray-600 transition hover:scale-110 hover:text-blue-500"
//         onClick={() => setIsCartOpen(false)}
//       >
//         <IoClose className="text-xl" />
//       </button>

//       <div className="mt-10 space-y-6">
//         {cart.length > 0 ? (
//           <ul className="space-y-4">
//             {cart.map((cartItem: any) => {
//               return (
//                 <div key={cartItem?.documentId}>
//                   <li className="flex items-center gap-4 ">
//                     {cartItem?.cart?.product?.banner?.url && (
//                       <Image
//                         src={cartItem?.cart?.product?.banner?.url}
//                         alt={
//                           cartItem?.cart?.product?.banner?.name || "cartImage"
//                         }
//                         width={100}
//                         height={100}
//                         className="cartImage object-contain rounded w-20 h-20"
//                         priority={true}
//                       />
//                     )}
//                     <div>
//                       <h3 className="text-sm text-gray-900 line-clamp-1">
//                         {cartItem?.cart?.product?.title}
//                       </h3>

//                       <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
//                         <div>Category: {cartItem?.cart?.product?.category}</div>

//                         <div>Price: {cartItem?.cart?.product?.price} €</div>
//                       </dl>
//                     </div>

//                     <div className="flex flex-1 items-center justify-end gap-2">
//                       <button
//                         className="text-gray-600 transition hover:text-red-600 "
//                         onClick={() =>
//                           handleDeleteCartItem(cartItem?.documentId)
//                         }
//                       >
//                         <FaRegTrashCan />
//                       </button>
//                     </div>
//                   </li>
//                 </div>
//               );
//             })}
//           </ul>
//         ) : (
//           <h2 className="text-center">Your Cart is Empty!</h2>
//         )}

//         <div
//           className="space-y-2 text-center"
//           onClick={() => setIsCartOpen(false)}
//         >
//           <Link
//             href="/cart"
//             className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
//           >
//             View my cart ({cart.length})
//           </Link>

//           <Link
//             href="/"
//             className="inline-block text-sm text-gray-500 transition hover:text-gray-600 py-2"
//           >
//             Continue shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
"use client";

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
    <div className="w-80 border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,1)] absolute right-0 top-16 px-4 py-6 z-50 overflow-hidden">
      {/* HEADER DECO */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00BFFF]/40 to-transparent"></div>

      <button
        className="absolute right-4 top-4 text-neutral-500 transition-all hover:rotate-90 hover:text-[#00BFFF]"
        onClick={() => setIsCartOpen(false)}
      >
        <IoClose size={20} />
      </button>

      <div className="mt-4 flex flex-col h-full">
        <h2 className="text-[10px] font-black tracking-[0.4em] text-[#00BFFF] uppercase mb-6">
          System / Cart ({cart.length})
        </h2>

        {cart.length > 0 ? (
          <ul className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((cartItem: any) => (
              <li
                key={cartItem?.documentId}
                className="group relative flex items-start gap-4 border-b border-white/5 pb-4 last:border-0"
              >
                {cartItem?.cart?.product?.banner?.url && (
                  <div className="bg-neutral-900/50 p-2 border border-white/5">
                    <Image
                      src={cartItem?.cart?.product?.banner?.url}
                      alt={cartItem?.cart?.product?.banner?.name || "cartImage"}
                      width={64}
                      height={64}
                      className="object-contain w-14 h-14"
                      priority={true}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-wider truncate">
                    {cartItem?.cart?.product?.title}
                  </h3>
                  <div className="mt-1 flex flex-col gap-0.5 text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">
                    <span className="text-[#00BFFF]/60">
                      {cartItem?.cart?.product?.category}
                    </span>
                    <span className="text-white">
                      € {cartItem?.cart?.product?.price}
                    </span>
                  </div>
                </div>

                <button
                  className="text-neutral-700 transition-colors hover:text-red-500 pt-1"
                  onClick={() => handleDeleteCartItem(cartItem?.documentId)}
                >
                  <FaRegTrashCan size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-center flex flex-col items-center gap-3">
            <div className="w-8 h-px bg-neutral-800"></div>
            <h2 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]">
              Empty Sequence
            </h2>
            <div className="w-8 h-px bg-neutral-800"></div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="mt-8 space-y-3 pt-4 border-t border-white/10">
          <Link
            href="/cart"
            onClick={() => setIsCartOpen(false)}
            className="flex items-center justify-center w-full bg-[#00BFFF] px-5 py-3 text-[10px] font-black text-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Terminal View
          </Link>

          <button
            onClick={() => setIsCartOpen(false)}
            className="block w-full text-center text-[9px] text-neutral-600 font-black uppercase tracking-[0.3em] transition hover:text-neutral-300"
          >
            Return to Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
