"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronsRight, Activity } from "lucide-react";

function SectionImages() {
  const { sectionImages } = useContext(AppContext);

  return (
    <section
      id="produkte"
      className="mx-auto sm:px-4 py-32 bg-black relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#00BFFF]/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#00BFFF]/5 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center mb-24 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={14} className="text-[#00BFFF] animate-pulse" />
          <span className="text-[#00BFFF] text-[10px] font-black tracking-[0.6em] uppercase">
            System Analysis
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-center uppercase italic">
          Product{" "}
          <span className="text-[#00BFFF] shadow-[#00BFFF] drop-shadow-[0_0_15px_rgba(0,191,255,0.4)]">
            Units
          </span>
        </h2>
        <div className="w-32 h-0.5 bg-[#00BFFF] mt-8 shadow-[0_0_20px_#00BFFF]"></div>
      </div>

      {sectionImages.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 px-4 relative z-10">
          {sectionImages.map((sectionImage) => {
            return (
              <Card
                key={sectionImage?.documentId}
                className="group bg-neutral-950/50 border-[#00BFFF]/10 rounded-none hover:border-[#00BFFF] transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute top-0 -left-full w-full h-0.5 bg-[#00BFFF] group-hover:left-full transition-all duration-1000 z-20 shadow-[0_0_15px_#00BFFF]"></div>

                <CardContent className="p-0 flex flex-col">
                  <div className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-neutral-900/20 border-b border-white/3">
                    <div className="absolute inset-0 bg-[#00BFFF]/0 group-hover:bg-[#00BFFF]/10 transition-all duration-700"></div>

                    <Image
                      src={sectionImage?.banner?.url || "/logo2.png"}
                      alt="sectionImage"
                      fill
                      priority
                      className="object-contain transition-all duration-700 group-hover:scale-110 p-10 relative z-10 filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <div className="p-8 relative">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00BFFF]/30"></div>

                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-xl text-white uppercase tracking-tight">
                        {sectionImage.title}
                      </h3>
                      <span className="bg-[#00BFFF]/10 text-[#00BFFF] text-[9px] px-2 py-1 font-bold tracking-widest border border-[#00BFFF]/20">
                        ACTIVE
                      </span>
                    </div>

                    <p className="text-[13px] text-neutral-400 leading-relaxed line-clamp-3 font-medium border-l border-[#00BFFF]/20 pl-4">
                      {sectionImage.description?.map((descItem: any) =>
                        descItem.children
                          ?.map((child: any) => child.text)
                          .join(" "),
                      )}
                    </p>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                      <Link
                        className="w-full flex items-center justify-center gap-3 bg-[#00BFFF] hover:bg-white py-3 text-[10px] font-black tracking-[0.3em] text-black transition-all duration-300"
                        href={`/products?category=${sectionImage.category}`}
                      >
                        VIEW SPECIFICATIONS
                        <ChevronsRight size={14} />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10 px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-112.5 bg-neutral-900/50 animate-pulse border border-[#00BFFF]/10"
            ></div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SectionImages;
