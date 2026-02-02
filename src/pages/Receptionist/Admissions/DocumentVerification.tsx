import { Eye, Pencil, Trash2, FileText } from "lucide-react";
import {
    RefreshCcw,
    Printer,
    Filter,
    ArrowUpDown,
    Plus,
    CalendarDays,
  } from "lucide-react";
  import { useState } from "react";
  import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

  const documents = [
    {
      name: "Birth Certificate.pdf",
      size: "239 KB",
      type: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Student Photo.jpg",
      size: "122 KB",
      type: "image",
      url: "/documents/student-photo.jpg",
    },
  ];
  
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
const initialApplications = [...applications];

export default function AllApplications() {
  const STORAGE_KEY = "admission_applications";
  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

    const [openDate, setOpenDate] = useState(false);
const [openFilter, setOpenFilter] = useState(false);
const [selectedApp, setSelectedApp] = useState<any>(null);
const [previewDoc, setPreviewDoc] = useState<any>(null);

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
const [openNewDoc, setOpenNewDoc] = useState(false);

const [newDoc, setNewDoc] = useState({
  applicationId: "",
  name: "",
  type: "pdf",
  file: null as File | null,
});
const documents = data.filter(
  a => a.status === "Verifying Documents"
);

const handleRefresh = () => {
    setData(initialApplications);
    setSearch("");
    setStatusFilter("All");
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

  return (
    <div className="space-y-6">

     {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
  <div className="flex items-center justify-between">

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
    Document Verification
  </h2>
  <p className="text-sm text-gray-500 mt-1">
    Dashboard / Receptionist / Documents
  </p>
</div>

</div>


    {/* RIGHT ACTIONS */}
    <div className="flex items-center gap-3">
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
  onClick={() => setOpenNewDoc(true)}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
>
  <Plus size={14} /> New Document
</button>
    </div>
  </div>
</div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

  {/* TOP ROW */}
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-900">
    Document  List
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
      className="border rounded-lg px-4 py-2 text-sm w-60"
    />
  </div>
</div>
      {/* ================= MASTER–DETAIL LAYOUT ================= */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* ================= LEFT SIDE ================= */}
<div className="lg:col-span-1 bg-white rounded-xl border p-4 space-y-4 overflow-y-auto max-h-[70vh]">
  <h3 className="text-lg font-semibold">
    Applications ({applications.length})
  </h3>

  {applications.map((app) => (
    <div
      key={app.id}
      onClick={() => setSelectedApp(app)}
      className={`p-4 rounded-xl border cursor-pointer transition
        ${selectedApp?.id === app.id
          ? "border-blue-500 bg-blue-50"
          : "hover:bg-gray-50"
        }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{app.name}</p>
          <p className="text-sm text-gray-500">{app.id}</p>
          <p className="text-sm text-gray-600 mt-1">
            {app.class} • {app.documents} documents
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          All Verified
        </span>
      </div>
    </div>
  ))}
</div>

{/* ================= RIGHT SIDE ================= */}
<div className="lg:col-span-2 bg-white rounded-xl border p-6 min-h-[70vh]">

  {!selectedApp ? (
    /* EMPTY STATE */
    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
      <FileText size={48} className="mb-4 opacity-40" />
      <h3 className="text-lg font-semibold text-gray-700">
        Select an Application
      </h3>
      <p className="text-sm mt-1">
        Choose an application from the list to review and verify documents
      </p>
    </div>
  ) : (
    /* DOCUMENT VERIFICATION */
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold">{selectedApp.name}</h2>
        <p className="text-sm text-gray-500">{selectedApp.id}</p>
      </div>

      {documents.map((doc) => (
  <div
    key={doc.name}
    className="border rounded-xl p-5 bg-green-50 flex justify-between items-center"
  >
    <div>
      <p className="font-medium">{doc.name}</p>
      <p className="text-xs text-gray-500">
        {doc.size} • Uploaded
      </p>
    </div>
    {doc.type === "pdf" ? (
  <a
    href={doc.url}
    target="_blank"
    download
    className="px-5 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50"
  >
    View / Download
  </a>
) : (
  <button
    onClick={() => setPreviewDoc(doc)}
    className="px-5 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50"
  >
    View Photo
  </button>
)}

  </div>
))}

    </div>
  )}

</div>
</div>
{previewDoc && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-xl max-w-4xl w-full p-4 relative">

      <button
        onClick={() => setPreviewDoc(null)}
        className="absolute top-4 right-4 text-xl"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-4">
        {previewDoc.name}
      </h3>

      {previewDoc.type === "image" ? (
        <img
          src={previewDoc.url}
          alt=""
          className="w-full rounded-lg"
        />
      ) : (
        <iframe
          src={previewDoc.url}
          className="w-full h-[70vh] rounded-lg"
        />
      )}
    </div>
  </div>
)}
{openNewDoc && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <h3 className="text-lg font-semibold mb-4">
        Add New Document
      </h3>

      {/* APPLICATION */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Application</label>
        <select
          value={newDoc.applicationId}
          onChange={(e) =>
            setNewDoc({ ...newDoc, applicationId: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
        >
          <option value="">Select Application</option>
          {applications.map(app => (
            <option key={app.id} value={app.id}>
              {app.name} ({app.id})
            </option>
          ))}
        </select>
      </div>

      {/* DOCUMENT NAME */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Document Name</label>
        <input
          type="text"
          placeholder="Birth Certificate / Student Photo"
          value={newDoc.name}
          onChange={(e) =>
            setNewDoc({ ...newDoc, name: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
        />
      </div>

      {/* DOCUMENT TYPE */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Document Type</label>
        <select
          value={newDoc.type}
          onChange={(e) =>
            setNewDoc({ ...newDoc, type: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
        >
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
        </select>
      </div>

      {/* FILE UPLOAD */}
      <div className="mb-6">
        <label className="text-sm text-gray-600">Upload File</label>
        <input
          type="file"
          onChange={(e) =>
            setNewDoc({ ...newDoc, file: e.target.files?.[0] || null })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setOpenNewDoc(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!newDoc.file) return;

            const url = URL.createObjectURL(newDoc.file);

            documents.push({
              name: newDoc.name,
              size: `${Math.round(newDoc.file.size / 1024)} KB`,
              type: newDoc.type,
              url,
            });

            setOpenNewDoc(false);
            setNewDoc({
              applicationId: "",
              name: "",
              type: "pdf",
              file: null,
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}

</div>
)}
