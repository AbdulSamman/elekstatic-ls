"use client";

import Main from "./_components/Main";
import ProductItem from "./_components/ProductItem";
import ProductSection from "./_components/ProductSection";

export default function Home() {
  return (
    <div className="h-full items-center justify-center bg-zinc-50 font-sans relative">
      <Main />
      <ProductSection />
      <ProductItem />
    </div>
  );
}
