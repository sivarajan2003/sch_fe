import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Mail,
  Phone,
  Plus,
  Eye,
  Pencil,CalendarDays,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";

import AddTeacherModal from "../../components/AddTeacherModal";
import t1 from "../../assets/tech/t1.png";
import t2 from "../../assets/tech/t2.png";
import t3 from "../../assets/tech/t3.png";
import t4 from "../../assets/tech/t4.png";
import t5 from "../../assets/tech/t5.png";
import t6 from "../../assets/tech/t6.png";
import t7 from "../../assets/tech/t7.png";
import t8 from "../../assets/tech/t8.png";
import t9 from "../../assets/tech/t9.png";
import t10 from "../../assets/tech/t10.png";
import t11 from "../../assets/tech/t11.png";
import t12 from "../../assets/tech/t12.png";

/* ================= TEACHERS DATA ================= */

const teachers = [
  {
    id: "T849127",
    name: "Teresa",
    class: "III A",
    subject: "Physics",
    email: "teresa@example.com",
    phone: "+91 82932 7359",
    status: "Active",
    image: t1,
  },
  {
    id: "T849126",
    name: "Daniel",
    class: "II A",
    subject: "Computer",
    email: "daniel@example.com",
    phone: "+91 56752 8642",
    status: "Active",
    image: t2,
  },
  {
    id: "T849125",
    name: "Hellana",
    class: "VI A",
    subject: "English",
    email: "hellana@example.com",
    phone: "+91 23566 52683",
    status: "Active",
    image: t3,
  },
  {
    id: "T849124",
    name: "Erickson",
    class: "VI B",
    subject: "Spanish",
    email: "erickson@example.com",
    phone: "+91 42598 85573",
    status: "Active",
    image: t4,
  },
  {
    id: "T849123",
    name: "Morgan",
    class: "VIII",
    subject: "Env Science",
    email: "morgan@example.com",
    phone: "+91 63204 35730",
    status: "Active",
    image: t5,
  },
  {
    id: "T849122",
    name: "Aaron",
    class: "I A",
    subject: "Chemistry",
    email: "aaron@example.com",
    phone: "+91 26267 80542",
    status: "Inactive",
    image: t6,
  },
  {
    id: "T849121",
    name: "Jacqueline",
    class: "IV",
    subject: "Maths",
    email: "jacqueline@example.com",
    phone: "+91 77502 54845",
    status: "Active",
    image: t7,
  },
  {
    id: "T849120",
    name: "Raul",
    class: "IX",
    subject: "Biology",
    email: "raul@example.com",
    phone: "+91 67845 78784",
    status: "Active",
    image: t8,
  },
  {
    id: "T849119",
    name: "Elizabeth",
    class: "VIII",
    subject: "Finance",
    email: "elizabeth@example.com",
    phone: "+91 23566 52683",
    status: "Active",
    image: t9,
  },
  {
    id: "T849118",
    name: "Edward",
    class: "IX C",
    subject: "Economics",
    email: "edward@example.com",
    phone: "+91 14259 85573",
    status: "Active",
    image: t10,
  },
  {
    id: "T849117",
    name: "Maria",
    class: "X",
    subject: "Spanish",
    email: "maria@example.com",
    phone: "+91 97846 84518",
    status: "Active",
    image: t11,
  },
  {
    id: "T849116",
    name: "Jacky",
    class: "VI A",
    subject: "English",
    email: "jacky@example.com",
    phone: "+91 98392 37378",
    status: "Active",
    image: t12,
  },
];

/* ================= PAGE ================= */

export default function TeachersPage() {
  const [openAddTeacher, setOpenAddTeacher] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
const [openDetails, setOpenDetails] = useState(false);
const [openFilter, setOpenFilter] = useState(false);
const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  const [view, setView] = useState<"grid" | "table">("grid");
  const [data, setData] = useState(teachers);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openDate, setOpenDate] = useState(false);

  const [startDate, setStartDate] = useState("2020-05-15");
  const [endDate, setEndDate] = useState("2024-05-24");
  const [viewTeacher, setViewTeacher] = useState<any>(null);
const [editTeacher, setEditTeacher] = useState<any>(null);
const [deleteTeacher, setDeleteTeacher] = useState<any>(null);

  /* SORT */
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  /* EXPORT */
  const handleExport = () => {
    const headers = ["ID", "Name", "Class", "Subject", "Email", "Phone", "Status"];
    const rows = data.map((t) =>
      [t.id, t.name, t.class, t.subject, t.email, t.phone, t.status].join(",")
    );
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "teachers.csv";
    link.click();
  };
  const filteredData =
  statusFilter === "All"
    ? data
    : data.filter((t) => t.status === statusFilter);
    useEffect(() => {
      const today = new Date();
      const past = new Date();
      past.setDate(today.getDate() - 30);
    
      setStartDate(past.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }, []);
    const downloadTeacherCSV = (teacher: any) => {
      const headers = [
        "ID",
        "Name",
        "Class",
        "Subject",
        "Email",
        "Phone",
        "Status",
      ];
    
      const row = [
        teacher.id,
        teacher.name,
        teacher.class,
        teacher.subject,
        teacher.email,
        teacher.phone,
        teacher.status,
      ];
    
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), row.join(",")].join("\n");
    
      const link = document.createElement("a");
      link.href = encodeURI(csvContent);
      link.download = `${teacher.name}.csv`;
      link.click();
    };
    
  return (
    <div className="space-y-6">
{/* ================= HEADER + SUBHEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-4">

  {/* ===== TOP HEADER ===== */}
  <div className="flex items-center justify-between">
    {/* LEFT */}
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Teachers
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / People / Teachers
      </p>
    </div>

    {/* RIGHT ACTIONS */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => setData(teachers)}
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
        onClick={() => setOpenAddTeacher(true)}
        className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg font-medium"
      >
        Add Teacher
      </button>
    </div>
  </div>

  {/* DIVIDER */}
  <div className="border-t" />

  {/* ===== SUB HEADER ===== */}
  <div className="flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-4">
    <h4 className="text-lg font-semibold text-gray-900">
        Teachers Grid
      </h4>

      
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-2">
    {/* CALENDAR */}
<div className="relative">
  <button
    onClick={() => setOpenDate((prev) => !prev)}
    className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs text-gray-500 hover:bg-gray-50"
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
          className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs hover:bg-gray-50"
        >
          <Filter size={14} />
          Filter
        </button>

        {openFilter && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg p-2 z-20">
            {["All", "Active", "Inactive"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s as any);
                  setOpenFilter(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-xs rounded hover:bg-gray-100"
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
              : "text-gray-600"
          }`}
        >
          <LayoutGrid size={14} />
        </button>

        <button
          onClick={() => setView("table")}
          className={`p-2 ${
            view === "table"
              ? "bg-blue-600 text-white"
              : "text-gray-600"
          }`}
        >
          <List size={14} />
        </button>
      </div>

      {/* SORT */}
      <button
        onClick={handleSort}
        className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs hover:bg-gray-50"
      >
        <ArrowUpDown size={14} />
        Sort By A-Z
      </button>
    </div>
  </div>
</div>


      {/* ================= GRID ================= */}
      
      {view === "grid" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.slice(0, visibleCount).map((t) => (
              <div
  key={t.id}
  className="
    bg-white border rounded-2xl
    p-3
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-lg
    active:scale-[0.98]
    cursor-pointer
  "
>

                {/* TOP BAR */}
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <span className="text-xs text-blue-600">{t.id}</span>

                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {t.status}
                  </span>

                  <div className="relative">
                    <button onClick={() => setOpenMenu(openMenu === t.id ? null : t.id)}>
                      <MoreVertical size={16} />
                    </button>

                    {openMenu === t.id && (
  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-20">

    {/* VIEW */}
    <button
      onClick={() => {
        setOpenMenu(null);
        setViewTeacher(t);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
    >
      <Eye size={14} /> View
    </button>

    {/* EDIT */}
    <button
      onClick={() => {
        setOpenMenu(null);
        setEditTeacher(t);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
    >
      <Pencil size={14} /> Edit
    </button>

    {/* DELETE */}
    <button
      onClick={() => {
        setOpenMenu(null);
        setDeleteTeacher(t);
      }}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      <Trash2 size={14} /> Delete
    </button>

  </div>
)}
                  </div>
                </div>

                {/* PROFILE */}
                <div className="flex items-center gap-3 mb-3 px-1">
                  <img src={t.image} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.class}</p>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="border-t border-b py-3 text-xs text-gray-600 space-y-1 mb-3">
                  <p className="flex gap-1 items-center">
                    <Mail size={12} /> {t.email}
                  </p>
                  <p className="flex gap-1 items-center">
                    <Phone size={12} /> {t.phone}
                  </p>
                </div>

                {/* SUBJECT + VIEW */}
                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600">
                    {t.subject}
                  </span>
                  <button
  onClick={() => {
    setSelectedTeacher(t);
    setOpenDetails(true);
  }}
  className="text-xs bg-gray-200 px-3 py-1 rounded"
>
  View Details
</button>

                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          {visibleCount < filteredData.length && (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => setVisibleCount((v) => v + 4)}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg"
    >
      Load More
    </button>
  </div>
)}

        </>
      )}
      
      {openDetails && selectedTeacher && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[400px] p-6">

      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedTeacher.image}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{selectedTeacher.name}</h3>
          <p className="text-sm text-gray-500">
            {selectedTeacher.class} • {selectedTeacher.subject}
          </p>
        </div>
      </div>

      <div className="text-sm space-y-2 text-gray-600">
        <p><b>Email:</b> {selectedTeacher.email}</p>
        <p><b>Phone:</b> {selectedTeacher.phone}</p>
        <p><b>Status:</b> {selectedTeacher.status}</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setOpenDetails(false)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
<AddTeacherModal
  open={openAddTeacher}
  onClose={() => setOpenAddTeacher(false)}
  onAdd={(newTeacher) =>
    setData((prev) => [newTeacher, ...prev])
  }
/>
{viewTeacher && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-4">
        Teacher Details
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <img src={viewTeacher.image} className="w-14 h-14 rounded-full" />
        <div>
          <p className="font-medium">{viewTeacher.name}</p>
          <p className="text-sm text-gray-500">
            {viewTeacher.class} • {viewTeacher.subject}
          </p>
        </div>
      </div>

      <div className="text-sm space-y-2 text-gray-600">
        <p><b>Email:</b> {viewTeacher.email}</p>
        <p><b>Phone:</b> {viewTeacher.phone}</p>
        <p><b>Status:</b> {viewTeacher.status}</p>
      </div>

      <div className="flex justify-between mt-6">
      <button
  onClick={() => downloadTeacherCSV(viewTeacher)}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
>
  Download
</button>


        <button
          onClick={() => setViewTeacher(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
{editTeacher && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-4">
        Edit Teacher
      </h3>

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editTeacher.name}
          onChange={(e) =>
            setEditTeacher({ ...editTeacher, name: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editTeacher.subject}
          onChange={(e) =>
            setEditTeacher({ ...editTeacher, subject: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editTeacher.email}
          onChange={(e) =>
            setEditTeacher({ ...editTeacher, email: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditTeacher(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((t) =>
                t.id === editTeacher.id ? editTeacher : t
              )
            );
            setEditTeacher(null);
          }}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
{deleteTeacher && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[380px] rounded-xl p-6">

      <h3 className="text-lg font-semibold">
        Delete Teacher?
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Are you sure you want to delete
        <b> {deleteTeacher.name}</b>?
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setDeleteTeacher(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.filter((t) => t.id !== deleteTeacher.id)
            );
            setDeleteTeacher(null);
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
} 