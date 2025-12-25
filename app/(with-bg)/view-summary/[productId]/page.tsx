"use client";

import ProductBannerOwn from "../../build-your-own/_components/ProductBannerOwn";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import BreadCrumb from "../../../_components/BreadCrumb";
import { useParams, useSearchParams } from "next/navigation";

export default function ViewSummaryPage() {
  const { productDetails, getProductById, handleAddToCart }: any =
    useContext(AppContext);

  const { productId } = useParams<{ productId: string }>();
  const searchParams = useSearchParams();

  const selected = JSON.parse(searchParams.get("selected") || "{}");

  // calculate price
  const [qty, setQty] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  if (Object.keys(selected).length === 0) return <div>No selections made</div>;

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [productId]);

  useEffect(() => {
    if (!productDetails?.price) return;
    const _total = qty * productDetails.price;
    setTotal(_total);
  }, [qty, productDetails?.price]);

  const handleQtyChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 2 && value <= 10) {
      // maximal 2 Ziffern
      setQty(Number(value));
    }
  };

  return (
    <div className="px-4 py-28">
      {productDetails?.title && (
        <BreadCrumb
          path={`/product-details/${productId}/build-your-own/view-summary`}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <section className="w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-12 my-10">
          <div className="lg:w-1/3 flex justify-center">
            <ProductBannerOwn productDetails={productDetails} />
          </div>

          <div className="xl:w-2/3 w-full flex flex-col items-center">
            <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-neutral-200 mb-6 xl:w-2/3">
              Review Order
            </h1>

            <table className="xl:w-2/3 w-full border border-neutral-800 border-collapse table-fixed bg-neutral-900/40 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-neutral-800 text-neutral-300 text-sm font-semibold">
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-base"
                    colSpan={2}
                  >
                    Items
                  </th>
                  <th scope="col" className="px-4 py-4 text-center text-base">
                    Qty
                    <span className="block text-xs text-neutral-400">
                      (max. 10)
                    </span>
                  </th>
                  <th scope="col" className="px-4 py-4 text-center text-base">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-neutral-800 text-neutral-300">
                  {/* Items */}
                  <td colSpan={2} className="px-4 py-8 align-top">
                    <h2 className="text-xl font-medium mb-5 text-neutral-200">
                      {productDetails?.title}
                    </h2>

                    <div className="flex flex-col gap-3 py-2 w-full md:w-2/3">
                      {Object.keys(selected).map((section) => (
                        <div
                          key={section}
                          className="flex items-center justify-between font-medium capitalize"
                        >
                          <strong className="text-sm md:text-base text-neutral-400 w-40">
                            {section}:
                          </strong>
                          <span className="text-sm md:text-base text-neutral-200">
                            {selected[section].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Qty */}
                  <td className="py-8 align-top text-center">
                    <input
                      type="number"
                      maxLength={2}
                      min="1"
                      max="10"
                      value={qty}
                      onChange={(e) => handleQtyChange(e)}
                      className="w-20 bg-neutral-900 border border-neutral-700 px-2 py-1 text-center text-neutral-200 outline-none focus:border-neutral-400 rounded"
                    />
                  </td>

                  {/* Total */}
                  <td className="py-8 align-top text-center">
                    <input
                      type="text"
                      value={total.toLocaleString("de-DE")}
                      disabled
                      className="w-24 bg-neutral-900 border border-neutral-700 px-2 py-1 text-center text-neutral-300 rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="text-xs italic text-neutral-500 my-4 text-center">
              “Please contact your local dealer for pricing in your country”
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto px-4">
              <button className="bg-neutral-200 text-neutral-900 px-6 py-3 rounded-md font-semibold hover:bg-neutral-300 transition w-full md:w-auto">
                Print Summary
              </button>

              <button
                className="bg-neutral-800 text-neutral-200 px-6 py-3 rounded-md font-semibold hover:bg-neutral-700 transition w-full md:w-auto"
                onClick={() => handleAddToCart(productDetails)}
              >
                Add to Wish List
              </button>

              <button className="bg-neutral-200 text-neutral-900 px-6 py-3 rounded-md font-semibold hover:bg-neutral-300 transition w-full md:w-auto">
                Find Dealer →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
