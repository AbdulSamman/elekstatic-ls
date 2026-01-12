"use client";

import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const { totalPrice } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMessage(submitError.message || "Payment submission failed.");
      return;
    }

    // Fetch clientSecret from server
    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalPrice * 100,
      }),
    });
    const data = await res.json();
    const clientSecret = data.clientSecret;
    // Confirm payment
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-confirm`,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message || "Payment failed.");
      setLoading(false);
    }
  };

  return (
    <form className="pb-26" onSubmit={(e) => handleSubmit(e)}>
      <div className="mx-10 xl:mx-80 ">
        <PaymentElement />

        <button className="bg-primary p-2 text-white rounded-md w-full mt-4">
          {loading ? "Processing..." : "PAY & SEND ORDER"}
        </button>
      </div>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
