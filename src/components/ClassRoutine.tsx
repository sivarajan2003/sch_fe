import { Plus, X } from "lucide-react";
import { useState } from "react";
import A8 from "../assets/a8.png";
import A9 from "../assets/a9.png";
import A10 from "../assets/a10.png";

type Routine = {
  month: string;
  progress: number;
  color: string;
  img: string;
};

const initialRoutines: Routine[] = [
  { month: "Jan 2025", progress: 70, color: "bg-blue-500", img: A8 },
  { month: "Feb 2025", progress: 55, color: "bg-yellow-500", img: A9 },
  { month: "Mar 2025", progress: 85, color: "bg-green-500", img: A10 },
];

export default function ClassRoutine() {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);
  const [open, setOpen] = useState(false);

  const [month, setMonth] = useState("");
  const [progress, setProgress] = useState(50);
  const [color, setColor] = useState("bg-blue-500");

  const handleAdd = () => {
    if (!month) return;

    setRoutines([
      ...routines,
      {
        month,
        progress,
        color,
        img: A8,
      },
    ]);

    setMonth("");
    setProgress(50);
    setColor("bg-blue-500");
    setOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 relative transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Class Routine</h3>

        <button
          onClick={() => setOpen(true)}
          className="
            flex items-center gap-1 text-sm text-blue-600
            transition hover:underline hover:scale-105 active:scale-95
          "
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {routines.map((item, index) => (
          <div
            key={index}
            className="
              group flex items-center gap-3
              transition-all duration-300
              hover:translate-x-1 hover:bg-gray-50 p-2 rounded-lg
            "
          >
            <img
              src={item.img}
              alt={item.month}
              className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition"
            />

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">
                {item.month}
              </p>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`
                    h-2 rounded-full ${item.color}
                    transition-all duration-700 ease-out
                  `}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW MODAL */}
      {open && (
        <div
          className="
            absolute inset-0 bg-black/30
            flex items-center justify-center z-50
            animate-fadeIn
          "
        >
          <div
            className="
              bg-white rounded-xl w-80 p-5
              animate-scaleIn
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Add Routine</h4>
              <button
                onClick={() => setOpen(false)}
                className="hover:rotate-90 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* MONTH */}
            <input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Month (e.g. Apr 2025)"
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* PROGRESS */}
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Progress %"
            />

            {/* COLOR */}
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="bg-blue-500">Blue</option>
              <option value="bg-green-500">Green</option>
              <option value="bg-yellow-500">Yellow</option>
              <option value="bg-red-500">Red</option>
            </select>

            <button
              onClick={handleAdd}
              className="
                w-full bg-blue-600 text-white py-2 rounded-lg text-sm
                transition hover:bg-blue-700 active:scale-95
              "
            >
              Add Routine
            </button>
          </div>
        </div>
      )}

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
