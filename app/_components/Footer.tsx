"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Copyright } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-black text-neutral-400 pt-24 overflow-hidden">
      {/* ELEKTROSTATISCHE TRENNLINIE OBEN (Statt grauer Linie) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00BFFF]/50 to-transparent shadow-[0_0_15px_rgba(0,191,255,0.3)]" />

      {/* Subtiler Glow Effekt im Hintergrund */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00BFFF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        <div className="flex flex-col xl:flex-row justify-between gap-16">
          {/* BRAND SECTION */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/" className="relative group">
                <div className="absolute -inset-1 bg-[#00BFFF]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <Image
                  alt="SnB Audio Logo"
                  src={"/logo3.png"}
                  width={60}
                  height={60}
                  className="relative w-14 h-14 object-contain animate-audio-glow"
                />
              </Link>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[0.2em] text-white">
                  SnB <span className="text-[#00BFFF]">AUDIO</span>
                </span>
                <span className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase font-bold">
                  Electrostatic Systems
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-500 font-light max-w-sm">
              Präzision in jedem Detail. Wir entwickeln und fertigen
              elektrostatische High-End Audiotechnik für höchste Ansprüche an
              Klang und Ästhetik. <br />
              <span className="text-white/60 font-medium mt-2 inline-block italic">
                Handgefertigt von SAMMAN & BOFFO.
              </span>
            </p>
          </div>

          {/* NAV LINKS SECTION */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-[2]">
            {["Solutions", "Technology", "Support", "Company"].map((title) => {
              const links = {
                Solutions: ["Custom Speakers", "Engineering", "Lab Series"],
                Technology: ["Electrostatics", "Acoustics", "Materials"],
                Support: ["Documentation", "Contact", "Showroom"],
                Company: ["About Us", "Manufaktur", "Partners"],
              }[title];

              return (
                <div key={title}>
                  <p className="text-white text-[11px] font-black tracking-[0.3em] uppercase mb-8 border-b border-[#00BFFF]/20 pb-2 inline-block relative group">
                    {title}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00BFFF] transition-all duration-500 group-hover:w-full shadow-[0_0_8px_#00BFFF]"></span>
                  </p>
                  <ul className="space-y-4 text-[13px] tracking-wider font-light">
                    {links?.map((link) => (
                      <li key={link}>
                        <Link
                          href="/"
                          className="hover:text-[#00BFFF] transition-all duration-300 hover:translate-x-1 inline-block"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM STRIPE */}
        <div className="mt-24 pt-10 relative">
          {/* Subtile Trennung unten */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-neutral-600 uppercase font-bold">
              <Copyright size={14} className="text-[#00BFFF]/50" />
              <span>2026 SAMMAN & BOFFO Electronics Inc.</span>
            </div>

            <div className="flex items-center space-x-8">
              {[
                { icon: <FaInstagram />, href: "/" },
                { icon: <FaXTwitter />, href: "/" },
                { icon: <FaTiktok />, href: "/" },
                { icon: <FaFacebook />, href: "/" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="text-neutral-600 hover:text-[#00BFFF] hover:scale-125 transition-all duration-500 text-xl drop-shadow-[0_0_10px_rgba(0,191,255,0)] hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
