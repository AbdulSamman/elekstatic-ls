// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const paymentConfirmed = () => {
//   return (
//     <div className="flex flex-col items-center justify-center px-5 h-111.25 pt-26">
//       <Image
//         src="/verify.gif"
//         alt="check"
//         width={100}
//         height={100}
//         unoptimized
//         priority
//         className="w-50 h-40"
//       />
//       <h2 className="text-[30px]">Payment Successful</h2>
//       <p className="text-[17px] text-center mt-6 text-gray-500">
//         We sent an email with your order confirmation with the rest of your
//         amount aslong we start processing your order.
//       </p>
//       <Link
//         href="/"
//         className="py-2 px-6 mt-6 text-white rounded-md bg-primary text-[25px]"
//       >
//         Go Back Home
//       </Link>
//     </div>
//   );
// };

// export default paymentConfirmed;
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const PaymentConfirmed = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 bg-black">
      {/* SUCCESS ANIMATION CONTAINER */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-[#00BFFF]/20 blur-[60px] rounded-full animate-pulse"></div>
        <Image
          src="/verify.gif"
          alt="Payment Verified"
          width={200}
          height={200}
          unoptimized
          priority
          className="relative z-10 w-40 h-40 object-contain grayscale invert"
        />
      </div>

      {/* STATUS TEXT */}
      <div className="text-center space-y-4 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CheckCircle2 className="text-[#00BFFF]" size={18} />
          <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.5em] uppercase">
            Transaction Verified
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
          Order <span className="text-neutral-800">Confirmed</span>
        </h2>

        <p className="text-[14px] md:text-[16px] text-neutral-500 font-medium leading-relaxed max-w-md mx-auto pt-4 uppercase tracking-wide">
          An automated confirmation has been dispatched to your email. Our
          manufacture team will begin processing your custom build shortly.
        </p>
      </div>

      {/* ACTION FOOTER */}
      <div className="mt-16 flex flex-col items-center gap-8 w-full">
        <div className="h-px w-20 bg-neutral-800"></div>

        <Link
          href="/"
          className="group relative flex items-center gap-4 bg-white px-10 py-5 transition-all duration-500 hover:bg-[#00BFFF]"
        >
          <span className="relative z-10 text-[12px] font-black text-black uppercase tracking-[0.3em]">
            Return to Dashboard
          </span>
          <ChevronRight
            className="relative z-10 text-black group-hover:translate-x-1 transition-transform"
            size={18}
          />
        </Link>

        <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-[0.2em]">
          SnB Audio / Manufacturing Division
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmed;
