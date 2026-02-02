import { CalendarDays } from "lucide-react";
import { useState } from "react";
const todayAttendanceData = {
  students: {
    present: 3580,
    absent: 44,
    late: 1,
    emergency: 28,
  },
  teachers: {
    present: 248,
    absent: 6,
    late: 2,
    emergency: 1,
  },
  staff: {
    present: 159,
    absent: 2,
    late: 0,
    emergency: 0,
  },
};
const attendanceData = {
  students: {
    present: 3610,
    absent: 44,
    late: 1,
    emergency: 28,
  },
  teachers: {
    present: 254,
    absent: 6,
    late: 2,
    emergency: 1,
  },
  staff: {
    present: 161,
    absent: 2,
    late: 0,
    emergency: 0,
  },
};

export default function StudentAttendance() {
  //const attendancePercent = 95;
  const [isToday, setIsToday] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "students" | "teachers" | "staff"
  >("students");

  //const data = attendanceData[activeTab];
  const data = isToday
  ? todayAttendanceData[activeTab]
  : attendanceData[activeTab];

  const total =
    data.present + data.absent + data.late + data.emergency;

  const attendancePercent = Math.round(
    (data.present / total) * 100
  );

  return (
    <div className="bg-white rounded-xl border p-5">
      {/* HEADER */}
      {/* HEADER */}
<div className="flex items-center justify-between mb-3">
  <h4 className="font-semibold text-sm">Attendance</h4>

  <button
  onClick={() => setIsToday((prev) => !prev)}
  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
>
  <CalendarDays className="w-4 h-4" />
  {isToday ? "Today" : "Overall"}
</button>

</div>

{/* TABS */}
<div className="flex gap-4 text-sm border-b mb-4">
  {["students", "teachers", "staff"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab as any)}
      className={`pb-2 capitalize ${
        activeTab === tab
          ? "text-blue-600 border-b-2 border-blue-600 font-medium"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab}
    </button>
  ))}
</div>

      <p className="text-xs text-gray-500 mb-4">
        No of total working days <span className="font-semibold">28 Days</span>
      </p>

      {/* COUNTS */}
<div className="grid grid-cols-3 text-center mb-4">
  <div>
    <p className="text-xs text-gray-500">Emergency</p>
    <p className="font-semibold text-sm">{data.emergency}</p>
  </div>
  <div>
    <p className="text-xs text-gray-500">Absent</p>
    <p className="font-semibold text-sm">{data.absent}</p>
  </div>
  <div>
    <p className="text-xs text-gray-500">Late</p>
    <p className="font-semibold text-sm">{data.late}</p>
  </div>
</div>
{/* ROUND DONUT */}
<div className="relative flex justify-center items-center my-6">
  <svg width="200" height="200" viewBox="0 0 200 200">
    asked,
    {/* background */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#E5E7EB"
      strokeWidth="16"
    />

    {/* present */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#2563EB"
      strokeWidth="16"
      strokeLinecap="round"
      strokeDasharray={`${attendancePercent * 5} 500`}
      transform="rotate(-90 100 100)"
    />
  </svg>

  {/* CENTER TEXT */}
  <div className="absolute text-center">
    <p className="text-xl font-bold">{data.present}</p>
    <p className="text-xs text-gray-500">Present</p>
  </div>

  {/* ABSENT BUBBLE */}
  <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-full px-3 py-1 text-xs shadow">
    {data.absent} Absent
  </div>
</div>


      {/* LEGEND */}
      <div className="flex justify-center gap-4 text-xs mb-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Present
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          Absent
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Late
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full" />
          Half Day
        </div>
      </div>

      {/* LAST 7 DAYS */}
      <div className="border-t pt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Last 7 Days</span>
          <span>14 May 2024 - 21 May 2024</span>
        </div>

        <div className="flex gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold
                ${
                  day === "F"
                    ? "bg-red-500 text-white"
                    : i < 4
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
