import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  CalendarDays,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";

import { useState, useMemo } from "react";
/* ================= TABS ================= */
const TABS = [
  { label: "Attendance Report", path: "" },
  { label: "Students Attendance Type", path: "student-type" },
  { label: "Daily Attendance", path: "daily" },
  { label: "Student Day Wise", path: "student-day-wise" },
  { label: "Teacher Day Wise", path: "teacher-day-wise" },
  { label: "Teacher Report", path: "teacher-report" },
  { label: "Staff Day Wise", path: "staff-day-wise" },
  { label: "Staff Report", path: "staff-report" },
];

export default function AttendanceReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const isActiveTab = (path: string) =>
    path === ""
      ? location.pathname.endsWith("/attendance")
      : location.pathname.endsWith(path);
      const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
      const [startDate, setStartDate] = useState<string>("");
      const [endDate, setEndDate] = useState<string>("");
      
  return (
<div className="p-4 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
      <div className="flex items-start gap-3">
  {/* BACK ARROW */}
  <button
onClick={() => window.history.back()}
    className="mt-1 p-2 rounded-lg hover:bg-gray-100"
    title="Go Back"
  >
    <ArrowLeft size={20} />
  </button>

  {/* TITLE */}
  <div>
  <h2 className="text-xl sm:text-2xl font-semibold">Attendance Report</h2>
    <p className="text-sm text-gray-500">
      Dashboard / Report / Attendance Report
    </p>
  </div>
</div>
        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
        <div className="relative">
  <button
    onClick={() => {
      setShowCalendar(!showCalendar);
      setShowFilter(false);
    }}
    className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center"
  >
    <CalendarDays size={14} />
    {startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Select Date Range"}
  </button>

  {showCalendar && (
    <div className="absolute left-0 top-full mt-2 bg-white border rounded-xl p-4 w-full sm:w-72 shadow z-50">
      <label className="text-sm font-medium">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded px-3 py-2 mt-1 mb-3"
      />

      <label className="text-sm font-medium">End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded px-3 py-2 mt-1 mb-4"
      />

      <button
        onClick={() => setShowCalendar(false)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Apply
      </button>

      <button
        onClick={() => {
          setStartDate("");
          setEndDate("");
          setShowCalendar(false);
        }}
        className="text-xs text-red-500 mt-2"
      >
        Clear Date
      </button>
    </div>
  )}
</div>
<div className="relative">
  <button
    onClick={() => {
      setShowFilter(!showFilter);
      setShowCalendar(false);
    }}
    className="btn-outline flex items-center gap-1"
  >
    <Filter size={16} />
    Filter
  </button>

  {showFilter && (
    <div className="absolute left-0 top-full mt-2 bg-white border rounded-xl p-4 w-56 shadow z-50">
      <label className="flex items-center gap-2 text-sm mb-2">
        <input type="checkbox" />
        Present
      </label>

      <label className="flex items-center gap-2 text-sm mb-2">
        <input type="checkbox" />
        Absent
      </label>

      <label className="flex items-center gap-2 text-sm mb-3">
        <input type="checkbox" />
        Holiday
      </label>

      <button
        onClick={() => setShowFilter(false)}
        className="w-full bg-blue-600 text-white py-1.5 rounded-lg text-sm"
      >
        Apply
      </button>
    </div>
  )}
</div>

<button
  onClick={() =>
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }
  className="btn-outline flex items-center gap-1"
>
  <ArrowUpDown size={16} />
  Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
</button>


<button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-1">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="
  flex gap-6 border-b mb-6
  overflow-x-auto
  scrollbar-hide
  whitespace-nowrap
">
        {TABS.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`pb-3 text-sm font-medium border-b-2 transition shrink-0 ${
              isActiveTab(tab.path)
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
