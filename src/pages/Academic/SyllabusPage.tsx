import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  Plus,
  CalendarDays,
  Filter,
} from "lucide-react";
import AddSubjectGroupModal from "../../components/AddSubjectGroupModal";
import { useEffect } from "react";



//import AddSyllabusGroupModal from "../../components/AddSyllabusGroupModal";

/* ================= DATA ================= */

const INITIAL_DATA = [
  { id: 1, class: "I", section: "A", group: "I, C English", date: "10 May 2024", status: "Active" },
  { id: 2, class: "I", section: "B", group: "III, A Maths", date: "11 May 2024", status: "Active" },
  { id: 3, class: "II", section: "A", group: "II, A English", date: "12 May 2024", status: "Active" },
  { id: 4, class: "II", section: "B", group: "IV, A Physics", date: "13 May 2024", status: "Active" },
  { id: 5, class: "II", section: "C", group: "V, A Chemistry", date: "14 May 2024", status: "Active" },
  { id: 6, class: "III", section: "A", group: "III, B Maths", date: "15 May 2024", status: "Active" },
  { id: 7, class: "III", section: "B", group: "IV, B Chemistry", date: "16 May 2024", status: "Active" },
  { id: 8, class: "IV", section: "A", group: "I, B Maths", date: "17 May 2024", status: "Active" },
  { id: 9, class: "IV", section: "B", group: "VI, B Chemistry", date: "18 May 2024", status: "Active" },
  { id: 10, class: "V", section: "A", group: "IV, D Maths", date: "19 May 2024", status: "Active" },
];

/* ================= PAGE ================= */

export default function SyllabusPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    const handleOutside = () => setOpenCalendar(false);
    window.addEventListener("click", handleOutside);
  
    return () => window.removeEventListener("click", handleOutside);
  }, []);
    
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenFilter(false);
    };
  
    window.addEventListener("click", handleClickOutside);
  
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
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
      ["Class,Section,Subject Group,Created Date,Status"]
        .concat(
          data.map(
            (d) => `${d.class},${d.section},${d.group},${d.date},${d.status}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "subject_groups.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.group.localeCompare(b.group)
          : b.group.localeCompare(a.group)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 FILTER + SEARCH */
  const filtered = data.filter((d) => {
    const matchSearch =
      d.group.toLowerCase().includes(search.toLowerCase()) ||
      d.class.toLowerCase().includes(search.toLowerCase());
  
    if (!startDate || !endDate) return matchSearch;
  
    const rowDate = new Date(d.date);
    const from = new Date(startDate);
    const to = new Date(endDate);
  
    return matchSearch && rowDate >= from && rowDate <= to;
  });
  

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const handleDownloadSyllabus = (row: any) => {
    const headers = ["Class,Section,Subject Group,Created Date,Status"];
    const rowData = `${row.class},${row.section},${row.group},${row.date},${row.status}`;
  
    const csv =
      "data:text/csv;charset=utf-8," +
      [...headers, rowData].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `syllabus_${row.class}_${row.section}.csv`;
    link.click();
  };
    
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-5">

{/* TOP ROW */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h2 className="text-2xl font-semibold">
      Syllabus
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Academic / Syllabus
    </p>
  </div>

  {/* ACTION BUTTONS */}
  <div className="flex flex-wrap gap-2 sm:gap-3">

    {/* REFRESH */}
    <button
      onClick={handleRefresh}
      className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
    >
      <RefreshCcw size={16} />
    </button>

    {/* PRINT */}
    <button
      onClick={() => window.print()}
      className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
    >
      <Printer size={16} />
    </button>

    {/* EXPORT */}
    <button
      onClick={handleExport}
      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
    >
      Export
    </button>

    {/* ADD SUBJECT GROUP */}
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
  Add Subject Group
</button>
  </div>
</div>

</div>

{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-xl px-6 py-4 space-y-4">

  {/* TOP ROW */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h3 className="text-base font-semibold text-gray-900">
      Subject Group List
    </h3>

    <div className="flex flex-wrap gap-2">

      {/* DATE */}
      <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenCalendar(!openCalendar);
    }}
    className="
    flex items-center gap-2
    px-3 py-2
    border rounded-lg
    text-sm
    w-full sm:w-auto
    hover:bg-gray-50
  ">
    <CalendarDays size={14} />
    {startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Select Date Range"}
  </button>

  {/* DATE RANGE POPUP */}
  {openCalendar && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-30"
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={() => setOpenCalendar(false)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>


      {/* FILTER */}
<div className="relative">
  <button
onClick={(e) => {
  e.stopPropagation();
  setOpenFilter(!openFilter);
}}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <Filter size={14} />
    Filter
  </button>

  {openFilter && (
    <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-30 p-3 space-y-2">
      
      <p className="text-xs font-semibold text-gray-600">
        Status
      </p>

      <button
        onClick={() => {
          setSearch("Active");
          setOpenFilter(false);
        }}
        className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
      >
        Active
      </button>

      <button
        onClick={() => {
          setSearch("");
          setOpenFilter(false);
        }}
        className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
      >
        Clear Filter
      </button>
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
        className="border rounded px-2 py-1 text-sm"
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
      className="border rounded-lg px-3 py-2 text-sm w-full sm:w-52"/>
  </div>
</div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <div className="min-w-[900px]">

  <table className="min-w-[900px] w-full text-sm">
  <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 text-center">Class</th>
    <th className="px-4 py-3 text-center">Section</th>
    <th className="px-4 py-3 text-left">Subject Group</th>
    <th className="px-4 py-3 text-center">Created Date</th>
    <th className="px-4 py-3 text-center">Status</th>
    <th className="px-4 py-3 text-center">Action</th>
  </tr>
</thead>
<tbody>
  {paginated.map((d) => (
    <tr key={d.id} className="border-t hover:bg-gray-50">

      <td className="px-4 py-3 text-center">
        {d.class}
      </td>

      <td className="px-4 py-3 text-center">
        {d.section}
      </td>

      <td className="px-4 py-3 text-left">
        {d.group}
      </td>

      <td className="px-4 py-3 text-center">
        {d.date}
      </td>

      <td className="px-4 py-3 text-center">
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
          ● {d.status}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    <button
  title="View"
  onClick={() => {
    setSelectedRow(d);
    setOpenView(true);
  }}
  className="text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>
<button
  title="Edit"
  onClick={() => {
    setSelectedRow(d);
    setOpenEdit(true);
  }}
  className="text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>
    {/* DELETE */}
    <button
      onClick={() => setDeleteId(d.id)}
      className="text-red-600 hover:text-red-700"
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
<div className="space-y-4 lg:hidden">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">
          Class {d.class} - {d.section}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
          {d.status}
        </span>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <span className="text-gray-500">Subject Group:</span> {d.group}
        </p>
        <p>
          <span className="text-gray-500">Created Date:</span> {d.date}
        </p>
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
  <AddSubjectGroupModal
    onClose={() => setOpenAdd(false)}
    onAdd={(group) =>
      setData((prev) => [group, ...prev])
    }
  />
)}
{deleteId !== null && (
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
            setData(prev => prev.filter(item => item.id !== deleteId));
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
{openView && selectedRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Syllabus Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 text-sm">
        {[
          ["Class", selectedRow.class],
          ["Section", selectedRow.section],
          ["Subject Group", selectedRow.group],
          ["Created Date", selectedRow.date],
          ["Status", selectedRow.status],
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
          onClick={() => handleDownloadSyllabus(selectedRow)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{openEdit && selectedRow && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Subject Group</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <input
          value={selectedRow.class}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, class: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Class"
        />

        <input
          value={selectedRow.section}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, section: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Section"
        />

        <input
          value={selectedRow.group}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, group: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Subject Group"
        />

        <select
          value={selectedRow.status}
          onChange={(e) =>
            setSelectedRow({ ...selectedRow, status: e.target.value })
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
          onClick={() => setOpenEdit(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((item) =>
                item.id === selectedRow.id ? selectedRow : item
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
