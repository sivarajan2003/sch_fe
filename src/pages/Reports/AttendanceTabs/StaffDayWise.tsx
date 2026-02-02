import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
  } from "lucide-react";
  import { useMemo, useState } from "react";
  
  /* ================= TYPES ================= */
  
  type AttendanceStatus = "Present" | "Absent" | "Half Day" | "Late";
  
  interface StaffRow {
    id: string;
    name: string;
    img: string;
    department: string;
    role: string;
    status: AttendanceStatus;
  }
  
  /* ================= MOCK DATA ================= */
  
  const STAFF_DATA: StaffRow[] = [
    { id: "8483", name: "Hellana", img: "https://i.pravatar.cc/40?img=1", department: "Management", role: "Receptionist", status: "Present" },
    { id: "8482", name: "Daniel", img: "https://i.pravatar.cc/40?img=2", department: "Finance", role: "Accounts Manager", status: "Present" },
    { id: "8481", name: "Kevin", img: "https://i.pravatar.cc/40?img=3", department: "Management", role: "Driver", status: "Absent" },
    { id: "8480", name: "Teresa", img: "https://i.pravatar.cc/40?img=4", department: "Finance", role: "Librarian", status: "Present" },
    { id: "8479", name: "James", img: "https://i.pravatar.cc/40?img=5", department: "Management", role: "HR Manager", status: "Half Day" },
    { id: "8478", name: "Johnson", img: "https://i.pravatar.cc/40?img=6", department: "Admin", role: "Accountant", status: "Present" },
    { id: "8477", name: "Edward", img: "https://i.pravatar.cc/40?img=7", department: "Transport", role: "Admin", status: "Present" },
    { id: "8476", name: "Jacquelin", img: "https://i.pravatar.cc/40?img=8", department: "Library", role: "Admin", status: "Late" },
    { id: "8475", name: "Elizabeth", img: "https://i.pravatar.cc/40?img=9", department: "Management", role: "Receptionist", status: "Present" },
    { id: "8474", name: "Willie", img: "https://i.pravatar.cc/40?img=10", department: "Management", role: "Technical Head", status: "Present" },
  ];
  
  /* ================= STATUS BADGE ================= */
  
  const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
    const map: Record<AttendanceStatus, string> = {
      Present: "bg-green-100 text-green-700",
      Absent: "bg-red-100 text-red-600",
      "Half Day": "bg-gray-200 text-gray-700",
      Late: "bg-sky-100 text-sky-600",
    };
  
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${map[status]}`}>
        ● {status}
      </span>
    );
  };
  
  /* ================= COMPONENT ================= */
  
  export default function StaffDayWiseList() {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    
    const [filters, setFilters] = useState<Record<AttendanceStatus, boolean>>({
      Present: true,
      Absent: true,
      "Half Day": true,
      Late: true,
    });
  
    /* ================= FILTER + SORT ================= */
  
    const rows = useMemo(() => {
      let list = STAFF_DATA.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) &&
          filters[r.status]
      );
  
      list.sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  
      return list;
    }, [search, sortAsc, filters]);
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">Staff Day Wise List</h3>
  
          <div className="relative flex flex-wrap gap-2 w-full lg:w-auto">
            {/* CALENDAR */}
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
              <div className="absolute right-24 top-12 bg-white border rounded-xl p-4 w-48 shadow z-50">
                {(Object.keys(filters) as AttendanceStatus[]).map((k) => (
                  <label key={k} className="flex items-center gap-2 text-sm mb-2">
                    <input
                      type="checkbox"
                      checked={filters[k]}
                      onChange={() =>
                        setFilters((f) => ({ ...f, [k]: !f[k] }))
                      }
                    />
                    {k}
                  </label>
                ))}
                <div className="mt-2 text-right">
                  <button
                    onClick={() => {
                      setFilters({
                        Present: true,
                        Absent: true,
                        "Half Day": true,
                        Late: true,
                      });
                      setShowFilter(false);
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 border-b text-sm">
          <div className="flex items-center gap-2">
            Row Per Page
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
            </select>
            Entries
          </div>
  
          <div className="relative w-full sm:w-56">
            <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 border rounded text-sm"
              placeholder="Search"
            />
          </div>
        </div>
  
        {/* ================= TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Attendance</th>
              </tr>
            </thead>
  
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-b last:border-none">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 text-blue-600">{r.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={r.img} className="w-8 h-8 rounded-full" />
                      {r.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.department}</td>
                  <td className="px-4 py-3 text-gray-600">{r.role}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4 px-4 pb-4">
  {rows.map((r, index) => (
    <div
      key={r.id}
      className="border rounded-xl p-4 bg-white space-y-3"
    >
      {/* STAFF HEADER */}
      <div className="flex items-center gap-3">
        <img
          src={r.img}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold">{r.name}</p>
          <p className="text-xs text-gray-500">
            ID: {r.id}
          </p>
        </div>
        <StatusBadge status={r.status} />
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Department</p>
          <p className="font-medium">{r.department}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Role</p>
          <p className="font-medium">{r.role}</p>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end items-center gap-2 px-5 py-4 text-sm">
          <button className="px-3 py-1 border rounded">Pre</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    );
  }
  