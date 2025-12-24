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
    // <div className="grid max-[725px]:grid-cols-1 max-[1440px]:grid-cols-2 max-[1780px]:grid-cols-3 max-[3000px]:grid-cols-4 gap-4 place-items-center p-2  lg:w-[80%] lg:justify-self-center">
    //   {listToRender?.map((product: IProduct) => {
    //     return (
    //       <div
    //         className="flex flex-col justify-center items-center w-87.5 max-[725px]:w-full gap-2"
    //         key={product?.id}
    //       >
    //         <Link
    //           href={`/product-details/${product?.documentId}`}
    //           className=" w-87.5 max-[725px]:w-full shadow-md"
    //         >
    //           <div className="h-87.5 max-[725px]:w-full flex items-center justify-center group cursor-pointer">
    //             <Image
    //               src={product?.banner?.url || "/logo2.png"}
    //               alt={product?.title || "bannerProducts"}
    //               width={100}
    //               height={100}
    //               style={{ width: "auto", height: "340px" }}
    //               priority
    //               className="object-contain transition duration-500 group-hover:scale-110 p-0.5 max-[605px]:w-full"
    //             />
    //           </div>
    //         </Link>

    //         <div className="flex flex-col w-full items-start justify-center h-25 p-3 gap-2 max-[605px]:w-full shadow-md rounded-b-lg">
    //           <h2 className="text-[16px] font-bold">{product.title}</h2>
    //           <div className="flex items-center justify-between italic w-full">
    //             <h2 className="text-[14px] font-medium text-gray-400 flex gap-2 items-center">
    //               <CiCircleList className="text-xl text-gray-600" />{" "}
    //               {product.category}
    //             </h2>
    //             <h2 className="font-medium px-4">{product.price} €</h2>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>

    <section
      id="produkte"
      className="max-w-7xl mx-auto px-4 py-28 bg-neutral-950/70"
    >
      <h2 className="text-2xl font-semibold my-12 text-neutral-300 ">
        FRONT PANEL MARKINGS
      </h2>
      <div className="grid md:grid-cols-3 gap-10 px-4 ">
        {sectionImages.map((sectionImage) => {
          return (
            <Card
              key={sectionImage?.documentId}
              className="bg-neutral-900 border-neutral-800"
            >
              <CardContent className="p-4 flex flex-col justify-self-center gap-2">
                <div className="h-40 flex items-center justify-center group rounded-lg">
                  <Image
                    src={sectionImage?.banner?.url || "/logo2.png"}
                    alt="sectionImage"
                    width={390}
                    height={160}
                    style={{ width: "345px", height: "180px" }}
                    priority
                    className="object-containt transition duration-500 group-hover:scale-105 p-0.5 max-[605px]:w-full rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-white mt-6">
                  {sectionImage.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-1 h-15">
                  {sectionImage.description?.map((descItem: any) =>
                    descItem.children?.map((child: any) => child.text).join(" ")
                  )}
                </p>
                <Link
                  className="mt-4 w-full text-sm text-neutral-600 flex items-center justify-end"
                  href={`/products?category=${sectionImage.category}?populate=*`}
                >
                  Discover Now <ChevronsRight className="" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default SectionImages;
