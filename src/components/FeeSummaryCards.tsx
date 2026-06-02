//feesummarycards.tsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getFeeSummary } from "../service/feesummaryService";
export default function FeeSummaryCards() {
  const [summary, setSummary] = useState<any>(null);

useEffect(() => {
  loadSummary();
}, []);

const loadSummary = async () => {
  try {
    const res = await getFeeSummary();
    setSummary(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const cards = [
  {
    title: "Total Fees Collected",
    value: summary
      ? `₹${summary.totalFeesCollected}`
      : "No Fees Found",
    up: true,
    percent: summary
  ? `${summary.totalFeesCollectedPercent}%`
  : "0%",
  },
  {
    title: "Fine Collected till date",
    value: summary
      ? `₹${summary.fineCollected}`
      : "No Fees Found",
    down: true,
   percent: summary
    ? `${summary.fineCollectedPercent}%`
    : "0%",
  },
  {
    title: "Student Not Paid",
    value: summary
      ? summary.studentNotPaid
      : "No Fees Found",
    up: true,
     percent: summary
    ? `${summary.studentNotPaidPercent}%`
    : "0%",
  },
  {
    title: "Total Outstanding",
    value: summary
      ? `₹${summary.totalOutstanding}`
      : "No Fees Found",
    down: true,
     percent: summary
    ? `${summary.totalOutstandingPercent}%`
    : "0%",
  },
];

  return (
    <div className="flex flex-col gap-4 h-full">
      {cards.map((c, i) => (
        <div
          key={i}
          className="
            group bg-white border rounded-xl p-4
            flex justify-between items-center
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-md
            active:scale-[0.98]
          "
        >
          {/* LEFT */}
          <div>
            <p className="text-xs text-gray-500">{c.title}</p>
            <p
  className={`font-semibold transition group-hover:scale-105 ${
    c.value === "No Fees Found"
      ? "text-sm text-gray-500"
      : "text-lg"
  }`}
>
  {c.value}
</p>
          </div>

          {/* RIGHT BADGE */}
          <div
            className={`
              flex items-center gap-1 text-xs px-2 py-1 rounded-md
              transition-all duration-300
              group-hover:scale-110
              ${
                c.up
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }
            `}
          >
            {c.up && (
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            )}
            {c.down && (
              <ArrowDownRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition" />
            )}
            <span className="animate-pulseOnce">{c.percent}</span>
          </div>
        </div>
      ))}

      {/* ANIMATION */}
      <style>{`
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-pulseOnce {
          animation: pulseOnce 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
