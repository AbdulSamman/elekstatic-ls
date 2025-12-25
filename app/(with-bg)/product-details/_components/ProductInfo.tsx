import { FiBox } from "react-icons/fi";
import SkeletonEffectProductInfo from "./SkeletonEffectProductInfo";
import Link from "next/link";

function ProductInfo({ productDetails }: any) {
  return (
    <>
      {productDetails.title ? (
        <div className="flex flex-col gap-6 items-center text-center lg:text-left">
          <div className="flex flex-col gap-3 px-2 w-full md:w-150 pt-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              {productDetails.title}
            </h2>

            <h2 className="text-sm uppercase tracking-wider text-neutral-400">
              {productDetails.category}
            </h2>

            <p className="text-[15px] leading-relaxed text-neutral-300">
              {productDetails?.description?.[0]?.children?.[0]?.text}
            </p>

            <span className="text-3xl font-bold text-slate-500 mt-4">
              € {productDetails.price}
            </span>
          </div>

          <Link
            href={`/build-your-own/${productDetails.documentId}`}
            className="flex items-center justify-center gap-3 border border-neutral-100 hover:border-gray-400 transition px-6 py-3 font-semibold tracking-wide mt-4 hover:bg-neutral-900/40"
          >
            <FiBox className="text-xl" />
            <span>BUILD YOUR OWN</span>
          </Link>
        </div>
      ) : (
        <SkeletonEffectProductInfo />
      )}
    </>
  );
}

export default ProductInfo;
