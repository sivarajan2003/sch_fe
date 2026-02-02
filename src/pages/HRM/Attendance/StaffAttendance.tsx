import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  CalendarDays,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";

/* ================= DATA ================= */
const INITIAL_DATA = [
  {
    id: "8482",
    name: "Daniel",
    image: "https://i.pravatar.cc/40?img=1",
    department: "Finance",
    role: "Accounts Manager",
    attendance: "Present",
    notes: "",
  },
  {
    id: "8477",
    name: "Edward",
    image: "https://i.pravatar.cc/40?img=2",
    department: "Transport",
    role: "Admin",
    attendance: "Late",
    notes: "",
  },
  {
    id: "8475",
    name: "Elizabeth",
    image: "https://i.pravatar.cc/40?img=3",
    department: "Management",
    role: "Receptionist",
    attendance: "Present",
    notes: "",
  },
  {
    id: "8483",
    name: "Hellana",
    image: "https://i.pravatar.cc/40?img=4",
    department: "Management",
    role: "Receptionist",
    attendance: "Present",
    notes: "",
  },
  {
    id: "8476",
    name: "Jacquelin",
    image: "https://i.pravatar.cc/40?img=5",
    department: "Library",
    role: "Admin",
    attendance: "Absent",
    notes: "",
  },
  {
    id: "8479",
    name: "James",
    image: "https://i.pravatar.cc/40?img=6",
    department: "Management",
    role: "HR Manager",
    attendance: "Present",
    notes: "",
  },
  {
    id: "8478",
    name: "Johnson",
    image: "https://i.pravatar.cc/40?img=7",
    department: "Admin",
    role: "Accountant",
    attendance: "Late",
    notes: "",
  },
  {
    id: "8481",
    name: "Kevin",
    image: "https://i.pravatar.cc/40?img=8",
    department: "Management",
    role: "Driver",
    attendance: "Present",
    notes: "",
  },
  {
    id: "8480",
    name: "Teresa",
    image: "https://i.pravatar.cc/40?img=9",
    department: "Finance",
    role: "Librarian",
    attendance: "Holiday",
    notes: "",
  },
  {
    id: "8474",
    name: "Willie",
    image: "https://i.pravatar.cc/40?img=10",
    department: "Management",
    role: "Technical Head",
    attendance: "Present",
    notes: "",
  },
];

/* ================= PAGE ================= */
export default function StudentAttendance() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [sortAsc, setSortAsc] = useState(true);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"Present" | "Late" | "Absent" | "Holiday" | "Halfday" | null>(null);
  
  /* CLOSE DROPDOWNS */
  useEffect(() => {
    const close = () => {
      setOpenCalendar(false);
      setOpenFilter(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["Staff ID,Name,Department,Role,Attendance,Notes"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.name},${d.department},${d.role},${d.attendance},${d.notes}`
          )
        )
        .join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "staff_attendance.csv";
    link.click();
  };
  
  
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };
  const handleRefresh = () => {
    setData(INITIAL_DATA);   // reset data
    setSearch("");           // clear search
    setCurrentPage(1);       // reset pagination
    setStatusFilter(null);   // clear filter
    setStartDate("");        // clear date
    setEndDate("");          // clear date
  };
  
  /* SEARCH */
  const filtered = data.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
  
    const matchStatus = statusFilter
      ? d.attendance === statusFilter
      : true;
  
    return matchSearch && matchStatus;
  });
  

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* ATTENDANCE CHANGE */
  const updateAttendance = (id: string, value: string) => {
    setData((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, attendance: value } : d
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Staff Attendance</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / HRM / Staff Attendance
            </p>
          </div>

          <div className="flex items-center gap-3">
          <button
  onClick={handleRefresh}
  className="p-2.5 border rounded-lg hover:bg-gray-50"
  title="Refresh"
>
  <RefreshCcw size={16} />
</button>

            <button className="p-2.5 border rounded-lg" onClick={() => window.print()}>
              <Printer size={16} />
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold">Staff Attendance List</h3>

          <div className="flex items-center gap-3">
            {/* DATE RANGE */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCalendar(!openCalendar);
                }}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
              >
                <CalendarDays size={14} />
                {startDate && endDate
                  ? `${startDate} - ${endDate}`
                  : "15 May 2020 - 24 May 2024"}
              </button>

              {openCalendar && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-5 z-40"
                >
                  <div className="mb-4">
                    <label className="text-sm">Start Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm">End Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => setOpenCalendar(false)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenFilter(!openFilter);
      setOpenCalendar(false);
    }}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <Filter size={14} /> Filter
  </button>

  {openFilter && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-40"
    >
      {["Present", "Late", "Absent", "Holiday", "Halfday"].map((s) => (
        <button
          key={s}
          onClick={() => {
            setStatusFilter(s as any);
            setOpenFilter(false);
          }}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        >
          {s}
        </button>
      ))}

      <button
        onClick={() => {
          setStatusFilter(null);
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Clear
      </button>
    </div>
  )}
</div>

<button
  onClick={handleSort}
  className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  <ArrowUpDown size={14} /> Sort By A-Z
</button>

          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">Row Per Page 10 Entries</div>

          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-52"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <table className="min-w-[1200px] w-full text-sm table-fixed">
      <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 w-[80px] text-left">S.No</th>
    <th className="px-4 py-3 w-[120px] text-left">ID</th>
    <th className="px-4 py-3 w-[220px] text-left">Name</th>
    <th className="px-4 py-3 w-[200px] text-left">Department</th>
    <th className="px-4 py-3 w-[200px] text-left">Role</th>
    <th className="px-4 py-3 w-[360px] text-left">Attendance</th>
    <th className="px-4 py-3 w-[180px] text-left">Notes</th>
  </tr>
</thead>

<tbody>
  {paginated.map((d, index) => (
    <tr key={d.id} className="border-t">

      {/* S.NO */}
      <td className="px-4 py-3">
        {(currentPage - 1) * rowsPerPage + index + 1}
      </td>

      {/* STAFF ID */}
      <td className="px-4 py-3 text-blue-600">{d.id}</td>

      {/* NAME */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src={d.image}
            className="w-8 h-8 rounded-full object-cover"
            alt={d.name}
          />
          <span>{d.name}</span>
        </div>
      </td>

      {/* DEPARTMENT */}
      <td className="px-4 py-3">{d.department}</td>

      {/* ROLE */}
      <td className="px-4 py-3">{d.role}</td>

      {/* ATTENDANCE */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
          {["Present", "Late", "Absent", "Holiday", "Halfday"].map((s) => (
            <label key={s} className="flex items-center gap-1 whitespace-nowrap">
              <input
                type="radio"
                checked={d.attendance === s}
                onChange={() => updateAttendance(d.id, s)}
              />
              {s}
            </label>
          ))}
        </div>
      </td>

      {/* NOTES */}
      <td className="px-4 py-3">
        <input
          className="border rounded-lg px-2 py-1 text-xs w-full"
          placeholder="Notes"
        />
      </td>

    </tr>
  ))}
</tbody>
        </table>
        </div>
{/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >
      {/* TOP (PROFILE) */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={d.image}
            alt={d.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium leading-tight">{d.name}</p>
            <p className="text-xs text-blue-600">ID : {d.id}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            d.attendance === "Present"
              ? "bg-green-100 text-green-600"
              : d.attendance === "Absent"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {d.attendance}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Department</p>
          <p className="font-medium">{d.department}</p>
        </div>
        <div>
          <p className="text-gray-500">Role</p>
          <p className="font-medium">{d.role}</p>
        </div>
      </div>

      {/* ATTENDANCE */}
      <div className="flex flex-wrap gap-3 text-xs">
        {["Present", "Late", "Absent", "Holiday", "Halfday"].map((s) => (
          <label key={s} className="flex items-center gap-1">
            <input
              type="radio"
              checked={d.attendance === s}
              onChange={() => updateAttendance(d.id, s)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* NOTES */}
      <input
        placeholder="Notes"
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  ))}
</div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            {currentPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      
    </div>
  );
}
