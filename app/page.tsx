"use client";

import Card from "./_components/Card";
import Main from "./_components/Main";
import ProductSection from "./_components/ProductSection";

export default function Home() {
  return (
    <div className="h-full items-center justify-center font-sans relative">
      <Main />
      <Card />
      <ProductSection />
    </div>
  );
}
