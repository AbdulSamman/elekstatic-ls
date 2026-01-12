// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./_components/CheckoutForm";
// import { useSearchParams } from "next/navigation";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string
// );

// const checkout = () => {
//   // call the amout from router

//   const amountInCents = Math.round(amountDecimal * 100);

//   const options: any = {
//     mode: "payment",
//     currency: "eur",
//     //clientSecret: process.env.STRIPE_SECRET_KEY,
//     amount: amountInCents,
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <div className=" py-5 h-111.25  mt-24">
//         <CheckoutForm amount={amountDecimal} />
//       </div>
//     </Elements>
//   );
// };

// export default checkout;

"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string
);

const Checkout = () => {
  const { getTotalAmountInCents } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Funktion, die im CheckoutForm beim Klick auf "Pay" aufgerufen wird
  const handleCreatePaymentIntent = async () => {
    try {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotalAmountInCents() }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("PaymentIntent creation error:", error);
    }
  };

  // Wenn kein clientSecret existiert, zeige Button zum Erzeugen
  if (!clientSecret) {
    return (
      <div className="mt-24 text-center">
        <button
          onClick={handleCreatePaymentIntent}
          className="bg-primary text-white px-6 py-3 rounded-md"
        >
          Pay Now
        </button>
      </div>
    );
  }

  // Sobald clientSecret existiert, render PaymentElement
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="mt-24">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Checkout;
