import { Calendar } from "lucide-react";
import { useState } from "react";

const data = [
  { label: "Q1: 2022", total: 48, collected: 38 },
  { label: "Q2: 2022", total: 52, collected: 41 },
  { label: "Q3: 2022", total: 50, collected: 39 },
  { label: "Q4: 2022", total: 54, collected: 42 },

  { label: "Q1: 2023", total: 55, collected: 43 },
  { label: "Q2: 2023", total: 62, collected: 49 },
  { label: "Q3: 2023", total: 60, collected: 47 },
  { label: "Q4: 2023", total: 63, collected: 50 },

  { label: "Q1: 2024", total: 58, collected: 46 },
  { label: "Q2: 2024", total: 50, collected: 41 },
];

const MAX_VALUE = 70;
const CHART_HEIGHT = 220;

export default function FeeCollectionChart() {
  const [showLast8, setShowLast8] = useState(false);

  const visibleData = showLast8 ? data.slice(-8) : data;

  return (
    <div className="bg-white rounded-xl border border-gray-200 transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Fees Collection
        </h3>

        <button
          onClick={() => setShowLast8((prev) => !prev)}
          className="
            flex items-center gap-2 px-4 py-2 border rounded-md
            text-sm text-gray-700
            transition-all duration-300
            hover:bg-gray-50 hover:scale-105
            active:scale-95
          "
        >
          <Calendar className="w-4 h-4" />
          {showLast8 ? "All Quarters" : "Last 8 Quarter"}
        </button>
      </div>

      {/* LEGEND */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
          Total Fee
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          Collected Fee
        </div>
      </div>

      {/* CHART */}
      <div className="px-4 sm:px-6 pb-6 flex overflow-x-auto">
        {/* Y AXIS */}
        <div
  className="hidden sm:flex flex-col justify-between pr-4 text-xs text-gray-500"
  style={{ height: CHART_HEIGHT }}
>
          <span>60L</span>
          <span>50L</span>
          <span>40L</span>
          <span>30L</span>
          <span>20L</span>
          <span>10L</span>
          <span>0</span>
        </div>

        {/* BARS */}
        <div
  className="flex min-w-max items-end gap-4 sm:gap-6"
  style={{ height: CHART_HEIGHT }}
>
          {visibleData.map((item, index) => {
            const totalHeight =
              (item.total / MAX_VALUE) * CHART_HEIGHT;
            const collectedHeight =
              (item.collected / MAX_VALUE) * CHART_HEIGHT;

            return (
              <div
                key={index}
                className="
                group flex flex-col items-center min-w-[48px] sm:min-w-[56px]                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                {/* BAR */}
                <div className="relative w-6 sm:w-8 md:w-10 h-full flex items-end justify-center">
                  {/* Total Fee */}
                  <div
                    className="
                      absolute bottom-0 w-full bg-gray-200 rounded-md
                      transition-all duration-700 ease-out
                      group-hover:bg-gray-300
                    "
                    style={{ height: totalHeight }}
                  />

                  {/* Collected Fee */}
                  <div
                    className="
                    relative w-4 sm:w-6 bg-blue-600 rounded-md transition-all duration-700 ease-out
                      group-hover:scale-x-110
                    "
                    style={{ height: collectedHeight }}
                  />
                </div>

                {/* LABEL */}
                <span className="mt-2 text-[10px] sm:text-xs text-gray-500 text-center whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
