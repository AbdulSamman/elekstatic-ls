"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { useUser } from "@clerk/nextjs";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { handleSendToDashboard, totalPrice, fillDashboard } =
    useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    await sendEmail();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-confirm`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      setLoading(false);
    }
  };
  //RESEND EMAIL FUNCTION
  const sendEmail = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: user?.firstName || user?.fullName || "Customer",
        email: user?.emailAddresses[0].emailAddress,
        totalPrice: totalPrice,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form className="py-26" onSubmit={(e) => handleSubmit(e)}>
      <div className="mx-10 md:mx-80 ">
        <PaymentElement />
        <button className="bg-primary p-4 text-white rounded-md w-full mt-4 text-lg">
          {loading ? "Processing..." : "PAY & SEND ORDER"}
        </button>
      </div>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
