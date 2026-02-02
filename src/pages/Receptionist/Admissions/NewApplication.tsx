import { Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Plus,
  CalendarDays as CalendarIcon,
} from "lucide-react";

/* SAME DATA SOURCE */
const applications = [
  {
    id: "ADM-2026-0004",
    name: "Ayaan Joshi",
    dob: "22 Sept 2019",
    phone: "+91 6347401947",
    email: "ayaan.father@email.com",
    class: "Grade 3",
    status: "Interview Scheduled",
    avatar: "https://i.pravatar.cc/40?img=21",
  },
  {
    id: "ADM-2026-0007",
    name: "Ishaan Verma",
    dob: "02 Feb 2021",
    phone: "+91 9988776655",
    email: "ishaan.father@email.com",
    class: "Grade 2",
    status: "Applied",
    avatar: "https://i.pravatar.cc/40?img=24",
  },
];

export default function NewApplication() {
  const STORAGE_KEY = "admission_applications";
  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const updateStatus = (id: string, nextStatus: string) => {
    const updated = data.map((a) =>
      a.id === id ? { ...a, status: nextStatus } : a
    );
  
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };
  const [openDate, setOpenDate] = useState(false);
const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");
const submitApplication = (formData: any) => {
  const STORAGE_KEY = "admission_applications";

  const existing =
    JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const newApplication = {
    ...formData,
    id: `ADM-${Date.now()}`,
    status: "Applied", // 🔥 VERY IMPORTANT
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, newApplication])
  );

  // ❌ Clear draft after submit
  localStorage.removeItem("admission_form_draft");
};

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const list = saved ? JSON.parse(saved) : [];

  // Ignore drafts accidentally saved
  setData(list.filter((a: any) => a.status));
}, []);

  const [viewApp, setViewApp] = useState<any>(null);
const [activeTab, setActiveTab] = useState<
  "overview" | "documents" | "interview" | "offer"
>("overview");
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
const handleSort = () => {
  const sorted = [...data].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  setData(sorted);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};
const newApplications = data.filter(
  (a) => a.status === "Applied"
);


const handleRefresh = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
setData(saved ? JSON.parse(saved) : []);
};

const handlePrint = () => {
  window.print();
};

const handleExport = () => {
  const headers = ["ID", "Name", "Class", "Status"];
  const rows = data.map((a) =>
    [a.id, a.name, a.class, a.status].join(",")
  );

  const csv =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csv);
  link.download = "applications.csv";
  link.click();
};

  /* LOAD FROM LOCAL STORAGE */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setData(saved ? JSON.parse(saved) : []);
  }, []);
  
  /* ONLY NEW / PENDING APPLICATIONS */
  
  return (
    <div className="space-y-6">
{/* ================= MAIN HEADER ================= */}
<div className="bg-white border rounded-2xl px-4 sm:px-6 py-4 sm:py-6
                flex flex-col sm:flex-row gap-4 sm:gap-0
                sm:justify-between sm:items-center">
  <div>
    <h2 className="text-2xl font-semibold text-gray-900">
     New Applications
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Dashboard / Receptionist / New Applications
    </p>
  </div>

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

    
  </div>
</div>
{/* ================= SUB HEADER ================= */}
<div className="bg-white border rounded-2xl px-4 sm:px-6 py-4 sm:py-5
                flex flex-col lg:flex-row gap-4
                lg:items-center lg:justify-between">
  <h3 className="text-lg font-semibold text-gray-900">
    Application List
  </h3>

  <div className="flex items-center gap-3">
  <div className="relative">
  <button
    onClick={() => setOpenDate(!openDate)}
    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    <CalendarIcon size={16} />
    {startDate} - {endDate}
  </button>

  {openDate && (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg z-30 p-5">
      
      <label className="block text-sm text-gray-600 mb-1">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

      <label className="block text-sm text-gray-600 mb-1">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm mb-5"
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
<button
  onClick={handleSort}
  className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
>
  <ArrowUpDown size={16} />
  Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
</button>
<input
  type="text"
  placeholder="Search"
  className="border rounded-lg px-4 py-2 text-sm
             w-full sm:w-60"
/>
  </div>
</div>
      {/* ================= TABLE ================= */}
      <div className="hidden lg:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">APPLICATION</th>
              <th className="px-6 py-3 text-left">STUDENT DETAILS</th>
              <th className="px-6 py-3 text-left">CONTACT</th>
              <th className="px-6 py-3 text-left">CLASS</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {newApplications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">

                {/* APPLICATION ID */}
                <td className="px-6 py-4 text-blue-600 font-medium">
                  {app.id}
                </td>

                {/* STUDENT */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={app.avatar}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-gray-500">
                        DOB: {app.dob}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CONTACT */}
                <td className="px-6 py-4">
                  <p>{app.phone}</p>
                  <p className="text-xs text-gray-500">{app.email}</p>
                </td>

                {/* CLASS */}
                <td className="px-6 py-4">
  {app.class || "—"}
</td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
                    {app.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-center">
                <div className="inline-flex gap-6 sm:gap-4">

    {/* VIEW */}
    <Eye
  className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
  onClick={() => setViewApp(app)}
/>
    {/* INTERVIEW */}
    <CalendarDays
      className="w-4 h-4 text-gray-600 cursor-pointer"
      onClick={() =>
        navigate("/admin/dashboard/receptionist/admissions/interviews", {
          state: app,
        })
      }
    />
  </div>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ================= MOBILE & TABLET VIEW ================= */}
<div className="lg:hidden space-y-4">

{newApplications.map((app) => (
  <div
    key={app.id}
    className="bg-white border rounded-2xl p-4 space-y-4"
  >

    {/* TOP ROW */}
    <div className="flex justify-between items-start gap-3">

      <div className="flex items-center gap-3">
        <img
          src={app.avatar}
          alt={app.name}
          className="w-12 h-12 rounded-full border object-cover"
        />

        <div>
          <p className="text-blue-600 font-semibold">{app.id}</p>
          <p className="font-medium text-gray-900">{app.name}</p>
          <p className="text-xs text-gray-500">DOB: {app.dob}</p>
        </div>
      </div>

      <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 whitespace-nowrap">
        {app.status}
      </span>
    </div>

    {/* DETAILS */}
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Class</p>
        <p className="font-medium">{app.class || "—"}</p>
      </div>

      <div>
        <p className="text-gray-500">Contact</p>
        <p className="font-medium">{app.phone}</p>
        <p className="text-xs text-gray-500 truncate">{app.email}</p>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="flex justify-between items-center pt-2 border-t">

      <button
        onClick={() => setViewApp(app)}
        className="flex items-center gap-2 text-blue-600 text-sm"
      >
        <Eye size={16} /> View
      </button>

      <button
        onClick={() =>
          navigate(
            "/admin/dashboard/receptionist/admissions/interviews",
            { state: app }
          )
        }
        className="flex items-center gap-2 text-gray-600 text-sm"
      >
        <CalendarDays size={16} /> Interview
      </button>

    </div>

  </div>
))}
</div>

      {viewApp && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
<div className="bg-white w-full h-full sm:h-auto
                sm:max-w-5xl rounded-none sm:rounded-xl
                overflow-hidden">

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
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`py-3 border-b-2 ${
              activeTab === key
                ? "border-gray-800 text-gray-800 font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6 max-h-[70vh] overflow-y-auto">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            <div className="bg-white p-5 rounded-xl border">
              <h3 className="font-semibold mb-3">Student Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Full Name:</b> {viewApp.name}</p>
                <p><b>DOB:</b> {viewApp.dob}</p>
                <p><b>Class:</b> {viewApp.class}</p>
                <p><b>Status:</b> {viewApp.status}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border">
              <h3 className="font-semibold mb-3">Guardian Contact</h3>
              <p><b>Email:</b> {viewApp.email}</p>
              <p><b>Phone:</b> {viewApp.phone}</p>
            </div>

          </div>
        )}

        {/* DOCUMENTS 
        {activeTab === "documents" && (
          <div className="p-4 text-sm text-gray-600">
            Documents uploaded: —
          </div>
        )}
        {activeTab === "interview" && (
          <div className="p-4 text-sm text-gray-600">
            Interview status: {viewApp.status}
          </div>
        )}
        {activeTab === "offer" && (
          <div className="p-4 text-sm text-gray-600">
            Offer not generated yet
          </div>
        )}
*/}
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t flex justify-end">
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

    </div>
  );
}
