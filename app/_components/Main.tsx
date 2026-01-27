"use client";

import { useEffect, useState } from "react";
import axiosClient from "../_utils/axiosClient";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

function Main() {
  const [introVideoUrl, setintroVideoUrl] = useState<any>();

  useEffect(() => {
    const fetchIntroVideo = async () => {
      try {
        const _introVideo = (
          await axiosClient.get("/api/mediapoints?populate=*")
        ).data;
        const firstItem = _introVideo.data[0];
        const videoField = firstItem.video || firstItem.introVideo;
        const url = videoField?.data?.attributes?.url || videoField?.url;
        if (!url) return;
        const fullUrl = url.startsWith("http")
          ? url
          : `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337"}${url}`;
        setintroVideoUrl(fullUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIntroVideo();
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-black">
      {/* VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <video
          src={introVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          style={{
            filter:
              "grayscale(100%) brightness(0.5) contrast(1.2) sepia(20%) hue-rotate(170deg) saturate(300%)",
          }}
        />
        {/* Kontrast-Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/10" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-350 mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow-Label */}
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <span className="w-12 h-0.5 bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]"></span>
            <span className="text-[#00BFFF] text-xs font-black tracking-[0.4em] uppercase">
              Electrostatic Innovation
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            PURE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00BFFF] to-[#0080FF] drop-shadow-[0_0_20px_rgba(0,191,255,0.5)]">
              AUDIO.
            </span>
          </h1>

          <p className="mt-6 text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            Wir fertigen elektrostatische Lautsprecher nach Maß. Erleben Sie
            High-End Audiotechnik von{" "}
            <span className="inline-block mt-2 text-[#00BFFF] font-bold tracking-widest drop-shadow-[0_0_12px_rgba(0,191,255,0.8)] animate-pulse">
              SAMMAN & BOFFO
            </span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            {/* Primärer Button: Massive Cyan Glow */}
            <Button
              size="lg"
              className="group relative px-12 py-8 bg-[#00BFFF] text-black rounded-none border-none transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#00BFFF] active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 font-black tracking-[0.15em] text-[15px]">
                GET STARTED{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Button>

            {/* Sekundärer Button: Transparent Electric Border */}
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-8 border-2 border-[#00BFFF]/40 text-[#00BFFF] rounded-none bg-transparent hover:bg-[#00BFFF] hover:text-black transition-all duration-300 tracking-[0.15em] font-black text-[15px] hover:shadow-[0_0_20px_#00BFFF]"
            >
              CONTACT SALES
            </Button>
          </div>
        </div>
      </div>

      {/* Die "Elektro-Linie" am unteren Rand passend zum Header */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#00BFFF] to-transparent shadow-[0_0_20px_#00BFFF] opacity-50" />
    </section>
  );
}

export default Main;
