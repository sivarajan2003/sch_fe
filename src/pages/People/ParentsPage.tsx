import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  LayoutGrid,
  List,
  Filter,
  CalendarDays,
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import AddStudentModal from "../../components/AddStudentModal";
import p1 from "../../assets/par/p1.png";
import p2 from "../../assets/par/p2.png";
import p3 from "../../assets/par/p3.png";
import p4 from "../../assets/par/p4.png";
import p5 from "../../assets/par/p5.png";
import p6 from "../../assets/par/p6.png";
import p7 from "../../assets/par/p7.png";
import p8 from "../../assets/par/p8.png";
import p9 from "../../assets/par/p9.png";
import p10 from "../../assets/par/p10.png";
import p11 from "../../assets/par/p11.png";
import p12 from "../../assets/par/p12.png";
import s1 from "../../assets/stud/s1.png";
import s2 from "../../assets/stud/s2.png";
import s3 from "../../assets/stud/s3.png";
import s4 from "../../assets/stud/s4.png";
import s5 from "../../assets/stud/s5.png";
import s6 from "../../assets/stud/s6.png";
import s7 from "../../assets/stud/s7.png";
import s8 from "../../assets/stud/s8.png";
import s9 from "../../assets/stud/s9.png";
import s10 from "../../assets/stud/s10.png";

/* ================= PARENTS DATA ================= */

const parents = [
  {
    id: "P124556",
    name: "Ravi Kumar",
    added: "25 Mar 2024",
    email: "ravi@example.com",
    phone: "+1 65738 58937",
    image: p1,
    student: { name: "Ananya Sharma", image: s1 },
  },
  {
    id: "P124555",
    name: "Shabana",
    added: "18 Mar 2024",
    email: "shabana@example.com",
    phone: "+1 65738 58937",
    image: p2,
    student: { name: "Mohammed Arif", image: s2 },
  },
  {
    id: "P124554",
    name: "Ravi kumar",
    added: "14 Mar 2024",
    email: "john@example.com",
    phone: "+1 65738 58937",
    image: p3,
    student: { name: "Kavya", image: s3 },
  },
  {
    id: "P124552",
    name: "Arthur",
    added: "11 Feb 2024",
    email: "arth@example.com",
    phone: "+1 65738 58937",
    image: p4,
    student: { name: "Joseph Mathew", image: s4 },
  },
  {
    id: "P124551",
    name: "Colleen",
    added: "24 Jan 2024",
    email: "coll@example.com",
    phone: "+1 65738 58937",
    image: p5,
    student: { name: "Ayesha Khan", image: s5 },
  },
  {
    id: "P124550",
    name: "Robert",
    added: "19 Jan 2024",
    email: "rob@example.com",
    phone: "+1 65738 58937",
    image: p6,
    student: { name: "Rohit Verma", image: s6 },
  },
  {
    id: "P124548",
    name: "Michael",
    added: "22 Dec 2023",
    email: "mic@example.com",
    phone: "+1 65738 58937",
    image: p7,
    student: { name: "Maria", image: s7 },
  },
  {
    id: "P124547",
    name: "Mary",
    added: "15 Dec 2023",
    email: "mary@example.com",
    phone: "+1 65738 58937",
    image: p8,
    student: { name: "Suresh Kumar", image: s8 },
  },
  {
    id: "P124546",
    name: "Edwin",
    added: "10 Dec 2023",
    email: "edw@example.com",
    phone: "+1 65738 58937",
    image: p9,
    student: { name: "Fatima Noor", image: s9 },
  },
  {
    id: "P124553",
    name: "Claudia",
    added: "27 Feb 2024",
    email: "cla@example.com",
    phone: "+1 65738 58937",
    image: p10,
    student: { name: "Arvind", image: s10 },
  },
  {
    id: "P124549",
    name: "Jessie",
    added: "08 Jan 2024",
    email: "jes@example.com",
    phone: "+1 65738 58937",
    image: p11,
    student: { name: "Joann", image: s3 },
  },
  {
    id: "P124545",
    name: "Avila",
    added: "01 Dec 2023",
    email: "avi@example.com",
    phone: "+1 65738 58937",
    image: p12,
    student: { name: "Joann", image: s2 },
  },
];
  
/* ================= PAGE ================= */

export default function ParentsPage() {
  const [openDate, setOpenDate] = useState(false);
const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");

  const [openFilter, setOpenFilter] = useState(false);

  const today = "15 May 2020 - 24 May 2024";
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCalendar, setShowCalendar] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [parentsData, setParentsData] = useState(parents);
  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Added"];
    const rows = parentsData.map((p) =>
      [p.id, p.name, p.email, p.phone, p.added].join(",")
      
    );
    
    //const [selectedParent, setSelectedParent] = useState<any>(null);
    const [selectedParent, setSelectedParent] = useState(null);

    const [openDate, setOpenDate] = useState(false);

    const [startDate, setStartDate] = useState("2025-11-29");
    const [endDate, setEndDate] = useState("2025-12-29");
    
    const [dateRange, setDateRange] = useState("29-11-2025 - 29-12-2025");
    
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "parents.csv";
    link.click();
  };
  const handleSort = () => {
    const sorted = [...parentsData].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  
    setParentsData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  const [statusFilter, setStatusFilter] = useState<
  "All" | "Active" | "Inactive"
>("All");
const [openMenuId, setOpenMenuId] = useState<string | null>(null);
const [deleteId, setDeleteId] = useState<string | null>(null);
type Parent = {
  id: string;
  name: string;
  added: string;
  email: string;
  phone: string;
  image: string;
  student: {
    name: string;
    image: string;
  };
};
const [viewParent, setViewParent] = useState<Parent | null>(null);
const [editParent, setEditParent] = useState<Parent | null>(null);

const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
const downloadParentCSV = (parent: Parent) => {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Added On",
    "Student Name",
  ];

  const row = [
    parent.id,
    parent.name,
    parent.email,
    parent.phone,
    parent.added,
    parent.student.name,
  ];

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), row.join(",")].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = `${parent.name}.csv`;
  link.click();
};

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
<div className="bg-white border rounded-xl px-5 py-4 space-y-3">
<div className="flex items-center justify-between">
  {/* LEFT */}
  <div>
  <h2 className="text-2xl font-semibold text-gray-900">
      Parents
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / People / Parents
    </p>
  </div>

  {/* RIGHT ACTIONS */}
  <div className="flex items-center gap-2">
    <button
      onClick={() => setParentsData(parents)}
      className="p-2 border rounded-lg hover:bg-gray-50"
    >
      <RefreshCcw size={14} />
    </button>

    <button
      onClick={() => window.print()}
      className="p-2 border rounded-lg hover:bg-gray-50"
    >
      <Printer size={14} />
    </button>

    <button
      onClick={handleExport}
      className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50"
    >
      Export
    </button>

    <button
      onClick={() => setOpenAddStudent(true)}
      className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg"
    >
      Add Student
    </button>
  </div>
</div>

{/* DIVIDER */}
<div className="border-t" />

{/* ===== SUB HEADER ===== */}
<div className="flex items-center justify-between">

  {/* LEFT */}
  <div className="flex items-center gap-4">
  <h3 className="text-lg font-semibold text-gray-900">
      Parents Grid
    </h3>

   
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-3">
  {/* CALENDAR */}
<div className="relative">
  <button
    onClick={() => setOpenDate((prev) => !prev)}
    className="flex items-center gap-2 text-xs text-gray-500 border px-3 py-1.5 rounded-lg hover:bg-gray-50"
  >
    <CalendarDays size={14} />
    {startDate} - {endDate}
  </button>

  {openDate && (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3 z-30">
      
      <label className="text-xs text-gray-500">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-xs mb-2"
      />

      <label className="text-xs text-gray-500">End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded px-2 py-1 text-xs mb-3"
      />

      <div className="flex justify-between">
        <button
          onClick={() => setOpenDate(false)}
          className="text-xs text-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={() => setOpenDate(false)}
          className="text-xs text-blue-600 font-medium"
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
        onClick={() => setOpenFilter((prev) => !prev)}
        className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
      >
        <Filter size={14} />
        Filter
      </button>

      {openFilter && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-3 z-30">
          <p className="text-xs font-medium mb-2">Status</p>

          {(["All", "Active", "Inactive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setOpenFilter(false);
              }}
              className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* GRID / LIST */}
    <div className="flex border rounded-lg overflow-hidden">
      <button
        onClick={() => setView("grid")}
        className={`p-2 ${
          view === "grid"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600"
        }`}
      >
        <LayoutGrid size={14} />
      </button>

      <button
        onClick={() => setView("list")}
        className={`p-2 ${
          view === "list"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600"
        }`}
      >
        <List size={14} />
      </button>
    </div>

    {/* SORT */}
    <button
  onClick={handleSort}
  className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
>
  <ArrowUpDown size={14} />
  Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
</button>

  </div>
</div>
</div>

      {/* ================= GRID ================= */}
      {view === "grid" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{parentsData.map((p) => (
  <div
  key={p.id}
  className="
    bg-white border rounded-2xl p-3
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-lg
    active:scale-[0.98]
    cursor-pointer
  "
>

            {/* ID + MENU */}
            <div className="flex items-center justify-between text-xs text-blue-600 mb-4">
              <span>{p.id}</span>
              <div className="relative">
  <button
    onClick={() =>
      setOpenMenuId(openMenuId === p.id ? null : p.id)
    }
    className="p-1 rounded hover:bg-gray-100"
  >
    <MoreVertical size={16} className="text-gray-500" />
  </button>

  {/* DROPDOWN */}
  {openMenuId === p.id && (
    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
      
      <button
  onClick={() => {
    setOpenMenuId(null);
    setViewParent(p);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
>
  <Eye size={14} className="text-gray-600" />
  View
</button>
<button
  onClick={() => {
    setOpenMenuId(null);
    setEditParent(p);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
>
  <Pencil size={14} className="text-grag-600" />
  Edit
</button>
<button
  onClick={() => {
    setOpenMenuId(null);
    setDeleteId(p.id);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
>
  <Trash2 size={14} />
  Delete
</button>
    </div>
  )}
</div>
            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={p.image}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {p.name}
                </h4>
                <p className="text-xs text-gray-500">
                  Added on {p.added}
                </p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pb-3 border-b">
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-800">{p.email}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-gray-800">{p.phone}</p>
              </div>
            </div>

            {/* STUDENT + VIEW DETAILS */}
<div className="flex items-center justify-between mt-4">
  {/* STUDENT (LEFT) */}
  <div className="flex items-center gap-2">
    <img
      src={p.student.image}
      alt={p.student.name}
      className="w-7 h-7 rounded-full object-cover"
    />
    <span className="text-xs font-medium text-gray-700">
      {p.student.name}
    </span>
  </div>

  {/* VIEW DETAILS (RIGHT) */}
  <button
  onClick={() => setSelectedParent(p)}
  className="
    px-4 py-1.5
    text-xs font-medium
    text-gray-600
    bg-gray-100
    rounded-lg
    hover:bg-gray-200
    transition
  "
>
  View Details
</button>


</div>

          </div>
        ))}
      </div>

)}
{view === "list" && (
  <div className="bg-white border rounded-xl overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left">ID</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Phone</th>
          <th className="px-4 py-3">Added</th>
        </tr>
      </thead>
      <tbody>
        {parentsData.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="px-4 py-3">{p.id}</td>
            <td className="px-4 py-3">{p.name}</td>
            <td className="px-4 py-3">{p.email}</td>
            <td className="px-4 py-3">{p.phone}</td>
            <td className="px-4 py-3">{p.added}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {/* LOAD MORE */}
      <div className="flex justify-center">
        <button className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg">
          Load More
        </button>
      </div>
      
      {deleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80">
      <h3 className="text-lg font-semibold mb-2">
        Delete Parent?
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Are you sure you want to delete this parent?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setParentsData((prev) =>
              prev.filter((p) => p.id !== deleteId)
            );
            setDeleteId(null);
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
{selectedParent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[420px] p-6 relative">

      {/* CLOSE */}
      <button
        onClick={() => setSelectedParent(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-5">
        <img
          src={selectedParent.image}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {selectedParent.name}
          </h3>
          <p className="text-sm text-gray-500">
            Added on {selectedParent.added}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-5">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">
            {selectedParent.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">
            {selectedParent.phone}
          </p>
        </div>
      </div>

      {/* STUDENT */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <img
            src={selectedParent.student.image}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">
            {selectedParent.student.name}
          </span>
        </div>

        <span className="text-xs text-gray-500">
          Student
        </span>
      </div>

    </div>
  </div>
)}
{viewParent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[420px] p-6">

      <h3 className="text-lg font-semibold mb-4">
        Parent Details
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={viewParent.image}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium">{viewParent.name}</p>
          <p className="text-sm text-gray-500">
            Added on {viewParent.added}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <p><b>Email:</b> {viewParent.email}</p>
        <p><b>Phone:</b> {viewParent.phone}</p>
        <p><b>Student:</b> {viewParent.student.name}</p>
      </div>

      <div className="flex justify-between mt-6">
      <button
  onClick={() => downloadParentCSV(viewParent)}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
>
  Download
</button>


        <button
          onClick={() => setViewParent(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{editParent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[420px] p-6">

      <h3 className="text-lg font-semibold mb-4">
        Edit Parent
      </h3>

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editParent.name}
          onChange={(e) =>
            setEditParent({ ...editParent, name: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editParent.email}
          onChange={(e) =>
            setEditParent({ ...editParent, email: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editParent.phone}
          onChange={(e) =>
            setEditParent({ ...editParent, phone: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditParent(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setParentsData((prev) =>
              prev.map((p) =>
                p.id === editParent.id ? editParent : p
              )
            );
            setEditParent(null);
          }}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
}
