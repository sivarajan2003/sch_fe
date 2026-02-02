import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Eye,
Pencil,
Trash2,
ArrowLeft,
  Plus,
  CalendarDays,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddExamModal from "../../components/AddExamModal";

/* ================= DATA ================= */

const INITIAL_DATA = [
  {
    id: "E140523",
    name: "Week Test",
    date: "13 May 2024",
    start: "09:30 AM",
    end: "10:45 AM",
  },
  {
    id: "E140522",
    name: "Monthly Test",
    date: "27 May 2024",
    start: "09:30 AM",
    end: "11:00 AM",
  },
  {
    id: "E140521",
    name: "Chapter Wise Test",
    date: "05 Jun 2024",
    start: "09:30 AM",
    end: "10:30 AM",
  },
  {
    id: "E140520",
    name: "Unit Test",
    date: "15 Jun 2024",
    start: "10:30 AM",
    end: "11:30 AM",
  },
  {
    id: "E140519",
    name: "Progress Test",
    date: "20 Jun 2024",
    start: "11:00 AM",
    end: "12:00 PM",
  },
  {
    id: "E140518",
    name: "Oral Test",
    date: "03 Jul 2024",
    start: "12:30 PM",
    end: "01:30 PM",
  },
  {
    id: "E140517",
    name: "Semester Exam",
    date: "18 Jul 2024",
    start: "10:30 AM",
    end: "12:30 PM",
  },
  {
    id: "E140516",
    name: "Quarterly Exam",
    date: "26 Aug 2024",
    start: "09:00 AM",
    end: "12:00 PM",
  },
  {
    id: "E140515",
    name: "Half Yearly Exam",
    date: "15 Nov 2024",
    start: "09:30 AM",
    end: "12:30 PM",
  },
  {
    id: "E140514",
    name: "Annual Exam",
    date: "10 Mar 2025",
    start: "10:00 AM",
    end: "01:00 PM",
  },
];

/* ================= PAGE ================= */

export default function ExamPage() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAddExam, setOpenAddExam] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [filterType, setFilterType] = useState<string | null>(null);
const [filterDate, setFilterDate] = useState<
  "Today" | "This Week" | "This Month" | null
>(null);

  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const close = () => setOpenFilter(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
    setCurrentPage(1);
  };

  /* 📤 EXPORT */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Exam Name,Exam Date,Start Time,End Time"]
        .concat(
          data.map(
            (d) => `${d.id},${d.name},${d.date},${d.start},${d.end}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "exam_list.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 FILTER */
  const filtered = data.filter((d) => {
    /* SEARCH */
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
  
    /* TYPE FILTER (Test / Exam) */
    const matchType = filterType
      ? d.name.toLowerCase().includes(filterType.toLowerCase())
      : true;
  
    /* DATE FILTER */
    const examDate = new Date(d.date);
    const today = new Date();
  
    let matchDate = true;
  
    if (filterDate === "Today") {
      matchDate =
        examDate.toDateString() === today.toDateString();
    }
  
    if (filterDate === "This Week") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
  
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
  
      matchDate = examDate >= weekStart && examDate <= weekEnd;
    }
  
    if (filterDate === "This Month") {
      matchDate =
        examDate.getMonth() === today.getMonth() &&
        examDate.getFullYear() === today.getFullYear();
    }
  
    return matchSearch && matchType && matchDate;
  });
  
  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const handleDownloadExam = (exam: any) => {
    const headers = ["ID,Exam Name,Exam Date,Start Time,End Time"];
    const row = `${exam.id},${exam.name},${exam.date},${exam.start},${exam.end}`;
  
    const csv =
      "data:text/csv;charset=utf-8," +
      [...headers, row].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `exam_${exam.id}.csv`;
    link.click();
  };
    
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5 space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
  {/* BACK ARROW */}
  <button
       onClick={() => navigate("/admin/dashboard")}
    className="mt-1 p-2 rounded-lg hover:bg-gray-100"
    title="Go Back"
  >
    <ArrowLeft size={20} />
  </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold">Exam</h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Academic / Exam
    </p>
  </div>
</div>

<div className="flex flex-wrap gap-2 sm:gap-3">

            <button
              onClick={handleRefresh}
              className="p-2.5 border rounded-lg hover:bg-gray-50"
            >
              <RefreshCcw size={16} />
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 border rounded-lg hover:bg-gray-50"
            >
              <Printer size={16} />
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Export
            </button>

            {/* ➕ ADD EXAM */}
            <button
  onClick={() => setOpenAddExam(true)}
  className="
    h-10 w-full
    lg:w-auto
    px-4
    bg-blue-600 hover:bg-blue-700
    text-white
    rounded-lg
    text-sm font-medium
    flex items-center justify-center gap-1
  "
>
  <Plus size={14} />
  Add Exam
</button>
        </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-base font-semibold">Exam List</h3>

          <div className="flex flex-wrap gap-2">
          <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenCalendar(!openCalendar);
    }}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <CalendarDays size={14} />
    {fromDate && toDate
      ? `${fromDate} - ${toDate}`
      : "Select Date Range"}
  </button>

  {/* 📅 DATE PICKER */}
  {openCalendar && (
    <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg p-4 z-30 w-64 space-y-3">
      <div>
        <label className="text-xs text-gray-500">From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500">To</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => {
            setFromDate("");
            setToDate("");
            setOpenCalendar(false);
          }}
          className="px-3 py-1 text-sm border rounded-lg"
        >
          Clear
        </button>

        <button
          onClick={() => setOpenCalendar(false)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFilter(!openFilter);
                }}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
              >
                <Filter size={14} />
                Filter
              </button>

              {openFilter && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute right-0 mt-2 w-60 bg-white border rounded-2xl shadow-xl z-30 p-4 space-y-4"
  >
    {/* EXAM TYPE */}
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-2">
        Exam Type
      </p>

      {["Test", "Exam"].map((type) => (
        <button
          key={type}
          onClick={() => setFilterType(type)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm
            ${
              filterType === type
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
        >
          {type}
        </button>
      ))}
    </div>

    {/* DATE */}
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-2">
        Date
      </p>

      {["Today", "This Week", "This Month"].map((d) => (
        <button
          key={d}
          onClick={() => setFilterDate(d as any)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm
            ${
              filterDate === d
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
        >
          {d}
        </button>
      ))}
    </div>

    {/* CLEAR */}
    <button
      onClick={() => {
        setFilterType(null);
        setFilterDate(null);
        setSearch("");
        setOpenFilter(false);
      }}
      className="w-full text-center text-sm text-red-600 pt-2 hover:underline"
    >
      Clear Filters
    </button>
  </div>
)}


            </div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} />
              Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Rows Per Page
            <select
              className="border ml-2 px-2 py-1 rounded"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <input
            placeholder="Search"
            className="border rounded-lg px-3 py-2 text-sm w-full lg:w-52"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <div className="min-w-[900px]">

  <table className="min-w-[900px] w-full text-sm">

        <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 text-center">ID</th>
    <th className="px-4 py-3 text-left">Exam Name</th>
    <th className="px-4 py-3 text-center">Exam Date</th>
    <th className="px-4 py-3 text-center">Start Time</th>
    <th className="px-4 py-3 text-center">End Time</th>
    <th className="px-4 py-3 text-center">Action</th>
  </tr>
</thead>


          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
              {/* ID */}
              <td className="px-4 py-3 text-center text-blue-600 cursor-pointer">
                {d.id}
              </td>
            
              {/* Exam Name */}
              <td className="px-4 py-3 text-left">
                {d.name}
              </td>
            
              {/* Exam Date */}
              <td className="px-4 py-3 text-center">
                {d.date}
              </td>
            
              {/* Start Time */}
              <td className="px-4 py-3 text-center">
                {d.start}
              </td>
            
              {/* End Time */}
              <td className="px-4 py-3 text-center">
                {d.end}
              </td>
            
              {/* Action */}
              <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    <button
  onClick={() => {
    setSelectedExam(d);
    setOpenView(true);
  }}
  className="text-gray-600 hover:text-blue-600"
  title="View"
>
  <Eye size={18} />
</button>
<button
  onClick={() => {
    setSelectedExam(d);
    setOpenEdit(true);
  }}
  className="text-gray-600 hover:text-green-600"
  title="Edit"
>
  <Pencil size={18} />
</button>
    {/* DELETE */}
    <button
  onClick={() => setDeleteId(d.id)}
  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded"
  title="Delete"
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
      </div>
        {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="space-y-4 lg:hidden">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-xl p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-medium text-sm">
          {d.id}
        </span>
        <span className="text-xs text-gray-500">
          {d.date}
        </span>
      </div>

      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Exam:</span> {d.name}</p>
        <p><span className="text-gray-500">Start:</span> {d.start}</p>
        <p><span className="text-gray-500">End:</span> {d.end}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => { setSelectedExam(d); setOpenView(true); }}
          className="border rounded-lg py-2 text-sm"
        >
          View
        </button>
        <button
          onClick={() => { setSelectedExam(d); setOpenEdit(true); }}
          className="border rounded-lg py-2 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteId(d.id)}
          className="border rounded-lg py-2 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
<div className="flex items-center justify-end gap-2 px-4 py-3 border-t text-sm">

{/* PREVIOUS */}
<button
  disabled={currentPage === 1}
  onClick={() => setCurrentPage((p) => p - 1)}
  className={`px-3 py-1 rounded-lg border
    ${
      currentPage === 1
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-50"
    }`}
>
  Prev
</button>

{/* PAGE NUMBERS */}
{Array.from({ length: totalPages }).map((_, i) => {
  const page = i + 1;
  return (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`w-8 h-8 rounded-lg border
        ${
          currentPage === page
            ? "bg-blue-600 text-white border-blue-600"
            : "hover:bg-gray-50"
        }`}
    >
      {page}
    </button>
  );
})}

{/* NEXT */}
<button
  disabled={currentPage === totalPages}
  onClick={() => setCurrentPage((p) => p + 1)}
  className={`px-3 py-1 rounded-lg border
    ${
      currentPage === totalPages
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-50"
    }`}
>
  Next
</button>
</div>

      {openAddExam && (
  <AddExamModal
    onClose={() => setOpenAddExam(false)}
    onAdd={(newExam) =>
      setData((prev) => [newExam, ...prev])
    }
  />
)}
{deleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-sm p-6">

      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this block?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.filter(item => item.id !== deleteId)
            );
            setDeleteId(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}
{openView && selectedExam && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Exam Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        {[
          ["Exam ID", selectedExam.id],
          ["Exam Name", selectedExam.name],
          ["Exam Date", selectedExam.date],
          ["Start Time", selectedExam.start],
          ["End Time", selectedExam.end],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between px-4 py-3 bg-gray-50 rounded-lg"
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenView(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>

        <button
          onClick={() => handleDownloadExam(selectedExam)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{openEdit && selectedExam && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Exam</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <input
          value={selectedExam.name}
          onChange={(e) =>
            setSelectedExam({ ...selectedExam, name: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Exam Name"
        />

        <input
          type="date"
          value={selectedExam.date}
          onChange={(e) =>
            setSelectedExam({ ...selectedExam, date: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          value={selectedExam.start}
          onChange={(e) =>
            setSelectedExam({ ...selectedExam, start: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Start Time"
        />

        <input
          value={selectedExam.end}
          onChange={(e) =>
            setSelectedExam({ ...selectedExam, end: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="End Time"
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenEdit(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((item) =>
                item.id === selectedExam.id ? selectedExam : item
              )
            );
            setOpenEdit(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Update
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
