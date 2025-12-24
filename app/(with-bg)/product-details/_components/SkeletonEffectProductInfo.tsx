"use client";

const SkeletonEffectProductInfo = () => {
  return (
    <div className="p-2 flex flex-col gap-y-4 w-full md:w-115">
      <div className="h-7.5 w-50  bg-slate-200 animate-pulse rounded-lg "></div>
      <div className="h-5 w-25 bg-slate-200 animate-pulse rounded-lg "></div>
      <div className="h-5 w-50 mt-5 bg-slate-200 animate-pulse rounded-lg "></div>
      <div className="h-10 flex items-center gap-x-3 bg-slate-200 animate-pulse rounded-lg "></div>
      <div className="h-6.25 w-75 bg-slate-200 animate-pulse rounded-lg "></div>
      <div className="h-7.5 w-50 bg-slate-200 animate-pulse rounded-lg "></div>
    </div>
  );
};

export default SkeletonEffectProductInfo;
