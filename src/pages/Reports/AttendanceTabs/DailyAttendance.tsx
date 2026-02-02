import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
    X,
  } from "lucide-react";
  import { useMemo, useState } from "react";
  import { useEffect } from "react";


  /* ================= MOCK DATA ================= */
  
  const DATA = [
    { class: "III", section: "A", present: 69, absent: 2 },
    { class: "IV", section: "A", present: 45, absent: 7 },
    { class: "II", section: "B", present: 69, absent: 8 },
    { class: "I", section: "C", present: 54, absent: 7 },
    { class: "II", section: "A", present: 65, absent: 1 },
    { class: "III", section: "B", present: 78, absent: 2 },
    { class: "V", section: "C", present: 65, absent: 0 },
    { class: "VI", section: "A", present: 45, absent: 2 },
    { class: "VII", section: "B", present: 47, absent: 2 },
    { class: "VII", section: "C", present: 45, absent: 7 },
    { class: "IX", section: "A", present: 45, absent: 1 },
  ];
  
  const CLASSES = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
  
  /* ================= COMPONENT ================= */
  
  export default function DailyAttendance() {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
  
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
  
    
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    
    /* ================= FILTER + SORT ================= */
  
    const rows = useMemo(() => {
      let list = [...DATA];
  
      if (search) {
        list = list.filter((r) =>
          r.class.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      if (selectedClasses.length > 0) {
        list = list.filter((r) => selectedClasses.includes(r.class));
      }
  
      list.sort((a, b) =>
        sortAsc
          ? a.class.localeCompare(b.class)
          : b.class.localeCompare(a.class)
      );
  
      return list;
    }, [search, sortAsc, selectedClasses]);
    const totalPages = Math.ceil(rows.length / PAGE_SIZE);

    const paginatedRows = rows.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );
    useEffect(() => {
        setCurrentPage(1);
      }, [search, selectedClasses, sortAsc, startDate, endDate]);
      
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">Daily Attendance List</h3>
  
          <div className="relative flex flex-wrap gap-2 w-full lg:w-auto">
  
            {/* CALENDAR */}
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
  <div className="absolute right-0 top-12 bg-white border rounded-xl p-4 w-72 shadow z-50">
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

            {/* FILTER */}
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowCalendar(false);
              }}
              className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
              <Filter size={14} /> Filter
            </button>
  
            {showFilter && (
              <div className="absolute right-24 top-12 bg-white border rounded-xl p-4 w-48 z-50 shadow">
                {CLASSES.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm mb-2">
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes(c)}
                      onChange={() =>
                        setSelectedClasses((prev) =>
                          prev.includes(c)
                            ? prev.filter((x) => x !== c)
                            : [...prev, c]
                        )
                      }
                    />
                    Class {c}
                  </label>
                ))}
  
                <button
                  onClick={() => {
                    setSelectedClasses([]);
                    setShowFilter(false);
                  }}
                  className="text-xs text-blue-600 mt-2"
                >
                  Clear
                </button>
              </div>
            )}
  
            {/* SORT */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
              <ArrowUpDown size={14} />
              Sort {sortAsc ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>
  
        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b text-sm">
          <div className="flex items-center gap-2">
            Row Per Page
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
            </select>
            Entries
          </div>
  
          <div className="relative">
            <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 border rounded text-sm w-full sm:w-52"
              placeholder="Search"
            />
          </div>
        </div>
  
        {/* ================= TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
  <tr>
    <th className="px-4 py-3 text-left">Class</th>
    <th className="px-4 py-3 text-center">Section</th>
    <th className="px-4 py-3 text-center">Total Present</th>
    <th className="px-4 py-3 text-center">Total Absent</th>
    <th className="px-4 py-3 text-center">Present %</th>
    <th className="px-4 py-3 text-center">Absent %</th>
  </tr>
</thead>

<tbody>
  {rows.map((r, i) => {
    const total = r.present + r.absent;
    return (
      <tr key={i} className="border-b hover:bg-gray-50 transition">
        <td className="px-4 py-3 text-left">{r.class}</td>
        <td className="px-4 py-3 text-center">{r.section}</td>
        <td className="px-4 py-3 text-center">{r.present}</td>
        <td className="px-4 py-3 text-center">{r.absent}</td>
        <td className="px-4 py-3 text-center">
          {Math.round((r.present / total) * 100)}%
        </td>
        <td className="px-4 py-3 text-center">
          {Math.round((r.absent / total) * 100)}%
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
  {/* ===== MOBILE & TABLET VIEW ===== */}
<div className="lg:hidden space-y-4 px-4 pb-4">
  {paginatedRows.map((r, i) => {
    const total = r.present + r.absent;

    return (
      <div
        key={i}
        className="border rounded-xl p-4 bg-white space-y-3"
      >
        {/* CLASS + SECTION */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Class</p>
            <p className="font-semibold">
              {r.class} - {r.section}
            </p>
          </div>
        </div>

        {/* COUNTS */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Present</p>
            <p className="font-medium">{r.present}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Absent</p>
            <p className="font-medium">{r.absent}</p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Present %</p>
            <p className="font-medium">
              {Math.round((r.present / total) * 100)}%
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-xs">Absent %</p>
            <p className="font-medium">
              {Math.round((r.absent / total) * 100)}%
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end items-center gap-2 px-5 py-4 text-sm">

  {/* PREV */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`px-3 py-1 border rounded ${
      currentPage === 1
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Prev
  </button>

  {/* CURRENT PAGE */}
  <button className="px-3 py-1 bg-blue-600 text-white rounded">
    {currentPage}
  </button>

  {/* NEXT */}
  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`px-3 py-1 border rounded ${
      currentPage === totalPages || totalPages === 0
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Next
  </button>
</div>

      </div>
    );
  }
  