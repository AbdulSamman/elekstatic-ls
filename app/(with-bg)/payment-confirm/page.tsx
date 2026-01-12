"use client";

import Image from "next/image";
import Link from "next/link";

const paymentConfirmed = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 h-111.25 pt-26">
      <Image
        src="/verify.gif"
        alt="check"
        width={100}
        height={100}
        unoptimized
        priority
        className="w-50 h-40"
      />
      <h2 className="text-[30px]">Payment Successful</h2>
      <p className="text-[17px] text-center mt-6 text-gray-500">
        We sent an email with your order confirmation with the rest of your
        amount aslong we start processing your order.
      </p>
      <Link
        href="/"
        className="p-2 mt-6 text-white rounded-md bg-primary text-[25px]"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default paymentConfirmed;
