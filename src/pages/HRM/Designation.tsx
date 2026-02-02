import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Eye, Pencil, Trash2,
  CalendarDays,
  Filter,
  Plus,
} from "lucide-react";
import AddDesignationModal from "../../components/tables/AddDesignationModal";

/* ================= DATA ================= */
const INITIAL_DATA = [
  { id: "DS748294", name: "Technical Head", status: "Active", date: "15 May 2024" },
  { id: "DS748293", name: "Accountant", status: "Active", date: "14 May 2024" },
  { id: "DS748292", name: "Teacher", status: "Active", date: "13 May 2024" },
  { id: "DS748291", name: "Librarian", status: "Active", date: "12 May 2024" },
  { id: "DS748290", name: "Doctor", status: "Inactive", date: "11 May 2024" },
  { id: "DS748289", name: "Driver", status: "Active", date: "10 May 2024" },
  { id: "DS748288", name: "Warden", status: "Active", date: "09 May 2024" },
  { id: "DS748287", name: "Receptionist", status: "Active", date: "08 May 2024" },
  { id: "DS748286", name: "Therapist", status: "Inactive", date: "07 May 2024" },
  { id: "DS748285", name: "Coach", status: "Active", date: "06 May 2024" },
];

export default function Designation() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
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

  /* 📤 EXPORT CSV */
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      ["ID,Designation,Status,Date"]
        .concat(data.map(d => `${d.id},${d.name},${d.status},${d.date}`))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "designation_list.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData(prev =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* 🔍 SEARCH */
  const filtered = data.filter(
    d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState<any>(null);
  
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Designation</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dashboard / HRM / Designation
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => window.print()} className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>
            <button onClick={handleExport} className="px-4 py-2 border rounded-lg text-sm">
              Export
            </button>
            <button
  onClick={() => setOpenAdd(true)}
  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1 text-sm"
  >
  <Plus size={14} /> Add Designation
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Designation List</h3>

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
                Select Date Range
              </button>

              {openCalendar && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-5 z-30"
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

                      const filteredByDate = INITIAL_DATA.filter(d => {
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
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFilter(!openFilter);
                }}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
              >
                <Filter size={14} /> Filter
              </button>

              {openFilter && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-30">
                  <button
                    onClick={() => {
                      setData(INITIAL_DATA.filter(d => d.status === "Active"));
                      setOpenFilter(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => {
                      setData(INITIAL_DATA.filter(d => d.status === "Inactive"));
                      setOpenFilter(false);
                    }}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                  >
                    Inactive
                  </button>
                </div>
              )}
            </div>

            <button onClick={handleSort} className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              <ArrowUpDown size={14} /> Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
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
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-52"
          />
        </div>
      </div>

     {/* ================= TABLE (DESKTOP ONLY) ================= */}
<div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
 <div className="min-w-[900px]">
  <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Designation</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(d => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3 text-center">{d.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    d.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    ● {d.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

   {/* VIEW */}
<button
  title="View"
  onClick={() => {
    setSelectedDesignation(d);
    setOpenView(true);
  }}
  className="p-1.5 rounded hover:bg-blue-50 text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>

{/* EDIT */}
<button
  title="Edit"
  onClick={() => {
    setSelectedDesignation(d);
    setOpenEdit(true);
  }}
  className="p-1.5 rounded hover:bg-green-50 text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>

    {/* DELETE */}
    <button
      onClick={() => setConfirmDeleteId(d.id)}
      className="p-1.5 rounded hover:bg-red-50 text-red-600 hover:text-red-700"
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
<div className="lg:hidden space-y-4">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-600 font-semibold">{d.id}</p>
          <p className="font-medium">{d.name}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            d.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {d.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Designation</p>
          <p className="font-medium">{d.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Created Date</p>
          <p className="font-medium">{d.date}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => {
            setSelectedDesignation(d);
            setOpenView(true);
          }}
          className="flex-1 h-10 border rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={() => {
            setSelectedDesignation(d);
            setOpenEdit(true);
          }}
          className="flex-1 h-10 border rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => setConfirmDeleteId(d.id)}
          className="w-10 h-10 border rounded-lg flex items-center justify-center text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  ))}
</div>

        {/* ✅ PAGINATION — INSIDE SAME WIDTH */}
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

 

      {openAdd && (
  <AddDesignationModal
    onClose={() => setOpenAdd(false)}
    onSave={(newItem) =>
      setData((prev) => [newItem, ...prev])
    }
  />
)}
{confirmDeleteId && (
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
{openView && selectedDesignation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Designation Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 text-sm">
        {[
          ["Designation ID", selectedDesignation.id],
          ["Designation Name", selectedDesignation.name],
          ["Status", selectedDesignation.status],
          ["Created Date", selectedDesignation.date],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg"
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
          onClick={() => {
            const csv =
              "data:text/csv;charset=utf-8," +
              "ID,Designation,Status,Date\n" +
              `${selectedDesignation.id},${selectedDesignation.name},${selectedDesignation.status},${selectedDesignation.date}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `designation_${selectedDesignation.name}.csv`;
            link.click();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>
    </div>
  </div>
)}
{openEdit && selectedDesignation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Designation</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-500">Designation Name</label>
          <input
            value={selectedDesignation.name}
            onChange={(e) =>
              setSelectedDesignation({
                ...selectedDesignation,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Status</label>
          <select
            value={selectedDesignation.status}
            onChange={(e) =>
              setSelectedDesignation({
                ...selectedDesignation,
                status: e.target.value,
              })
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
          onClick={() => setOpenEdit(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.map(item =>
                item.id === selectedDesignation.id
                  ? selectedDesignation
                  : item
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
