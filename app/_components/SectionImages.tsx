"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronsRight } from "lucide-react";

function SectionImages() {
  const { sectionImages } = useContext(AppContext);

  return (
    <section id="produkte" className="  mx-auto sm:px-4 py-32 bg-black">
      {/* Überschrift im Technical-Branding Style */}
      <div className="flex flex-col items-center mb-20">
        <span className="text-[#00BFFF] text-xs font-black tracking-[0.5em] uppercase mb-4">
          Visual Precision
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter text-center">
          FRONT PANEL <span className="text-neutral-500">MARKINGS</span>
        </h2>
        <div className="w-24 h-px bg-linear-to-r from-transparent via-[#00BFFF] to-transparent mt-8 shadow-[0_0_10px_#00BFFF]"></div>
      </div>

      {sectionImages.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-12 px-4">
          {sectionImages.map((sectionImage) => {
            return (
              <Card
                key={sectionImage?.documentId}
                className="group bg-neutral-950 border-white/5 rounded-none hover:border-[#00BFFF]/30 transition-all duration-700 relative overflow-hidden"
              >
                {/* Dekorativer Eck-Glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#00BFFF]/5 blur-2xl group-hover:bg-[#00BFFF]/15 transition-all"></div>

                <CardContent className="p-6 flex flex-col">
                  {/* Image Container mit Scan-Effekt */}
                  <div className="relative h-56 flex items-center justify-center overflow-hidden bg-neutral-900/30">
                    <Image
                      src={sectionImage?.banner?.url || "/logo2.png"}
                      alt="sectionImage"
                      fill
                      priority
                      className="object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 p-4"
                    />
                    {/* Subtiler blauer Overlay-Schimmer beim Hover */}
                    <div className="absolute inset-0 bg-[#00BFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-bold text-lg text-white tracking-tight group-hover:text-[#00BFFF] transition-colors">
                      {sectionImage.title}
                    </h3>

                    <div className="h-px w-12 bg-neutral-800 my-4 group-hover:w-full group-hover:bg-[#00BFFF]/30 transition-all duration-500"></div>

                    <p className="text-sm text-neutral-500 leading-relaxed h-20 line-clamp-3">
                      {sectionImage.description?.map((descItem: any) =>
                        descItem.children
                          ?.map((child: any) => child.text)
                          .join(" "),
                      )}
                    </p>

                    <Link
                      className="mt-6 inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#00BFFF] opacity-70 hover:opacity-100 group-hover:translate-x-2 transition-all"
                      href={`/products?category=${sectionImage.category}?populate=*`}
                    >
                      DISCOVER NOW{" "}
                      <ChevronsRight size={16} className="animate-pulse" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Skeleton Loader im Tech-Style */
        <div className="grid md:grid-cols-3 gap-10 px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-96 bg-neutral-900/50 animate-pulse border border-white/5 rounded-none"
            ></div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SectionImages;
