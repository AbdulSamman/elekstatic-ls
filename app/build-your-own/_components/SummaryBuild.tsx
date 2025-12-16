"use client";

import { useState } from "react";
import { ArrowRight, CircleMinus, CirclePlus } from "lucide-react";

type Option = {
  id: string;
  label: string;
  color?: string;
  isNew?: boolean;
};

type Section = {
  id: string;
  title: string;
  options: Option[];
};

const sections: Section[] = [
  {
    id: "cabinet",
    title: "Cabinet",
    options: [
      { id: "black", label: "Black", color: "#000000" },
      { id: "graphite", label: "Graphite", color: "#2b2b2b" },
      { id: "silver", label: "Silver", color: "#9ca3af" },
      {
        id: "parchment",
        label: "Parchment Gloss",
        color: "#f3f4f6",
        isNew: true,
      },
    ],
  },
  {
    id: "metal",
    title: "Metal Work",
    options: [
      { id: "black", label: "Black", color: "#000000" },
      { id: "graphite", label: "Graphite", color: "#9ca3af" },
    ],
  },
  {
    id: "lenses",
    title: "Lenses",
    options: [
      { id: "black", label: "Black", color: "#000000" },
      { id: "graphite", label: "Graphite", color: "#9ca3af" },
    ],
  },
  {
    id: "woofers",
    title: "Woofers",
    options: [
      { id: "black", label: "Black", color: "#000000" },
      { id: "graphite", label: "Graphite", color: "#9ca3af" },
      { id: "oxblood", label: "Oxblood", color: "#3c0e0e" },
      { id: "slateBlue", label: "Slate Blue", color: "#2e5875" },
    ],
  },
  {
    id: "grille",
    title: "Grille",
    options: [
      { id: "on", label: "Included" },
      { id: "off", label: "None" },
    ],
  },
];

export default function SummaryBuild({ productDetails }: any) {
  const [openSection, setOpenSection] = useState<string | null>("cabinet");
  const [selected, setSelected] = useState<Record<string, Option>>({});

  return (
    <div className="w-full divide-y shadow-xl">
      <h2 className="p-4 text-3xl text-center bg-slate-800 text-gray-300">
        {productDetails.title}
      </h2>
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const value = selected[section.id];

        return (
          <div key={section.id}>
            {/* Header */}
            <button
              onClick={() => setOpenSection(section.id)}
              className="flex w-full items-center justify-between px-4 py-6 text-left"
            >
              {!isOpen ? (
                <span className="flex gap-2 items-center justify-start w-50">
                  <CirclePlus className="text-green-400" />
                  <span className="font-medium text-2xl">{section.title}</span>
                </span>
              ) : (
                <span className="flex gap-2 items-center justify-start w-50">
                  <CircleMinus className="text-red-400" />{" "}
                  <span className="font-bold text-2xl">{section.title}</span>
                </span>
              )}

              <span className="text-sm text-gray-400">
                {value ? value.label : "Select"}
              </span>
            </button>

            {/* Content */}
            {isOpen && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-3">
                  {section.options.map((option) => (
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
                          value?.id === option.id
                            ? "scale-110 border-black ring-2 ring-black"
                            : "border-gray-300"
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
              </div>
            )}
          </div>
        );
      })}

      {/* Summary Button */}
      <div className="p-4">
        <button className="w-full bg-slate-600 py-3 text-xl font-semibold text-white flex items-center justify-center gap-2">
          <span>VIEW SUMMARY </span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
