import { Eye, Pencil,Send, GraduationCap, Trash2, FileText } from "lucide-react";
import {
    RefreshCcw,
    Printer,
    Filter,
    ArrowUpDown,
    Plus,
    CalendarDays,
  } from "lucide-react";
  import { useState,useEffect } from "react";
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
//const initialApplications = [...applications];

export default function AllApplications() {
  const [newApplication, setNewApplication] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    class: "Grade 1",
    bloodGroup: "O+",
  });
  const [newAppOpen, setNewAppOpen] = useState(false);

  //const STORAGE_KEY = "offer_letters_applications";
  const navigate = useNavigate();

  const STORAGE_KEY = "admission_applications";
  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : applications;
  });
  const [subject, setSubject] = useState("");

  const loadApplications = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && JSON.parse(saved).length
      ? JSON.parse(saved)
      : applications;
  };  
const saveApplications = (data: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
const offers = data.filter(
  a => a.status === "Offer Accepted"
);

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
const [sendApp, setSendApp] = useState<any>(null);
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");

const [activeTab, setActiveTab] = useState<
  "overview" | "documents" | "interview" | "offer"
>("overview");
const [scheduleApp, setScheduleApp] = useState<any>(null);
const [scheduleDate, setScheduleDate] = useState("");
const [scheduleTime, setScheduleTime] = useState("");
const [scheduleLocation, setScheduleLocation] = useState(
  "Admin Office - Room 101"
);
const [generateApp, setGenerateApp] = useState<any>(null);
const [previewApp, setPreviewApp] = useState<any>(null);

const handleRefresh = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved && JSON.parse(saved).length > 0) {
    setData(JSON.parse(saved));
  }

  setSearch("");
  setStatusFilter("All");
  setCurrentPage(1);
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
  //const [newAppOpen, setNewAppOpen] = useState(false);
const [newApp, setNewApp] = useState({
  name: "",
  dob: "",
  email: "",
  phone: "",
  class: "Grade 1",
});
useEffect(() => {
  saveApplications(data);
}, [data]);
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
const acceptedCount = data.filter(
  (a) => a.status === "Offer Accepted"
).length;

const pendingCount = data.filter(
  (a) => a.status === "Applied"
).length;

const notGeneratedCount = data.filter(
  (a) => a.status !== "Offer Accepted" && a.status !== "Applied"
).length;
const rejectedCount = data.filter(
  (a) => a.status === "Rejected"
).length;

const totalGenerated = acceptedCount + pendingCount;

  return (
    <div className="space-y-6">

     {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    {/* LEFT */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
      Offer Letters
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / Receptionist / Offer Letters
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
  onClick={() => setNewAppOpen(true)}
  className="
  w-full sm:w-auto
  px-4 py-2
  bg-blue-600 hover:bg-blue-700
  text-white rounded-lg text-sm
  flex items-center justify-center gap-1
">
  <Plus size={14} /> New Application
</button>
    </div>
  </div>
</div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

  {/* TOP ROW */}
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h3 className="text-lg font-semibold text-gray-900">
    Offer Letters List
    </h3>

    <div className="flex flex-wrap gap-2">

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
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60"
      />
  </div>
</div>
{/* ================= SUMMARY CARDS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

<SummaryCard
  title="Total Generated"
  value={String(totalGenerated)}
  color="text-gray-900"
/>

<SummaryCard
  title="Accepted"
  value={String(acceptedCount)}
  color="text-green-600"
/>

<SummaryCard
  title="Pending"
  value={String(pendingCount)}
  color="text-yellow-600"
/>

<SummaryCard
  title="Not Generated"
  value={String(notGeneratedCount)}
  color="text-gray-600"
/>
<SummaryCard
  title="Rejected"
  value={String(rejectedCount)}
  color="text-red-600"
/>

</div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-x-auto hidden md:block">
      <table className="min-w-[900px] w-full text-sm table-fixed">

        <thead className="bg-gray-50 text-gray-600">
  <tr>
    <th className="px-6 py-3 text-left">STUDENT</th>
    <th className="px-6 py-3 text-left">OFFER NUMBER</th>
    <th className="px-6 py-3 text-left">CLASS OFFERED</th>
    <th className="px-6 py-3 text-left">GENERATED ON</th>
    <th className="px-6 py-3 text-left">STATUS</th>
    <th className="px-6 py-3 text-center">ACTIONS</th>
  </tr>
</thead>


          <tbody className="divide-y">
          {paginatedData.map((app) => (
   <tr key={app.id} className="hover:bg-gray-50">

   {/* STUDENT */}
   <td className="px-6 py-4">
     <div className="flex items-center gap-3">
       <img src={app.avatar} className="w-10 h-10 rounded-full" />
       <div>
         <p className="font-medium">{app.name}</p>
         <p className="text-xs text-gray-500">{app.id}</p>
       </div>
     </div>
   </td>
 
   {/* OFFER NUMBER */}
   <td className="px-6 py-4">
     {app.status === "Offer Accepted" ? (
       <span className="text-blue-600 font-medium">
         OFFER-2026-{app.id.slice(-4)}
       </span>
     ) : (
       <span className="text-gray-400">Not generated</span>
     )}
   </td>
 
   {/* CLASS OFFERED */}
   <td className="px-6 py-4">
     {app.status === "Offer Accepted" ? `${app.class} - A` : "–"}
   </td>
 
   {/* GENERATED ON */}
   <td className="px-6 py-4">
     {app.status === "Offer Accepted" ? "15 Jan 2026" : "–"}
   </td>
 
   {/* STATUS */}
   <td className="px-6 py-4">
     <span
       className={`px-3 py-1 rounded-full text-xs font-medium ${
         app.status === "Offer Accepted"
           ? "bg-green-100 text-green-700"
           : app.status === "Applied"
           ? "bg-yellow-100 text-yellow-700"
           : "bg-gray-100 text-gray-600"
       }`}
     >
       {app.status === "Offer Accepted"
         ? "ACCEPTED"
         : app.status === "Applied"
         ? "PENDING"
         : "NOT GENERATED"}
     </span>
   </td>
 
   {/* ACTIONS */}
   <td className="px-6 py-4">
   <div className="flex flex-wrap justify-center gap-2">
  {app.status === "Offer Accepted" && (
  <>
    {/* PREVIEW */}
    <button
      onClick={() => setPreviewApp(app)}
      className="p-2.5 border rounded-lg hover:bg-gray-50"
      title="Preview"
    >
      <Eye size={16} />
    </button>

    {/* SEND */}
    <button
  onClick={() => {
    setSendApp(app);
    setEmail(app.email);

    // ✅ ADD THIS
    setSubject(`Admission Offer Letter – ${app.name}`);

    // ✅ UPDATE MESSAGE TEMPLATE
    setMessage(
`Dear Parent,

We are pleased to inform you that your child ${app.name} has been offered admission to ${app.class}.

Please find the attached offer letter for further details.

Warm regards,
School Admin`
    );
  }}
  className="p-2.5 border rounded-lg hover:bg-gray-50"
>

      <Send size={16} />
    </button>

    {/* ENROLL */}
    <button
      onClick={() => {
        const updated = data.map(item =>
          item.id === app.id
            ? { ...item, status: "Enrolled" }
            : item
        );

        setData(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        navigate("/admin/dashboard/receptionist/admissions/enrolled");
      }}
      className="p-2.5 border rounded-lg hover:bg-gray-50"
      title="Enroll Student"
    >
      <GraduationCap size={16} />
    </button>
  </>
)}
{app.status === "Interview Done" && (
  <button
    onClick={() => setGenerateApp(app)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
  >
    Generate
  </button>
)}

  </div>
</td>


 </tr>
 
  ))}
</tbody>
        </table>
        </div> {/* ✅ CLOSE md:block DESKTOP TABLE */}


{/* ================= 2️⃣ MOBILE VIEW ================= */}
<div className="md:hidden space-y-4">
  {paginatedData.map((app) => (
    <div
      key={app.id}
      className="bg-white border rounded-xl p-4 space-y-4"
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={app.avatar}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">{app.name}</p>
            <p className="text-xs text-gray-500">{app.id}</p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(app.status)}`}
        >
          {app.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Class</p>
          <p className="font-medium">{app.class}</p>
        </div>
        <div>
          <p className="text-gray-500">Documents</p>
          <p className="font-medium">{app.documents}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{app.phone}</p>
        </div>
      </div>

      {/* ACTIONS */}
      {/* ACTIONS */}
<div className="flex gap-2 pt-2">
  <button
    onClick={() => setPreviewApp(app)}
    className="
      flex-1
      h-10
      flex items-center justify-center gap-2
      border rounded-lg
      text-sm font-medium
      text-gray-700
      hover:bg-gray-50
    "
  >
    <Eye className="w-4 h-4" />
    <span>Preview</span>
  </button>
</div>

    </div>
  ))}
</div>

        {/* PAGINATION */}
<div className="flex justify-end items-center gap-2 px-6 py-4 border-t text-sm">
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
    <div className="bg-white w-full max-w-5xl rounded-xl overflow-hidden">

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
        {/* ================= DOCUMENTS ================= */}
        {activeTab === "documents" && (
  <div className="space-y-4 p-4">
            {[
              { name: "Birth Certificate.pdf", size: "239 KB" },
              { name: "Student Photo.jpg", size: "122 KB" },
            ].map(doc => (
              <div key={doc.name} className="flex justify-between items-center border p-4 rounded-lg">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.size}</p>
                </div>
                <button className="px-4 py-2 border rounded-lg text-sm">
                  View / Download
                </button>
              </div>
            ))}
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

{generateApp && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-md rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-1">
        Generate Offer Letter
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {generateApp.name}
      </p>

      {/* FORM */}
      <div className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Class to Offer</label>
          <input
            value={generateApp.class}
            className="w-full mt-1 border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Section</label>
          <select className="w-full mt-1 border rounded-lg px-4 py-2">
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Admission Date</label>
          <input
            type="date"
            className="w-full mt-1 border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setGenerateApp(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
  onClick={() => {
    const updated = data.map(item =>
      item.id === generateApp.id
        ? {
            ...item,
            status: "Offer Accepted", 
            
          }
        : item
    );

    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setGenerateApp(null); // close modal
  }}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
>
  Generate Offer
</button>

      </div>
    </div>
  </div>
)}
{previewApp && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-4 border-b flex justify-between">
        <h2 className="text-lg font-semibold">Offer Letter Preview</h2>
        <button onClick={() => setPreviewApp(null)}>✕</button>
      </div>

      {/* CONTENT */}
      <div
  id="offer-letter-pdf"
  className="p-6 max-h-[70vh] overflow-y-auto space-y-6"
>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            School Name
          </h1>
          <p className="text-sm text-gray-500">
            123 Education Street, City – 400001
          </p>
        </div>

        <hr />

        <p><b>Offer Letter No:</b> OFFER-2026-{previewApp.id.slice(-4)}</p>
        <p><b>Date:</b> 12 Jan 2026</p>

        <p className="mt-4">
          Dear {previewApp.name}'s Parent,
        </p>

        <p>
          We are pleased to inform you that your child,
          <b> {previewApp.name}</b>, has been selected for admission to
          <b> {previewApp.class} – Section A</b>.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="list-disc ml-5 text-sm">
            <li><b>Student Name:</b> {previewApp.name}</li>
            <li><b>Class:</b> {previewApp.class}</li>
            <li><b>Section:</b> A</li>
            <li><b>Academic Year:</b> 2025–26</li>
            <li><b>Admission Date:</b> 1 Apr 2026</li>
          </ul>
        </div>

        <p>
          We look forward to welcoming your child to our school family.
        </p>

        <p className="mt-6">
          Warm regards,<br />
          <b>Principal</b><br />
          School Name
        </p>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t flex justify-between">
        <button
          onClick={() => setPreviewApp(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Close
        </button>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Download PDF
        </button>
      </div>
    </div>
  </div>
)}
{sendApp && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-md rounded-xl p-6">

      {/* HEADER */}
      <h2 className="text-lg font-semibold">Send Offer Letter</h2>
      <p className="text-sm text-gray-500 mt-1">
        {sendApp.name}
      </p>

      {/* FORM */}
      {/* FORM */}
<div className="space-y-4 mt-5">

{/* TO (EMAIL) */}
<div>
  <label className="text-sm text-gray-600">To</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full mt-1 border rounded-lg px-4 py-2"
  />
</div>

<div>
  <label className="text-sm text-gray-600">Subject</label>
  <input
    type="text"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full mt-1 border rounded-lg px-4 py-2"
    placeholder="Enter email subject"
  />
</div>

{/* MESSAGE */}
<div>
  <label className="text-sm text-gray-600">Message</label>
  <textarea
    rows={6}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full mt-1 border rounded-lg px-4 py-2"
  />
</div>

</div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setSendApp(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            alert(`Email prepared for ${sendApp.name}`);
            setSendApp(null);
          }}
          
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>

    </div>
  </div>
)}
{newAppOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
<div className="
  bg-white
  w-full h-full sm:h-auto
  sm:max-w-xl
  rounded-none sm:rounded-2xl
  p-6
  overflow-y-auto
">

      {/* HEADER */}
      <h2 className="text-xl font-semibold">New Application</h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter student admission details
      </p>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

        <div className="col-span-2">
          <label className="text-gray-600">Student Name</label>
          <input
            value={newApp.name}
            onChange={(e) =>
              setNewApp({ ...newApp, name: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="text-gray-600">Date of Birth</label>
          <input
            type="date"
            value={newApp.dob}
            onChange={(e) =>
              setNewApp({ ...newApp, dob: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="text-gray-600">Class</label>
          <select
            value={newApp.class}
            onChange={(e) =>
              setNewApp({ ...newApp, class: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
        </div>
        <div>
  <label className="text-gray-600">
    Blood Group <span className="text-red-500">*</span>
  </label>
  <select
    value={newApplication.bloodGroup}
    onChange={(e) =>
      setNewApplication({
        ...newApplication,
        bloodGroup: e.target.value,
      })
    }
    required
    className="w-full mt-1 border rounded-lg px-4 py-2"
  >
    <option value="">Select Blood Group</option>
    <option>O+</option>
    <option>A+</option>
    <option>B+</option>
    <option>AB+</option>
  </select>
</div>

        <div>
          <label className="text-gray-600">Parent Email</label>
          <input
            type="email"
            value={newApp.email}
            onChange={(e) =>
              setNewApp({ ...newApp, email: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label className="text-gray-600">Phone</label>
          <input
            value={newApp.phone}
            onChange={(e) =>
              setNewApp({ ...newApp, phone: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

      </div>
      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={() => setNewAppOpen(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setData((prev) => [
              {
                id: `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                status: "Applied",
                documents: "0/2",
                avatar: "https://i.pravatar.cc/40",
                ...newApp,
              },
              ...prev,
            ]);
            setNewAppOpen(false);
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save Application
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
