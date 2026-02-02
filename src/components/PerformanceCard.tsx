import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

/* ================= PERFORMANCE DATA ================= */

const performanceData: Record<
  string,
  {
    top: number;
    average: number;
    below: number;
    percent: number;
  }
> = {
  "Class I": { top: 40, average: 15, below: 5, percent: 88 },
  "Class II": { top: 45, average: 11, below: 2, percent: 95 },
  "Class III": { top: 38, average: 18, below: 6, percent: 84 },
  "Class IV": { top: 42, average: 14, below: 4, percent: 90 },
  "Class V": { top: 47, average: 10, below: 3, percent: 96 },
  "Class VI": { top: 35, average: 20, below: 7, percent: 80 },
  "Class VII": { top: 44, average: 12, below: 4, percent: 92 },
  "Class VIII": { top: 39, average: 17, below: 6, percent: 86 },
  "Class IX": { top: 41, average: 15, below: 5, percent: 89 },
  "Class X": { top: 46, average: 9, below: 3, percent: 97 },
};

export default function PerformanceCard() {
  const [selectedClass, setSelectedClass] = useState("Class II");

  const data = performanceData[selectedClass];

  const blue = data.percent;
  const yellow = Math.max(100 - blue - 5, 0);
  const red = 5;

  return (
    <div className="bg-white rounded-xl border p-5 transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Performance
        </h3>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm text-gray-600 cursor-pointer"
        >
          {Object.keys(performanceData).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-5">
        {/* LEFT STATS */}
        <div className="space-y-9">
          {/* TOP */}
          <div
            className="
              group flex items-center gap-3 border border-dashed rounded-lg px-4 py-2
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-sm cursor-pointer
            "
          >
            <ChevronUp className="w-4 h-4 text-blue-600 group-hover:animate-bounce" />
            <span className="text-sm text-gray-600 flex-1">
              Top
            </span>
            <span className="text-sm font-semibold">
              {data.top}
            </span>
          </div>

          {/* AVERAGE */}
          <div
            className="
              group flex items-center gap-3 border border-dashed rounded-lg px-4 py-2
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-sm cursor-pointer
            "
          >
            <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 transition" />
            <span className="text-sm text-gray-600 flex-1">
              Average
            </span>
            <span className="text-sm font-semibold">
              {data.average}
            </span>
          </div>

          {/* BELOW AVG */}
          <div
            className="
              group flex items-center gap-3 border border-dashed rounded-lg px-4 py-2
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-sm cursor-pointer
            "
          >
            <ChevronDown className="w-4 h-4 text-red-500 group-hover:animate-bounce" />
            <span className="text-sm text-gray-600 flex-1">
              Below Avg
            </span>
            <span className="text-sm font-semibold">
              {String(data.below).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT DONUT */}
        <div className="relative w-28 h-28 group cursor-pointer">
          <svg
            viewBox="0 0 36 36"
            className="
              w-full h-full
              transition-transform duration-700
              group-hover:rotate-90 group-hover:scale-105
            "
          >
            {/* BLUE */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeDasharray={`${blue}, 100`}
              className="transition-all duration-700"
            />

            {/* YELLOW */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FACC15"
              strokeWidth="3.5"
              strokeDasharray={`${yellow}, 100`}
              strokeDashoffset={`-${blue}`}
              className="transition-all duration-700"
            />

            {/* RED */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3.5"
              strokeDasharray={`${red}, 100`}
              strokeDashoffset={`-${blue + yellow}`}
              className="transition-all duration-700"
            />
          </svg>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold group-hover:scale-110 transition">
              {data.percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
