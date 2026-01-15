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
  const { getTotalAmountInCents } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // PaymentIntent automatisch beim Laden der Seite erstellen
  useEffect(() => {
    const createPaymentIntent = async () => {
      const amount = getTotalAmountInCents();
      if (amount <= 0) return; // Sicherstellen, dass Betrag gültig ist
      try {
        const res = await fetch("/api/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };

    createPaymentIntent();
  }, []);

  // Ladezustand anzeigen, bis clientSecret existiert
  if (!clientSecret) {
    return <p className="mt-24 text-center">Loading checkout...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="mt-24">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Checkout;
