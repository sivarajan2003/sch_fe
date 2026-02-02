import { Eye, Pencil, Trash2, FileText } from "lucide-react";
import {
    RefreshCcw,
    Printer,
    Filter,
    ArrowUpDown,
    Plus,
    CalendarDays,ArrowLeft ,
  } from "lucide-react";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";

const applications = [
    {
        id: "ADM-2026-0004",
        name: "Ayaan Joshi",
        dob: "22 Sept 2019",
        phone: "+91 6347401947",
        email: "ayaan.father@email.com",
        class: "Grade 3",
        status: "Interview Scheduled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=21",
      },
      {
        id: "ADM-2026-0005",
        name: "Vivaan Sharma",
        dob: "11 Nov 2022",
        phone: "+91 7873673730",
        email: "vivaan.father@email.com",
        class: "Grade 2",
        status: "Interview Done",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=22",
      },
      {
        id: "ADM-2026-0006",
        name: "Reyansh Desai",
        dob: "25 Apr 2022",
        phone: "+91 1417627931",
        email: "reyansh.father@email.com",
        class: "Grade 1",
        status: "Offer Accepted",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=23",
      },
      {
        id: "ADM-2026-0007",
        name: "Ishaan Verma",
        dob: "02 Feb 2021",
        phone: "+91 9988776655",
        email: "ishaan.father@email.com",
        class: "Grade 2",
        status: "Applied",
        documents: "1/2",
        avatar: "https://i.pravatar.cc/40?img=24",
      },
      {
        id: "ADM-2026-0008",
        name: "Anaya Gupta",
        dob: "18 Aug 2020",
        phone: "+91 8877665544",
        email: "anaya.mother@email.com",
        class: "Grade 3",
        status: "Verifying Documents",
        documents: "1/2",
        avatar: "https://i.pravatar.cc/40?img=25",
      },
      {
        id: "ADM-2026-0009",
        name: "Myra Kapoor",
        dob: "05 Mar 2021",
        phone: "+91 7766554433",
        email: "myra.father@email.com",
        class: "Grade 2",
        status: "Enrolled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=26",
      },
      {
        id: "ADM-2026-0010",
        name: "Kabir Singh",
        dob: "09 Dec 2019",
        phone: "+91 6655443322",
        email: "kabir.father@email.com",
        class: "Grade 4",
        status: "Interview Scheduled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=27",
      },
      {
        id: "ADM-2026-0011",
        name: "Sara Khan",
        dob: "14 Jul 2020",
        phone: "+91 5544332211",
        email: "sara.mother@email.com",
        class: "Grade 3",
        status: "Applied",
        documents: "0/2",
        avatar: "https://i.pravatar.cc/40?img=28",
      },
      {
        id: "ADM-2026-0012",
        name: "Rudra Malhotra",
        dob: "29 Jan 2021",
        phone: "+91 9988123456",
        email: "rudra.father@email.com",
        class: "Grade 1",
        status: "Interview Done",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=29",
      },
      {
        id: "ADM-2026-0013",
        name: "Aarav Nair",
        dob: "10 Oct 2019",
        phone: "+91 9123456780",
        email: "aarav.father@email.com",
        class: "Grade 4",
        status: "Offer Accepted",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=30",
      },
      {
        id: "ADM-2026-0014",
        name: "Diya Mehta",
        dob: "06 Jun 2021",
        phone: "+91 9876543210",
        email: "diya.mother@email.com",
        class: "Grade 2",
        status: "Enrolled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=31",
      },
      {
        id: "ADM-2026-0015",
        name: "Advik Rao",
        dob: "17 May 2020",
        phone: "+91 9012345678",
        email: "advik.father@email.com",
        class: "Grade 3",
        status: "Verifying Documents",
        documents: "1/2",
        avatar: "https://i.pravatar.cc/40?img=32",
      },
      {
        id: "ADM-2026-0016",
        name: "Kiara Iyer",
        dob: "23 Mar 2021",
        phone: "+91 8899001122",
        email: "kiara.mother@email.com",
        class: "Grade 1",
        status: "Applied",
        documents: "0/2",
        avatar: "https://i.pravatar.cc/40?img=33",
      },
      {
        id: "ADM-2026-0017",
        name: "Yuvaan Mishra",
        dob: "30 Sept 2019",
        phone: "+91 7788990011",
        email: "yuvaan.father@email.com",
        class: "Grade 4",
        status: "Interview Scheduled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=34",
      },
      {
        id: "ADM-2026-0018",
        name: "Saanvi Chawla",
        dob: "12 Feb 2020",
        phone: "+91 6677889900",
        email: "saanvi.mother@email.com",
        class: "Grade 3",
        status: "Interview Done",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=35",
      },
      {
        id: "ADM-2026-0019",
        name: "Atharv Kulkarni",
        dob: "08 Aug 2021",
        phone: "+91 9988771122",
        email: "atharv.father@email.com",
        class: "Grade 1",
        status: "Applied",
        documents: "1/2",
        avatar: "https://i.pravatar.cc/40?img=36",
      },
      {
        id: "ADM-2026-0020",
        name: "Nisha Reddy",
        dob: "19 Jan 2020",
        phone: "+91 8899776655",
        email: "nisha.mother@email.com",
        class: "Grade 2",
        status: "Offer Accepted",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=37",
      },
      {
        id: "ADM-2026-0021",
        name: "Harsh Vardhan",
        dob: "27 Nov 2019",
        phone: "+91 7766558899",
        email: "harsh.father@email.com",
        class: "Grade 4",
        status: "Enrolled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=38",
      },
      {
        id: "ADM-2026-0022",
        name: "Meera Sethi",
        dob: "03 Apr 2021",
        phone: "+91 6655887744",
        email: "meera.mother@email.com",
        class: "Grade 2",
        status: "Verifying Documents",
        documents: "1/2",
        avatar: "https://i.pravatar.cc/40?img=39",
      },
      {
        id: "ADM-2026-0023",
        name: "Kunal Bansal",
        dob: "21 Jul 2020",
        phone: "+91 5544667788",
        email: "kunal.father@email.com",
        class: "Grade 3",
        status: "Interview Scheduled",
        documents: "2/2",
        avatar: "https://i.pravatar.cc/40?img=40",
      },

];
const documents = [
  {
    name: "Birth Certificate.pdf",
    size: "239 KB",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const statusStyle = (status: string) => {
  switch (status) {
    case "Enrolled":
      return "bg-green-100 text-green-700";
    case "Interview Done":
      return "bg-blue-100 text-blue-700";
    case "Applied":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
const initialApplications = [...applications];

export default function AllApplications() {
  const STORAGE_KEY = "admission_applications";
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : applications;
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

    const [openDate, setOpenDate] = useState(false);
const [openFilter, setOpenFilter] = useState(false);
const [search, setSearch] = useState("");
const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
const [statusFilter, setStatusFilter] = useState<string>("All");
const [rowsPerPage, setRowsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const [viewApp, setViewApp] = useState<any>(null);
const [editApp, setEditApp] = useState<any>(null);
const [deleteApp, setDeleteApp] = useState<any>(null);
const [activeTab, setActiveTab] = useState<
  "overview" | "documents" | "interview" | "offer"
>("overview");
//const [openNew, setOpenNew] = useState(false);

const emptyApplication = {
  id: "",
  name: "",
  dob: "",
  phone: "",
  email: "",
  class: "Grade 1",
  status: "Applied",
  documents: "0/2",
  avatar: "https://i.pravatar.cc/40",
  address: "", 
};
const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//const [newApp, setNewApp] = useState(emptyApplication);

const handleRefresh = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    setData(JSON.parse(saved));
  }
};
  const handlePrint = () => {
    window.print();
  };
  const handleExport = () => {
    const headers = [
      "Application ID",
      "Name",
      "DOB",
      "Phone",
      "Email",
      "Class",
      "Status",
      "Documents",
    ];
    
    const rows = data.map((a) =>
      [
        a.id,
        a.name,
        a.dob,
        a.phone,
        a.email,
        a.class,
        a.status,
        a.documents,
      ].join(",")
    );
  
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");
  
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "applications.csv";
    link.click();
  };
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  /* FILTER + SEARCH ================= */

const filteredData = data
.filter((a) =>
  statusFilter === "All" ? true : a.status === statusFilter
)
.filter((a) =>
  a.name.toLowerCase().includes(search.toLowerCase()) ||
  a.id.toLowerCase().includes(search.toLowerCase()) ||
  a.phone.includes(search)
);
const totalPages = Math.ceil(filteredData.length / rowsPerPage);

const paginatedData = filteredData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);
const role = localStorage.getItem("role");
const isParentPortal = localStorage.getItem("portal") === "true";

/**
 * BLOCK only:
 * - normal parent (not parent portal)
 */
if (role === "parent" && !isParentPortal) {
  return (
    <div className="p-10 text-center text-red-600 font-medium">
      Access Denied
    </div>
  );
}

  return (
<div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6">

     {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    {/* LEFT */}
    <div className="flex items-center gap-4">

  {/* BACK ARROW */}
  <button
    onClick={() => navigate("/admin/dashboard/receptionist")}
    className="p-2 rounded-lg hover:bg-gray-100"
    title="Back to Receptionist Dashboard"
  >
    <ArrowLeft className="w-5 h-5 text-gray-700" />
  </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-semibold text-gray-900">
      All Applications
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Receptionist / Applications
    </p>
  </div>
    </div>

    {/* RIGHT ACTIONS */}
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
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
  onClick={() =>
    navigate("/admin/dashboard/receptionist/admissions/application-form")
  }
  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
  >
  <Plus size={14} /> New Application
</button>
    </div>
  </div>
</div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

  {/* TOP ROW */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <h3 className="text-lg font-semibold text-gray-900">
      Application List
    </h3>

    <div className="flex items-center gap-3">

      {/* DATE */}
      <div className="relative">
  <button
    onClick={() => setOpenDate(!openDate)}
    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <CalendarDays size={16} />
    {startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Select Date Range"}
  </button>
  {openDate && (
  <div className="absolute left-0 top-full mt-2 w-80 bg-white border rounded-xl shadow-lg z-30 p-5">

    {/* START DATE */}
    <label className="block text-sm text-gray-600 mb-1">
      Start Date
    </label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
    />

    {/* END DATE */}
    <label className="block text-sm text-gray-600 mb-1">
      End Date
    </label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 text-sm mb-5"
    />

    {/* APPLY BUTTON */}
    <button
      onClick={() => setOpenDate(false)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
    >
      Apply
    </button>
  </div>
)}


      </div>

      {/* FILTER */}
      {openFilter && (
  <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow z-20">
    {[
      "All",
      "Enrolled",
      "Interview Done",
      "Interview Scheduled",
      "Applied",
      "Offer Accepted",
      "Verifying Documents",
    ].map((s) => (
      <button
        key={s}
        onClick={() => {
          setStatusFilter(s);
          setOpenFilter(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        {s}
      </button>
    ))}
  </div>
)}
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
  <div className="flex items-center justify-between mt-4">
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
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60"
    />
  </div>
</div>


      {/* TABLE */}
      <div className="hidden lg:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">APPLICATION</th>
              <th className="px-6 py-3 text-left">STUDENT DETAILS</th>
              <th className="px-6 py-3 text-left">CONTACT</th>
              <th className="px-6 py-3 text-left">CLASS</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-left">DOCUMENTS</th>
              <th className="px-6 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
          {paginatedData.map((app) => (
    <tr key={app.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-blue-600 font-medium">
        {app.id}
      </td>

      <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    
    {/* PROFILE IMAGE */}
    <img
      src={app.avatar}
      alt={app.name}
      className="w-10 h-10 rounded-full object-cover border"
    />

    {/* NAME + DOB */}
    <div>
      <p className="font-medium text-gray-900">
        {app.name}
      </p>
      <p className="text-xs text-gray-500">
        DOB: {app.dob}
      </p>
    </div>

  </div>
</td>


      <td className="px-6 py-4">
        <p>{app.phone}</p>
        <p className="text-xs text-gray-500">{app.email}</p>
      </td>

      <td className="px-6 py-4">
  {app.class || "Grade 1"}
</td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
            app.status
          )}`}
        >
          {app.status}
        </span>
      </td>

      <td className="px-6 py-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-500" />
        {app.documents}
      </td>

      <td className="px-6 py-4 text-center">
  <div className="inline-flex items-center gap-4">
    
    {/* VIEW */}
    <button
      onClick={() => setViewApp(app)}
      className="text-gray-600 hover:text-blue-800"
    >
      <Eye className="w-4 h-4" />
    </button>

    {/* EDIT */}
    <button
      onClick={() => setEditApp(app)}
      className="text-gray-600 hover:text-gray-800"
    >
      <Pencil className="w-4 h-4" />
    </button>

    {/* DELETE */}
    <button
      onClick={() => setDeleteApp(app)}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 className="w-4 h-4" />
    </button>

  </div>
</td>



    </tr>
  ))}
</tbody>
        </table>
        </div>
        {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4">

{paginatedData.map((app) => (
  <div
  key={app.id}
  className="bg-white border rounded-2xl p-4 space-y-3"
>
  {/* HEADER */}
  <div className="flex items-start justify-between gap-3">

    {/* LEFT: PROFILE + BASIC INFO */}
    <div className="flex items-start gap-3">
      <img
        src={app.avatar}
        alt={app.name}
        className="w-11 h-11 rounded-full object-cover border"
      />

      <div>
        <p className="text-blue-600 text-sm font-semibold">
          {app.id}
        </p>
        <p className="font-medium text-gray-900 leading-tight">
          {app.name}
        </p>
        <p className="text-xs text-gray-500">
          DOB: {app.dob}
        </p>
      </div>
    </div>

    {/* RIGHT: STATUS */}
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyle(
        app.status
      )}`}
    >
      {app.status}
    </span>
  </div>

  {/* DETAILS */}
  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm pt-2">
    <div>
      <p className="text-gray-500 text-xs">Class</p>
      <p className="font-medium">{app.class}</p>
    </div>

    <div>
      <p className="text-gray-500 text-xs">Documents</p>
      <p className="font-medium">{app.documents}</p>
    </div>

    <div className="col-span-2">
      <p className="text-gray-500 text-xs">Contact</p>
      <p className="font-medium">{app.phone}</p>
      <p className="text-xs text-gray-500 truncate">
        {app.email}
      </p>
    </div>
  </div>

  {/* ACTIONS */}
  <div className="flex justify-between items-center pt-3 border-t text-sm">
    <button
      onClick={() => setViewApp(app)}
      className="flex items-center gap-1 text-blue-600"
    >
      <Eye size={14} /> View
    </button>

    <button
      onClick={() => setEditApp(app)}
      className="flex items-center gap-1 text-gray-600"
    >
      <Pencil size={14} /> Edit
    </button>

    <button
      onClick={() => setDeleteApp(app)}
      className="flex items-center gap-1 text-red-600"
    >
      <Trash2 size={14} /> Delete
    </button>
  </div>
</div>

))}

</div>

        {/* PAGINATION */}
  <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-2 px-4 sm:px-6 py-4 border-t text-sm">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="px-3 py-1 border rounded disabled:opacity-40"
  >
    Prev
  </button>

  <span className="px-2">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-3 py-1 border rounded disabled:opacity-40"
  >
    Next
  </button>
</div>
      {viewApp && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-5xl mx-3 sm:mx-auto rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{viewApp.name}</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-blue-600 font-medium">{viewApp.id}</span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
              {viewApp.status}
            </span>
          </div>
        </div>
        <button onClick={() => setViewApp(null)} className="text-xl">✕</button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b px-6 text-sm">
        {[
          ["overview", "Overview"],
          ["documents", "Documents (2/2)"],
          ["interview", "Interview"],
          ["offer", "Offer Letter"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`py-3 border-b-2 ${
              activeTab === key
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6 max-h-[70vh] overflow-y-auto">

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
  <div className="space-y-6">

            {/* STUDENT INFO */}
            <div className="space-y-6 bg-white p-5 rounded-xl border">
              <h3 className="font-semibold mb-3">Student Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Full Name:</b> {viewApp.name}</p>
                <p><b>DOB:</b> {viewApp.dob}</p>
                <p><b>Preferred Class:</b> {viewApp.class}</p>
                <p><b>Status:</b> {viewApp.status}</p>
              </div>
            </div>

            {/* GUARDIAN */}
            <div className="space-y-6 bg-white p-5 rounded-xl border">
                              <h3 className="font-semibold mb-3">Guardian Information</h3>
              <p><b>Email:</b> {viewApp.email}</p>
              <p><b>Phone:</b> {viewApp.phone}</p>
            </div>
            {/* ADDRESS */}
<div className="space-y-6 bg-white p-5 rounded-xl border">
  <h3 className="font-semibold mb-3">Address</h3>
  <p className="text-sm text-gray-700">
    {viewApp.address || "—"}
  </p>
</div>


          </div>
        )}

        {/* ================= DOCUMENTS ================= */}

{activeTab === "documents" && (
  <div className="space-y-4 p-4">

    {/* BIRTH CERTIFICATE (DOWNLOAD) */}
    {documents.map((doc) => (
      <div
        key={doc.name}
        className="flex justify-between items-center border p-4 rounded-lg"
      >
        <div>
          <p className="font-medium">{doc.name}</p>
          <p className="text-xs text-gray-500">{doc.size}</p>
        </div>

        <a
          href={doc.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          View / Download
        </a>
      </div>
    ))}

    {/* STUDENT PHOTO (VIEW ONLY) */}
    <div className="flex justify-between items-center border p-4 rounded-lg">
      <div>
        <p className="font-medium">Student Photo.jpg</p>
        <p className="text-xs text-gray-500">122 KB</p>
      </div>

      <button
        onClick={() => setPhotoPreview(viewApp.avatar)}
        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        View Photo
      </button>
    </div>

  </div>
)}

       {/* ================= INTERVIEW ================= */}
{activeTab === "interview" && (
  <div className="space-y-4 p-4">

    <div className="space-y-6 bg-white p-5 rounded-xl border">
      <p><b>Scheduled Date:</b> 25 Jan 2026</p>
      <p><b>Location:</b> Admin Office - Room 101</p>
    </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <p className="text-green-600 font-medium">PASS</p>
      <p className="text-sm mt-2">
        Excellent communication skills. Recommended for admission.
      </p>
    </div>

  </div>
)}


        {/* ================= OFFER LETTER ================= */}
        {activeTab === "offer" && (
  <div className="space-y-4 p-4">

<div className="space-y-6 bg-white p-5 rounded-xl border">
                  <p><b>Offer No:</b> OFFER-2026-0001</p>
              <p><b>Class Offered:</b> Grade 3 - Section A</p>
              <p><b>Admission Date:</b> 1 Apr 2026</p>
              <button
                onClick={() => window.print()}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Download Offer Letter
              </button>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t">
        <button
          onClick={() => setViewApp(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

{editApp && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <h3 className="text-lg font-semibold mb-5">
        Edit Application
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">

        {/* STUDENT NAME */}
        <div>
          <label className="text-gray-600">Student Name</label>
          <input
            value={editApp.name}
            onChange={(e) =>
              setEditApp({ ...editApp, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* CLASS */}
        <div>
          <label className="text-gray-600">Class</label>
          <select
            value={editApp.class}
            onChange={(e) =>
              setEditApp({ ...editApp, class: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
        </div>

        {/* PHONE */}
        <div>
          <label className="text-gray-600">Phone</label>
          <input
            value={editApp.phone}
            onChange={(e) =>
              setEditApp({ ...editApp, phone: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-gray-600">Email</label>
          <input
            value={editApp.email}
            onChange={(e) =>
              setEditApp({ ...editApp, email: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* STATUS */}
        <div className="col-span-2">
          <label className="text-gray-600">Status</label>
          <select
            value={editApp.status}
            onChange={(e) =>
              setEditApp({ ...editApp, status: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Enrolled</option>
            <option>Interview Done</option>
            <option>Interview Scheduled</option>
            <option>Applied</option>
            <option>Offer Accepted</option>
            <option>Verifying Documents</option>
          </select>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditApp(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) =>
              prev.map((item) =>
                item.id === editApp.id ? editApp : item
              )
            );
            setEditApp(null);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}

{deleteApp && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl w-full max-w-sm p-6">

      <h3 className="text-lg font-semibold mb-2">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete
        <b> {deleteApp.name}</b>?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setDeleteApp(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData(prev =>
              prev.filter(item => item.id !== deleteApp.id)
            );
            setDeleteApp(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}
{/*{openNew && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden">

     
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">New Application</h2>
        <button onClick={() => setOpenNew(false)} className="text-xl">✕</button>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4 text-sm">

        <div>
          <label className="text-gray-600">Student Name</label>
          <input
            value={newApp.name}
            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Date of Birth</label>
          <input
            type="date"
            value={newApp.dob}
            onChange={(e) => setNewApp({ ...newApp, dob: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Phone</label>
          <input
            value={newApp.phone}
            onChange={(e) => setNewApp({ ...newApp, phone: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Email</label>
          <input
            value={newApp.email}
            onChange={(e) => setNewApp({ ...newApp, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Class</label>
          <select
            value={newApp.class}
            onChange={(e) => setNewApp({ ...newApp, class: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
        </div>

        <div>
          <label className="text-gray-600">Status</label>
          <select
            value={newApp.status}
            onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Interview Done</option>
            <option>Offer Accepted</option>
          </select>
        </div>
        <div className="col-span-2">
  <label className="text-gray-600">Address</label>
  <textarea
    value={newApp.address}
    onChange={(e) =>
      setNewApp({ ...newApp, address: e.target.value })
    }
    placeholder="House no, Street, City, State, Pincode"
    rows={3}
    className="w-full border rounded-lg px-3 py-2 mt-1 resize-none"
  />
</div>

      </div>

      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button
          onClick={() => setOpenNew(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>
        <button
  onClick={() => {
    const createdApp = {
      ...newApp,
      id: `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Applied",        // 🔥 always start as Applied
      documents: "0/2",
      avatar: "https://i.pravatar.cc/40",
    };

    // ✅ ADD TO MAIN DATA (this auto-saves to localStorage)
    setData(prev => [createdApp, ...prev]);

    // ✅ CLOSE MODAL
    setOpenNew(false);

    // ✅ RESET FORM
    setNewApp(emptyApplication);
  }}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
>
  Save Application
</button>
      </div>

    </div>
  </div>
)}*/}
{photoPreview && (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    
    <div className="bg-white rounded-xl p-6 relative max-w-md w-full">

      {/* CLOSE */}
      <button
        onClick={() => setPhotoPreview(null)}
        className="absolute top-3 right-3 text-xl"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-4 text-center">
        Student Photo
      </h3>

      <img
        src={photoPreview}
        alt="Student"
        className="w-full rounded-lg object-contain"
      />

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPhotoPreview(null)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
