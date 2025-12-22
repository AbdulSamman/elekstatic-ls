"use client";

import ProductBannerOwn from "../../build-your-own/_components/ProductBannerOwn";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import BreadCrumb from "../../_components/BreadCrumb";
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
    <div className="py-10 px-2">
      {productDetails?.title && (
        <BreadCrumb
          path={`/product-details/${productId}/build-your-own/view-summary`}
          productName={productDetails.title}
          buildYourOwnName="Build Your Own"
        />
      )}

      <section className="w-full py-10">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-around my-10">
          <div className="lg:w-1/3 flex justify-center my-10">
            <ProductBannerOwn productDetails={productDetails} />
          </div>

          <div className="xl:w-2/3 w-full flex flex-col items-center">
            <h1 className="text-center text-4xl font-serif text-slate-600 mb-2 xl:w-2/3 ">
              Review Order
            </h1>
            <table className="xl:w-2/3 w-full border border-gray-200 border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm font-semibold">
                  <th
                    scope="col"
                    className="px-4 py-3 text-lg text-left "
                    colSpan={2}
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-lg text-center flex flex-col"
                  >
                    Qty <span className="text-xs">(max. 10)</span>
                  </th>
                  <th scope="col" className="px-4 py-3 text-lg text-center">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-gray-200">
                  {/* Items */}
                  <td colSpan={2} className="px-2 py-6 align-top">
                    <h2 className="text-xl font-medium mb-4 text-gray-600">
                      {productDetails?.title}
                    </h2>

                    <div className="text-font text-gray-600 flex flex-col gap-2 py-2  w-2/3">
                      {Object.keys(selected).map((section) => (
                        <div
                          key={section}
                          className="flex items-center justify-between font-medium capitalize"
                        >
                          <strong className="text-lg w-40 ">{section}:</strong>
                          <span className="text-lg ml-2">
                            {selected[section].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Qty */}
                  <td className="py-6 align-top text-center">
                    <input
                      type="number"
                      maxLength={2}
                      min="1"
                      max="10"
                      value={qty}
                      onChange={(e) => handleQtyChange(e)}
                      className="w-20 border border-gray-300 px-2 py-1 outline-none text-gray-800"
                    />
                  </td>

                  {/* Total */}
                  <td className="py-6 align-top text-center">
                    <input
                      type="text"
                      value={total.toLocaleString("de-DE")}
                      disabled
                      className="w-20 border border-gray-300 px-2 py-1 outline-none text-gray-800"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm italic text-gray-500 my-2">
              “Please contact your local dealer for pricing in your country”
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-4 w-full md:w-auto px-4">
              <button className="bg-slate-600 text-white px-6 py-3 rounded w-full md:w-auto cursor-pointer">
                Print Summary
              </button>
              <button
                className="bg-gray-800 text-white px-6 py-3 rounded w-full md:w-auto cursor-pointer"
                onClick={() => handleAddToCart(productDetails)}
              >
                Add to Wish List
              </button>
              <button className="bg-slate-500 text-white px-6 py-3 rounded w-full md:w-auto cursor-pointer">
                Find Dealer →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
