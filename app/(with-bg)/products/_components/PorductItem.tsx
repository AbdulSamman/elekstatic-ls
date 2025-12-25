"use client";

import Image from "next/image";
import { CiCircleList } from "react-icons/ci";
import { IProduct } from "../../../interfaces";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PorductItem({ filteredProducts }: any) {
  const { products } = useContext(AppContext);

  const listToRender = filteredProducts?.length ? filteredProducts : products;

  return (
    // <div className="grid max-[725px]:grid-cols-1 py-28 max-[1440px]:grid-cols-2 max-[1780px]:grid-cols-3 max-[3000px]:grid-cols-4 gap-4 place-items-center p-2  lg:w-[80%] lg:justify-self-center">
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

    <section id="produkte" className="bg-neutral-950/10">
      <div className="grid md:grid-cols-3 gap-10 ">
        {listToRender.map((product: IProduct) => (
          <Card
            key={product.documentId}
            className="bg-neutral-900/50 border-neutral-800 transition duration-500 hover:scale-105"
          >
            <CardContent className="product-6">
              <div className="h-40 rounded-lg mb-4">
                <Link
                  href={`/product-details/${product?.documentId}`}
                  className=" max-[725px]:w-full shadow-md"
                >
                  <div className="max-[725px]:w-full flex items-center justify-center group cursor-pointer">
                    <Image
                      src={product?.banner?.url || "/logo2.png"}
                      alt={product?.title || "bannerProducts"}
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "160px" }}
                      priority
                      className="object-cover  p-0.5 max-[605px]:w-full"
                    />
                  </div>
                </Link>
              </div>
              <h3 className="font-medium text-white">{product.title}</h3>
              <div className="text-sm text-neutral-400 mt-2">
                <div className="flex items-center justify-between italic w-full">
                  <h2 className="text-[14px] font-medium text-gray-400 flex gap-2 items-center">
                    <CiCircleList className="text-xl text-gray-600" />{" "}
                    {product.category}
                  </h2>
                  <h2 className="font-medium px-4">{product.price} €</h2>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                Konfigurieren
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default PorductItem;
