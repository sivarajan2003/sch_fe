import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
  } from "lucide-react";
  import { useState, useMemo } from "react";
  
  /* ================= TYPES ================= */
  
  type Status = "P" | "A" | "L" | "HD" | "H";
  
  /* ================= MOCK DATA ================= */
  
  const teachersData = [
    { name: "Teresa", img: "https://i.pravatar.cc/40?img=1", percent: 100, P: 24, L: 0, A: 0, H: 6, F: 0 },
    { name: "Hellana", img: "https://i.pravatar.cc/40?img=3", percent: 95, P: 23, L: 1, A: 2, H: 6, F: 1 },
    { name: "Erickson", img: "https://i.pravatar.cc/40?img=4", percent: 94, P: 23, L: 1, A: 3, H: 6, F: 1 },
    { name: "Aaron", img: "https://i.pravatar.cc/40?img=6", percent: 100, P: 24, L: 2, A: 1, H: 6, F: 0 },
    { name: "Ralph", img: "https://i.pravatar.cc/40?img=7", percent: 95, P: 21, L: 2, A: 1, H: 6, F: 2 },
    { name: "Daniel", img: "https://i.pravatar.cc/40?img=2", percent: 87, P: 22, L: 1, A: 1, H: 6, F: 1 },
    { name: "Jacquelin", img: "https://i.pravatar.cc/40?img=8", percent: 99, P: 22, L: 0, A: 4, H: 6, F: 1 },
    { name: "Raul", img: "https://i.pravatar.cc/40?img=9", percent: 98, P: 23, L: 0, A: 2, H: 6, F: 1 },
    { name: "Elizabeth", img: "https://i.pravatar.cc/40?img=10", percent: 32, P: 20, L: 3, A: 1, H: 6, F: 4 },
    { name: "Morgan", img: "https://i.pravatar.cc/40?img=5", percent: 45, P: 16, L: 2, A: 1, H: 6, F: 1 },
  ];
  
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  
  /* ================= STATUS DOT ================= */
  
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
  
    return (
      <span className={`inline-block w-[6px] h-[16px] rounded-full ${map[type]}`} />
    );
  };
  
  /* ================= COMPONENT ================= */
  
  export default function TeacherAttendanceReport() {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [activeStatus, setActiveStatus] = useState<Status | "ALL">("ALL");
    
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
  
    const [filters, setFilters] = useState({
      P: true,
      A: true,
      L: true,
      HD: true,
      H: true,
    });
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    
    const rows = useMemo(() => {
      let list = teachersData.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
  
      list.sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  
      return list;
    }, [search, sortAsc]);
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">Staff Report List</h3>
  
          <div className="relative flex flex-wrap gap-2 w-full lg:w-auto">
          <button
  onClick={() => {
    setShowCalendar(!showCalendar);
    setShowFilter(false);
  }}
  className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
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

            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowCalendar(false);
              }}
              className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
              <Filter size={14} /> Filter
            </button>
  
            {showFilter && (
              <div className="absolute right-24 top-12 bg-white border rounded-xl p-4 w-48 shadow z-50">
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
  
                <div className="mt-2 text-right">
                  <button
                    onClick={() => {
                      setFilters({ P: true, A: true, L: true, HD: true, H: true });
                      setShowFilter(false);
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
  
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
              <ArrowUpDown size={14} />
              Sort {sortAsc ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>
  
        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center px-4 sm:px-5 py-4 border-b text-sm">
{/* LEFT : ROW PER PAGE */}
<div className="flex items-center gap-2">
            Row Per Page
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
            </select>
            Entries
          </div>

{/* CENTER : LEGEND BUTTONS */}
<div className="flex gap-2 flex-1 justify-center text-xs whitespace-nowrap">

  {/* PRESENT */}
  <button
    onClick={() =>
      setActiveStatus(activeStatus === "P" ? "ALL" : "P")
    }
    className={`px-2 py-1 rounded flex items-center gap-1 border
      ${activeStatus === "P"
        ? "bg-green-500 text-white"
        : "bg-green-100 text-green-700 hover:bg-green-200"}
    `}
  >
    <span className="w-2 h-2 bg-green-500 rounded-full" /> Present
  </button>

  {/* ABSENT */}
  <button
    onClick={() =>
      setActiveStatus(activeStatus === "A" ? "ALL" : "A")
    }
    className={`px-2 py-1 rounded flex items-center gap-1 border
      ${activeStatus === "A"
        ? "bg-red-500 text-white"
        : "bg-red-100 text-red-600 hover:bg-red-200"}
    `}
  >
    <span className="w-2 h-2 bg-red-500 rounded-full" /> Absent
  </button>

  {/* LATE */}
  <button
    onClick={() =>
      setActiveStatus(activeStatus === "L" ? "ALL" : "L")
    }
    className={`px-2 py-1 rounded flex items-center gap-1 border
      ${activeStatus === "L"
        ? "bg-blue-500 text-white"
        : "bg-blue-100 text-blue-600 hover:bg-blue-200"}
    `}
  >
    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Late
  </button>

  {/* HALFDAY */}
  <button
    onClick={() =>
      setActiveStatus(activeStatus === "HD" ? "ALL" : "HD")
    }
    className={`px-2 py-1 rounded flex items-center gap-1 border
      ${activeStatus === "HD"
        ? "bg-black text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
    `}
  >
    <span className="w-2 h-2 bg-black rounded-full" /> Halfday
  </button>

  {/* HOLIDAY */}
  <button
    onClick={() =>
      setActiveStatus(activeStatus === "H" ? "ALL" : "H")
    }
    className={`px-2 py-1 rounded flex items-center gap-1 border
      ${activeStatus === "H"
        ? "bg-sky-500 text-white"
        : "bg-sky-100 text-sky-600 hover:bg-sky-200"}
    `}
  >
    <span className="w-2 h-2 bg-sky-400 rounded-full" /> Holiday
  </button>

</div>


{/* RIGHT : SEARCH */}
<div className="relative w-full sm:w-56">
  <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="pl-7 pr-3 py-1.5 border rounded text-sm w-full"
    placeholder="Search"
  />
</div>

</div>

        {/* ================= TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full table-fixed text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
              <th className="w-[260px] px-4 py-3 text-left">Teacher / Date</th>
                <th className="w-[50px] text-center">%</th>
                <th className="w-[40px] text-center">P</th>
                <th className="w-[40px] text-center">L</th>
                <th className="w-[40px] text-center">A</th>
                <th className="w-[40px] text-center">H</th>
                <th className="w-[40px] text-center">F</th>
                {days.map((d) => (
                  <th key={d} className="w-[36px] text-center">
                    <div>{d}</div>
                    <div className="text-[10px] text-gray-400">
                      {weekdays[(d - 1) % 7]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody>
              {rows.map((t, i) => (
                <tr key={i} className="border-b h-[56px] hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img src={t.img} className="w-8 h-8 rounded-full" />
                      {t.name}
                    </div>
                  </td>
  
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      t.percent >= 75
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {t.percent}
                    </span>
                  </td>
  
                  <td className="text-center">{t.P}</td>
                  <td className="text-center">{t.L}</td>
                  <td className="text-center">{t.A}</td>
                  <td className="text-center">{t.H}</td>
                  <td className="text-center">{t.F}</td>
  
                  {days.map((d) => (
                    <td key={d} className="text-center">
{filters[getStatus(d)] &&
  (activeStatus === "ALL" || activeStatus === getStatus(d)) && (
    <Dot type={getStatus(d)} />
)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4 px-4 pb-4">
  {rows.map((t, index) => (
    <div
      key={index}
      className="border rounded-xl p-4 bg-white space-y-3"
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img
          src={t.img}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold">{t.name}</p>
          <p className="text-xs text-gray-500">
            Attendance: {t.percent}%
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            t.percent >= 75
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {t.percent}%
        </span>
      </div>

      {/* SUMMARY COUNTS */}
      <div className="grid grid-cols-3 gap-3 text-sm text-center">
        <div>
          <p className="text-xs text-gray-500">Present</p>
          <p className="font-medium">{t.P}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Late</p>
          <p className="font-medium">{t.L}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Absent</p>
          <p className="font-medium">{t.A}</p>
        </div>
      </div>

      {/* DAY STATUS STRIP */}
      <div className="flex gap-1 overflow-x-auto pt-2">
        {days.map((d) => {
          const status = getStatus(d);
          if (!filters[status]) return null;
          if (activeStatus !== "ALL" && activeStatus !== status) return null;

          return <Dot key={d} type={status} />;
        })}
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
  