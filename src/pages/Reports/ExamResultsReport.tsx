import api from "../../api/client";
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

export default function ExamResultsReport() {
  const isLocked = false; // 🔒 enable full blur lock
 //const userRole = "Admin";        //  change dynamically later
  //const isLocked = userRole !== "Admin";   //  Admin bypass lock
  const [data, setData] = useState<any[]>([]);
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

  const fetchExamResults = async () => {
    try {
      const res = await api.get("/studentexam"); const rows = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : []; setData(rows);
    } catch { }
  };
  useEffect(() => {
    fetchExamResults();
    const close = () => {
      setOpenCalendar(false);
      setOpenFilter(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    fetchExamResults();
    setSearch("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  /* 📤 EXPORT */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Student,Class,Subject,Marks,Result,Date"]
        .concat(
          data.map(
            (d) =>
              `${d.id},${d.student},${d.class},${d.subject},${d.marks},${d.result},${d.date}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "exam_results_report.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? (a.student ?? '').localeCompare(b.student)
          : (b.student ?? '').localeCompare(a.student)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 SEARCH */
  const filtered = data.filter(
    (d) =>
      (d.student ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (d.id ?? '').toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // return (
  //   <div className="space-y-6">
  return (
  <div className="relative">

    {/* 🔒 FULL PAGE BLUR LOCK */}
     {isLocked && (
  <div
    className="
      absolute inset-0 z-50
      bg-white/20
      backdrop-blur-sm
      flex items-center justify-center
      rounded-xl
    "
  >
        <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">

          <p className="text-sm font-semibold text-gray-800">
            Subscription Upgrade Required — Contact Atelier Creation
          </p>

          <button
            onClick={() => window.location.href = "tel:+919999999999"}
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg"
          >
            📞 Call Atelier
          </button>

        </div>
      </div>
    )}

    {/* ===== ORIGINAL CONTENT WRAPPER ===== */}
    <div className={`space-y-6 ${isLocked ? "pointer-events-none select-none" : ""}`}>
      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Exam Results Report</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / Reports / Exam Results
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">Exam Records</h3>

          <div className="flex flex-wrap gap-2 sm:gap-3">
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
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-5 z-30">
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">
                    Apply
                  </button>
                </div>
              )}
            </div>

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
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-30">
                  <button
                    onClick={() => {
                      setData(data.filter((d) => d.result === "Pass"));
                      setOpenFilter(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => {
                      setData(data.filter((d) => d.result === "Fail"));
                      setOpenFilter(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                  >
                    Fail
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
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-52"/>
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
              <th className="px-4 py-3 text-center">Subject</th>
              <th className="px-4 py-3 text-center">Marks</th>
              <th className="px-4 py-3 text-center">Result</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3 text-center">{d.student}</td>
                <td className="px-4 py-3 text-center">{d.class}</td>
                <td className="px-4 py-3 text-center">{d.subject}</td>
                <td className="px-4 py-3 text-center">{d.marks}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      d.result === "Pass"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {d.result}
                  </span>
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
            d.result === "Pass"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          ● {d.result}
        </span>
      </div>

      {/* DETAILS */}
      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Student:</span> {d.student}</p>
        <p><span className="text-gray-500">Class:</span> {d.class}</p>
        <p><span className="text-gray-500">Subject:</span> {d.subject}</p>
        <p><span className="text-gray-500">Marks:</span> {d.marks}</p>
        <p><span className="text-gray-500">Date:</span> {d.date}</p>
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


   </div>
    </div> 
  );
}
