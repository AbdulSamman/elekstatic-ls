function ProductInfo({ productDetails }: any) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <h2>{productDetails.title}</h2>
      <h2 className="text-[15px] text-gray-400">{productDetails.category}</h2>
      <h2 className="text-[15px] text-gray-400">
        {productDetails?.description?.[0]?.children?.[0]?.text}
      </h2>
    </div>
  );
}

export default ProductInfo;
