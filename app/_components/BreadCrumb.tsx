"use client";

import Link from "next/link";
import { BreadCrumbProps } from "../interfaces";

const BreadCrumb = ({
  path,
  productName,
  buildYourOwnName,
}: BreadCrumbProps) => {
  const segments = path.split("/").filter(Boolean);
  const links: { name: string; href: string }[] = [];

  links.push({ name: "Home", href: "/" });
  links.push({ name: "Products", href: "/products" });

  if (segments[0] === "product-details") {
    links.push({ name: "Details", href: "/products" });
    links.push({
      name: productName || "Product",
      href: `/product-details/${segments[1]}`,
    });
  }

  // Nur hinzufügen, wenn der Pfad es enthält UND ein Name existiert (keine Punkte)
  if (
    segments.includes("build-your-own") &&
    buildYourOwnName &&
    buildYourOwnName !== "...."
  ) {
    links.push({
      name: buildYourOwnName,
      href: `/product-details/${segments[1]}/build-your-own`,
    });
  }

  if (
    segments.includes("view-summary") &&
    segments.includes("build-your-own")
  ) {
    links.push({
      name: "Summary",
      href: `/product-details/${segments[1]}/build-your-own/view-summary`,
    });
  }

  const clickableIndexes = [0, 1, 3];

  return (
    <nav aria-label="breadcrumb" className="flex px-4 pt-24 bg-black">
      <ul className="flex flex-wrap items-center gap-2">
        {links.map((link, index) => {
          const isLast = index === links.length - 1;

          return (
            <li key={index} className="relative flex items-center">
              {index !== 0 && (
                <span className="w-3 h-3 mx-2 bg-[#00BFFF]/20 [clip-path:polygon(0_0,0%_100%,100%_50%)]"></span>
              )}

              {clickableIndexes.includes(index) && !isLast ? (
                <Link
                  href={link.href}
                  className="flex items-center justify-center bg-neutral-950 border border-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 hover:text-[#00BFFF] transition-all"
                >
                  {link.name}
                </Link>
              ) : (
                <span
                  className={`flex items-center justify-center px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-nowrap
                  ${
                    isLast
                      ? "bg-black border border-[#00BFFF]/50 text-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.3)]"
                      : "bg-neutral-950 border border-white/5 text-neutral-600"
                  }`}
                >
                  {link.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
