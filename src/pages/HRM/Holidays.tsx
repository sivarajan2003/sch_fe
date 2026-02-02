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
  Plus,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddHolidayModal from "../../components/tables/AddHolidayModal";

/* ================= HOLIDAY DATA ================= */
const INITIAL_DATA = [
  {
    id: "H752762",
    title: "New Year",
    date: "01 Jan 2024",
    description: "First day of the new year",
    status: "Active",
  },
  {
    id: "H752761",
    title: "Martin Luther King Jr. Day",
    date: "15 Jan 2024",
    description: "Celebrating the civil rights leader",
    status: "Active",
  },
  {
    id: "H752760",
    title: "Presidents' Day",
    date: "19 Feb 2024",
    description: "Honoring past US Presidents",
    status: "Active",
  },
  {
    id: "H752759",
    title: "Good Friday",
    date: "29 Mar 2024",
    description: "Holiday before Easter",
    status: "Active",
  },
  {
    id: "H752758",
    title: "Easter Monday",
    date: "01 Apr 2024",
    description: "Holiday after Easter",
    status: "Active",
  },
  {
    id: "H752757",
    title: "Memorial Day",
    date: "27 May 2024",
    description: "Honors military personnel",
    status: "Active",
  },
  {
    id: "H752756",
    title: "Independence Day",
    date: "04 Jul 2024",
    description: "Celebrates Independence",
    status: "Active",
  },
  {
    id: "H752755",
    title: "Labor Day",
    date: "02 Sep 2024",
    description: "Honors working people",
    status: "Active",
  },
  {
    id: "H752754",
    title: "Veterans Day",
    date: "11 Nov 2024",
    description: "Honors military veterans",
    status: "Active",
  },
  {
    id: "H752753",
    title: "Christmas Day",
    date: "25 Dec 2024",
    description: "Celebration of Christmas",
    status: "Active",
  },
];

/* ================= PAGE ================= */
export default function Holidays() {
  const navigate = useNavigate();

  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openAddHoliday, setOpenAddHoliday] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | null>(null);
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
    setCurrentPage(1);
  };

  /* 🔃 SORT */
  const handleSort = () => {
    setData(prev =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
    );
    setSortAsc(!sortAsc);
  };
  const handleExport = () => {
    const headers = ["ID", "Holiday Title", "Date", "Description", "Status"];
  
    const rows = data.map((h) => [
      h.id,
      h.title,
      h.date,
      h.description,
      h.status,
    ]);
  
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "holidays.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  /* 🔍 SEARCH */
  const filtered = data.filter(
    d =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
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
  const [selectedHoliday, setSelectedHoliday] = useState<any>(null);
  
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
  {/* BACK ARROW */}
  <button
onClick={() => window.history.back()}
    className="mt-1 p-2 rounded-lg hover:bg-gray-100"
    title="Go Back"
  >
    <ArrowLeft size={20} />
  </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold">Holidays</h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / HRM / Holidays
    </p>
  </div>
</div>

          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg">
              <RefreshCcw size={16} />
            </button>
            <button onClick={() => window.print()} className="p-2.5 border rounded-lg">
              <Printer size={16} />
            </button>
            <button
  onClick={handleExport}
  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  Export
</button>

<button
  onClick={() => setOpenAddHoliday(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1"
>
  + Add Holiday
</button>

          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border rounded-xl px-4 sm:px-6 py-4 space-y-4">
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold">Holidays List</h3>

          <div className="flex items-center gap-3">
            {/* DATE RANGE */}
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
    {startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Select Date Range"}
  </button>

  {openCalendar && (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-5 z-40"
    >
      {/* START DATE */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* END DATE */}
      <div className="mb-5">
        <label className="text-sm text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* APPLY */}
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
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
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
      className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-40"
    >
      <button
        onClick={() => {
          setStatusFilter("Active");
          setOpenFilter(false);
        }}
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
      >
        Active
      </button>

      <button
        onClick={() => {
          setStatusFilter("Inactive");
          setOpenFilter(false);
        }}
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
      >
        Inactive
      </button>

      <button
        onClick={() => {
          setStatusFilter(null);
          setData(INITIAL_DATA);
          setOpenFilter(false);
        }}
        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Clear
      </button>
    </div>
  )}
</div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <ArrowUpDown size={14} /> Sort By A-Z
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            Row Per Page
            <select
              className="border ml-2 px-2 py-1 rounded"
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            Entries
          </div>

          <input
  placeholder="Search"
  className="w-full sm:w-52 border rounded-lg px-3 py-2 text-sm"
  value={search}
  onChange={e => setSearch(e.target.value)}
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
              <th className="px-4 py-3 text-left">Holiday Title</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(d => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center text-blue-600">{d.id}</td>
                <td className="px-4 py-3">{d.title}</td>
                <td className="px-4 py-3 text-center">{d.date}</td>
                <td className="px-4 py-3">{d.description}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                    ● Active
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    {/* VIEW */}
<button
  title="View"
  onClick={() => {
    setSelectedHoliday(d);
    setOpenView(true);
  }}
  className="p-1 rounded hover:bg-blue-50 text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>

{/* EDIT */}
<button
  title="Edit"
  onClick={() => {
    setSelectedHoliday(d);
    setOpenEdit(true);
  }}
  className="p-1 rounded hover:bg-green-50 text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>

                    <Trash2
                      size={18}
                      className="cursor-pointer text-red-600"
                      onClick={() => setConfirmDeleteId(d.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div></div>
{/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4">
  {paginated.map((h) => (
    <div
      key={h.id}
      className="bg-white border rounded-2xl p-4 space-y-4"
    >
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-600 font-semibold">{h.id}</p>
          <p className="font-medium">{h.title}</p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
          {h.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-medium">{h.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Description</p>
          <p className="font-medium line-clamp-2">
            {h.description}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => {
            setSelectedHoliday(h);
            setOpenView(true);
          }}
          className="flex-1 h-10 border rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={() => {
            setSelectedHoliday(h);
            setOpenEdit(true);
          }}
          className="flex-1 h-10 border rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => setConfirmDeleteId(h.id)}
          className="w-10 h-10 border rounded-lg flex items-center justify-center text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
        
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

 

      {/* ================= DELETE CONFIRM ================= */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this holiday?
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
                    prev.filter(x => x.id !== confirmDeleteId)
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
      {openAddHoliday && (
  <AddHolidayModal
    onClose={() => setOpenAddHoliday(false)}
    onAdd={(newHoliday) =>
      setData((prev) => [newHoliday, ...prev])
    }
  />
)}
{openView && selectedHoliday && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Holiday Details</h3>
        <button onClick={() => setOpenView(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 text-sm">
        {[
          ["Holiday ID", selectedHoliday.id],
          ["Title", selectedHoliday.title],
          ["Date", selectedHoliday.date],
          ["Description", selectedHoliday.description],
          ["Status", selectedHoliday.status],
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
              "ID,Title,Date,Description,Status\n" +
              `${selectedHoliday.id},${selectedHoliday.title},${selectedHoliday.date},${selectedHoliday.description},${selectedHoliday.status}`;

            const link = document.createElement("a");
            link.href = encodeURI(csv);
            link.download = `holiday_${selectedHoliday.title}.csv`;
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
{openEdit && selectedHoliday && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-md p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Holiday</h3>
        <button onClick={() => setOpenEdit(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-500">Holiday Title</label>
          <input
            value={selectedHoliday.title}
            onChange={(e) =>
              setSelectedHoliday({ ...selectedHoliday, title: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Date</label>
          <input
            type="date"
            value={new Date(selectedHoliday.date)
              .toISOString()
              .split("T")[0]}
            onChange={(e) =>
              setSelectedHoliday({
                ...selectedHoliday,
                date: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Description</label>
          <textarea
            value={selectedHoliday.description}
            onChange={(e) =>
              setSelectedHoliday({
                ...selectedHoliday,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="text-gray-500">Status</label>
          <select
            value={selectedHoliday.status}
            onChange={(e) =>
              setSelectedHoliday({
                ...selectedHoliday,
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
                item.id === selectedHoliday.id
                  ? selectedHoliday
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
