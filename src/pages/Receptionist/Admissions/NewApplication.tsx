import { Eye, RefreshCcw, Printer, ArrowUpDown, CalendarDays as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function NewApplication() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Date filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal logic
  const [viewApp, setViewApp] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "interview" | "offer">("overview");

  useEffect(() => {
    fetchApplications();
  }, [sortOrder, startDate, endDate]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const filters = { admission_status: "Applied" };
      const res = await admissionService.getAdmissions({
        limit: 50,
        search,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        filters: JSON.stringify(filters),
        order: JSON.stringify([['createdAt', sortOrder.toUpperCase()]])
      });

      if (res.success) {
        setData(res.rows.map((r: any) => ({
          id: r.addmission_number || r.id,
          name: r.student_name,
          dob: r.date_of_birth,
          phone: r.parent_number,
          email: r.parent_email,
          class: r.class_name || "N/A",
          status: r.admission_status,
          avatar: r.passport_size_photo ? (r.passport_size_photo.startsWith("http") ? r.passport_size_photo : `http://localhost:4000/${r.passport_size_photo}`) : `https://ui-avatars.com/api/?name=${r.student_name}&background=random`,
          fullData: r
        })));
      }
    } catch (error) {
      toast.error("Failed to fetch new applications");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchApplications();
  const handlePrint = () => window.print();

  const handleExport = () => {
    const headers = ["ID", "Name", "Class", "Status", "Contact"];
    const rows = data.map(a => [a.id, a.name, a.class, a.status, a.phone].join(","));
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "new_applications.csv";
    link.click();
  };

  const handleSort = () => setSortOrder(prev => prev === "asc" ? "desc" : "asc");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-2xl px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">New Applications</h2>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / New Applications</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
          <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
          <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
          <button onClick={handleExport} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Export</button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Application List</h3>
        <div className="flex items-center gap-3 relative">
          <button onClick={() => setOpenDate(!openDate)} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            <CalendarIcon size={16} /> {startDate || "Date"} - {endDate || "Range"}
          </button>
          {openDate && (
            <div className="absolute right-0 top-12 mt-2 w-80 bg-white border rounded-xl shadow-lg z-30 p-5">
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-4" />
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-5" />
              <button onClick={() => { setOpenDate(false); fetchApplications(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">Apply</button>
            </div>
          )}
          <button onClick={handleSort} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            <ArrowUpDown size={16} /> Sort {sortOrder === "asc" ? "Oldest" : "Newest"}
          </button>
          <input type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value); fetchApplications(); }} className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60" />
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
              <th className="px-6 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr> : data.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-blue-600 font-medium">{String(app.id).substring(0, 8)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} className="w-10 h-10 rounded-full border object-cover" />
                    <div><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">DOB: {app.dob}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4"><p>{app.phone}</p><p className="text-xs text-gray-500">{app.email}</p></td>
                <td className="px-6 py-4">{app.class}</td>
                <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">{app.status}</span></td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex gap-4">
                    <Eye className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => setViewApp(app)} />
                    {/* Assuming we might want to schedule interview from here directly, or navigate to interviews page */}
                    {/* <CalendarDays className="w-4 h-4 text-gray-600 cursor-pointer" onClick={() => navigate("/admin/dashboard/receptionist/admissions/interviews")} /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="lg:hidden space-y-4">
        {data.map(app => (
          <div key={app.id} className="bg-white border rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <img src={app.avatar} className="w-12 h-12 rounded-full border object-cover" />
                <div><p className="text-blue-600 font-semibold">{String(app.id).substring(0, 8)}</p><p className="font-medium">{app.name}</p></div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">{app.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Class</p><p className="font-medium">{app.class}</p></div>
              <div><p className="text-gray-500">Contact</p><p className="font-medium">{app.phone}</p></div>
            </div>
            <button onClick={() => setViewApp(app)} className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 text-sm text-blue-600"><Eye size={16} /> View</button>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {viewApp && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-50 px-6 py-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">{viewApp.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-blue-600 font-medium">{viewApp.id}</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">{viewApp.status}</span>
                </div>
              </div>
              <button onClick={() => setViewApp(null)} className="text-xl font-bold">✕</button>
            </div>

            <div className="flex gap-6 border-b px-6 text-sm">
              <button onClick={() => setActiveTab("overview")} className={`py-3 border-b-2 ${activeTab === "overview" ? "border-gray-800 text-gray-800" : "border-transparent text-gray-500"}`}>Overview</button>
              {/* Add other tabs if needed */}
            </div>

            <div className="p-6 space-y-6">
              {activeTab === "overview" && (
                <>
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
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button onClick={() => setViewApp(null)} className="px-4 py-2 border rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
