import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FeeSummaryCards() {
  const cards = [
    { title: "Total Fees Collected", value: "₹25,000.02", up: true, percent: "1.2%" },
    { title: "Fine Collected till date", value: "₹456.64", down: true, percent: "1.5%" },
    { title: "Student Not Paid", value: "545", up: true, percent: "1.5%" },
    { title: "Total Outstanding", value: "₹456.64", down: true, percent: "1.5%" },
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
            <p className="text-lg font-semibold transition group-hover:scale-105">
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
