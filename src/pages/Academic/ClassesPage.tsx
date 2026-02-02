import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  Filter,
  ArrowUpDown,
  Plus,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddClassModal from "../../components/AddClassModal";
import { useEffect } from "react";
/* ================= CLASSES DATA ================= */

const initialClasses = [
  { id: "C138038", className: "I", section: "A", students: 30, subjects: 3, status: "Active",subjectList: ["Maths", "English", "Science"], },
  { id: "C138037", className: "I", section: "B", students: 25, subjects: 3, status: "Active",subjectList: ["Maths", "English", "Science"], },
  { id: "C138036", className: "II", section: "A", students: 40, subjects: 3, status: "Active" },
  { id: "C138035", className: "II", section: "B", students: 35, subjects: 3, status: "Active" },
  { id: "C138034", className: "II", section: "C", students: 25, subjects: 3, status: "Inactive" },
  { id: "C138033", className: "III", section: "A", students: 30, subjects: 3, status: "Active" },
  { id: "C138032", className: "III", section: "B", students: 25, subjects: 5, status: "Active" },
  { id: "C138031", className: "IV", section: "A", students: 20, subjects: 5, status: "Active" },
  { id: "C138030", className: "IV", section: "B", students: 30, subjects: 5, status: "Inactive" },
  { id: "C138029", className: "V", section: "A", students: 35, subjects: 5, status: "Active" },
];

/* ================= PAGE ================= */

export default function ClassesPage() {
  const STORAGE_KEY = "academic_classes";

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialClasses;
  });
    //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
const [selectedClass, setSelectedClass] = useState<any>(null);
const [openEditClass, setOpenEditClass] = useState(false);
const [editingClass, setEditingClass] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("2020-05-15");
  const [endDate, setEndDate] = useState("2024-05-24");
  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenDate(false);
    };

    if (openDate) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openDate]);
  
  const today = "15 May 2020 - 24 May 2024";
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);
  const handleRefresh = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
    }
    setStatusFilter("All");
    setSearch("");
    setCurrentPage(1);
  };
  

  /* 🖨 PRINT */
  const handlePrint = () => window.print();

  /* 📤 EXPORT */
  const handleExport = () => {
    const headers = ["ID", "Class", "Section", "Students", "Subjects", "Status"];
    const rows = data.map((c) =>
      [c.id, c.className, c.section, c.students, c.subjects, c.status].join(",")
    );

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "classes.csv";
    link.click();
  };

  /* 🔀 SORT */
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc"
        ? a.className.localeCompare(b.className)
        : b.className.localeCompare(a.className)
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  /* 🔍 FILTER */
  const filteredData = data
  .filter((c) =>
    statusFilter === "All" ? true : c.status === statusFilter
  )
  .filter((c) =>
    c.className.toLowerCase().includes(search.toLowerCase()) ||
    c.section.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
  const handleDownloadClass = (c: any) => {
    const headers = [
      "ID",
      "Class",
      "Section",
      "No of Students",
      "No of Subjects",
      "Status",
    ];
  
    const values = [
      c.id,
      c.className,
      c.section,
      c.students,
      c.subjects,
      c.status,
    ];
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), values.join(",")].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Class_${c.className}_${c.section}.csv`;
    link.click();
  };
  
  return (
<div className="space-y-6 px-3 sm:px-4 md:px-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    

    {/* LEFT */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Classes
      </h2>
      
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / Academic / Classes
      </p>
    </div>

    {/* RIGHT ACTIONS */}
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50">
        <RefreshCcw size={16} />
      </button>

      <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50">
        <Printer size={16} />
      </button>

      <button
        onClick={handleExport}
        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        Export
      </button>

      <button
        onClick={() => setOpenAddClass(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
      >
        <Plus size={14} /> Add Class
      </button>
    </div>
  </div>
</div>

{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

  {/* TOP ROW */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h3 className="text-lg font-semibold text-gray-900">
      Class List
    </h3>

    <div className="flex flex-wrap items-center gap-2">
    <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenDate(!openDate);
    }}
className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm w-full sm:w-auto"
  >
    <CalendarDays size={16} />
    {startDate} - {endDate}
  </button>

  {openDate && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-lg z-30 p-4"
    >
      {/* START DATE */}
      <label className="text-sm text-gray-600 block mb-1">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

      {/* END DATE */}
      <label className="text-sm text-gray-600 block mb-1">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

      <button
        onClick={() => setOpenDate(false)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
      >
        Apply
      </button>
    </div>
  )}
</div>
  <div className="relative">
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          <Filter size={16} />
          Filter
        </button>

        {openFilter && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-20">
            {["All", "Active", "Inactive"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s as any);
                  setOpenFilter(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSort}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        <ArrowUpDown size={16} />
        Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>
    </div>
  </div>

  {/* BOTTOM ROW */}
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      Row Per Page
      <select
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="border rounded px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
      Entries
    </div>

    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60"
      />
  </div>
</div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto hidden lg:block">
      <div className="min-w-[900px]">

  <table className="min-w-[900px] w-full text-sm">
  <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">No of Students</th>
              <th className="px-4 py-3">No of Subjects</th>
              <th className="px-4 py-3">Status</th>
<th className="px-4 py-3">Action</th>


            </tr>
          </thead>

          <tbody>
          {paginatedData.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600">{c.id}</td>
                <td className="px-4 py-3 text-center">{c.className}</td>
                <td className="px-4 py-3 text-center">{c.section}</td>
                <td className="px-4 py-3 text-center">{c.students}</td>
                <td className="px-4 py-3 text-center">{c.subjects}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    <button
  title="View"
  onClick={() => {
    setSelectedClass(c);
    setOpenViewModal(true);
  }}
  className="text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>

    {/* EDIT */}
    <button
  title="Edit"
  onClick={() => {
    setEditingClass(c);
    setOpenEditClass(true);
  }}
  className="text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>


    {/* DELETE */}
    <button
      title="Delete"
      onClick={() => setConfirmDeleteId(c.id)}
      className="text-red-500 hover:text-red-700"
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
        {/* ================= MOBILE / TAB CARD VIEW ================= */}
<div className="space-y-4 lg:hidden">
  {paginatedData.map((c) => (
    <div
      key={c.id}
      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        <span className="text-blue-600 text-sm font-medium">
          {c.id}
        </span>

        <span
          className={`px-3 py-1 text-xs rounded-full ${
            c.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {c.status}
        </span>
      </div>

      {/* MAIN INFO */}
      <div className="space-y-1 text-sm">
        <p>
          <span className="text-gray-500">Class:</span>{" "}
          <span className="font-medium">{c.className}</span>
        </p>

        <p>
          <span className="text-gray-500">Section:</span>{" "}
          <span className="font-medium">{c.section}</span>
        </p>

        <p>
          <span className="text-gray-500">Students:</span>{" "}
          <span className="font-medium">{c.students}</span>
        </p>

        <p>
          <span className="text-gray-500">Subjects:</span>{" "}
          <span className="font-medium">{c.subjects}</span>
        </p>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => {
            setSelectedClass(c);
            setOpenViewModal(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => {
            setEditingClass(c);
            setOpenEditClass(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Pencil size={14} /> Edit
        </button>

        <button
          onClick={() => setConfirmDeleteId(c.id)}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm text-red-600"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  ))}
</div>

        {/* PAGINATION */}
    <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
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
        onClick={() => setCurrentPage(p => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>

  
      {openAddClass && (
  <AddClassModal
    onClose={() => setOpenAddClass(false)}
    onAdd={(newClass) => setData((prev) => [newClass, ...prev])}
  />
)}
{confirmDeleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-sm p-6">

      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this class?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmDeleteId(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.filter(item => item.id !== confirmDeleteId)
            );
            setConfirmDeleteId(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}
{/* ================= VIEW CLASS MODAL ================= */}
{openViewModal && selectedClass && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Class Details
        </h3>
        <button
          onClick={() => setOpenViewModal(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 text-sm">

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">Class ID</span>
  <span className="font-medium">{selectedClass.id}</span>
</div>

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">Class</span>
  <span className="font-medium">{selectedClass.className}</span>
</div>

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">Section</span>
  <span className="font-medium">{selectedClass.section}</span>
</div>

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">No of Students</span>
  <span className="font-medium">{selectedClass.students}</span>
</div>

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">No of Subjects</span>
  <span className="font-medium">{selectedClass.subjects}</span>
</div>

<div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50">
  <span className="text-gray-500">Status</span>
  <span
    className={`px-3 py-1 text-xs rounded-full ${
      selectedClass.status === "Active"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600"
    }`}
  >
    {selectedClass.status}
  </span>
</div>

</div>

      {/* FOOTER */}
      <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
        <button
          onClick={() => setOpenViewModal(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>

        <button
          onClick={() => handleDownloadClass(selectedClass)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{openEditClass && editingClass && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Edit Class</h3>
        <button onClick={() => setOpenEditClass(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">

        <div>
          <label className="text-gray-500">Class</label>
          <input
            value={editingClass.className}
            onChange={(e) =>
              setEditingClass({ ...editingClass, className: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Section</label>
          <input
            value={editingClass.section}
            onChange={(e) =>
              setEditingClass({ ...editingClass, section: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">No of Students</label>
          <input
            type="number"
            value={editingClass.students}
            onChange={(e) =>
              setEditingClass({
                ...editingClass,
                students: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Status</label>
          <select
            value={editingClass.status}
            onChange={(e) =>
              setEditingClass({ ...editingClass, status: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenEditClass(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.map(item =>
                item.id === editingClass.id ? editingClass : item
              )
            );
            setOpenEditClass(false);
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
