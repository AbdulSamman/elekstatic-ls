"use client";

import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

import { useUser } from "@clerk/nextjs";

function page() {
  const { user } = useUser();
  return (
    <div className="h-screen flex flex-col items-center gap-10 px-2 py-6">
      <div>
        <CiShoppingCart className="text-[120px]" />
      </div>
      {!user && (
        <>
          <h2 className="text-3xl text-center">
            There are no items in your shopping cart.
          </h2>
          <p className="italic text-md text-center">
            Sign in to your account or create an account to see your saved
            items, or continue shopping.
          </p>
        </>
      )}
      <div className="flex flex-col items-center justify-between gap-15 sm:flex-row sm:w-auto w-full text-center">
        <Link
          className="rounded-md bg-gray-200 px-15 py-3 text-md font-medium text-primary shadow-sm sm:w-auto w-full"
          href="/"
        >
          Back Home
        </Link>

        <Link
          className="rounded-md bg-slate-600 px-15 py-3 text-md font-medium text-gray-200 sm:w-auto w-full"
          href="/sign-in"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default page;
