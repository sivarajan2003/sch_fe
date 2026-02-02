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
    id: "FR10201",
    student: "Arjun",
    class: "X - A",
    amount: 15000,
    status: "Paid",
    date: "15 May 2024",
  },
  {
    id: "FR10202",
    student: "Priya",
    class: "IX - B",
    amount: 12000,
    status: "Pending",
    date: "14 May 2024",
  },
  {
    id: "FR10203",
    student: "Karthik",
    class: "VIII - C",
    amount: 10000,
    status: "Paid",
    date: "13 May 2024",
  },

  /* ✅ NEW 10 RECORDS */
  {
    id: "FR10204",
    student: "Sneha",
    class: "VII - A",
    amount: 9500,
    status: "Paid",
    date: "12 May 2024",
  },
  {
    id: "FR10205",
    student: "Rahul",
    class: "X - B",
    amount: 15500,
    status: "Pending",
    date: "11 May 2024",
  },
  {
    id: "FR10206",
    student: "Anitha",
    class: "IX - A",
    amount: 13000,
    status: "Paid",
    date: "10 May 2024",
  },
  {
    id: "FR10207",
    student: "Vignesh",
    class: "VIII - B",
    amount: 11000,
    status: "Paid",
    date: "09 May 2024",
  },
  {
    id: "FR10208",
    student: "Divya",
    class: "VI - A",
    amount: 9000,
    status: "Pending",
    date: "08 May 2024",
  },
  {
    id: "FR10209",
    student: "Suresh",
    class: "X - C",
    amount: 16000,
    status: "Paid",
    date: "07 May 2024",
  },
  {
    id: "FR10210",
    student: "Meena",
    class: "VII - B",
    amount: 9800,
    status: "Paid",
    date: "06 May 2024",
  },
  {
    id: "FR10211",
    student: "Naveen",
    class: "IX - C",
    amount: 12500,
    status: "Pending",
    date: "05 May 2024",
  },
  {
    id: "FR10212",
    student: "Pooja",
    class: "VIII - A",
    amount: 10500,
    status: "Paid",
    date: "04 May 2024",
  },
  {
    id: "FR10213",
    student: "Manoj",
    class: "X - A",
    amount: 15000,
    status: "Pending",
    date: "03 May 2024",
  },
];
export default function FeesReport() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

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

  /* 📤 EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Student,Class,Amount,Status,Date"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.student},${d.class},${d.amount},${d.status},${d.date}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "fees_collection_report.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.student.localeCompare(b.student)
          : b.student.localeCompare(a.student)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 SEARCH */
  const filtered = data.filter(
    (d) =>
      d.student.toLowerCase().includes(search.toLowerCase()) ||
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
            <h2 className="text-2xl font-semibold">
              Fees Collection Report
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Reports / Fees Collection
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => window.print()} className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>
            <button
  onClick={handleExport}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
>
  Export
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">Fees Records</h3>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* DATE RANGE */}
            {/* DATE RANGE */}
<div className="relative">
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

  {openCalendar && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-5 z-30"
    >
      <div className="mb-4">
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={() => {
          if (!startDate || !endDate) return;

          const filteredByDate = INITIAL_DATA.filter((d) => {
            const rowDate = new Date(d.date);
            return (
              rowDate >= new Date(startDate) &&
              rowDate <= new Date(endDate)
            );
          });

          setData(filteredByDate);
          setCurrentPage(1);
          setOpenCalendar(false);
        }}
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
      >
        Apply
      </button>
    </div>
  )}
</div>


            {/* FILTER */}
            {/* FILTER */}
<div className="relative">
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

  {openFilter && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-30"
    >
      <button
        onClick={() => {
          setData(INITIAL_DATA.filter((d) => d.status === "Paid"));
          setOpenFilter(false);
        }}
        className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
      >
        Paid
      </button>

      <button
        onClick={() => {
          setData(INITIAL_DATA.filter((d) => d.status === "Pending"));
          setOpenFilter(false);
        }}
        className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
      >
        Pending
      </button>
    </div>
  )}
</div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} /> Sort By Name
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
            placeholder="Search student or ID"
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
              <th className="px-4 py-3 text-center">Student</th>
              <th className="px-4 py-3 text-center">Class</th>
              <th className="px-4 py-3 text-center">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">
                  {d.id}
                </td>
                <td className="px-4 py-3 text-center">{d.student}</td>
                <td className="px-4 py-3 text-center">{d.class}</td>
                <td className="px-4 py-3 text-center">₹ {d.amount}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      d.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    ● {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedRow(d);
                        setOpenView(true);
                      }}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRow(d);
                        setOpenEdit(true);
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(d.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
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
            d.status === "Paid"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          ● {d.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Student:</span> {d.student}</p>
        <p><span className="text-gray-500">Class:</span> {d.class}</p>
        <p><span className="text-gray-500">Amount:</span> ₹ {d.amount}</p>
        <p><span className="text-gray-500">Date:</span> {d.date}</p>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => { setSelectedRow(d); setOpenView(true); }}
          className="h-9 border rounded-lg text-sm"
        >
          View
        </button>
        <button
          onClick={() => { setSelectedRow(d); setOpenEdit(true); }}
          className="h-9 border rounded-lg text-sm"
        >
          Edit
        </button>
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
<div className="flex justify-end items-center gap-2 px-4 py-4 border-t text-sm">
  {/* PREV */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`px-3 py-1 rounded border ${
      currentPage === 1
        ? "opacity-40 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Prev
  </button>

  {/* PAGE NUMBERS */}
  {Array.from({ length: totalPages }).map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded ${
        currentPage === i + 1
          ? "bg-blue-600 text-white"
          : "border hover:bg-gray-100"
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* NEXT */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`px-3 py-1 rounded border ${
      currentPage === totalPages
        ? "opacity-40 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Next
  </button>
</div>

     

      {/* DELETE CONFIRMATION */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this record?
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
