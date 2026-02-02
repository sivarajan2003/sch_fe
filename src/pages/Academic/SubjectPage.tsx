import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Eye, Pencil, Trash2,
  Plus,
  CalendarDays,
} from "lucide-react";
import AddSubjectModal from "../../components/AddSubjectModal";
import { useEffect } from "react";

/* ================= DATA ================= */

const INITIAL_DATA = [
  { id: "SU128394", name: "English", code: "101", type: "Theory", status: "Active" },
  { id: "SU128393", name: "Math", code: "102", type: "Theory", status: "Active" },
  { id: "SU128392", name: "Physics", code: "103", type: "Practical", status: "Active" },
  { id: "SU128391", name: "Chemistry", code: "104", type: "Practical", status: "Active" },
  { id: "SU128390", name: "Biology", code: "105", type: "Practical", status: "Inactive" },
  { id: "SU128389", name: "Spanish", code: "106", type: "Theory", status: "Active" },
  { id: "SU128388", name: "Higher Math", code: "107", type: "Theory", status: "Active" },
  { id: "SU128387", name: "Moral Education", code: "108", type: "Practical", status: "Inactive" },
  { id: "SU128386", name: "Economics", code: "110", type: "Theory", status: "Active" },
];

/* ================= PAGE ================= */

export default function SubjectPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openViewSubject, setOpenViewSubject] = useState(false);
  const [openEditSubject, setOpenEditSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  
  const [openAdd, setOpenAdd] = useState(false);
const [openDate, setOpenDate] = useState(false);
const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");

useEffect(() => {
  const closeMenu = () => {
    setOpenDate(false); // keep this if you still use date dropdown
  };

  window.addEventListener("click", closeMenu);
  return () => window.removeEventListener("click", closeMenu);
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
      ["ID,Name,Code,Type,Status"]
        .concat(
          data.map((s) =>
            `${s.id},${s.name},${s.code},${s.type},${s.status}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "subjects.csv";
    link.click();
  };

  /* 🔃 SORT */
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

  /* 🔍 FILTER */
  const filtered = data.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handleDownloadSubject = (s: any) => {
    const headers = ["ID,Name,Code,Type,Status"];
    const row = `${s.id},${s.name},${s.code},${s.type},${s.status}`;
  
    const csv =
      "data:text/csv;charset=utf-8," +
      [...headers, row].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${s.name}_subject_details.csv`;
    link.click();
  };
  
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-5">

{/* TOP ROW */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h2 className="text-2xl font-semibold">Subject</h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Academic / Subject
    </p>
  </div>
  <div className="flex flex-wrap gap-2 sm:gap-3">

    {/* REFRESH */}
    <button
      onClick={handleRefresh}
      className="p-2.5 border rounded-lg hover:bg-gray-50"
    >
      <RefreshCcw size={16} />
    </button>

    {/* PRINT */}
    <button
      onClick={() => window.print()}
      className="p-2.5 border rounded-lg hover:bg-gray-50"
    >
      <Printer size={16} />
    </button>

    {/* EXPORT */}
    <button
      onClick={handleExport}
      className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
    >
      Export
    </button>

    {/* ADD SUBJECT */}
    <button
  onClick={() => setOpenAdd(true)}
  className="
    w-full sm:w-auto
    px-4 py-2
    bg-blue-600
    text-white
    rounded-lg
    flex items-center justify-center gap-1
    text-sm font-medium
  "
>
  <Plus size={14} />
  Add Subject
</button>
  </div>
</div>
</div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-xl px-6 py-4 space-y-4">

  {/* TOP ROW */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h3 className="text-base font-semibold text-gray-900">
      Subject List
    </h3>

    <div className="flex flex-wrap gap-2">
      {/* DATE */}
      <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenDate(!openDate);
    }}
    className="
  flex items-center gap-2
  px-3 py-2
  border rounded-lg
  text-sm
  w-full sm:w-auto
  hover:bg-gray-50">
    <CalendarDays size={14} />
    {startDate} - {endDate}
  </button>

  {openDate && (
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-30 w-64">
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>

        <button
          onClick={() => setOpenDate(false)}
          className="w-full bg-blue-600 text-white text-sm py-1.5 rounded mt-2"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>


      {/* SORT */}
      <button
        onClick={handleSort}
        className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        <ArrowUpDown size={14} />
        Sort By A-Z
      </button>
    </div>
  </div>

  {/* BOTTOM ROW */}
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
      placeholder="Search"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="border rounded-lg px-3 py-2 text-sm w-full sm:w-52"
      />
  </div>
</div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <div className="min-w-[900px]">
  <table className="min-w-[900px] w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600">{s.id}</td>
                <td className="px-4 py-3 text-center">{s.name}</td>
                <td className="px-4 py-3 text-center">{s.code}</td>
                <td className="px-4 py-3 text-center">{s.type}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    ● {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-4">

    {/* VIEW */}
    <button
  title="View"
  onClick={() => {
    setSelectedSubject(s);
    setOpenViewSubject(true);
  }}
  className="text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>
<button
  title="Edit"
  onClick={() => {
    setSelectedSubject(s);
    setOpenEditSubject(true);
  }}
  className="text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>

    {/* DELETE */}
    <button
      title="Delete"
      onClick={() => setConfirmDeleteId(s.id)}
      className="text-red-600 hover:text-red-700"
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
        <div className="space-y-4 lg:hidden">
  {paginated.map((s) => (
    <div
      key={s.id}
      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-medium text-sm">
          {s.id}
        </span>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            s.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {s.status}
        </span>
      </div>

      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Name:</span> {s.name}</p>
        <p><span className="text-gray-500">Code:</span> {s.code}</p>
        <p><span className="text-gray-500">Type:</span> {s.type}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <button className="border rounded-lg py-2 text-sm">View</button>
        <button className="border rounded-lg py-2 text-sm">Edit</button>
        <button className="border rounded-lg py-2 text-sm text-red-600">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="page-btn">
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="page-btn">
            Next
          </button>
        </div>
      
      {openAdd && (
  <AddSubjectModal
    onClose={() => setOpenAdd(false)}
    onAdd={(subject) =>
      setData((prev) => [subject, ...prev])
    }
  />
)}

      {/* ADD MODAL 
      {openAdd && (
        <AddSubjectModal
          onClose={() => setOpenAdd(false)}
          onAdd={(subject) => setData((prev) => [subject, ...prev])}
        />
      )}*/}
      {confirmDeleteId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-sm p-6">

      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this subject?
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
            setData((prev) =>
              prev.filter((item) => item.id !== confirmDeleteId)
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
{openViewSubject && selectedSubject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Subject Details</h3>
        <button onClick={() => setOpenViewSubject(false)}>✕</button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 text-sm">
        {[
          ["Subject Name", selectedSubject.name],
          ["Code", selectedSubject.code],
          ["Type", selectedSubject.type],
          ["Status", selectedSubject.status],
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
          onClick={() => setOpenViewSubject(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>

        <button
          onClick={() => handleDownloadSubject(selectedSubject)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{openEditSubject && selectedSubject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Subject</h3>
        <button onClick={() => setOpenEditSubject(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <input
          value={selectedSubject.name}
          onChange={(e) =>
            setSelectedSubject({ ...selectedSubject, name: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Subject Name"
        />

        <input
          value={selectedSubject.code}
          onChange={(e) =>
            setSelectedSubject({ ...selectedSubject, code: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Code"
        />

        <select
          value={selectedSubject.type}
          onChange={(e) =>
            setSelectedSubject({ ...selectedSubject, type: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>Theory</option>
          <option>Practical</option>
        </select>

        <select
          value={selectedSubject.status}
          onChange={(e) =>
            setSelectedSubject({ ...selectedSubject, status: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenEditSubject(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((item) =>
                item.id === selectedSubject.id
                  ? selectedSubject
                  : item
              )
            );
            setOpenEditSubject(false);
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
