// "use client";

// import Link from "next/link";
// import { CiShoppingCart } from "react-icons/ci";

// import { useUser } from "@clerk/nextjs";

// function page() {
//   const { user } = useUser();
//   return (
//     <div className="h-screen flex flex-col items-center gap-10 px-4 py-28">
//       <div>
//         <CiShoppingCart className="text-[120px]" />
//       </div>
//       {!user && (
//         <>
//           <h2 className="text-3xl text-center">
//             There are no items in your shopping cart.
//           </h2>
//           <p className="italic text-md text-center">
//             Sign in to your account or create an account to see your saved
//             items, or continue shopping.
//           </p>
//         </>
//       )}
//       <div className="flex flex-col items-center justify-between gap-15 sm:flex-row sm:w-auto w-full text-center">
//         <Link
//           className=" bg-gray-200 px-15 py-3 text-lg font-medium text-primary  sm:w-70 w-full hover:bg-transparent hover:text-neutral-100 hover:border "
//           href="/"
//         >
//           Back Home
//         </Link>

//         <Link
//           className="bg-transparent hover:bg-neutral-300 hover:text-neutral-950 border border-neutral-100 px-15 py-3 text-lg font-medium text-neutral-200 sm:w-70 w-full"
//           href="/sign-in"
//         >
//           Sign In
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default page;
"use client";

import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, User } from "lucide-react";

function Page() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-32">
      {/* Visual Indicator */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-[#00BFFF]/5 blur-[50px] rounded-full"></div>
        <CiShoppingCart className="text-[100px] text-neutral-800 relative z-10" />
      </div>

      {!user && (
        <div className="text-center max-w-xl space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.5em] uppercase">
              System Message / 404-Cart
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
              Cart is <span className="text-neutral-800">Empty</span>
            </h2>
          </div>

          <p className="text-[13px] md:text-[15px] text-neutral-500 font-medium uppercase tracking-wider leading-relaxed">
            Sign in to your account to synchronize your saved configurations, or
            return to the product laboratory.
          </p>
        </div>
      )}

      {/* Action Controls */}
      <div className="mt-16 flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            className="flex-1 flex items-center justify-center gap-3 bg-white px-8 py-4 text-[11px] font-black text-black uppercase tracking-[0.2em] transition-all hover:bg-[#00BFFF]"
            href="/"
          >
            Back Home <ChevronRight size={14} />
          </Link>

          {!user && (
            <Link
              className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-white/10 px-8 py-4 text-[11px] font-black text-white uppercase tracking-[0.2em] transition-all hover:bg-white/5 hover:border-white/30"
              href="/sign-in"
            >
              <User size={14} /> Sign In
            </Link>
          )}
        </div>

        <div className="h-px w-20 bg-neutral-900 mt-4"></div>

        <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-[0.3em]">
          SnB Audio / Secure Access
        </p>
      </div>
    </div>
  );
}

export default Page;
