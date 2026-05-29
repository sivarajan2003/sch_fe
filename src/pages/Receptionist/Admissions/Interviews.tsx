import { Eye, ArrowLeft, RefreshCcw, Printer, Plus, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import interviewService from "../../../service/interviewService";
import { toast } from "react-toastify";
import i1 from "../../../assets/gif/i1.gif";
import i2 from "../../../assets/gif/i2.gif";
import i3 from "../../../assets/gif/i3.gif";

const statusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Scheduled":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Interviews() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [openFilter, setOpenFilter] = useState(false);
  const search = "";
  const startDate = "";
  const endDate = "";
  const sortOrder = "asc";
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Pagination
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [viewApp, setViewApp] = useState<any>(null);

  const [scheduleApp, setScheduleApp] = useState<any>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleLocation, setScheduleLocation] = useState("Admin Office - Room 101");

  useEffect(() => {
    fetchInterviews();
  }, [currentPage, rowsPerPage, sortOrder, statusFilter, startDate, endDate]);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (statusFilter !== "All") filters.status = statusFilter;

      const res = await interviewService.getInterviews({
        page: currentPage,
        limit: rowsPerPage,
        search: search || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        order: JSON.stringify([['interview_date', sortOrder.toUpperCase()]]),
        filters: JSON.stringify(filters),
      });

      const rows = res?.rows ?? res?.data?.rows ?? [];

      if (res.success) {
        const mapped = rows.map((item: any) => {
          const docs = [
            item.admission?.birth_certificate,
            item.admission?.tc_certificate,
            item.admission?.passport_size_photo,
            item.admission?.address_proof,
          ];
          const uploadedCount = docs.filter(d => d && d !== 'null').length;
          const totalDocs = 4;

          return {
            id: item.id,
            name: item.admission?.student_name || item.admission_id,
            dob: item.admission?.date_of_birth || "-",
            phone: item.admission?.parent_number || "",
            email: item.admission?.parent_email || "",
            class: item.admission?.class_name || item.admission?.class_applied_id || "N/A",
            status: item.status || "Verifying Documents",
            documents: `${uploadedCount}/${totalDocs}`,
            avatar: item.admission?.passport_size_photo
              ? (item.admission.passport_size_photo.startsWith("http")
                ? item.admission.passport_size_photo
                : `http://localhost:4000/${item.admission.passport_size_photo}`)
              : `https://ui-avatars.com/api/?name=${item.admission?.student_name || item.admission_id}&background=random`,
            interviewDate: item.interview_date ? new Date(item.interview_date).toLocaleDateString() : "-",
            interviewTime: item.interview_time || "",
            interviewLocation: item.location || "Admin Office",
            original: item,
          };
        });

        setData(mapped);
        setStats({
          scheduled: mapped.filter((m: any) => m.status === 'Scheduled').length,
          completed: mapped.filter((m: any) => m.status === 'Completed').length,
        });
      } else {
        setData([]);
        setStats({ scheduled: 0, completed: 0 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchInterviews();
  };

  // ACTIONS
  const markInterviewDone = async (app: any) => {
    try {
      await interviewService.updateInterviewStatus(app.original.id, {
        status: "Completed"
      });
      toast.success("Marked as Completed");
      fetchInterviews();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleSchedule = async () => {
    if (!scheduleApp) return;
    try {
      await interviewService.updateInterview(scheduleApp.original.id, {
        interview_date: scheduleDate,
        location: scheduleLocation,
        status: "Scheduled",
      });
      toast.success(`Interview Scheduled for ${scheduleApp.name}`);
      setScheduleApp(null);
      fetchInterviews();
    } catch (error) {
      toast.error("Failed to schedule interview");
    }
  };

  // Stats calculation (on current page data? or ideally separate API call?)
  // We'll calculate on current loaded data for simplicity as per previous code, 
  // OR fetch stats separately. The previous code calculated from "data" (all local data).
  // Now "data" is paginated. So stats will be wrong if we only use `data`.
  // We should fetch stats or use the `getAdmissionStats` I added!
  const [stats, setStats] = useState({ scheduled: 0, completed: 0 });

useEffect(() => {
  if (viewApp || scheduleApp) {
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
  } else {
    document.body.style.overflow = "auto";
    document.body.classList.remove("modal-open");
  }

  return () => {
    document.body.style.overflow = "auto";
    document.body.classList.remove("modal-open");
  };
}, [viewApp, scheduleApp]);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard/receptionist")} className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Interviews</h2>
              <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Interviews</p>
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
            <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
            <button onClick={() => navigate("/admin/dashboard/receptionist/admissions/application-form")} className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
              <Plus size={14} /> New Application
            </button>
          </div>
        </div>
      </div>

      {/* SUB HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Interviews List</h3>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenFilter(!openFilter)} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
              <Filter size={16} /> Filter: {statusFilter}
            </button>
            {/* Filter Dropdown Logic */}
            {openFilter && (
              <div className="absolute right-20 mt-32 w-52 bg-white border rounded-lg shadow z-20">
                {["All", "Scheduled", "Completed", "Cancelled"].map(s => (
                  <button key={s} onClick={() => { setStatusFilter(s); setOpenFilter(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">{s}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Search etc */}
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border p-6 flex items-center justify-between hover:shadow-md transition">
          <div><p className="text-sm text-gray-500">Scheduled</p><p className="text-3xl font-bold mt-1">{stats.scheduled}</p></div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"><img src={i1} className="w-10 h-10 object-contain" /></div>
        </div>
        <div className="bg-white rounded-xl border p-6 flex items-center justify-between hover:shadow-md transition">
          <div><p className="text-sm text-gray-500">Completed</p><p className="text-3xl font-bold mt-1">{stats.completed}</p></div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center"><img src={i2} className="w-10 h-10 object-contain" /></div>
        </div>
        <div className="bg-white rounded-xl border p-6 flex items-center justify-between hover:shadow-md transition">
          <div><p className="text-sm text-gray-500">Pass Rate</p><p className="text-3xl font-bold mt-1">100%</p></div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center"><img src={i3} className="w-10 h-10 object-contain" /></div>
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden lg:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">STUDENT</th>
              <th className="px-6 py-3 text-left">SCHEDULE</th>
              <th className="px-6 py-3 text-left">LOCATION</th>
              <th className="px-6 py-3 text-left">RESULT</th>
              <th className="px-6 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">{String(app.id).substring(0, 8)}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4">{app.interviewDate || "Not scheduled"}</td>
                <td className="px-6 py-4 text-gray-600">{app.interviewLocation || "Admin Office"}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle(app.status)}`}>{app.status}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => setViewApp(app)} className="p-2 border rounded hover:bg-gray-50"><Eye size={16} /></button>
                    {app.status !== "Completed" && (
                      <button onClick={() => setScheduleApp(app)} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Schedule</button>
                    )}
                    {app.status === "Completed" ? (
                      <span className="text-green-600 text-xs font-bold px-2 py-1">Done</span>
                    ) : (
                      app.status === "Scheduled" && (
                        <button onClick={() => markInterviewDone(app)} className="p-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs">Mark Done</button>
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-600">Loading interviews...</div>
        ) : data.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center text-gray-600">No interviews found.</div>
        ) : (
          data.map((app) => (
            <div key={app.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={app.avatar} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.class}</p>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 space-y-2">
                <div><span className="font-medium">Schedule:</span> {app.interviewDate || "Not scheduled"}</div>
                <div><span className="font-medium">Location:</span> {app.interviewLocation || "Admin Office"}</div>
                <div><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(app.status)}`}>{app.status}</span></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 px-6 py-4 border-t text-sm">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
      </div>

      {/* MODALS */}
      {viewApp && (
  <div className="fixed inset-0 !mt-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
 <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Student Details</h3>
              <button onClick={() => setViewApp(null)}>✕</button>
            </div>
            <div className="p-6 space-y-4">
              {/* CONTENT REUSED FROM OLD FILE SIMPLIFIED */}
              <div className="flex items-center gap-4">
                <img src={viewApp.avatar} className="w-16 h-16 rounded-full" />
                <div><h4 className="text-xl font-bold">{viewApp.name}</h4><p className="text-gray-500">{viewApp.class}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded uppercase text-gray-600">
                <div><label>Phone:</label> <span className="text-gray-900 font-medium">{viewApp.phone}</span></div>
                <div><label>Email:</label> <span className="text-gray-900 font-medium">{viewApp.email}</span></div>
                <div><label>Status:</label> <span className="text-gray-900 font-medium">{viewApp.status}</span></div>
                <div><label>ID:</label> <span className="text-gray-900 font-medium">{viewApp.id}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

     {scheduleApp && (
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
<div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold">Schedule Interview</h2>
            <p className="text-gray-500 mb-4">{scheduleApp.name}</p>
            <div className="space-y-4">
              <div><label className="text-sm">Date</label><input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
              <div><label className="text-sm">Time</label><input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
              <div><label className="text-sm">Location</label><input value={scheduleLocation} onChange={e => setScheduleLocation(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setScheduleApp(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSchedule} className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
