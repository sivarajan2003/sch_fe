import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
  } from "lucide-react";
  import { useMemo, useState } from "react";
  
  /* ================= TYPES ================= */
  
  type AttendanceStatus = "Present" | "Absent" | "Half Day" | "Late";
  interface StudentRow {
    sno: number;
    admissionNo: string;
    rollNo: string;
    name: string;
    img: string;
    status: AttendanceStatus;
  }
  
  /* ================= MOCK DATA ================= */
  
  const DATA: StudentRow[] = [
    { sno: 1, admissionNo: "AD9892434", rollNo: "35013", name: "Janet", img: "https://i.pravatar.cc/40?img=1", status: "Present" },
    { sno: 2, admissionNo: "AD9892433", rollNo: "35012", name: "Joann", img: "https://i.pravatar.cc/40?img=4", status: "Present" },
    { sno: 3, admissionNo: "AD9892432", rollNo: "35011", name: "Kathleen", img: "https://i.pravatar.cc/40?img=3", status: "Half Day" },
    { sno: 4, admissionNo: "AD9892431", rollNo: "35010", name: "Gifford", img: "https://i.pravatar.cc/40?img=5", status: "Present" },
    { sno: 5, admissionNo: "AD9892430", rollNo: "35009", name: "Lisa", img: "https://i.pravatar.cc/40?img=6", status: "Absent" },
    { sno: 6, admissionNo: "AD9892429", rollNo: "35008", name: "Ralph", img: "https://i.pravatar.cc/40?img=7", status: "Late" },
    { sno: 7, admissionNo: "AD9892428", rollNo: "35007", name: "Julie", img: "https://i.pravatar.cc/40?img=8", status: "Present" },
    { sno: 8, admissionNo: "AD9892427", rollNo: "35006", name: "Ryan", img: "https://i.pravatar.cc/40?img=9", status: "Present" },
    { sno: 9, admissionNo: "AD9892426", rollNo: "35005", name: "Susan", img: "https://i.pravatar.cc/40?img=10", status: "Absent" },
    { sno: 10, admissionNo: "AD9892425", rollNo: "35004", name: "Richard", img: "https://i.pravatar.cc/40?img=11", status: "Present" },
  ];
  
  
  /* ================= BADGE ================= */
  
  const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
    const map = {
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
  
  export default function StudentDayWise() {
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
        let list = DATA.filter(
          (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) &&
            filters[r.status] // ✅ NO ERROR NOW
        );
      
        list.sort((a, b) =>
          sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
      
        return list;
      }, [search, sortAsc, filters]);
      
      const clearFilters = () => {
        setFilters({
          Present: true,
          Absent: true,
          "Half Day": true,
          Late: true,
        });
        setShowFilter(false); // close popup
      };
      
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">Student Day Wise List</h3>
  
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

    {/* CLEAR BUTTON */}
    {/* CLEAR BUTTON */}
<div className="mt-3 text-right">
  <button
    type="button"
    onClick={clearFilters}
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b text-sm">
          <div className="flex items-center gap-2">
            Row Per Page
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
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
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Admission No</th>
                <th className="px-4 py-3 text-center">Roll No</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-center">Attendance</th>
              </tr>
            </thead>
  
            <tbody>
            {rows.map((r, index) => (
  <tr key={r.admissionNo} className="border-b hover:bg-gray-50 transition">
    <td className="px-4 py-3 text-center font-medium">
      {index + 1}
    </td>

                  <td className="px-4 py-3 text-blue-600">{r.admissionNo}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{r.rollNo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={r.img} className="w-8 h-8 rounded-full" />
                      {r.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
  <StatusBadge status={r.status} />
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
  {/* ===== MOBILE & TABLET VIEW ===== */}
<div className="lg:hidden space-y-4 px-4 pb-4">
  {rows.map((r, index) => (
    <div
      key={r.admissionNo}
      className="border rounded-xl p-4 bg-white space-y-3"
    >
      {/* STUDENT */}
      <div className="flex items-center gap-3">
        <img src={r.img} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-xs text-gray-500">
            Admission No: {r.admissionNo}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Roll No</p>
          <p className="font-medium">{r.rollNo}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">S.No</p>
          <p className="font-medium">{index + 1}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="pt-2">
        <StatusBadge status={r.status} />
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end items-center gap-2 px-5 py-4 text-sm">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    );
  }
  