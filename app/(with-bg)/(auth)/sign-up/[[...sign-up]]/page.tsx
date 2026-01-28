// "use client";

// import { SignUp, useUser } from "@clerk/nextjs";

// export default function Home() {
//   const { isSignedIn } = useUser();

//   if (!isSignedIn) {
//     return (
//       <div className="px-4 py-28 flex justify-center">
//         <SignUp
//           appearance={{
//             variables: {
//               colorText: "#ffffff",
//               colorBackground: "#0a0a0ab3",
//             },
//           }}
//         />
//       </div>
//     );
//   }

//   return <div>Welcome!</div>;
// }
"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <section className="min-h-screen bg-black px-4 py-28 authSignIn relative">
        <main className="flex flex-col items-center justify-center">
          <div className="w-full max-w-100">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#00BFFF] mb-8 group"
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
                Access Request
              </span>
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Create <span className="text-neutral-800">Account</span>
              </h1>
            </div>

            <SignUp
              appearance={{
                variables: {
                  colorPrimary: "#00BFFF",
                  colorText: "#ffffff",
                  colorBackground: "#0a0a0ab3",
                },
                elements: {
                  headerTitle: "hidden",
                },
              }}
            />
          </div>
        </main>
      </section>
    );
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <h1 className="text-[#00BFFF] font-black tracking-widest animate-pulse uppercase text-sm">
        Welcome to the System
      </h1>
    </div>
  );
}
