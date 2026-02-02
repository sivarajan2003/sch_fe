import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  CalendarDays,
  ArrowUpDown,
  Plus,Eye,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
  
const applications = [
  {
      id: "ADM-2026-0004",
      name: "Ayaan Joshi",
      dob: "22 Sept 2019",
      phone: "+91 6347401947",
      email: "ayaan.father@email.com",
      class: "Grade 3",
      bloodGroup: "O+",
      status: "Interview Scheduled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=21",
    },
    {
      id: "ADM-2026-0005",
      name: "Vivaan Sharma",
      dob: "11 Nov 2022",
      phone: "+91 7873673730",
      email: "vivaan.father@email.com",
      class: "Grade 2",
      bloodGroup: "O+",
      status: "Interview Done",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=22",
    },
    {
      id: "ADM-2026-0006",
      name: "Reyansh Desai",
      dob: "25 Apr 2022",
      phone: "+91 1417627931",
      email: "reyansh.father@email.com",
      class: "Grade 1",
      bloodGroup: "O+",
      status: "Offer Accepted",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=23",
    },
    {
      id: "ADM-2026-0007",
      name: "Ishaan Verma",
      dob: "02 Feb 2021",
      phone: "+91 9988776655",
      email: "ishaan.father@email.com",
      class: "Grade 2",
      bloodGroup: "AB+",
      status: "Applied",
      documents: "1/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=24",
    },
    {
      id: "ADM-2026-0008",
      name: "Anaya Gupta",
      dob: "18 Aug 2020",
      phone: "+91 8877665544",
      email: "anaya.mother@email.com",
      class: "Grade 3",
      bloodGroup: "AB+",
      status: "Verifying Documents",
      documents: "1/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=25",
    },
    {
      id: "ADM-2026-0009",
      name: "Myra Kapoor",
      dob: "05 Mar 2021",
      phone: "+91 7766554433",
      email: "myra.father@email.com",
      class: "Grade 2",
      bloodGroup: "A+",
      status: "Enrolled",
      documents: "2/2",
      enrolledOn: "15 Jan 2025",
      avatar: "https://i.pravatar.cc/40?img=26",
    },
    {
      id: "ADM-2026-0010",
      name: "Kabir Singh",
      dob: "09 Dec 2019",
      phone: "+91 6655443322",
      email: "kabir.father@email.com",
      class: "Grade 4",
      bloodGroup: "A+",
      status: "Interview Scheduled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=27",
    },
    {
      id: "ADM-2026-0011",
      name: "Sara Khan",
      dob: "14 Jul 2020",
      phone: "+91 5544332211",
      email: "sara.mother@email.com",
      class: "Grade 3",
      bloodGroup: "A+",
      status: "Applied",
      documents: "0/2",
      enrolledOn: "11 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=28",
    },
    {
      id: "ADM-2026-0012",
      name: "Rudra Malhotra",
      dob: "29 Jan 2021",
      phone: "+91 9988123456",
      email: "rudra.father@email.com",
      class: "Grade 1",
      bloodGroup: "A+",
      status: "Interview Done",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
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
      bloodGroup: "A+",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=30",
    },
    {
      id: "ADM-2026-0014",
      name: "Diya Mehta",
      dob: "06 Jun 2021",
      phone: "+91 9876543210",
      email: "diya.mother@email.com",
      class: "Grade 2",
      bloodGroup: "B+",
      status: "Enrolled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=31",
    },
    {
      id: "ADM-2026-0015",
      name: "Advik Rao",
      dob: "17 May 2020",
      phone: "+91 9012345678",
      email: "advik.father@email.com",
      class: "Grade 3",
      bloodGroup: "B+",
      status: "Verifying Documents",
      documents: "1/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=32",
    },
    {
      id: "ADM-2026-0016",
      name: "Kiara Iyer",
      dob: "23 Mar 2021",
      phone: "+91 8899001122",
      email: "kiara.mother@email.com",
      class: "Grade 1",
      bloodGroup: "A+",
      status: "Applied",
      documents: "0/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=33",
    },
    {
      id: "ADM-2026-0017",
      name: "Yuvaan Mishra",
      dob: "30 Sept 2019",
      phone: "+91 7788990011",
      email: "yuvaan.father@email.com",
      class: "Grade 4",
      bloodGroup: "A+",
      status: "Interview Scheduled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=34",
    },
    {
      id: "ADM-2026-0018",
      name: "Saanvi Chawla",
      dob: "12 Feb 2020",
      phone: "+91 6677889900",
      email: "saanvi.mother@email.com",
      class: "Grade 3",
      bloodGroup: "A+",
      status: "Interview Done",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=35",
    },
    {
      id: "ADM-2026-0019",
      name: "Atharv Kulkarni",
      dob: "08 Aug 2021",
      phone: "+91 9988771122",
      email: "atharv.father@email.com",
      class: "Grade 1",
      bloodGroup: "AB+",
      status: "Applied",
      documents: "1/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=36",
    },
    {
      id: "ADM-2026-0020",
      name: "Nisha Reddy",
      dob: "19 Jan 2020",
      phone: "+91 8899776655",
      email: "nisha.mother@email.com",
      class: "Grade 2",
      bloodGroup: "B+",
      status: "Offer Accepted",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=37",
    },
    {
      id: "ADM-2026-0021",
      name: "Harsh Vardhan",
      dob: "27 Nov 2019",
      phone: "+91 7766558899",
      email: "harsh.father@email.com",
      class: "Grade 4",
      bloodGroup: "B+",
      status: "Enrolled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=38",
    },
    {
      id: "ADM-2026-0022",
      name: "Meera Sethi",
      dob: "03 Apr 2021",
      phone: "+91 6655887744",
      email: "meera.mother@email.com",
      class: "Grade 2",
      bloodGroup: "A+",
      status: "Verifying Documents",
      documents: "1/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=39",
    },
    {
      id: "ADM-2026-0023",
      name: "Kunal Bansal",
      dob: "21 Jul 2020",
      phone: "+91 5544667788",
      email: "kunal.father@email.com",
      class: "Grade 3",
      bloodGroup: "B+",
      status: "Interview Scheduled",
      documents: "2/2",
      enrolledOn: "15 Jan 2026",
      avatar: "https://i.pravatar.cc/40?img=40",
    },

];

export default function OfferLetters() {
  const STORAGE_KEY = "admission_applications";
  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
const [rowsPerPage, setRowsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const handleRefresh = () => {
  window.location.reload();
};
const [openDate, setOpenDate] = useState(false);
const [openStatus, setOpenStatus] = useState(false);
const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");
const [statusFilter, setStatusFilter] = useState("All");
const [viewProfile, setViewProfile] = useState<any>(null);
const handlePrint = () => {
  window.print();
};
const navigate = useNavigate();

const [newAppOpen, setNewAppOpen] = useState(false);

const [newApplication, setNewApplication] = useState({
  name: "",
  dob: "",
  phone: "",
  email: "",
  class: "Grade 1",
  bloodGroup: "O+",
});

const handleExport = () => {
  const headers = ["ID", "Name", "DOB", "Phone", "Class", "Enrolled On"];

  const rows = applications.map((a) =>
    [a.id, a.name, a.dob, a.phone, a.class, a.enrolledOn].join(",")
  );

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = "offer_letters.csv";
  link.click();
};
const enrolled = data.filter(
  a => a.status === "Enrolled"
);

const handleSort = () => {
  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
};

  const [search, setSearch] = useState("");

  const filtered = applications
  .filter(
    (a) =>
      (statusFilter === "All" || a.status === statusFilter) &&
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase()))
  )
  .sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    {/* LEFT */}
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
    Enrolled Students
  </h2>
  <p className="text-sm text-gray-500 mt-1">
    Dashboard / Receptionist / Enrolled Students
  </p>
</div>

</div>


    {/* RIGHT ACTIONS */}
    <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
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
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-1"
>
  <Plus size={14} />
  <span className="hidden sm:inline">New Application</span>
</button>

    </div>

  </div>
</div>

      {/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

{/* TOP ROW */}
<div className="flex items-center justify-between">
  <h3 className="text-lg font-semibold text-gray-900">
  Enrolled Students List
  </h3>

  <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">

    {/* DATE RANGE */}
    <div className="relative">
  <button
    onClick={() => setOpenDate(!openDate)}
    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
  >
    <CalendarDays size={16} />
    {startDate} – {endDate}
  </button>

  {openDate && (
    <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg p-4 w-72 z-50">
      <label className="text-sm">Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-3"
      />

      <label className="text-sm">End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-3"
      />

      <button
        onClick={() => setOpenDate(false)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
      >
        Apply
      </button>
    </div>
  )}
</div>
<div className="relative">
<button
  onClick={() => setOpenStatus(!openStatus)}
  className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  <ArrowUpDown size={16} />
  Status {statusFilter}
</button>


{openStatus && (
  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow z-50">
    {["All", "Offer Accepted", "Applied", "Rejected"].map((s) => (
      <button
        key={s}
        onClick={() => {
          setStatusFilter(s);
          setOpenStatus(false);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        {s}
      </button>
    ))}
  </div>
)}

</div>

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
    className="border rounded-lg px-4 py-2 text-sm w-60"
  />
</div>
</div>
{/* ================= TABLE ================= */}
<div className="bg-white border rounded-2xl overflow-hidden hidden md:block">
  <table className="w-full text-sm">
 <thead className="bg-gray-50 text-gray-600">
  <tr>
    <th className="px-6 py-4 text-left">ADMISSION NO / ROLL</th>
    <th className="px-6 py-4 text-left">STUDENT DETAILS</th>
    <th className="px-6 py-4 text-left">CLASS & SECTION</th>
    <th className="px-6 py-4 text-left">GUARDIAN CONTACT</th>
    <th className="px-6 py-4 text-left">BLOOD GROUP</th>
    <th className="px-6 py-4 text-left">ENROLLMENT DATE</th>
    <th className="px-6 py-4 text-center">ACTIONS</th>
  </tr>
</thead>

          <tbody className="divide-y">
          {paginatedData.map((app, index) => (
              <tr key={app.id} className="hover:bg-gray-50">

              {/* ADMISSION */}
              <td className="px-6 py-4">
                <p className="text-blue-600 font-medium">{app.id}</p>
                <p className="text-xs text-gray-500">Roll: {index + 1}</p>
              </td>
            
              {/* STUDENT */}
              <td className="px-6 py-4">
              <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
                  <img src={app.avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-xs text-gray-500">DOB: {app.dob}</p>
                  </div>
                </div>
              </td>
            
              {/* CLASS */}
              <td className="px-6 py-4">
                <p className="font-medium">{app.class}</p>
                <p className="text-xs text-gray-500">Section TBD</p>
              </td>
            
              {/* GUARDIAN */}
              <td className="px-6 py-4">
                <p>{app.name.split(" ")[0]}'s Parent</p>
                <p className="text-xs text-gray-500">{app.phone}</p>
              </td>
            
              {/* BLOOD GROUP ✅ */}
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                  {app.bloodGroup}
                </span>
              </td>
            
              {/* ENROLLMENT DATE */}
              <td className="px-6 py-4">
                {app.enrolledOn}
              </td>
            
              {/* ACTION */}
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => setViewProfile(app)}
                  className="
                    w-28 h-14
                    border border-gray-300
                    rounded-xl
                    flex flex-col items-center justify-center
                    gap-1
                    text-sm font-medium text-gray-700
                    hover:bg-gray-50
                  "
                >
                  <Eye size={16} />
                  <span>View Profile</span>
                </button>
              </td>
            
            </tr>
            
            ))}
          </tbody>
        </table>
      </div>
      {/* ================= MOBILE VIEW (CARDS) ================= */}
<div className="md:hidden space-y-4">
  {paginatedData.map((app, index) => (
    <div
      key={app.id}
      className="bg-white border rounded-xl p-4 space-y-3"
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
      <div className="flex gap-3">
    <img
      src={app.avatar}
      alt={app.name}
      className="w-12 h-12 rounded-full object-cover border"
    />

    <div>
      <p className="text-blue-600 font-semibold">{app.id}</p>
      <p className="font-medium">{app.name}</p>
      <p className="text-xs text-gray-500">
        DOB: {app.dob}
      </p>
    </div>
  </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Class</p>
          <p className="font-medium">{app.class}</p>
        </div>

        <div>
          <p className="text-gray-500">Enrollment</p>
          <p className="font-medium">{app.enrolledOn}</p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Guardian Contact</p>
          <p className="font-medium">{app.phone}</p>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={() => setViewProfile(app)}
        className="
          w-full py-2
          border rounded-lg
          text-sm font-medium
          flex items-center justify-center gap-2
          hover:bg-gray-50
        "
      >
        <Eye size={16} />
        View Profile
      </button>
    </div>
  ))}
</div>

      <div className="flex justify-end items-center gap-3 px-6 py-4 bg-white border rounded-b-2xl">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="
      px-4 py-2
      rounded-lg
      text-sm font-medium
      border border-blue-600
      text-blue-600
      hover:bg-blue-50
      disabled:opacity-40
      disabled:cursor-not-allowed
    "
  >
    Prev
  </button>

  <span className="text-sm text-gray-600">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="
      px-4 py-2
      rounded-lg
      text-sm font-medium
      bg-blue-600
      text-white
      hover:bg-blue-700
      disabled:opacity-40
      disabled:cursor-not-allowed
    "
  >
    Next
  </button>

</div>

{/* ================= VIEW PROFILE MODAL ================= */}
{viewProfile && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-5xl rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-blue-50 px-6 py-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{viewProfile.name}</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-blue-600 font-medium">
              {viewProfile.id}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
              Enrolled
            </span>
          </div>
        </div>
        <button
          onClick={() => setViewProfile(null)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b px-6 text-sm">
        {["Overview"].map(
          (tab) => (
            <button
              key={tab}
              className="py-3 border-b-2 border-blue-600 text-blue-600 font-medium"
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

        {/* STUDENT INFO */}
        <div className="border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Student Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><b>Full Name:</b> {viewProfile.name}</p>
            <p><b>DOB:</b> {viewProfile.dob}</p>
            <p><b>Class:</b> {viewProfile.class}</p>
            <p><b>Status:</b> Enrolled</p>
          </div>
        </div>

        {/* GUARDIAN INFO */}
        <div className="border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Guardian Information</h3>
          <p><b>Email:</b> {viewProfile.email}</p>
          <p><b>Phone:</b> {viewProfile.phone}</p>
        </div>

        {/* ADDRESS */}
        <div className="border rounded-xl p-5">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>Chennai</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t">
        <button
          onClick={() => setViewProfile(null)}
          className="px-5 py-2 border rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

{newAppOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
<div
  className="
    bg-white w-full sm:max-w-lg
    rounded-t-2xl sm:rounded-2xl
    p-6
    max-h-[90vh]
    overflow-y-auto
  "
>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">New Application</h2>
        <button
          onClick={() => setNewAppOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="col-span-2">
          <label className="text-gray-600">Student Name</label>
          <input
            value={newApplication.name}
            onChange={(e) =>
              setNewApplication({ ...newApplication, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Date of Birth</label>
          <input
            type="date"
            value={newApplication.dob}
            onChange={(e) =>
              setNewApplication({ ...newApplication, dob: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-600">Blood Group</label>
          <select
            value={newApplication.bloodGroup}
            onChange={(e) =>
              setNewApplication({
                ...newApplication,
                bloodGroup: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>O+</option>
            <option>A+</option>
            <option>B+</option>
            <option>AB+</option>
          </select>
        </div>

        <div>
          <label className="text-gray-600">Class</label>
          <select
            value={newApplication.class}
            onChange={(e) =>
              setNewApplication({ ...newApplication, class: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
          </select>
        </div>

        <div>
          <label className="text-gray-600">Phone</label>
          <input
            value={newApplication.phone}
            onChange={(e) =>
              setNewApplication({ ...newApplication, phone: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            value={newApplication.email}
            onChange={(e) =>
              setNewApplication({ ...newApplication, email: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setNewAppOpen(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!newApplication.bloodGroup) {
              alert("Blood Group is required");
              return;
            }
          
            const newEntry = {
              id: `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              avatar: "https://i.pravatar.cc/40",
              status: "Applied",
              documents: "0/2",
              enrolledOn: "—",
              ...newApplication, // ✅ includes bloodGroup
            };
          
            setData(prev => [newEntry, ...prev]);
            setNewAppOpen(false);
          }}
          
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm"
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
