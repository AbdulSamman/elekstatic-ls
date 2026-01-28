// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <section className="px-4 py-28 authSignIn ">
//       <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//         <div className="max-w-xl lg:max-w-3xl">
//           <SignIn
//             appearance={{
//               variables: {
//                 colorText: "#ffffff",
//                 colorBackground: "#0a0a0ab3",
//               },
//             }}
//           />
//         </div>
//       </main>
//     </section>
//   );
// }
"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen bg-black px-4 py-28 authSignIn relative overflow-hidden">
      {/* Hintergrund-Glow passend zum System-Design */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#00BFFF]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <main className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-100">
          {/* Zurück-Link im neuen Style */}
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-[#00BFFF] transition-colors mb-8 group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Back to Main Frame
            </span>
          </Link>

          <div className="mb-6 border-l-2 border-[#00BFFF] pl-4">
            <span className="text-[#00BFFF] text-[9px] font-black tracking-[0.4em] uppercase block">
              Security Check
            </span>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Identity <span className="text-neutral-800">Login</span>
            </h1>
          </div>

          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#00BFFF", // Dein Cyan als Fokus-Farbe
                colorText: "#ffffff",
                colorBackground: "#0a0a0ab3",
              },
              elements: {
                headerTitle: "hidden", // Wir nutzen unseren eigenen Header
                headerSubtitle:
                  "text-neutral-500 uppercase text-[10px] tracking-widest font-bold mb-4",
              },
            }}
          />
        </div>
      </main>
    </section>
  );
}
