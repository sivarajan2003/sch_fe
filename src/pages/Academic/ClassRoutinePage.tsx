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

import AddRoutineModal from "../../components/AddRoutineModal";
import { useEffect } from "react";
/* ================= DATA ================= */

const ROUTINES = [
  {
    id: "RT167648",
    className: "I",
    section: "A",
    teacher: "Erickson",
    subject: "English",
    day: "Monday",
    start: "09:30 AM",
    end: "10:45 AM",
    room: "101",
    date: "2024-05-15",
  },
  {
    id: "RT167647",
    className: "I",
    section: "B",
    teacher: "Mori",
    subject: "Math",
    day: "Tuesday",
    start: "10:45 AM",
    end: "12:00 PM",
    room: "102",
    date: "2024-05-16",
  },
  {
    id: "RT167646",
    className: "II",
    section: "A",
    teacher: "Joseph",
    subject: "Physics",
    day: "Wednesday",
    start: "12:00 PM",
    end: "01:15 PM",
    room: "103",
    date: "2024-05-17",
  },
  {
    id: "RT167645",
    className: "II",
    section: "B",
    teacher: "James",
    subject: "Chemistry",
    day: "Thursday",
    start: "01:15 PM",
    end: "02:30 PM",
    room: "104",
    date: "2024-05-18",
  },
  {
    id: "RT167644",
    className: "II",
    section: "C",
    teacher: "Biology",
    subject: "Biology",
    day: "Friday",
    start: "02:30 PM",
    end: "03:45 PM",
    room: "105",
    date: "2024-05-19",
  },
  {
    id: "RT167643",
    className: "III",
    section: "A",
    teacher: "Teresa",
    subject: "Higher Math",
    day: "Saturday",
    start: "03:45 PM",
    end: "05:00 PM",
    room: "106",
    date: "2024-05-20",
  },
  {
    id: "RT167642",
    className: "III",
    section: "B",
    teacher: "James",
    subject: "Spanish",
    day: "Monday",
    start: "09:30 AM",
    end: "10:45 AM",
    room: "107",
    date: "2024-05-21",
  },
  {
    id: "RT167641",
    className: "IV",
    section: "A",
    teacher: "Hendrita",
    subject: "Moral Education",
    day: "Tuesday",
    start: "10:45 AM",
    end: "12:00 PM",
    room: "108",
    date: "2024-05-22",
  },
  {
    id: "RT167640",
    className: "IV",
    section: "B",
    teacher: "Morgan",
    subject: "Finance",
    day: "Wednesday",
    start: "12:00 PM",
    end: "01:15 PM",
    room: "109",
    date: "2024-05-23",
  },
  {
    id: "RT167639",
    className: "V",
    section: "A",
    teacher: "Ramsey",
    subject: "Economics",
    day: "Thursday",
    start: "01:15 PM",
    end: "02:30 PM",
    room: "110",
    date: "2024-05-24",
  },
];
   // ✅ FIXED TYPO (room instead of room

/* ================= PAGE ================= */

export default function ClassRoutinePage() {
  const STORAGE_KEY = "academic_class_routines";

  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ROUTINES;
  });
    //const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [openAddRoutine, setOpenAddRoutine] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [openViewRoutine, setOpenViewRoutine] = useState(false);
const [openEditRoutine, setOpenEditRoutine] = useState(false);
const [selectedRoutine, setSelectedRoutine] = useState<any>(null);

  const [startDate, setStartDate] = useState("2024-05-15");
  const [endDate, setEndDate] = useState("2024-05-24");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [openDate, setOpenDate] = useState(false);
const [openFilter, setOpenFilter] = useState(false);


useEffect(() => {
  const close = () => {
    setOpenDate(false);
    setOpenFilter(false);
  };
  window.addEventListener("click", close);
  return () => window.removeEventListener("click", close);
}, []);
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}, [data]);

  /* 🔄 REFRESH */
  const handleRefresh = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
    }
    setSearch("");
    setDayFilter(null);
    setCurrentPage(1);
  };
  

  /* 🖨 PRINT */
  const handlePrint = () => window.print();

  /* 📤 EXPORT CSV */
  const handleExport = () => {
    const headers = [
      "ID,Class,Section,Teacher,Subject,Day,Start,End,Room",
    ];
    const rows = data.map(
      (r) =>
        `${r.id},${r.className},${r.section},${r.teacher},${r.subject},${r.day},${r.start},${r.end},${r.room}`
    );
    const csv = "data:text/csv;charset=utf-8," + [...headers, ...rows].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "class_routine.csv";
    link.click();
  };

  /* 🔃 SORT */
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortAsc
        ? a.teacher.localeCompare(b.teacher)
        : b.teacher.localeCompare(a.teacher)
    );
    setData(sorted);
    setSortAsc(!sortAsc);
  };

  /* 🔍 FILTER + SEARCH */
  const filteredData = data
    .filter((r) =>
      dayFilter ? r.day === dayFilter : true
    )
    .filter(
      (r) =>
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.teacher.toLowerCase().includes(search.toLowerCase()) ||
        r.subject.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (r) => r.date >= startDate && r.date <= endDate
    );
// ================= PAGINATION LOGIC =================
const totalPages = Math.ceil(filteredData.length / rowsPerPage);

const paginatedData = filteredData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
const handleDownloadRoutine = (r: any) => {
  const headers = [
    "ID,Class,Section,Teacher,Subject,Day,Start,End,Room",
  ];

  const row = `${r.id},${r.className},${r.section},${r.teacher},${r.subject},${r.day},${r.start},${r.end},${r.room}`;

  const csv =
    "data:text/csv;charset=utf-8," +
    [...headers, row].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = `${r.id}_class_routine.csv`;
  link.click();
};

  return (
    <div className="space-y-6">
{/* ================= MAIN HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    {/* LEFT */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Class Routine
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / Academic / Class Routine
      </p>
    </div>

    {/* RIGHT ACTIONS */}
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={handleRefresh}
        className="p-2.5 border rounded-lg hover:bg-gray-50"
      >
        <RefreshCcw size={16} />
      </button>

      <button
        onClick={handlePrint}
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
      <button
  onClick={() => setOpenAddRoutine(true)}
  className="
    w-full sm:w-auto
    px-4 py-2
    bg-blue-600 hover:bg-blue-700
    text-white
    rounded-lg
    text-sm font-medium
  "
>
  + Add Class Routine
</button>
    </div>
    </div>
  </div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mt-6 space-y-4">

  {/* TOP ROW */}
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h3 className="text-lg font-semibold text-gray-900">
      Class Routine List
    </h3>

    <div className="flex flex-wrap gap-2">
    <div className="relative">
    <button
  onClick={(e) => {
    e.stopPropagation();     // ✅ STOP bubbling here
    setOpenDate(!openDate);  // ✅ Toggle calendar
    setOpenFilter(false);    // optional: close filter
  }}
  className="flex items-center gap-2
  px-3 py-2
  border rounded-lg
  text-sm
  w-full sm:w-auto hover:bg-gray-50"
>
  <CalendarDays size={16} />
  {startDate} - {endDate}
</button>


  {/* 📅 CALENDAR DROPDOWN */}
  {openDate && (
    <div className="absolute left-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-lg z-30 p-4">
      <label className="text-sm text-gray-600 block mb-1">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

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
  onClick={(e) => {
    e.stopPropagation();
    setOpenFilter(!openFilter);
    setOpenDate(false);
  }}
  className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  <Filter size={16} />
  Filter
</button>


  {/* 🔽 FILTER DROPDOWN */}
  {openFilter && (
    <div className="absolute left-0 top-full mt-2 w-44 bg-white border rounded-lg shadow-lg z-30">
      
      <button
        onClick={() => {
          setDayFilter("Monday");
          setOpenFilter(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Monday
      </button>

      <button
        onClick={() => {
          setDayFilter("Tuesday");
          setOpenFilter(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        Tuesday
      </button>

      <button
        onClick={() => {
          setDayFilter(null);
          setOpenFilter(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        Clear Filter
      </button>
    </div>
  )}
</div>

      <button
        onClick={handleSort}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        <ArrowUpDown size={16} />
        Sort By A-Z
      </button>
    </div>
  </div>

  {/* BOTTOM ROW */}
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      Row Per Page
      <select className="border rounded px-2 py-1 text-sm">
        <option>5</option>
        <option>10</option>
      </select>
      Entries
    </div>

    <input
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60"
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
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Teacher</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
          {paginatedData.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600">{r.id}</td>
                <td className="px-4 py-3 text-center">{r.className}</td>
                <td className="px-4 py-3 text-center">{r.section}</td>
                <td className="px-4 py-3 text-center">{r.teacher}</td>
                <td className="px-4 py-3 text-center">{r.subject}</td>
                <td className="px-4 py-3 text-center">{r.day}</td>
                <td className="px-4 py-3 text-center">{r.start}</td>
                <td className="px-4 py-3 text-center">{r.end}</td>
                <td className="px-4 py-3 text-center">{r.room}</td>

                <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-4">

    {/* VIEW */}
    <button
  title="View"
  onClick={() => {
    setSelectedRoutine(r);
    setOpenViewRoutine(true);
  }}
  className="text-gray-600 hover:text-blue-600"
>
  <Eye size={18} />
</button>
<button
  title="Edit"
  onClick={() => {
    setSelectedRoutine(r);
    setOpenEditRoutine(true);
  }}
  className="text-gray-600 hover:text-green-600"
>
  <Pencil size={18} />
</button>

    {/* DELETE */}
    <button
      title="Delete"
      onClick={() => setConfirmDeleteId(r.id)}
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
  {paginatedData.map((r) => (
    <div
      key={r.id}
      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-medium text-sm">
          {r.id}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
          {r.day}
        </span>
      </div>

      <div className="text-sm space-y-1">
        <p><span className="text-gray-500">Class:</span> {r.className} - {r.section}</p>
        <p><span className="text-gray-500">Teacher:</span> {r.teacher}</p>
        <p><span className="text-gray-500">Subject:</span> {r.subject}</p>
        <p><span className="text-gray-500">Time:</span> {r.start} – {r.end}</p>
        <p><span className="text-gray-500">Room:</span> {r.room}</p>
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

        {/* ================= PAGINATION ================= */}
<div className="flex items-center justify-end gap-2 px-4 py-3 text-sm border-t">
  {/* PREV */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className={`px-3 py-1.5 rounded border ${
      currentPage === 1
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Prev
  </button>

  {/* PAGE NUMBERS */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(0, 5)
    .map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-1.5 rounded border ${
          currentPage === page
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    ))}

  {totalPages > 5 && <span className="px-2">...</span>}

  {/* NEXT */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className={`px-3 py-1.5 rounded border ${
      currentPage === totalPages
        ? "text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100"
    }`}
  >
    Next
  </button>
</div>

      {openAddRoutine && (
  <AddRoutineModal
    onClose={() => setOpenAddRoutine(false)}
    onSave={(newRoutine) =>
      setData((prev) => [
        { ...newRoutine, id: newRoutine.id },
        ...prev,
      ])
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
{openViewRoutine && selectedRoutine && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Class Routine Details</h3>
        <button onClick={() => setOpenViewRoutine(false)}>✕</button>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          ["Class", selectedRoutine.className],
          ["Section", selectedRoutine.section],
          ["Teacher", selectedRoutine.teacher],
          ["Subject", selectedRoutine.subject],
          ["Day", selectedRoutine.day],
          ["Start Time", selectedRoutine.start],
          ["End Time", selectedRoutine.end],
          ["Room No", selectedRoutine.room],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg"
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenViewRoutine(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>

        <button
          onClick={() => handleDownloadRoutine(selectedRoutine)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Download
        </button>
      </div>

    </div>
  </div>
)}
{openEditRoutine && selectedRoutine && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Edit Class Routine</h3>
        <button onClick={() => setOpenEditRoutine(false)}>✕</button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <input
          value={selectedRoutine.teacher}
          onChange={(e) =>
            setSelectedRoutine({ ...selectedRoutine, teacher: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
          placeholder="Teacher"
        />

        <input
          value={selectedRoutine.subject}
          onChange={(e) =>
            setSelectedRoutine({ ...selectedRoutine, subject: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
          placeholder="Subject"
        />

        <input
          value={selectedRoutine.start}
          onChange={(e) =>
            setSelectedRoutine({ ...selectedRoutine, start: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
          placeholder="Start Time"
        />

        <input
          value={selectedRoutine.end}
          onChange={(e) =>
            setSelectedRoutine({ ...selectedRoutine, end: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
          placeholder="End Time"
        />

        <input
          value={selectedRoutine.room}
          onChange={(e) =>
            setSelectedRoutine({ ...selectedRoutine, room: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
          placeholder="Room"
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenEditRoutine(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((item) =>
                item.id === selectedRoutine.id
                  ? selectedRoutine
                  : item
              )
            );
            setOpenEditRoutine(false);
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
