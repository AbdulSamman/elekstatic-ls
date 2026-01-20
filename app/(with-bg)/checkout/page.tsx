"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../AppContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string
);

const Checkout = () => {
  const { totalPrice } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof totalPrice !== "number" ||
      isNaN(totalPrice) ||
      totalPrice <= 0
    ) {
      return;
    }
    fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(console.error);
  }, [totalPrice]);

  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
