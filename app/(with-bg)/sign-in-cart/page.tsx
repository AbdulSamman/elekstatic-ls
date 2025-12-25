"use client";

import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

import { useUser } from "@clerk/nextjs";

function page() {
  const { user } = useUser();
  return (
    <div className="h-screen flex flex-col items-center gap-10 px-4 py-28">
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
          className=" bg-gray-200 px-15 py-3 text-lg font-medium text-primary  sm:w-70 w-full hover:bg-transparent hover:text-neutral-100 hover:border "
          href="/"
        >
          Back Home
        </Link>

        <Link
          className="bg-transparent hover:bg-neutral-300 hover:text-neutral-950 border border-neutral-100 px-15 py-3 text-lg font-medium text-neutral-200 sm:w-70 w-full"
          href="/sign-in"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default page;
