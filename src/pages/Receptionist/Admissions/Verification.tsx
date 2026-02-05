import {
  Eye, FileText, RefreshCcw,
  Printer,
  ArrowUpDown,
  ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

const statusStyle = (status: string) => {
  switch (status) {
    case "Verifying Documents":
      return "bg-yellow-100 text-yellow-700";
    case "Interview Done":
      return "bg-blue-100 text-blue-700";
    case "Enrolled":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Verification() {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchApplications();
  }, [currentPage, rowsPerPage, sortOrder]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Fetch logic - maybe prioritising Verifying Documents
      const res = await admissionService.getAdmissions({
        page: currentPage,
        limit: rowsPerPage,
        search,
        // We might want to filter only "Verifying Documents" or similar, 
        // but the UI shows multiple statuses. We'll fetch all.
        order: JSON.stringify([['createdAt', sortOrder.toUpperCase()]])
      });
      if (res.success) {
        setTotalCount(res.count);
        const mapped = res.rows.map((item: any) => ({
          id: item.id, // Keep UUID for navigation
          displayId: item.addmission_number || item.id, // For UI
          name: item.student_name,
          dob: item.date_of_birth,
          phone: item.parent_number,
          email: item.parent_email,
          class: item.class_name || "N/A",
          status: item.admission_status,
          documents: `${[item.birth_certificate, item.tc_certificate].filter(Boolean).length}/2`, // Rough count
          avatar: item.passport_size_photo ? (item.passport_size_photo.startsWith("http") ? item.passport_size_photo : `http://localhost:4000/${item.passport_size_photo}`) : `https://ui-avatars.com/api/?name=${item.student_name}&background=random`
        }));
        setData(mapped);
      }
    } catch (error) {
      toast.error("Failed to load verification list");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchApplications();
  const handlePrint = () => window.print();

  const handleSort = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className="space-y-4 sm:space-y-6 px-1">
      {/* HEADER */}
      <div className="bg-white border rounded-2xl px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard/receptionist")} className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Verification</h2>
              <p className="text-sm text-gray-500">Dashboard / Receptionist / Admissions / Verification</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRefresh} className="p-2 border rounded-lg"><RefreshCcw size={16} /></button>
            <button onClick={handlePrint} className="p-2 border rounded-lg"><Printer size={16} /></button>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border rounded-2xl px-6 py-5">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-lg font-semibold">Verification List</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
            <button onClick={handleSort} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
              <ArrowUpDown size={16} /> Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <input placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value); fetchApplications(); }} className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60" />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">APPLICATION</th>
              <th className="px-6 py-3 text-left">STUDENT</th>
              <th className="px-6 py-3 text-left hidden md:table-cell">CONTACT</th>
              <th className="px-6 py-3 text-left hidden md:table-cell">CLASS</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-left hidden md:table-cell">DOCS</th>
              <th className="px-6 py-3 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={7} className="p-4 text-center">Loading...</td></tr> : data.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-blue-600 font-medium">{String(app.displayId).substring(0, 20)}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">DOB: {app.dob}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell"><p>{app.phone}</p><p className="text-xs text-gray-500">{app.email}</p></td>
                <td className="px-6 py-4 hidden md:table-cell">{app.class}</td>
                <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs ${statusStyle(app.status)}`}>{app.status}</span></td>
                <td className="px-6 py-4 hidden md:table-cell flex items-center gap-2"><FileText size={14} />{app.documents}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => navigate(`/admin/dashboard/receptionist/admissions/verification/${app.id}`)} className="text-blue-600 hover:text-blue-800">
                    <Eye size={16} className="cursor-pointer text-blue-600 hover:text-blue-800" />
                  </button>
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
              <div className="flex gap-3">
                <img src={app.avatar} className="w-12 h-12 rounded-full object-cover border" />
                <div><p className="text-blue-600 font-semibold">{String(app.displayId).substring(0, 20)}</p><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">DOB: {app.dob}</p></div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${statusStyle(app.status)}`}>{app.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Class</p><p className="font-medium">{app.class}</p></div>
              <div><p className="text-gray-500">Documents</p><p className="font-medium">{app.documents}</p></div>
              <div className="col-span-2"><p className="text-gray-500">Contact</p><p className="font-medium">{app.phone}</p></div>
            </div>
            <button onClick={() => navigate(`/admin/dashboard/receptionist/admissions/verification/${app.id}`)} className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 text-sm text-blue-600">
              <Eye size={16} /> View Verification
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 px-4 sm:px-6 py-4 border-t text-sm">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
      </div>

    </div>
  );
}
