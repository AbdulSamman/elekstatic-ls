"use client";

import Link from "next/link";

interface BreadCrumbProps {
  path: string; // aktuelle URL
  productName: string; // Name des Produkts
  buildYourOwnName?: string; // optionaler Name bei Build Your Own
}

const BreadCrumb = ({
  path,
  productName,
  buildYourOwnName,
}: BreadCrumbProps) => {
  const segments = path.split("/").filter(Boolean);

  const links: { name: string; href: string }[] = [];

  // Immer Home
  links.push({ name: "Home", href: "/" });

  // Product Details
  if (segments.includes("product-details")) {
    links.push({ name: "Product Details", href: "#" });
    links.push({ name: productName, href: `/product-details/${segments[1]}` });
  }

  // Build Your Own, falls in der URL
  if (segments.includes("build-your-own")) {
    const href = `/build-your-own/${segments[segments.length - 1]}`;
    links.push({ name: buildYourOwnName || "Build Your Own", href });
  }

  return (
    <nav aria-label="breadcrumb" className="flex">
      <ul className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        {links.map((link, index) => (
          <li key={index} className="relative flex items-center">
            {index !== 0 && (
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:polygon(0_0,0%_100%,100%_50%)]"></span>
            )}
            {index === links.length - 1 ? (
              <span className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium capitalize">
                {link.name}
              </span>
            ) : (
              <Link
                href={link.href}
                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium capitalize hover:text-gray-900"
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
