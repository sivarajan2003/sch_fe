import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  CalendarDays,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddSportModal from "../../components/tables/AddSportModal";

/* ================= DATA ================= */
const INITIAL_DATA = [
  { id: "SP826329", name: "Cricket", coach: "Thomas", avatar: "https://i.pravatar.cc/40?img=11", year: 2004 },
  { id: "SP826328", name: "Throwball", coach: "Georgia", avatar: "https://i.pravatar.cc/40?img=12", year: 2005 },
  { id: "SP826327", name: "Football", coach: "Nicholas", avatar: "https://i.pravatar.cc/40?img=13", year: 2006 },
  { id: "SP826326", name: "Tennis", coach: "Sandra", avatar: "https://i.pravatar.cc/40?img=14", year: 2007 },
  { id: "SP826325", name: "Basketball", coach: "Jon", avatar: "https://i.pravatar.cc/40?img=15", year: 2008 },
  { id: "SP826324", name: "Badminton", coach: "Shannon", avatar: "https://i.pravatar.cc/40?img=16", year: 2009 },
  { id: "SP826323", name: "Carrom", coach: "Wilson", avatar: "https://i.pravatar.cc/40?img=17", year: 2010 },
  { id: "SP826322", name: "Chess", coach: "Sonia", avatar: "https://i.pravatar.cc/40?img=18", year: 2011 },
  { id: "SP826321", name: "Volleyball", coach: "Adams", avatar: "https://i.pravatar.cc/40?img=19", year: 2012 },
  { id: "SP826320", name: "Hockey", coach: "Lydia", avatar: "https://i.pravatar.cc/40?img=20", year: 2013 },
];

/* ================= PAGE ================= */
export default function Sports() {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
const [openAddSport, setOpenAddSport] = useState(false);

useEffect(() => {
  const close = () => {
    setOpenCalendar(false);
    setOpenFilter(false);
  };
  window.addEventListener("click", close);
  return () => window.removeEventListener("click", close);
}, []);
const [openView, setOpenView] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [selectedSport, setSelectedSport] = useState<any>(null);

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
    setCurrentPage(1);
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

  /* 🔍 SEARCH */
  const filtered = data.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handleExport = () => {
    const headers = ["ID", "Name", "Coach", "Started Year"];
  
    const rows = data.map((d) => [
      d.id,
      d.name,
      d.coach,
      d.year,
    ]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sports_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
  {/* BACK ARROW */}
  <button
    onClick={() => window.history.back()}
    className="p-2 -mt-1 rounded-lg hover:bg-gray-100"
    title="Go Back"
  >
    <ArrowLeft size={20} />
  </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold">Sports</h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Management / Sports
    </p>
  </div>
</div>


<div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => window.print()} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <Printer size={16} />
            </button>
            <button
  onClick={handleExport}
  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  Export
</button>

<button
  onClick={() => setOpenAddSport(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1"
>
  <Plus size={14} /> Add Sports
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold">Sports List</h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
          <div className="relative">
  <button
    onClick={(e) => {
      e.stopPropagation();
      setOpenCalendar(!openCalendar);
      setOpenFilter(false);
    }}
    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <CalendarDays size={14} />
    Select Date Range
  </button>

  {openCalendar && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-4 z-30"
    >
      <div className="space-y-4">
        
        {/* START DATE */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* END DATE */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* APPLY BUTTON */}
        <button
          onClick={() => {
            if (!startDate || !endDate) return;

            const from = new Date(startDate).getFullYear();
            const to = new Date(endDate).getFullYear();

            setData(
              INITIAL_DATA.filter(
                (d) => d.year >= from && d.year <= to
              )
            );

            setOpenCalendar(false);
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
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
      setOpenCalendar(false);
    }}
    className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <Filter size={14} />
    Filter
  </button>

  {openFilter && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-30"
    >
      <button
        onClick={() => {
          setData([...data].sort((a, b) => a.year - b.year));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Started Year (Oldest)
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => b.year - a.year));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Started Year (Newest)
      </button>

      <button
        onClick={() => {
          setData([...data].sort((a, b) => a.coach.localeCompare(b.coach)));
          setOpenFilter(false);
        }}
        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
      >
        Coach Name A–Z
      </button>
    </div>
  )}
</div>

            <button onClick={handleSort} className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
              <ArrowUpDown size={14} /> Sort By A-Z
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
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-52"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
      <div className="min-w-[900px]">

      <table className="min-w-[900px] w-full text-sm table-fixed">
      <thead className="bg-gray-50">
  <tr>
    <th className="px-4 py-3 w-[120px] text-center">ID</th>
    <th className="px-4 py-3 w-[180px] text-center">Name</th>
    <th className="px-4 py-3 w-[220px] text-left">Coach</th>
    <th className="px-4 py-3 w-[140px] text-center">Started Year</th>
    <th className="px-4 py-3 w-[120px] text-center">Action</th>
  </tr>
</thead>


          <tbody>
            {paginated.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3 text-center">{d.name}</td>

                <td className="px-4 py-3">
  <div className="flex items-center gap-3">
    <img
      src={d.avatar}
      className="w-8 h-8 rounded-full object-cover"
      alt={d.name}
    />
    <span className="whitespace-nowrap">{d.name}</span>
  </div>
</td>


                <td className="px-4 py-3 text-center">{d.year}</td>

                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    {/* VIEW */}
<button
  title="View"
  onClick={() => {
    setSelectedSport(d);
    setOpenView(true);
  }}
  className="p-2 rounded-full hover:bg-blue-50 text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>

{/* EDIT */}
<button
  title="Edit"
  onClick={() => {
    setSelectedSport(d);
    setOpenEdit(true);
  }}
  className="p-2 rounded-full hover:bg-green-50 text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>


    {/* DELETE */}
    <button
      title="Delete"
      onClick={() => setConfirmDeleteId(d.id)}
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
        {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
  {paginated.map((d) => (
    <div
      key={d.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >

      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={d.avatar}
            className="w-10 h-10 rounded-full object-cover"
            alt={d.name}
          />
          <div>
            <p className="font-semibold">{d.name}</p>
            <p className="text-xs text-gray-500">{d.id}</p>
          </div>
        </div>

        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          {d.year}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Sport</p>
          <p className="font-medium">{d.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Coach</p>
          <p className="font-medium">{d.coach}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            setSelectedSport(d);
            setOpenView(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => {
            setSelectedSport(d);
            setOpenEdit(true);
          }}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"
        >
          <Pencil size={14} /> Edit
        </button>

        <button
          onClick={() => setConfirmDeleteId(d.id)}
          className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm text-red-600"
        >
          <Trash2 size={14} /> Delete
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
  {confirmDeleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[340px] p-6">
      
      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        Are you sure you want to delete this sport?
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
              prev.filter((x) => x.id !== confirmDeleteId)
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
{openAddSport && (
  <AddSportModal
    onClose={() => setOpenAddSport(false)}
    onAdd={(newSport) =>
      setData((prev) => [
        {
          ...newSport,
          avatar: "https://i.pravatar.cc/40",
        },
        ...prev,
      ])
    }
  />
)}
{openView && selectedSport && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Sport Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        {[
          ["Sport ID", selectedSport.id],
          ["Sport Name", selectedSport.name],
          ["Coach", selectedSport.coach],
          ["Started Year", selectedSport.year],
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
              "ID,Name,Coach,Started Year\n" +
              `${selectedSport.id},${selectedSport.name},${selectedSport.coach},${selectedSport.year}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `sport_${selectedSport.id}.csv`;
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
{openEdit && selectedSport && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Sport</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-500">Sport Name</label>
          <input
            value={selectedSport.name}
            onChange={(e) =>
              setSelectedSport({ ...selectedSport, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Coach</label>
          <input
            value={selectedSport.coach}
            onChange={(e) =>
              setSelectedSport({ ...selectedSport, coach: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Started Year</label>
          <input
            type="number"
            value={selectedSport.year}
            onChange={(e) =>
              setSelectedSport({
                ...selectedSport,
                year: Number(e.target.value),
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
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
                item.id === selectedSport.id
                  ? selectedSport
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
