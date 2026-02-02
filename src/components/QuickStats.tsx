import { useState } from "react";


export default function QuickStats() {
  const [activeTab, setActiveTab] = useState("Students");

  const data = {
    present: 3610,
    absent: 44,
    emergency: 28,
    late: 1,
  };

  const total = data.present + data.absent + data.late;

  const presentPct = (data.present / total) * 100;
  const absentPct = (data.absent / total) * 100;
  const latePct = (data.late / total) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">Attendance</h3>
        <span className="text-xs text-gray-500">Today</span>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b mb-3 text-sm">
        {["Students", "Teachers", "Staff"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <MiniStat label="Emergency" value={data.emergency} />
        <MiniStat label="Absent" value={data.absent} />
        <MiniStat label="Late" value={data.late} />
      </div>

      {/* DONUT */}
      <div className="relative flex justify-center mb-3">
        <svg width="160" height="160" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3.6" />

          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3.6"
            strokeDasharray={`${presentPct} ${100 - presentPct}`}
            strokeDashoffset="25"
          />

          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="3.6"
            strokeDasharray={`${absentPct} ${100 - absentPct}`}
            strokeDashoffset={`${100 - presentPct + 25}`}
          />

          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="3.6"
            strokeDasharray={`${latePct} ${100 - latePct}`}
            strokeDashoffset={`${100 - presentPct - absentPct + 25}`}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-gray-900">{data.present}</p>
          <p className="text-xs text-gray-500">Present</p>
        </div>

        <div className="absolute right-2 top-20 bg-white border rounded-full px-2 py-1 shadow text-xs">
          <b>{data.absent}</b> Absent
        </div>
      </div>

      <div className="text-center">
        <button className="text-xs text-gray-600 border rounded-md px-3 py-1 hover:bg-gray-50">
          View All
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2 text-center">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
