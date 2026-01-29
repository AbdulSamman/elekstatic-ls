// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./_components/CheckoutForm";
// import { useContext, useState, useEffect } from "react";
// import { AppContext } from "../../AppContext";
// import Image from "next/image";
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string,
// );

// const Checkout = () => {
//   const { totalPrice, fillDashboard } = useContext(AppContext);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     if (
//       typeof totalPrice !== "number" ||
//       isNaN(totalPrice) ||
//       totalPrice <= 0
//     ) {
//       return;
//     }
//     const amountInCents = Math.round(totalPrice * 100);
//     fetch("/api/create-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: amountInCents }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret))
//       .catch(console.error);
//   }, [totalPrice]);

//   if (!clientSecret) return null;

//   return (
//     <div className="flex py-26 items-center justify-center flex-wrap gap-4">
//       <div className=" bg-gray-400 py-12 px-4 sm:px-6 lg:px-8 ">
//         <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-widest">
//           SnB audio
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-12 ">
//           <div className="flex-1 bg-gray-500 p-8 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="text-xl font-semibold mb-6 border-b pb-4">
//               Deine Auswahl
//             </h2>

//             <div className="">
//               {fillDashboard.map((order: any) => (
//                 <div key={order?.documentId} className="flex items-center">
//                   <ul className="">
//                     {order?.items?.map((productItem: any, idx: number) => (
//                       <li key={idx} className="border rounded p-4">
//                         <div className="flex items-center gap-4">
//                           {productItem?.product?.banner?.url && (
//                             <Image
//                               src={productItem?.product?.banner?.url}
//                               alt={productItem?.product?.title}
//                               className="w-20 h-20 object-contain rounded"
//                               width={100}
//                               height={100}
//                             />
//                           )}
//                           <div>
//                             <h2 className="text-xl text-slate-700">
//                               {productItem?.product?.title}
//                             </h2>
//                             <span>
//                               <div className="flex items-center justify-start gap-4">
//                                 <strong className="text-orange-600">
//                                   Quanty:{" "}
//                                 </strong>{" "}
//                                 <span className="text-slate-600">
//                                   {productItem?.qty}x
//                                 </span>
//                               </div>
//                             </span>
//                             <span>{productItem?.totalPrice?.toFixed(2)} €</span>
//                             {productItem?.product?.lieferStatus === "Sofort" ? (
//                               <div className="flex items-center justify-start gap-2 pt-2">
//                                 <div className="w-2 h-2 bg-green-800 rounded-full"></div>
//                                 <span className="text-green-800 text-sm py-2">
//                                   Auf Lager
//                                 </span>
//                               </div>
//                             ) : (
//                               <div className="flex flex-col items-start">
//                                 <div className="flex items-center justify-start gap-2 pt-2">
//                                   <div className="w-2 h-2 bg-red-800 rounded-full"></div>
//                                   <span className="text-red-800 text-xs">
//                                     Vorbestellung:
//                                   </span>
//                                 </div>
//                                 <span className="text-red-800 text-xs py-2 px-4">
//                                   Lieferzeit kann 14 bis 28 Arbeitstage dauern
//                                 </span>
//                               </div>
//                             )}
//                             <div className="mt-1">
//                               {productItem?.product?.lieferStatus ===
//                                 "Vorbestellung" && (
//                                 <strong className="text-green-300">
//                                   Selected Options:
//                                 </strong>
//                               )}
//                               <ul className="mt-1">
//                                 {productItem?.selectedOptions?.map(
//                                   (option: any, oIdx: number) => (
//                                     <li
//                                       key={oIdx}
//                                       className="text-sm text-slate-600 flex gap-2"
//                                     >
//                                       <p className="text-neutral-600 w-20">
//                                         {option?.title}:
//                                       </p>{" "}
//                                       {option?.label}
//                                     </li>
//                                   ),
//                                 )}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="flex flex-1 flex-col">
//                     <p className="font-medium text-gray-900">{order.title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 border-t pt-6 space-y-2">
//               <div className="flex justify-between text-gray-600">
//                 <span>Versand</span>
//                 <span>Kostenlos</span>
//               </div>
//               <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4">
//                 <span>Gesamtsumme</span>
//                 <span>{totalPrice} €</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default Checkout;

"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../AppContext";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string,
);

const Checkout = () => {
  const { totalPrice, cart } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof totalPrice !== "number" ||
      isNaN(totalPrice) ||
      totalPrice <= 0
    ) {
      return;
    }
    const amountInCents = Math.round(totalPrice * 100);
    fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(console.error);
  }, [totalPrice]);

  // Stripe Dark-Mode Configuration
  const appearance = {
    theme: "flat" as const,
    variables: {
      colorPrimary: "#00BFFF",
      colorBackground: "#0a0a0a",
      colorText: "#ffffff",
      colorDanger: "#df1b41",
      fontFamily: "Inter, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "2px",
    },
  };

  if (!clientSecret)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-350 mx-auto px-6">
        {/* BRANDING HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-[0.3em] uppercase italic">
            SnB <span className="text-neutral-800">Audio</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-[#00BFFF]">
            <span className="h-px w-10 bg-[#00BFFF]/30"></span>
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">
              Secure Terminal
            </span>
            <span className="h-px w-10 bg-[#00BFFF]/30"></span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: ORDER SPECIFICATIONS (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border border-white/5 bg-neutral-950/50 p-8">
              <h2 className="text-[12px] font-black text-[#00BFFF] uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#00BFFF] rounded-full"></span>
                Order Configuration
              </h2>

              <div className="space-y-6">
                {cart.map((order: any) => (
                  <div key={order?.documentId} className="space-y-4">
                    {/* PRODUCT THUMBNAIL */}
                    <div className="w-24 h-24 bg-neutral-900 shrink-0 flex items-center justify-center p-2 border border-white/5">
                      {order?.cart?.product?.banner?.url && (
                        <Image
                          src={order?.cart?.product?.banner?.url}
                          alt={order?.cart?.product?.title}
                          className="w-full h-full object-contain"
                          width={100}
                          height={100}
                        />
                      )}
                    </div>

                    {/* PRODUCT SPECS */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                          {order?.cart?.product?.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-[10px] uppercase font-bold text-neutral-500">
                          Quantity:{" "}
                          <span className="text-white ml-2">
                            {order?.cart?.qty}x
                          </span>
                        </div>

                        {/* DELIVERY STATUS */}
                        {order?.cart?.product?.lieferStatus === "Sofort" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full shadow-[0_0_5px_#00FF00]"></div>
                            <span className="text-[9px] font-black text-[#00FF00]/70 uppercase">
                              In Stock
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-black text-red-600 uppercase tracking-tighter">
                              Pre-Order (14-28d)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* SELECTED OPTIONS LIST */}
                      <div className="pt-3 border-t border-white/5">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {order?.cart?.selectedOptions?.map(
                            (option: any, oIdx: number) => (
                              <li
                                key={oIdx}
                                className="text-[10px] flex gap-2 uppercase font-bold tracking-tighter"
                              >
                                <span className="text-neutral-600">
                                  {option?.title}:
                                </span>
                                <span className="text-neutral-400">
                                  {option?.label}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL CALCULATION FOOTER */}
              <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-[11px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                  <span>Shipping & Logistics</span>
                  <span className="text-[#00BFFF]">Complimentary</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">
                    Total Value
                  </span>
                  <span className="text-3xl font-black text-white italic tracking-tighter font-mono">
                    {totalPrice.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STRIPE PAYMENT FORM (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
