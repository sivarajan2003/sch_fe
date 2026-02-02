import { User } from "lucide-react";

export default function EarningsExpenses() {
  return (
    <div className="space-y-4">
      {/* TOTAL EARNINGS */}
      <div
        className="
          group bg-white rounded-xl border p-4
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-md
        "
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-xl font-semibold transition group-hover:scale-105">
              $64,522.24
            </p>
          </div>

          <div
            className="
              w-10 h-10 rounded-lg bg-blue-600
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:rotate-6
            "
          >
            <User className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* GRAPH */}
        <svg viewBox="0 0 300 80" className="w-full h-20 mt-2">
          {/* AREA */}
          <path
            d="M0 50 L40 40 L80 48 L120 35 L160 42 L200 30 L240 34 L280 36 L300 34 L300 80 L0 80 Z"
            fill="#EFF6FF"
            className="transition-opacity duration-300 group-hover:opacity-80"
          />

          {/* LINE */}
          <path
            d="M0 50 L40 40 L80 48 L120 35 L160 42 L200 30 L240 34 L280 36"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            className="graph-line-blue"
          />
        </svg>
      </div>

      {/* TOTAL EXPENSES */}
      <div
        className="
          group bg-white rounded-xl border p-4
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-md
        "
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-xl font-semibold transition group-hover:scale-105">
              $64,522.24
            </p>
          </div>

          <div
            className="
              w-10 h-10 rounded-lg bg-red-500
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:-rotate-6
            "
          >
            <User className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* GRAPH */}
        <svg viewBox="0 0 300 80" className="w-full h-20 mt-2">
          {/* AREA */}
          <path
            d="M0 45 L40 50 L80 55 L120 40 L160 48 L200 38 L240 50 L280 44 L300 46 L300 80 L0 80 Z"
            fill="#FEF2F2"
            className="transition-opacity duration-300 group-hover:opacity-80"
          />

          {/* LINE */}
          <path
            d="M0 45 L40 50 L80 55 L120 40 L160 48 L200 38 L240 50 L280 44"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            className="graph-line-red"
          />
        </svg>
      </div>

      {/* SVG LINE ANIMATION */}
      <style>{`
        .graph-line-blue,
        .graph-line-red {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: drawLine 1s ease-out forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
