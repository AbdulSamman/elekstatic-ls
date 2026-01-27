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
  const { totalPrice, fillDashboard } = useContext(AppContext);
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

  if (!clientSecret) return null;

  return (
    <div className="flex py-26 items-center justify-center flex-wrap gap-4">
      <div className=" bg-gray-400 py-12 px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-widest">
          SnB audio
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 ">
          <div className="flex-1 bg-gray-500 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 border-b pb-4">
              Deine Auswahl
            </h2>

            <div className="">
              {fillDashboard.map((order: any) => (
                <div key={order?.documentId} className="flex items-center">
                  <ul className="">
                    {order?.items?.map((productItem: any, idx: number) => (
                      <li key={idx} className="border rounded p-4">
                        <div className="flex items-center gap-4">
                          {productItem?.product?.banner?.url && (
                            <Image
                              src={productItem?.product?.banner?.url}
                              alt={productItem?.product?.title}
                              className="w-20 h-20 object-contain rounded"
                              width={100}
                              height={100}
                            />
                          )}
                          <div>
                            <h2 className="text-xl text-slate-700">
                              {productItem?.product?.title}
                            </h2>
                            <span>
                              <div className="flex items-center justify-start gap-4">
                                <strong className="text-orange-600">
                                  Quanty:{" "}
                                </strong>{" "}
                                <span className="text-slate-600">
                                  {productItem?.qty}x
                                </span>
                              </div>
                            </span>
                            <span>{productItem?.totalPrice?.toFixed(2)} €</span>
                            {productItem?.product?.lieferStatus === "Sofort" ? (
                              <div className="flex items-center justify-start gap-2 pt-2">
                                <div className="w-2 h-2 bg-green-800 rounded-full"></div>
                                <span className="text-green-800 text-sm py-2">
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
                            <div className="mt-1">
                              {productItem?.product?.lieferStatus ===
                                "Vorbestellung" && (
                                <strong className="text-green-300">
                                  Selected Options:
                                </strong>
                              )}
                              <ul className="mt-1">
                                {productItem?.selectedOptions?.map(
                                  (option: any, oIdx: number) => (
                                    <li
                                      key={oIdx}
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <p className="text-neutral-600 w-20">
                                        {option?.title}:
                                      </p>{" "}
                                      {option?.label}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium text-gray-900">{order.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Versand</span>
                <span>Kostenlos</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4">
                <span>Gesamtsumme</span>
                <span>{totalPrice} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
