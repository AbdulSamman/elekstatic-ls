"use client";

import Main from "./_components/Main";
import ProductSection from "./_components/ProductSection";

export default function Home() {
  return (
    <div className="h-full items-center justify-center bg-[#f5f6fa] font-sans relative">
      <Main />
      <ProductSection />
    </div>
  );
}
