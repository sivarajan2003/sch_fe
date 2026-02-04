import { Eye, Send, GraduationCap, Trash2, FileText, ArrowLeft, RefreshCcw, Printer, Plus, CalendarDays, ArrowUpDown, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

const statusStyle = (status: string) => {
  switch (status) {
    case "Enrolled":
    case "Offer Accepted":
      return "bg-green-100 text-green-700";
    case "Interview Done":
    case "Approved":
      return "bg-blue-100 text-blue-700";
    case "Applied":
    case "Pending":
      return "bg-indigo-100 text-indigo-700";
    case "Offer Sent":
      return "bg-cyan-100 text-cyan-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const SummaryCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
  <div className="bg-white rounded-xl border p-5 flex flex-col justify-center hover:shadow-md transition">
    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

export default function OfferLetters() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [previewApp, setPreviewApp] = useState<any>(null);
  const [sendApp, setSendApp] = useState<any>(null); // For sending email
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [currentPage, rowsPerPage, sortOrder, statusFilter, startDate, endDate]);

  const fetchApplications = async () => {
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

      if (res.success && res.rows) {
        const mapped = res.rows.map((item: any) => ({
          id: item.addmission_number || item.id,
          name: item.student_name,
          email: item.parent_email,
          class: item.class_name || "N/A",
          status: item.admission_status,
          avatar: item.passport_size_photo ? (item.passport_size_photo.startsWith("http") ? item.passport_size_photo : `http://localhost:4000/${item.passport_size_photo}`) : `https://ui-avatars.com/api/?name=${item.student_name}&background=random`,
          original: item
        }));
        setData(mapped);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => fetchApplications();
  const handlePrint = () => window.print();

  // ACTIONS
  const handleGenerate = async (app: any) => {
    try {
      await admissionService.updateAdmission(app.original.id, {
        admission_status: "Approved" // Or "Offer Sent"? Let's say Approved means Offer Ready/Sent
      });
      toast.success("Offer Letter Generated (Status: Approved)");
      fetchApplications();
    } catch (error) {
      toast.error("Failed to generate offer");
    }
  };

  const handleSendEmail = async () => {
    if (!sendApp) return;
    // Mock email sending
    try {
      await admissionService.updateAdmission(sendApp.original.id, {
        admission_status: "Offer Sent"
      });
      toast.success(`Offer sent to ${sendApp.email}`);
      setSendApp(null);
      fetchApplications();
    } catch (error) {
      toast.error("Failed to send offer");
    }
  };

  const handleEnroll = async (app: any) => {
    try {
      await admissionService.updateAdmission(app.original.id, {
        admission_status: "Enrolled"
      });
      toast.success("Student Enrolled Successfully");
      navigate("/admin/dashboard/receptionist/admissions/enrolled"); // Assuming this page exists
    } catch (error) {
      toast.error("Failed to enroll");
    }
  };

  // Stats - Calculate from current view or separate API?
  // Ideally separate API.
  const [stats, setStats] = useState<any>({});
  useEffect(() => {
    admissionService.getAdmissionStats().then((res: any) => {
      if (res.success) setStats(res.data.counts || {});
    });
  }, []);

  const totalGenerated = (stats["Offer Sent"] || 0) + (stats["Approved"] || 0) + (stats["Enrolled"] || 0);
  const acceptedCount = (stats["Enrolled"] || 0) + (stats["Offer Accepted"] || 0); // Assuming statuses
  const pendingCount = stats["Pending"] || 0;
  const rejectedCount = stats["Rejected"] || 0;
  const notGenerated = (stats["Interview Done"] || 0);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Offer Letters</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Offer Letters</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
            <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
            <button onClick={() => navigate("/admin/dashboard/receptionist/admissions/application-form")} className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-1 justify-center"><Plus size={14} /> New Application</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <SummaryCard title="Total Generated" value={String(totalGenerated)} color="text-gray-900" />
        <SummaryCard title="Accepted" value={String(acceptedCount)} color="text-green-600" />
        <SummaryCard title="Pending" value={String(pendingCount)} color="text-yellow-600" />
        <SummaryCard title="In Review" value={String(notGenerated)} color="text-blue-600" />
        <SummaryCard title="Rejected" value={String(rejectedCount)} color="text-red-600" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">STUDENT</th>
              <th className="px-6 py-3 text-left">OFFER NO</th>
              <th className="px-6 py-3 text-left">CLASS</th>
              <th className="px-6 py-3 text-left">STATUS</th>
              <th className="px-6 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr> :
              data.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={app.avatar} className="w-10 h-10 rounded-full object-cover" />
                      <div><p className="font-medium">{app.name}</p><p className="text-xs text-gray-500">{String(app.id).substring(0, 8)}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {["Offer Sent", "Approved", "Enrolled", "Offer Accepted"].includes(app.status) ?
                      <span className="text-blue-600 font-medium">OFFER-{new Date().getFullYear()}-{String(app.id).substring(0, 4)}</span> :
                      <span className="text-gray-400">Not generated</span>
                    }
                  </td>
                  <td className="px-6 py-4">{app.class}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(app.status)}`}>{app.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      {/* If Interview Done, Allow Generate */}
                      {app.status === "Interview Done" && (
                        <button onClick={() => handleGenerate(app)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs">Generate</button>
                      )}

                      {/* If Approved/Offer Sent, Allow Send or Preview */}
                      {["Approved", "Offer Sent"].includes(app.status) && (
                        <>
                          <button onClick={() => setPreviewApp(app)} className="p-2 border rounded hover:bg-gray-50"><Eye size={16} /></button>
                          <button onClick={() => { setSendApp(app); setEmailSubject(`Offer Letter for ${app.name}`); setEmailMessage("Dear Parent,\n\nWe are happy to offer admission..."); }} className="p-2 border rounded hover:bg-gray-50"><Send size={16} /></button>
                        </>
                      )}

                      {["Offer Accepted", "Approved", "Offer Sent"].includes(app.status) && (
                        <button onClick={() => handleEnroll(app)} className="p-2 border rounded hover:bg-gray-50 text-green-600" title="Enroll"><GraduationCap size={16} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 px-6 py-4 border-t text-sm">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
      </div>

      {/* MODALS */}
      {previewApp && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Offer Letter Preview</h2>
            <div className="bg-gray-50 p-6 rounded border space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-xl font-bold text-blue-900">ATELIER SCHOOL</h3>
                <p className="text-sm text-gray-500">Excellence in Education</p>
              </div>
              <div className="text-sm space-y-2">
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>To:</strong> Parent of {previewApp.name}</p>
                <p><strong>Subject:</strong> Admission Offer for {previewApp.class}</p>
                <p className="mt-4">Dear Parent,</p>
                <p>We are pleased to inform you that <strong>{previewApp.name}</strong> has been selected for admission to <strong>{previewApp.class}</strong> for the academic year {new Date().getFullYear()}.</p>
                <p>Please complete the enrollment formalities by visiting the school office.</p>
                <p className="mt-4">Regards,<br />Admissions Team</p>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => setPreviewApp(null)} className="px-4 py-2 border rounded">Close</button>
              <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded">Print</button>
            </div>
          </div>
        </div>
      )}

      {sendApp && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Send Offer Letter</h3>
            <div className="space-y-4">
              <div><label className="text-sm font-medium">To:</label> <input value={sendApp.email} disabled className="w-full border rounded px-3 py-2 bg-gray-50" /></div>
              <div><label className="text-sm font-medium">Subject:</label> <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
              <div><label className="text-sm font-medium">Message:</label> <textarea rows={4} value={emailMessage} onChange={e => setEmailMessage(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => setSendApp(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSendEmail} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"><Send size={14} /> Send</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
