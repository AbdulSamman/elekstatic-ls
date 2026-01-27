"use client";

import Link from "next/link";

import { BreadCrumbProps } from "../interfaces";
import { ChevronRight } from "lucide-react";

const BreadCrumb = ({
  path,
  productName,
  buildYourOwnName,
}: BreadCrumbProps) => {
  const segments = path.split("/").filter(Boolean);

  const links: { name: string; href: string; useBack?: boolean }[] = [];

  // home
  links.push({ name: "Home", href: "/" });

  //products
  links.push({
    name: "Products",
    href: "/products",
  });

  // product details
  if (segments[0] === "product-details") {
    links.push({ name: "Details", href: "#" });
    links.push({
      name: productName,
      href: `/product-details/${segments[1]}`,
      useBack: true,
    });
  }

  // Build Your Own kommt nur, wenn es in der URL ist
  if (segments.includes("build-your-own")) {
    links.push({
      name: buildYourOwnName || "Build Your Own",
      href: `/product-details/${segments[1]}/build-your-own`,
    });
  }

  // View Summary kommt nur, wenn es in der URL ist UND Build Your Own davor existiert
  if (segments.includes("view-summary")) {
    links.push({
      name: "View Summary",
      href: `/product-details/${segments[1]}/build-your-own/view-summary`,
    });
  }
  const clickableIndexes = [0, 1, 3]; // 0 = Home, 2 = Product Title
  return (
    <nav aria-label="breadcrumb" className="flex px-1 pt-24">
      <ul className="flex flex-wrap items-center gap-2">
        {links.map((link, index) => (
          <li key={index} className="flex items-center gap-2">
            {/* Trenner: Jetzt ein dezenter Chevron statt des klobigen grauen Polygons */}
            {index !== 0 && (
              <ChevronRight size={14} className="text-neutral-700" />
            )}

            <div className="relative group">
              {/* Leuchteffekt beim Hover für klickbare Elemente */}
              {clickableIndexes.includes(index) && (
                <div className="absolute -inset-1 bg-[#00BFFF]/10 blur opacity-0 group-hover:opacity-100 transition duration-500 rounded-sm"></div>
              )}

              {clickableIndexes.includes(index) ? (
                <Link
                  href={link.href}
                  className="relative flex items-center justify-center border border-white/5 bg-neutral-950 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 transition-all duration-300 hover:border-[#00BFFF]/50 hover:text-white"
                >
                  {link.name}
                </Link>
              ) : (
                <span className="relative flex items-center justify-center border border-white/5 bg-black/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.1)]">
                  {link.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
