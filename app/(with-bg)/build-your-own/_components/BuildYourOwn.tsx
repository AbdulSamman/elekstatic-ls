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
      setFeldMeldungMsg(
        "Please select at least one option before viewing the summary."
      );
      return;
    }

    const filledSelection = { ...selected };

    // sections.forEach((section) => {
    //   if (!filledSelection[section.id]) {
    //     filledSelection[section.id] = { label: "Black" };
    //   }
    // });
    sections.forEach((section: any) => {
      if (!filledSelection[section.id]) {
        // Prüfe, ob Section Farboptionen hat
        const hasColor = section.options?.some((opt: any) => opt.color);
        filledSelection[section.id] = {
          label: hasColor ? "Black" : "None",
          ...(hasColor ? { color: "#000000" } : {}), // nur Farbe hinzufügen, wenn Farboption
        };
      }
    });

    const queryString = new URLSearchParams({
      selected: JSON.stringify(filledSelection),
    }).toString();

    router.push(`/view-summary/${productDetails.documentId}?${queryString}`);
  };

  return (
    <div className="w-full divide-y divide-neutral-800 border border-neutral-800 rounded-xl shadow-lg bg-neutral-900/40 max-w-3xl">
      <span className="text-red-400 flex justify-center items-center h-6 text-sm p-4">
        {feldMeldungMsg}
      </span>

      <h2 className="p-5 text-2xl text-center font-semibold tracking-wide bg-neutral-900/50 text-neutral-200 border-b border-neutral-800">
        {productDetails.title}
      </h2>

      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const value = selected[section.id];

        return (
          <div key={section.id}>
            <button
              onClick={() => setOpenSection(section.id)}
              className="flex w-full items-center justify-between px-5 py-6 text-left hover:bg-neutral-800/40 transition cursor-pointer"
            >
              <span className="flex gap-3 items-center w-50">
                {isOpen ? (
                  <LuCircleMinus className="text-neutral-200 text-xl" />
                ) : (
                  <LuCirclePlus className="text-neutral-500 text-xl" />
                )}
                <span
                  className={`text-xl  ${
                    isOpen
                      ? "font-semibold text-neutral-100"
                      : "text-neutral-300"
                  }`}
                >
                  {section.title}
                </span>
              </span>

              <span className="text-md text-neutral-400 ">
                {value ? value.label : "Select"}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 flex flex-wrap gap-3 ">
                {section.options.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [section.id]: option,
                      }))
                    }
                    className={`relative flex h-10 min-w-10 items-center justify-center rounded-md text-sm border transition cursor-pointer
                      ${
                        value?.id === option.id
                          ? "border-neutral-200 ring-2 ring-neutral-200"
                          : "border-neutral-700 hover:border-neutral-500"
                      }`}
                    style={{
                      backgroundColor: option.color ?? "transparent",
                      color: option.color ? "transparent" : "inherit",
                    }}
                  >
                    <span className="p-2 text-neutral-400">
                      {!option.color && option.label}
                    </span>

                    {option.isNew && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-neutral-200 text-[10px] w-7 h-7 text-neutral-900 flex items-center justify-center font-semibold">
                        NEW
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="p-5">
        <button
          onClick={handleViewSummary}
          className="w-full py-3 text-lg font-semibold text-neutral-900 bg-neutral-400 hover:bg-neutral-200 transition flex items-center justify-center gap-2 rounded-md cursor-pointer"
        >
          <span>VIEW SUMMARY</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
