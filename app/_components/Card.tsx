import { CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Card as UiCard } from "@/components/ui/card";

function Card() {
  return (
    <section className="bg-black py-32 relative overflow-hidden">
      {/* Subtiler Hintergrund-Glow für die gesamte Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#00BFFF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
        {[
          {
            title: "Individuelle Maße",
            desc: "Präzisionsfertigung nach Ihren räumlichen Anforderungen.",
          },
          {
            title: "Flexible Farbwahl",
            desc: "Ästhetik ohne Kompromisse. Wählen Sie aus unserem exklusiven Farbspektrum.",
          },
          {
            title: "Direkter Kontakt",
            desc: "Persönliche Beratung durch die Gründer SAMMAN & BOFFO.",
          },
        ].map((item, index) => (
          <UiCard
            key={index}
            className="group bg-neutral-950/50 border-white/5 hover:border-[#00BFFF]/40 transition-all duration-500 rounded-none relative overflow-hidden"
          >
            {/* Hover-Effekt: Ein blauer Strahl oben am Rand der Card */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00BFFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="p-10">
              <div className="flex items-center gap-5 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/20 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all">
                  <Check className="text-[#00BFFF] w-5 h-5" />
                </div>
                <h3 className="font-bold text-[13px] tracking-[0.2em] uppercase text-white group-hover:text-[#00BFFF] transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                {item.desc}
              </p>

              {/* Dekoratives Element: Kleine Tech-Nummerierung */}
              <div className="mt-8 text-[10px] font-mono text-neutral-800 tracking-tighter">
                MODULE_0{index + 1} // SNB_TECH
              </div>
            </CardContent>
          </UiCard>
        ))}
      </div>
    </section>
  );
}

export default Card;
