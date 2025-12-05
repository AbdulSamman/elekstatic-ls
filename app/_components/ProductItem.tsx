"use client";

import { useContext } from "react";
import { AppContext } from "../AppContext";
import Image from "next/image";

function ProductItem() {
  const { products } = useContext(AppContext);
  return (
    <div>
      {products.map((product, i) => {
        console.log("test", product?.banner?.url);

        return (
          <div key={i}>
            <Image
              src={product?.banner?.url || "/logo2.png"}
              alt={product.title || "bannerProducts"}
              width={200}
              height={200}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductItem;
