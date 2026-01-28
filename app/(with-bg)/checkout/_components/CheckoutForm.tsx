"use client";

// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";

// import { useState, useContext } from "react";
// import { AppContext } from "../../../AppContext";
// import { useUser } from "@clerk/nextjs";
// import { ShieldCheck, Lock } from "lucide-react";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useUser();

//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const { handleSendToDashboard, totalPrice, fillDashboard } =
//     useContext(AppContext);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       await sendEmail();
//       await handleSendToDashboard();

//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-confirm`,
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message || "Payment failed");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const sendEmail = async () => {
//     const res = await fetch("/api/send-email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         firstName: user?.firstName || user?.fullName || "Customer",
//         email: user?.emailAddresses[0].emailAddress,
//         totalPrice: totalPrice,
//       }),
//     });
//     //const data = await res.json();
//   };

//   return (
//     <form
//       onSubmit={(e) => handleSubmit(e)}
//       className="w-full max-w-3xl mx-auto pb-20"
//     >
//       <div className="bg-neutral-950 border border-white/5 p-6 md:p-10 shadow-2xl">
//         {/* SECURE HEADER */}
//         <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
//           <div className="flex flex-col">
//             <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.4em] uppercase">
//               Gateway 01
//             </span>
//             <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
//               Secure Payment
//             </h2>
//           </div>
//           <div className="flex items-center gap-2 text-neutral-500">
//             <Lock size={14} className="text-[#00BFFF]/60" />
//             <span className="text-[9px] font-bold uppercase tracking-widest">
//               SSL Encrypted
//             </span>
//           </div>
//         </div>

//         {/* STRIPE ELEMENT CONTAINER */}
//         <div className="stripe-container min-h-75">
//           <PaymentElement
//             options={{
//               layout: "tabs",
//             }}
//           />
//         </div>

//         {/* ERROR MESSAGE */}
//         {errorMessage && (
//           <div className="mt-6 p-4 bg-red-950/20 border border-red-900/50 flex items-center gap-3">
//             <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
//             <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
//               {errorMessage}
//             </p>
//           </div>
//         )}

//         {/* SUBMIT AREA */}
//         <div className="mt-10 pt-8 border-t border-white/5">
//           <button
//             disabled={loading || !stripe}
//             className="group relative w-full py-5 bg-white hover:bg-[#00BFFF] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <div className="flex items-center justify-center gap-4 relative z-10 text-black">
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
//               ) : (
//                 <ShieldCheck size={20} />
//               )}
//               <span className="text-[12px] font-black tracking-[0.3em] uppercase">
//                 {loading
//                   ? "Processing Encryption..."
//                   : `Authorize Payment: ${totalPrice.toFixed(2)}€`}
//               </span>
//             </div>
//           </button>

//           <p className="mt-6 text-center text-[9px] text-neutral-600 font-bold uppercase tracking-widest leading-loose">
//             By authorizing this payment, you agree to our terms of service{" "}
//             <br />
//             and the automated creation of your manufacturing order.
//           </p>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CheckoutForm;

import {
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useState, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { useUser } from "@clerk/nextjs";
import { ShieldCheck, Lock, MapPin } from "lucide-react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Wichtig: handleSendToDashboard muss in deinem AppContext jetzt ein Argument (address) akzeptieren
  const { handleSendToDashboard, totalPrice } = useContext(AppContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || loading) return;

    setLoading(true);
    setErrorMessage(""); // Error zurücksetzen

    try {
      // 1. E-Mail
      await sendEmail();

      // 2. Adresse holen
      const addressElement = elements.getElement("address");
      if (!addressElement) throw new Error("Address Element not found");
      const { value }: any = await addressElement.getValue();

      if (!value) {
        setErrorMessage("Please provide a complete shipping address.");
        setLoading(false);
        return;
      }

      // 3. WICHTIG: Erst Strapi versuchen
      console.log("Starte Strapi Übertragung...");
      await handleSendToDashboard(value);
      console.log("Strapi Übertragung erfolgreich! Fahre mit Stripe fort...");

      // 4. NUR WENN STRAPI GEKLAPPT HAT: Stripe Zahlung
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
    } catch (error: any) {
      // Wenn hier ein Fehler landet (z.B. von Strapi), stoppt alles!
      console.error("DER PROZESS WURDE GESTOPPT:");
      console.error("Fehler-Details:", error.response?.data || error);

      setErrorMessage("Backend Error: Check Console for details.");
      setLoading(false);
      // KEIN REDIRECT HIER -> Du kannst jetzt in die Konsole schauen!
    }
  };

  const sendEmail = async () => {
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user?.firstName || user?.fullName || "Customer",
          email: user?.emailAddresses[0].emailAddress,
          totalPrice: totalPrice,
        }),
      });
    } catch (err) {
      console.error("Email failed to send", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto pb-20 px-4"
    >
      <div className="bg-neutral-950 border border-white/5 p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* SECTION 1: SHIPPING ADDRESS */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.4em] uppercase">
              Step 01
            </span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
              Shipping <span className="text-neutral-500">Destination</span>
            </h2>
          </div>
          <MapPin size={18} className="text-[#00BFFF] opacity-50" />
        </div>

        <div className="mb-12">
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["DE", "AT", "CH"],
            }}
          />
        </div>

        {/* SECTION 2: PAYMENT ELEMENT */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.4em] uppercase">
              Step 02
            </span>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
              Secure <span className="text-neutral-500">Gateway</span>
            </h2>
          </div>
          <Lock size={18} className="text-[#00BFFF] opacity-50" />
        </div>

        <div className="stripe-container min-h-75">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="mt-8 p-4 bg-red-950/20 border border-red-900/50 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
            <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest leading-none">
              {errorMessage}
            </p>
          </div>
        )}

        {/* SUBMIT AREA */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <button
            type="submit"
            disabled={loading || !stripe}
            className="group relative w-full py-5 bg-white hover:bg-[#00BFFF] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-4 relative z-10 text-black">
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <ShieldCheck size={20} />
              )}
              <span className="text-[12px] font-black tracking-[0.3em] uppercase">
                {loading
                  ? "Processing Encryption..."
                  : `Authorize Payment: ${totalPrice.toFixed(2)}€`}
              </span>
            </div>
          </button>

          <p className="mt-6 text-center text-[9px] text-neutral-600 font-bold uppercase tracking-widest leading-loose">
            By authorizing this payment, you agree to our terms of service{" "}
            <br />
            and the automated creation of your manufacturing order.
          </p>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
