import { CalendarDays } from "lucide-react";

const subjects = [
  { name: "Mat", score: 100, tag: "bg-blue-100 text-blue-600" },
  { name: "Phy", score: 92, tag: "bg-green-100 text-green-600", active: true },
  { name: "Che", score: 90, tag: "bg-yellow-100 text-yellow-600" },
  { name: "Eng", score: 80, tag: "bg-red-100 text-red-500" },
  { name: "Sci", score: 75, tag: "bg-gray-100 text-gray-600" },
];

export default function ExamResultCard() {
  return (
    <div className="bg-white rounded-xl border p-5">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">Exam Result</h3>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="w-4 h-4" />
          1st Quarter
        </span>
      </div>

      {/* SUBJECT TAGS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {subjects.map((s) => (
          <span
            key={s.name}
            className={`px-3 py-1 text-xs rounded-md font-medium ${s.tag}`}
          >
            {s.name} : {s.score}
          </span>
        ))}
      </div>
{/* BAR GRAPH */}
<div className="flex items-end justify-between h-44 px-2">
  {subjects.map((s) => (
    <div key={s.name} className="flex flex-col items-center gap-2">

      {/* BAR TRACK */}
      <div className="w-8 h-36 bg-gray-200 rounded-md flex items-end">
        
        {/* BAR FILL */}
        <div
          className={`w-full transition-all
            ${s.active ? "bg-blue-600" : "bg-gray-300"}`}
          style={{ height: `${s.score}%` }}
        />
      </div>

      {/* LABEL */}
      <span className="text-xs text-gray-500">{s.name}</span>
    </div>
  ))}


      </div>
    </div>
  );
}
