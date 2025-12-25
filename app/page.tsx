"use client";

import Card from "./_components/Card";
import Main from "./_components/Main";
import SectionImages from "./_components/SectionImages";

export default function Home() {
  return (
    <div className="items-center justify-center font-sans relative ">
      <Main />
      <Card />
      <SectionImages />
    </div>
  );
}
