"use client";

import { useContext } from "react";
import { AppContext } from "../AppContext";
import Image from "next/image";

function ProductItem() {
  const { products } = useContext(AppContext);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center   gap-2 p-2">
      {products.map((product, i) => {
        console.log("test", product?.banner?.url);

        return (
          <div key={i} className="  flex justify-center items-center ">
            <div className="w-[400px] h-[500px] group block overflow-hidden hover:cursor-pointer">
              <Image
                src={product?.banner?.url || "/logo2.png"}
                alt={product.title || "bannerProducts"}
                width={200}
                height={200}
                priority
                className="object-contain w-full h-full transition duration-500 group-hover:scale-105 sm:h-[450px] rounded-t-lg"
              />
              <div className="flex items-center   justify-center">
                <h2>{product.title}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductItem;
