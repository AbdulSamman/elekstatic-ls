"use client";

import Image from "next/image";
import { List } from "lucide-react";
import { IProduct } from "../interfaces";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../AppContext";

function ProductItem({ filteredProducts }: any) {
  const { products } = useContext(AppContext);

  // Wenn filteredProducts existiert → benutze sie
  // Wenn nicht → benutze alle products aus dem Context
  const listToRender = filteredProducts?.length ? filteredProducts : products;

  return (
    <div className="grid max-[725px]:grid-cols-1 max-[1070px]:grid-cols-2 max-[1430px]:grid-cols-3 max-[9999px]:grid-cols-4 gap-4 place-items-center p-2 ">
      {listToRender?.map((product: IProduct) => {
        return (
          <div
            className="flex flex-col justify-center items-center w-87.5 max-[725px]:w-full gap-2"
            key={product?.id}
          >
            <Link
              href={`/product-details/${product?.documentId}`}
              className=" w-87.5 max-[725px]:w-full shadow-md"
            >
              <div className="h-87.5 max-[725px]:w-full flex items-center justify-center group cursor-pointer">
                <Image
                  src={product?.banner?.url || "/logo2.png"}
                  alt={product?.title || "bannerProducts"}
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "340px" }}
                  priority
                  className="object-contain transition duration-500 group-hover:scale-110 p-0.5 max-[605px]:w-full"
                />
              </div>
            </Link>

            <div className="flex flex-col w-full items-start justify-center h-25 p-3 gap-2 max-[605px]:w-full shadow-md rounded-b-lg">
              <h2 className="text-[16px] font-bold">{product.title}</h2>
              <div className="flex items-center justify-between italic w-full">
                <h2 className="text-[14px] font-medium text-gray-400 flex gap-2 items-center">
                  <List className="w-7 h-5" /> {product.category}
                </h2>
                <h2 className="font-medium px-4">{product.price} €</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductItem;
