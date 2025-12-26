"use client";

import { useEffect, useState } from "react";
import axiosClient from "../_utils/axiosClient";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
function Main() {
  // introVideo
  const [introVideoUrl, setintroVideoUrl] = useState<any>();
  useEffect(() => {
    const fetchIntroVideo = async () => {
      try {
        const _introVideo = (
          await axiosClient.get("/api/mediapoints?populate=*")
        ).data;

        // Prüfe das Feldnamen
        const firstItem = _introVideo.data[0];

        // Video-Feld: ggf. video, introVideo, file
        const videoField = firstItem.video || firstItem.introVideo;

        // Video URL extrahieren
        const url = videoField?.data?.attributes?.url || videoField?.url;

        if (!url) {
          console.warn("Keine Video URL gefunden!");
          return;
        }

        const fullUrl = url.startsWith("http")
          ? url
          : `${
              process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337"
            }${url}`;
        setintroVideoUrl(fullUrl);
      } catch (err) {
        console.error("Fehler beim Laden des Videos:", err);
      }
    };

    fetchIntroVideo();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-2 py-28 grid md:grid-cols-2 gap-16 items-center bg-neutral-950">
      <div className=" px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
          Elektrotechnische Produkte{" "}
          <span className="text-neutral-600">nach Maß</span>
        </h1>
        <p className="mt-6 text-neutral-300 max-w-xl">
          Individuelle Fertigung statt Online ‑ Checkout. Konfigurieren Sie
          Maße, Farben und Optionen – wir erstellen Ihr persönliches Angebot.
        </p>
        <div className="mt-10 flex gap-4 sm:gap-4 flex-wrap ">
          <Button
            size="lg"
            className="px-15 py-6 text-[18px] bg-neutral-100 text-black rounded-none w-full xl:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              GET STARTED <ChevronRight />
            </span>
          </Button>
          <Button
            size="lg"
            className=" text-neutral-100 px-15 py-6 text-xl rounded-none text-[18px] bg-transparent border border-white w-full xl:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              CONTACT SALES <ChevronRight />
            </span>
          </Button>
        </div>
      </div>
      <div className="bg-neutral-900 rounded-2xl h-80 flex items-center justify-center border border-neutral-800">
        <video
          src={introVideoUrl}
          autoPlay={true}
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-2xl"
          style={{
            filter:
              "grayscale(100%) brightness(50%) sepia(100%) hue-rotate(200deg) saturate(100%)",
          }}
        />
      </div>
    </section>
  );
}

export default Main;
