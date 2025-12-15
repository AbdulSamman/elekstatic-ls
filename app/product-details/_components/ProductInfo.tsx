import { Box } from "lucide-react";

function ProductInfo({ productDetails }: any) {
  return (
    <>
      {productDetails.title ? (
        <>
          <div className="flex flex-col gap-2 px-2  w-full md:w-150 pt-8">
            <h2 className="text-2xl">{productDetails?.title}</h2>
            <h2 className="text-[15px] text-gray-400 italic">
              {productDetails?.category}
            </h2>
            <h2 className="text-[16px] text-gray-400">
              {productDetails?.description?.[0]?.children?.[0]?.text}
            </h2>
            <span className="text-[32px] text-primary mt-3  ">
              € {productDetails?.price}
            </span>
          </div>
          <button className="flex items-center justify-center gap-2 border bg-yellow-600 hover:bg-amber-500 py-2 px-4 rounded-sm font-bold cursor-pointer">
            <Box /> <span>BUILD YOUR OWN</span>
          </button>
        </>
      ) : (
        <div className="w-full md:w-150 bg-slate-200 animate-pulse rounded-lg h-75 mt-2"></div>
      )}
    </>
  );
}

export default ProductInfo;
