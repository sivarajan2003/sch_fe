import { RefreshCcw, Printer, CalendarDays, ArrowUpDown, Plus, Eye, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function EnrolledStudents() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("Enrolled"); // Default to Enrolled
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false); // Used for status dropdown if needed
  const [openDate, setOpenDate] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [viewProfile, setViewProfile] = useState<any>(null);

  useEffect(() => {
    fetchEnrolled();
  }, [currentPage, rowsPerPage, sortOrder, startDate, endDate, statusFilter]);

  const fetchEnrolled = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (statusFilter !== "All") filters.admission_status = statusFilter;

      const res = await admissionService.getAdmissions({
        page: currentPage,
        limit: rowsPerPage,
        search,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        order: JSON.stringify([['createdAt', sortOrder.toUpperCase()]]),
        filters: JSON.stringify(filters)
      });

      if (res.success) {
        setTotalCount(res.count);
        const mapped = res.rows.map((item: any) => ({ // Map to component expected structure
          id: item.addmission_number || item.id,
          name: item.student_name,
          dob: item.date_of_birth,
          phone: item.parent_number,
          email: item.parent_email,
          class: item.class_name || "N/A",
          section: item.class_section || "TBD",
          bloodGroup: "N/A", // Not in backend schema yet
          status: item.admission_status,
          enrolledOn: new Date(item.updatedAt).toLocaleDateString("en-GB"), // using updatedAt as proxy
          avatar: item.passport_size_photo ? (item.passport_size_photo.startsWith("http") ? item.passport_size_photo : `http://localhost:4000/${item.passport_size_photo}`) : `https://ui-avatars.com/api/?name=${item.student_name}&background=random`,
          address: item.address,
          original: item
        }));
        setData(mapped);
      }
    } catch (error) {
      toast.error("Failed to load enrolled students");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchEnrolled();
  const handlePrint = () => window.print();
  const handleExport = () => { /* Export logic */ };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard/receptionist")} className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Enrolled Students</h2>
              <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Enrolled Students</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
            <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
            <button onClick={() => navigate("/admin/dashboard/receptionist/admissions/application-form")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1"><Plus size={14} /> New</button>
          </div>
        </div>
      </div>

      {/* SUB HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Enrolled Students List <span className="text-gray-500 text-sm font-normal">({totalCount})</span></h3>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenDate(!openDate)} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"><CalendarDays size={16} /> {startDate && endDate ? `${startDate} - ${endDate}` : 'Date Range'}</button>
            {/* Date Picker Dropdown */}
            {openDate && (
              <div className="absolute right-20 mt-32 w-72 bg-white border rounded shadow p-4 z-50">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded mb-2" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded mb-2" />
                <button onClick={() => setOpenDate(false)} className="w-full bg-blue-600 text-white rounded py-1">Apply</button>
              </div>
            )}
            <button onClick={() => setStatusFilter(prev => prev === "Enrolled" ? "All" : "Enrolled")} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"><ArrowUpDown size={16} /> Status: {statusFilter}</button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Row Per Page
            <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))} className="mx-2 border rounded p-1">
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-1 text-sm w-60" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">ADMISSION NO</th>
              <th className="px-6 py-4 text-left">STUDENT DETAILS</th>
              <th className="px-6 py-4 text-left">CLASS & SECTION</th>
              <th className="px-6 py-4 text-left">GUARDIAN CONTACT</th>
              <th className="px-6 py-4 text-left">BLOOD GROUP</th>
              <th className="px-6 py-4 text-left">ENROLLMENT DATE</th>
              <th className="px-6 py-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={7} className="p-4 text-center">Loading...</td></tr> : data.map((app, index) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-blue-600 font-medium">{String(app.id).substring(0, 8)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">DOB: {app.dob}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4"><p className="font-medium">{app.class}</p><p className="text-xs text-gray-500">{app.section}</p></td>
                <td className="px-6 py-4"><p>{app.phone}</p><p className="text-xs text-gray-500">{app.email}</p></td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">{app.bloodGroup}</span></td>
                <td className="px-6 py-4">{app.enrolledOn}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => setViewProfile(app)} className="border rounded px-3 py-1 flex items-center gap-1 hover:bg-gray-50 mx-auto text-xs"><Eye size={14} /> View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden space-y-4">
        {data.map(app => (
          <div key={app.id} className="bg-white border rounded-xl p-4 space-y-3">
            <div className="flex gap-3">
              <img src={app.avatar} className="w-12 h-12 rounded-full" />
              <div><p className="text-blue-600 font-semibold">{String(app.id).substring(0, 8)}</p><p className="font-medium">{app.name}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-gray-500">Class</p><p>{app.class}</p></div>
              <div><p className="text-gray-500">Contact</p><p>{app.phone}</p></div>
            </div>
            <button onClick={() => setViewProfile(app)} className="w-full border rounded py-2 text-sm flex items-center justify-center gap-1 hover:bg-gray-50"><Eye size={14} /> View Profile</button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 px-6 py-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="text-sm">Page {currentPage} of {totalPages || 1}</span>
        <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>

      {/* VIEW MODAL */}
      {viewProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold">{viewProfile.name}</h2>
              <button onClick={() => setViewProfile(null)} className="text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-gray-500 text-sm">Admission No</label><p className="font-medium">{viewProfile.id}</p></div>
              <div><label className="text-gray-500 text-sm">Status</label><p className="font-medium">{viewProfile.status}</p></div>
              <div><label className="text-gray-500 text-sm">Class</label><p className="font-medium">{viewProfile.class}</p></div>
              <div><label className="text-gray-500 text-sm">Section</label><p className="font-medium">{viewProfile.section}</p></div>
              <div><label className="text-gray-500 text-sm">Guardian Phone</label><p className="font-medium">{viewProfile.phone}</p></div>
              <div><label className="text-gray-500 text-sm">Address</label><p className="font-medium">{viewProfile.address}</p></div>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => setViewProfile(null)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
