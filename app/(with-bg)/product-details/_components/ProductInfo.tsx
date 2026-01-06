import { FiBox } from "react-icons/fi";
import SkeletonEffectProductInfo from "./SkeletonEffectProductInfo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";

function ProductInfo({ productDetails }: any) {

  

    const { handleAddToCart } = useContext(AppContext);
  const [qty, setQty] = useState<Number>(1);

  const handleClickAddToCart = () => {
    handleAddToCart({
      ...productDetails,
      qty,
      selectedOptions: [], // keine Optionen, da Sofort-Lieferbar

   
    });
  };
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

            {productDetails.lieferStatus === "Vorbestellung" ? (

             <div className="flex flex-col items-start">
              < div className="flex items-center justify-start gap-2 pt-2">
               <div className="w-2 h-2 bg-red-800 rounded-full"></div>
              <span className="text-red-800 text-xs">Vorbestellung:</span>
              </div>
               <span className="text-red-800 text-xs py-2 px-4">Lieferzeit kann 14 bis 28 Arbeitstage dauern</span>
              </div>
            ):(
               
              < div className="flex items-center justify-start gap-2 pt-2">
               <div className="w-2 h-2 bg-green-800 rounded-full"></div>
              <span className="text-green-800 text-xs">Sofort Lieferbar</span>
              </div>

            )}

 

            <span className="text-3xl font-bold text-slate-500 mt-4">
              € {productDetails.price}
            </span>
          </div>
          
 
          {/* <Link
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
    </> */}

{productDetails.lieferStatus === "Sofort" ? (
            <Button
              
          size="lg"
            className=" text-neutral-100 px-15 py-6 text-xl rounded-none text-[18px] bg-transparent border border-white w-full xl:w-auto"
            onClick={handleClickAddToCart}
            >
              <FiBox className="text-xl" />
              <span>ADD TO CART</span>
            </Button>
          ) : (
            <Link
              href={`/build-your-own/${productDetails.documentId}`}
              className="flex items-center justify-center gap-3 border border-neutral-100 hover:border-gray-400 transition px-6 py-3 font-semibold tracking-wide mt-4 hover:bg-neutral-900/40"
            >
              <FiBox className="text-xl" />
              <span>BUILD YOUR OWN</span>
            </Link>
          )}
        </div>
      ) : (
        <SkeletonEffectProductInfo />
      )}
    </>
  );
}

export default ProductInfo;
