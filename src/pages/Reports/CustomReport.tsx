import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Filter,
} from "lucide-react";

/* ================= DATA ================= */
const INITIAL_DATA = [
  {
    id: "CR1001",
    reportName: "Fees Collection Summary",
    category: "Finance",
    status: "Active",
    createdOn: "15 May 2024",
  },
  {
    id: "CR1002",
    reportName: "Exam Results Analysis",
    category: "Academic",
    status: "Active",
    createdOn: "14 May 2024",
  },
  {
    id: "CR1003",
    reportName: "Attendance Overview",
    category: "HRM",
    status: "Inactive",
    createdOn: "13 May 2024",
  },
  {
    id: "CR1004",
    reportName: "Payroll Summary",
    category: "Finance",
    status: "Active",
    createdOn: "12 May 2024",
  },
  {
    id: "CR1005",
    reportName: "Student Performance",
    category: "Academic",
    status: "Active",
    createdOn: "11 May 2024",
  },
  {
    id: "CR1006",
    reportName: "Library Usage",
    category: "Management",
    status: "Inactive",
    createdOn: "10 May 2024",
  },
  {
    id: "CR1007",
    reportName: "Transport Report",
    category: "Management",
    status: "Active",
    createdOn: "09 May 2024",
  },
  {
    id: "CR1008",
    reportName: "Hostel Occupancy",
    category: "Management",
    status: "Active",
    createdOn: "08 May 2024",
  },
  {
    id: "CR1009",
    reportName: "Leave Statistics",
    category: "HRM",
    status: "Active",
    createdOn: "07 May 2024",
  },
  {
    id: "CR1010",
    reportName: "Disciplinary Records",
    category: "Academic",
    status: "Inactive",
    createdOn: "06 May 2024",
  },
];

export default function CustomReports() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* CLOSE DROPDOWNS */
  useEffect(() => {
    const close = () => {
      setOpenCalendar(false);
      setOpenFilter(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  /* 📤 EXPORT */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Report Name,Category,Status,Created On"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.reportName},${d.category},${d.status},${d.createdOn}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "custom_reports.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.reportName.localeCompare(b.reportName)
          : b.reportName.localeCompare(a.reportName)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 SEARCH */
  const filtered = data.filter(
    (d) =>
      d.reportName.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Custom Reports</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Reports / Custom Reports
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2.5 border rounded-lg"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">Custom Report List</h3>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* DATE RANGE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenCalendar(!openCalendar);
                setOpenFilter(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
            >
              <CalendarDays size={14} /> Select Date Range
            </button>

            {/* FILTER */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenFilter(!openFilter);
                setOpenCalendar(false);
              }}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <Filter size={14} /> Filter
            </button>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} /> Sort A-Z
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            Row Per Page
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            Entries
          </div>

          <input
            placeholder="Search report or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-52"
            />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Report Name</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Created On</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3 text-center">{d.reportName}</td>
                <td className="px-4 py-3 text-center">{d.category}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      d.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{d.createdOn}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <Eye size={18} className="cursor-pointer" />
                    <Pencil size={18} className="cursor-pointer" />
                    <Trash2
                      size={18}
                      className="text-red-600 cursor-pointer"
                      onClick={() => setConfirmDeleteId(d.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
{/* ===== MOBILE & TABLET VIEW ===== */}
<div className="space-y-4 lg:hidden">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-xl p-4 space-y-3"
    >
      {/* TOP */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-blue-600">
          {d.id}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            d.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          ● {d.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Report:</span> {d.reportName}</p>
        <p><span className="text-gray-500">Category:</span> {d.category}</p>
        <p><span className="text-gray-500">Created:</span> {d.createdOn}</p>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button className="h-9 border rounded-lg text-sm">View</button>
        <button className="h-9 border rounded-lg text-sm">Edit</button>
        <button
          onClick={() => setConfirmDeleteId(d.id)}
          className="h-9 border rounded-lg text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end gap-2 px-4 py-4 border-t text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
     

      {/* DELETE CONFIRMATION */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this report?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setData((prev) =>
                    prev.filter((i) => i.id !== confirmDeleteId)
                  );
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
