// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { BreadCrumbProps } from "../interfaces";

// const BreadCrumb = ({
//   path,
//   productName,
//   buildYourOwnName,
// }: BreadCrumbProps) => {
//   const router = useRouter();
//   const segments = path.split("/").filter(Boolean);

//   const links: { name: string; href: string; useBack?: boolean }[] = [];

//   // home
//   links.push({ name: "Home", href: "/" });

//   // product details
//   if (segments[0] === "product-details") {
//     links.push({ name: "Product Details", href: "#" });
//     links.push({
//       name: productName,
//       href: `/product-details/${segments[1]}`,
//       useBack: true,
//     });
//   }

//   // Build Your Own kommt nur, wenn es in der URL ist
//   if (segments.includes("build-your-own")) {
//     links.push({
//       name: buildYourOwnName || "Build Your Own",
//       href: `/product-details/${segments[1]}/build-your-own`,
//     });
//   }

//   // View Summary kommt nur, wenn es in der URL ist UND Build Your Own davor existiert
//   if (segments.includes("view-summary")) {
//     links.push({
//       name: "View Summary",
//       href: `/product-details/${segments[1]}/build-your-own/view-summary`,
//     });
//   }
//   const clickableIndexes = [0, 2]; // 0 = Home, 2 = Product Title
//   return (
//     <nav aria-label="breadcrumb" className="flex w-full">
//       <ul className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-700">
//         {links.map((link, index) => (
//           <li key={index} className="relative flex items-center">
//             {index !== 0 && (
//               <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-200 [clip-path:polygon(0_0,0%_100%,100%_50%)] "></span>
//             )}
//             {clickableIndexes.includes(index) ? (
//               index === 0 ? (
//                 <Link
//                   href={link.href}
//                   className="flex h-10 items-center bg-white pe-3 ps-5 sm:pe-4 sm:ps-8 text-xs font-medium capitalize hover:text-gray-900"
//                 >
//                   {link.name}
//                 </Link>
//               ) : (
//                 <button
//                   onClick={() => router.back()}
//                   className="flex h-10 items-center bg-white pe-3 ps-5 sm:pe-4 sm:ps-8 text-xs font-medium capitalize hover:text-gray-900 cursor-pointer"
//                 >
//                   {link.name}
//                 </button>
//               )
//             ) : (
//               <span className="flex h-10 items-center bg-white pe-3 ps-5 sm:pe-4 sm:ps-8 text-xs font-medium capitalize">
//                 {link.name}
//               </span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default BreadCrumb;

"use client";

import Link from "next/link";

import { BreadCrumbProps } from "../interfaces";

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
    <nav aria-label="breadcrumb" className="flex px-1">
      <ul className="flex flex-wrap gap-1 text-neutral-400 px-1">
        {links.map((link, index) => (
          <li key={index} className="relative flex items-center ">
            {index !== 0 && (
              <span className="absolute inset-y-0 -start-px  w-4 bg-neutral-300 [clip-path:polygon(0_0,0%_100%,100%_50%)] rounded-2xl"></span>
            )}
            {clickableIndexes.includes(index) ? (
              <Link
                href={link.href}
                className="flex  items-center justify-center bg-neutral-900/50 px-6 py-2 text-xs font-medium capitalize hover:text-neutral-500 text-nowrap  rounded-xl"
              >
                {link.name}
              </Link>
            ) : (
              <span className="flex  items-center justify-center bg-neutral-900/50  px-6 py-2 text-xs font-medium capitalize text-nowrap hover:text-neutral-500  rounded-xl">
                {link.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
