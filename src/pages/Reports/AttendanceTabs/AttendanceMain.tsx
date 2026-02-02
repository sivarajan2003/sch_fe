import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
    X,
  } from "lucide-react";
  import { useState, useMemo } from "react";
  import { RotateCcw } from "lucide-react";

  /* ================= MOCK DATA ================= */
  
  const studentsData = [
    { name: "Janet", img: "https://i.pravatar.cc/40?img=1", percent: 100, P: 24, L: 0, A: 0, H: 6, F: 0 },
    { name: "Veronica", img: "https://i.pravatar.cc/40?img=2", percent: 87, P: 22, L: 1, A: 1, H: 6, F: 1 },
    { name: "Kathleen", img: "https://i.pravatar.cc/40?img=3", percent: 95, P: 23, L: 1, A: 2, H: 6, F: 1 },
    { name: "Joann", img: "https://i.pravatar.cc/40?img=4", percent: 94, P: 23, L: 1, A: 3, H: 6, F: 1 },
    { name: "Gifford", img: "https://i.pravatar.cc/40?img=5", percent: 45, P: 16, L: 2, A: 1, H: 6, F: 1 },
    { name: "Lisa", img: "https://i.pravatar.cc/40?img=6", percent: 100, P: 24, L: 2, A: 1, H: 6, F: 0 },
    { name: "Ralph", img: "https://i.pravatar.cc/40?img=7", percent: 95, P: 21, L: 2, A: 1, H: 6, F: 2 },
    { name: "Julie", img: "https://i.pravatar.cc/40?img=8", percent: 99, P: 22, L: 0, A: 4, H: 6, F: 1 },
    { name: "Ryan", img: "https://i.pravatar.cc/40?img=9", percent: 98, P: 23, L: 0, A: 2, H: 6, F: 1 },
    { name: "Susan", img: "https://i.pravatar.cc/40?img=10", percent: 32, P: 20, L: 3, A: 1, H: 6, F: 4 },
  ];
  
  const days = Array.from({ length: 20 }, (_, i) => i + 1);
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  
  /* ================= STATUS DOT ================= */
  type Status = "P" | "A" | "L" | "HD" | "H";
  const pattern: Status[] = ["P", "P", "HD", "A", "L", "P", "H"];
  const getStatus = (d: number): Status => pattern[d % pattern.length];
  
  const Dot = ({ type }: { type: Status }) => {
    const map = {
      P: "bg-green-500",
      A: "bg-red-500",
      L: "bg-blue-500",
      HD: "bg-black",
      H: "bg-sky-400",
    };
    return <span className={`inline-block w-[6px] h-[14px] rounded-full ${map[type]}`} />;
  };
  
  /* ================= MAIN ================= */
  
  export default function AttendanceMain() {
    /* ---------- STATE ---------- */
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const applyDateRange = () => {
        setShowCalendar(false);
      };
      
    const [filters, setFilters] = useState({
      P: true,
      A: true,
      L: true,
      H: true,
      HD: true,
    });
    const hasStatus = (status: Status, dayCount: number[]) => {
        return dayCount.some((_, idx) => getStatus(idx + 1) === status);
      };
      
    /* ---------- DERIVED DATA ---------- */
    const students = useMemo(() => {
        let list = studentsData.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        );
      
        // 🔥 STATUS FILTER (THIS IS THE KEY)
        list = list.filter((s) => {
          const activeStatuses = Object.keys(filters).filter(
            (k) => filters[k as Status]
          ) as Status[];
      
          if (activeStatuses.length === 0) return true;
      
          return activeStatuses.some((status) =>
            hasStatus(status, days)
          );
        });
      
        list.sort((a, b) =>
          sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
      
        return list;
      }, [search, sortAsc, filters]);
      
      
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">Attendance Report List</h3>
  
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
              onClick={() => setShowFilter(!showFilter)}
              className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
              <Filter size={14} /> Filter
            </button>
  
            {showFilter && (
              <div className="absolute right-24 top-12 bg-white border rounded-xl p-4 w-48 z-50 shadow">
                {(["P", "A", "L", "HD", "H"] as Status[]).map((k) => (
                  <label key={k} className="flex items-center gap-2 text-sm mb-2">
                    <input
                      type="checkbox"
                      checked={filters[k]}
                      onChange={() =>
                        setFilters((f) => ({ ...f, [k]: !f[k] }))
                      }
                    />
                    {k === "P" && "Present"}
                    {k === "A" && "Absent"}
                    {k === "L" && "Late"}
                    {k === "HD" && "Halfday"}
                    {k === "H" && "Holiday"}
                  </label>
                ))}
                <button
  onClick={() => {
    setFilters({ P: true, A: true, L: true, H: true, HD: true });
    setShowFilter(false); // 👈 THIS WAS MISSING
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


          <div className="
  flex gap-2 flex-1
  overflow-x-auto
  whitespace-nowrap
  text-xs
">
  {[
    { key: "P", label: "Present", bg: "green" },
    { key: "A", label: "Absent", bg: "red" },
    { key: "L", label: "Late", bg: "blue" },
    { key: "HD", label: "Halfday", bg: "black" },
    { key: "H", label: "Holiday", bg: "sky" },
  ].map(({ key, label, bg }) => (
    <button
      key={key}
      onClick={() =>
        setFilters((f) => ({
          ...f,
          [key]: !f[key as Status],
        }))
      }
      className={`px-2 py-1 rounded flex items-center gap-1 border
        ${
          filters[key as Status]
            ? `bg-${bg}-100 text-${bg}-700`
            : "bg-gray-100 text-gray-400"
        }`}
    >
      <span className={`w-2 h-2 rounded-full bg-${bg}-500`} />
      {label}
    </button>
  ))}
  <button
  onClick={() =>
    setFilters({ P: true, A: true, L: true, HD: true, H: true })
  }
  title="Reset Filters"
  className="p-2 rounded border hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition"
>
  <RotateCcw size={14} />
</button>
</div>

          <div className="relative">
            <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 border rounded text-sm w-full sm:w-48"
              placeholder="Search"
            />
          </div>
          
        </div>
  
        {/* ================= TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Student / Date</th>
                <th className="px-3 py-3 text-center">%</th>
                <th>P</th><th>L</th><th>A</th><th>H</th><th>F</th>
                {days.map((d) => (
                  <th key={d} className="px-2 py-2 text-center">
                    <div>{d}</div>
                    <div className="text-[10px] text-gray-400">
                      {weekdays[(d - 1) % 7]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={s.img} className="w-8 h-8 rounded-full" />
                      {s.name}
                    </div>
                  </td>
  
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      s.percent >= 75 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {s.percent}
                    </span>
                  </td>
  
                  <td>{s.P}</td><td>{s.L}</td><td>{s.A}</td><td>{s.H}</td><td>{s.F}</td>
  
                  {days.map((d) => (
                    <td key={d} className="text-center">
                      {filters[getStatus(d)] && <Dot type={getStatus(d)} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ===== MOBILE & TABLET VIEW ===== */}
<div className="space-y-4 lg:hidden px-4 pb-4">
  {students.map((s, i) => (
    <div
      key={i}
      className="border rounded-xl p-4 bg-white space-y-3"
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img src={s.img} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{s.name}</p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              s.percent >= 75
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {s.percent}% Attendance
          </span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-5 text-center text-xs gap-2">
        <div><p className="text-gray-500">P</p>{s.P}</div>
        <div><p className="text-gray-500">L</p>{s.L}</div>
        <div><p className="text-gray-500">A</p>{s.A}</div>
        <div><p className="text-gray-500">H</p>{s.H}</div>
        <div><p className="text-gray-500">F</p>{s.F}</div>
      </div>

      {/* DAY DOTS */}
      <div className="flex flex-wrap gap-2 pt-2">
        {days.map((d) => (
          filters[getStatus(d)] && (
            <Dot key={d} type={getStatus(d)} />
          )
        ))}
      </div>
    </div>
  ))}
</div>

        <div className="flex justify-end items-center gap-2 px-5 py-4 text-sm">
  <button className="px-3 py-1 border rounded text-gray-500">Prev</button>
  <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
  <button className="px-3 py-1 border rounded text-gray-500">Next</button>
</div>
      </div>
    );
  }
  