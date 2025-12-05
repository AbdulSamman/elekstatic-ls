"use client";

import { IProduct } from "../interfaces";

interface ProductListProps {
  products: IProduct[];
}

function ProductList({ products }: ProductListProps) {
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
