"use client";

import { IProduct } from "../interfaces";

function ProductList({ products }: { products: IProduct[] }) {
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h4>{product.title} </h4>
            <span>{product.id}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
