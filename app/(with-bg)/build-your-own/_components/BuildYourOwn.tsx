// "use client";

// import { useRouter } from "next/navigation";
// import { FaArrowRight } from "react-icons/fa6";
// import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
// import { useContext, useState } from "react";
// import { AppContext } from "../../../AppContext";

// export default function BuildYourOwn({ productDetails }: any) {
//   const [openSection, setOpenSection] = useState<string | null>("cabinet");
//   const [selected, setSelected] = useState<Record<string, any>>({});
//   const router = useRouter();
//   const [feldMeldungMsg, setFeldMeldungMsg] = useState<string>("");

//   const { sections } = useContext(AppContext);

//   const handleViewSummary = () => {
//     if (Object.keys(selected).length === 0) {
//       setFeldMeldungMsg(
//         "Please select at least one option before viewing the summary."
//       );
//       return;
//     }

//     const filledSelection = { ...selected };

//     // sections.forEach((section) => {
//     //   if (!filledSelection[section.id]) {
//     //     filledSelection[section.id] = { label: "Black" };
//     //   }
//     // });
//     sections.forEach((section: any) => {
//       if (!filledSelection[section.id]) {
//         // Prüfe, ob Section Farboptionen hat
//         const hasColor = section.options?.some((opt: any) => opt.color);
//         filledSelection[section.id] = {
//           label: hasColor ? "Black" : "None",
//           ...(hasColor ? { color: "#000000" } : {}), // nur Farbe hinzufügen, wenn Farboption
//         };
//       }
//     });

//     const queryString = new URLSearchParams({
//       selected: JSON.stringify(filledSelection),
//     }).toString();

//     router.push(`/view-summary/${productDetails.documentId}?${queryString}`);
//   };

//   return (
//     <div className="w-full divide-y divide-neutral-800 border border-neutral-800 rounded-xl shadow-lg bg-neutral-900/40 max-w-3xl">
//       <span className="text-red-400 flex justify-center items-center h-6 text-sm p-4">
//         {feldMeldungMsg}
//       </span>

//       <h2 className="p-5 text-2xl text-center font-semibold tracking-wide bg-neutral-900/50 text-neutral-200 border-b border-neutral-800">
//         {productDetails.title}
//       </h2>

//       {sections.map((section) => {
//         const isOpen = openSection === section.id;
//         const value = selected[section.id];

//         return (
//           <div key={section.id}>
//             <button
//               onClick={() => setOpenSection(section.id)}
//               className="flex w-full items-center justify-between px-5 py-6 text-left hover:bg-neutral-800/40 transition cursor-pointer"
//             >
//               <span className="flex gap-3 items-center w-50">
//                 {isOpen ? (
//                   <LuCircleMinus className="text-neutral-200 text-xl" />
//                 ) : (
//                   <LuCirclePlus className="text-neutral-500 text-xl" />
//                 )}
//                 <span
//                   className={`text-xl  ${
//                     isOpen
//                       ? "font-semibold text-neutral-100"
//                       : "text-neutral-300"
//                   }`}
//                 >
//                   {section.title}
//                 </span>
//               </span>

//               <span className="text-md text-neutral-400 ">
//                 {value ? value.label : "Select"}
//               </span>
//             </button>

//             {isOpen && (
//               <div className="px-5 pb-6 flex flex-wrap gap-3 ">
//                 {section.options.map((option: any) => (
//                   <button
//                     key={option.id}
//                     onClick={() =>
//                       setSelected((prev) => ({
//                         ...prev,
//                         [section.id]: option,
//                       }))
//                     }
//                     className={`relative flex h-10 min-w-10 items-center justify-center rounded-md text-sm border transition cursor-pointer
//                       ${
//                         value?.id === option.id
//                           ? "border-neutral-200 ring-2 ring-neutral-200"
//                           : "border-neutral-700 hover:border-neutral-500"
//                       }`}
//                     style={{
//                       backgroundColor: option.color ?? "transparent",
//                       color: option.color ? "transparent" : "inherit",
//                     }}
//                   >
//                     <span className="p-2 text-neutral-400">
//                       {!option.color && option.label}
//                     </span>

//                     {option.isNew && (
//                       <span className="absolute -top-2 -right-2 rounded-full bg-neutral-200 text-[10px] w-7 h-7 text-neutral-900 flex items-center justify-center font-semibold">
//                         NEW
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}

//       <div className="p-5">
//         <button
//           onClick={handleViewSummary}
//           className="w-full py-3 text-lg font-semibold text-neutral-900 bg-neutral-400 hover:bg-neutral-200 transition flex items-center justify-center gap-2 rounded-md cursor-pointer"
//         >
//           <span>VIEW SUMMARY</span>
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";

export default function BuildYourOwn({ productDetails }: any) {
  const [openSection, setOpenSection] = useState<string | null>("cabinet");
  const [selected, setSelected] = useState<Record<string, any>>({});
  const router = useRouter();
  const [feldMeldungMsg, setFeldMeldungMsg] = useState<string>("");

  const { sections } = useContext(AppContext);

  const handleViewSummary = () => {
    if (Object.keys(selected).length === 0) {
      setFeldMeldungMsg("Select at least one option to proceed.");
      return;
    }

    const filledSelection = { ...selected };
    sections.forEach((section: any) => {
      if (!filledSelection[section.id]) {
        const hasColor = section.options?.some((opt: any) => opt.color);
        filledSelection[section.id] = {
          label: hasColor ? "Black" : "None",
          ...(hasColor ? { color: "#000000" } : {}),
        };
      }
    });

    const queryString = new URLSearchParams({
      selected: JSON.stringify(filledSelection),
    }).toString();

    router.push(`/view-summary/${productDetails.documentId}?${queryString}`);
  };

  return (
    <div className="w-full bg-black border border-white/5 overflow-hidden shadow-2xl max-w-3xl">
      {/* ERROR MESSAGE STRIPE */}
      <div
        className={`h-8 flex items-center justify-center transition-all duration-300 ${feldMeldungMsg ? "bg-red-950/30" : "bg-transparent"}`}
      >
        <span className="text-red-500 text-[10px] font-black tracking-widest uppercase">
          {feldMeldungMsg}
        </span>
      </div>

      {/* HEADER: Technical Branding */}
      <div className="px-6 py-8 border-b border-white/5 bg-neutral-950 flex flex-col items-center">
        <span className="text-[#00BFFF] text-[9px] font-black tracking-[0.5em] uppercase mb-2">
          Configuration Mode
        </span>
        <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
          {productDetails.title}
        </h2>
      </div>

      <div className="divide-y divide-white/5">
        {sections.map((section: any) => {
          const isOpen = openSection === section.id;
          const value = selected[section.id];

          return (
            <div
              key={section.id}
              className={`transition-colors duration-500 ${isOpen ? "bg-neutral-900/20" : ""}`}
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between px-6 py-6 text-left group cursor-pointer"
              >
                <span className="flex gap-4 items-center">
                  {isOpen ? (
                    <LuCircleMinus className="text-[#00BFFF] text-xl transition-transform" />
                  ) : (
                    <LuCirclePlus className="text-neutral-700 text-xl group-hover:text-neutral-500 transition-colors" />
                  )}
                  <span
                    className={`text-[13px] font-black tracking-[0.2em] uppercase transition-colors ${isOpen ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}
                  >
                    {section.title}
                  </span>
                </span>

                <span
                  className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 border transition-all ${value ? "text-[#00BFFF] border-[#00BFFF]/30 bg-[#00BFFF]/5" : "text-neutral-700 border-transparent"}`}
                >
                  {value ? value.label : "Required"}
                </span>
              </button>

              {isOpen && (
                <div className="px-16 pb-8 flex flex-wrap gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                  {section.options.map((option: any) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setSelected((prev) => ({
                          ...prev,
                          [section.id]: option,
                        }))
                      }
                      className={`relative flex h-12 w-24 items-center justify-center transition-all duration-300 cursor-pointer border
          ${
            value?.id === option.id
              ? "border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.2)] bg-black"
              : "border-white/10 bg-neutral-950 hover:border-white/30"
          }`}
                      style={{
                        backgroundColor: option.color ?? "",
                      }}
                    >
                      {/* Text nur anzeigen, wenn KEINE Farbe gesetzt ist */}
                      {!option.color && (
                        <span className="px-2 text-[10px] font-black tracking-widest uppercase text-neutral-400 text-center leading-tight">
                          {option.label}
                        </span>
                      )}

                      {/* Falls es eine Farbe ist, ein kleiner Indikator-Punkt beim Hover/Selection */}
                      {option.color && value?.id === option.id && (
                        <div className="absolute inset-0 border-2 border-[#00BFFF] z-10"></div>
                      )}

                      {option.isNew && (
                        <span className="absolute -top-2 -right-2 bg-[#00BFFF] text-[7px] px-1.5 py-0.5 text-black font-black tracking-tighter z-20">
                          NEW
                        </span>
                      )}

                      {/* ACTIVE INDICATOR LINE */}
                      {value?.id === option.id && (
                        <div className="absolute inset-x-0 -bottom-px h-0.5 bg-[#00BFFF] z-20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION */}
      <div className="p-8 bg-neutral-950 border-t border-white/5">
        <button
          onClick={handleViewSummary}
          className="group relative w-full py-5 bg-transparent border border-[#00BFFF]/50 flex items-center justify-center gap-4 transition-all duration-500 hover:border-[#00BFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.15)] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#00BFFF]/5 group-hover:bg-[#00BFFF]/10 transition-colors" />
          <span className="text-[12px] font-black tracking-[0.4em] text-white relative z-10">
            VIEW SUMMARY
          </span>
          <FaArrowRight className="text-[#00BFFF] group-hover:translate-x-2 transition-transform relative z-10" />
        </button>
      </div>
    </div>
  );
}
