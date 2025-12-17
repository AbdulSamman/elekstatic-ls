"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/app/interfaces";
import { FaArrowRight } from "react-icons/fa6";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";

export default function BuildYourOwn({ productDetails }: any) {
  const [sections, setSections] = useState<Section[]>([]);
  const [openSection, setOpenSection] = useState<string | null>("cabinet");
  const [selected, setSelected] = useState<Record<string, any>>({});
  const router = useRouter();
  const [feldMeldungMsg, setFeldMeldungMsg] = useState<string>("");
  useEffect(() => {
    const fetchSections = async () => {
      const res = await fetch("http://localhost:1337/api/buildsummaries");
      const json = await res.json();
      const data = json.data[0].options;
      setSections(data);
    };
    fetchSections();
  }, []);

  const handleViewSummary = () => {
    if (Object.keys(selected).length === 0) {
      setFeldMeldungMsg(
        `Please select at least one option before viewing the summary.`
      );
      return;
    }

    const filledSelection = { ...selected };

    sections.forEach((section) => {
      if (!filledSelection[section.id]) {
        filledSelection[section.id] = { label: "None" };
      }
    });

    const queryString = new URLSearchParams({
      selected: JSON.stringify(filledSelection),
    }).toString();
    router.push(`/view-summary/${productDetails.documentId}?${queryString}`);
  };
  return (
    <div className="w-full divide-y shadow-xl">
      <span className="text-red-500 border-none flex justify-center items-center h-6 mb-3 sm:mb-0">
        {feldMeldungMsg}
      </span>
      <h2 className="p-4 text-3xl text-center bg-slate-800 text-gray-300">
        {productDetails.title}
      </h2>

      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const value = selected[section.id];

        return (
          <div key={section.id}>
            <button
              onClick={() => setOpenSection(section.id)}
              className="flex w-full items-center justify-between px-4 py-6 text-left"
            >
              {!isOpen ? (
                <span className="flex gap-2 items-center justify-start w-50">
                  <LuCirclePlus className="text-red-400 text-2xl" />
                  <span className="font-medium text-2xl">{section.title}</span>
                </span>
              ) : (
                <span className="flex gap-2 items-center justify-start w-50">
                  <LuCircleMinus className="text-green-400 text-2xl" />
                  <span className="font-bold text-2xl">{section.title}</span>
                </span>
              )}

              <span className="text-sm text-gray-400 ">
                {value ? value.label : "Select"}
              </span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 flex flex-wrap gap-3">
                {section.options.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [section.id]: option,
                      }))
                    }
                    className={`relative flex h-10 min-w-10 items-center justify-center rounded text-sm transition
                      ${
                        value?.id === option.id &&
                        "scale-115 border-black ring-2 ring-black"
                      }`}
                    style={{
                      backgroundColor: option.color ?? "transparent",
                      color: option.color ? "transparent" : "inherit",
                    }}
                  >
                    {!option.color && option.label}
                    {option.isNew && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-[10px] w-8 h-8 text-white flex items-center justify-center">
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

      <div className="p-4">
        <button
          onClick={handleViewSummary}
          className="w-full bg-slate-600 py-3 text-xl font-semibold text-white flex items-center justify-center gap-2"
        >
          <span>VIEW SUMMARY</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
