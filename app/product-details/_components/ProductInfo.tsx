import { FiBox } from "react-icons/fi";
import SkeletonEffectProductInfo from "./SkeletonEffectProductInfo";
import Link from "next/link";

function ProductInfo({ productDetails }: any) {
  return (
    <>
      {productDetails.title ? (
        <div className="flex flex-col gap-4 items-center">
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

          <Link
            href={`/build-your-own/${productDetails.documentId}`}
            className="flex items-center justify-center gap-2 border  py-3 px-5 rounded-sm font-bold mt-4"
          >
            <FiBox className="text-2xl" /> <span>BUILD YOUR OWN</span>
          </Link>
        </div>
      ) : (
        <SkeletonEffectProductInfo />
      )}
    </>
  );
}

export default ProductInfo;
