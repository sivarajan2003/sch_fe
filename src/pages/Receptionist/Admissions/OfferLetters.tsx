import { Eye, Send, GraduationCap, Trash2, FileText, ArrowLeft, RefreshCcw, Printer, Plus, CalendarDays, ArrowUpDown, Filter, Settings, Image as ImageIcon, Type, Upload, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
// @ts-ignore
import admissionService from "../../../service/admissionService";
// @ts-ignore
import { uploadToSpaces } from "../../../utils/uploadToSpaces";
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

  // Template Settings
  const [showSettings, setShowSettings] = useState(false);
  const [templateSettings, setTemplateSettings] = useState({
    headerTitle: "ATELIER SCHOOL",
    headerSubtitle: "Excellence in Education",
    headerLogo: "",
    footerText: "123 School Lane, Education City\nContact: info@atelier.com | +1 234 567 890",
    watermarkText: "OFFICIAL OFFER",
    watermarkImage: "",
    watermarkOpacity: 10, // Percent
    showWatermark: true,
    principalSignature: "",
    schoolSeal: ""
  });

  // Load settings from local storage if available
  // Load settings from API
  useEffect(() => {
    // Try to load from API first
    const loadSettings = async () => {
      try {
        const res = await admissionService.getOfferLetterTemplate();
        if (res.success && res.data) {
          // Map snake_case database fields to camelCase state
          const db = res.data;
          setTemplateSettings({
            headerTitle: db.header_title || "ATELIER SCHOOL",
            headerSubtitle: db.header_subtitle || "Excellence in Education",
            headerLogo: db.header_logo || "",
            footerText: db.footer_text || "123 School Lane, Education City\nContact: info@atelier.com | +1 234 567 890",
            watermarkText: db.watermark_text || "OFFICIAL OFFER",
            watermarkImage: db.watermark_image || "",
            watermarkOpacity: db.watermark_opacity || 10,
            showWatermark: db.show_watermark !== undefined ? db.show_watermark : true,
            principalSignature: db.principal_signature || "",
            schoolSeal: db.school_seal || ""
          });
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      // Map camelCase state to snake_case database fields
      const payload = {
        header_title: templateSettings.headerTitle,
        header_subtitle: templateSettings.headerSubtitle,
        header_logo: templateSettings.headerLogo,
        footer_text: templateSettings.footerText,
        watermark_text: templateSettings.watermarkText,
        watermark_image: templateSettings.watermarkImage,
        watermark_opacity: templateSettings.watermarkOpacity,
        show_watermark: templateSettings.showWatermark,
        principal_signature: templateSettings.principalSignature,
        school_seal: templateSettings.schoolSeal
      };

      await admissionService.saveOfferLetterTemplate(payload);
      setShowSettings(false);
      toast.success("Template settings saved to database!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    }
  };

  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    try {
      const url = await uploadToSpaces(file, "offer-letters");
      setTemplateSettings(prev => ({ ...prev, [field]: url }));
      toast.success("Image uploaded!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const ImageUploadField = ({ label, field, value }: { label: string, field: string, value: string }) => (
    <div>
      <label className="text-xs font-medium text-gray-700 uppercase tracking-wide flex justify-between">
        {label}
        {uploading === field && <span className="text-blue-600 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Uploading...</span>}
      </label>
      <div className="mt-1 flex gap-2 items-start">
        <div className="relative flex-grow">
          <ImageIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={value}
            onChange={e => setTemplateSettings({ ...templateSettings, [field]: e.target.value })}
            placeholder="https://..."
            className="w-full border rounded-lg pl-9 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white font-mono text-gray-600"
          />
          {value && (
            <button
              onClick={() => setTemplateSettings({ ...templateSettings, [field]: "" })}
              className="absolute right-2 top-2 p-0.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
              title="Clear Image"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <label className={`flex-shrink-0 cursor-pointer p-2 border rounded-lg hover:bg-gray-50 transition border-dashed border-gray-300 ${uploading === field ? 'opacity-50 pointer-events-none' : ''}`}>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, field)} />
          <Upload size={20} className="text-gray-600" />
        </label>
      </div>
      {value && <img src={value} className="h-12 mt-2 object-contain border rounded bg-white p-1" alt="Preview" />}
    </div>
  );

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

      const rows = res?.rows || res?.data?.rows || [];

      if (res.success) {
        const mapped = rows.map((item: any) => ({
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
            <button onClick={() => setShowSettings(true)} className="p-2.5 border rounded-lg hover:bg-gray-50 text-gray-700" title="Template Settings"><Settings size={16} /></button>
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
            <div className="bg-white p-8 rounded border shadow-sm relative overflow-hidden min-h-[600px] flex flex-col print:shadow-none print:border-none">

              {/* WATERMARK */}
              {templateSettings.showWatermark && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                  style={{ opacity: templateSettings.watermarkOpacity / 100 }}
                >
                  {templateSettings.watermarkImage ? (
                    <img src={templateSettings.watermarkImage} alt="watermark" className="w-[80%] opacity-50 grayscale" />
                  ) : (
                    <h1 className="text-[100px] font-black text-gray-400 rotate-[-45deg] whitespace-nowrap border-4 border-gray-400 p-4 rounded-xl transform scale-150 opacity-20">
                      {templateSettings.watermarkText}
                    </h1>
                  )}
                </div>
              )}

              {/* HEADER */}
              <div className="text-center border-b-2 border-blue-900 pb-6 mb-8 relative z-10">
                {templateSettings.headerLogo && (
                  <img src={templateSettings.headerLogo} className="h-20 mx-auto mb-4" alt="School Logo" />
                )}
                <h3 className="text-3xl font-serif font-bold text-blue-900 tracking-wide uppercase">{templateSettings.headerTitle}</h3>
                <p className="text-sm text-gray-600 font-medium tracking-wider mt-1 uppercase">{templateSettings.headerSubtitle}</p>
              </div>

              {/* CONTENT */}
              <div className="text-base space-y-4 leading-relaxed text-gray-800 relative z-10 flex-grow font-serif">
                <div className="flex justify-between items-start mb-8 text-sm">
                  <div>
                    <p className="font-bold text-gray-900">Ref: OFF/{new Date().getFullYear()}/{String(previewApp.id).padStart(4, '0')}</p>
                    <p className="text-gray-600">Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">To the Parent/Guardian of:</p>
                    <p>{previewApp.name}</p>
                  </div>
                </div>

                <p className="text-lg font-bold text-center underline my-6">SUBJECT: ADMISSION OFFER FOR CLASS {previewApp.class}</p>

                <p>Dear Parent,</p>

                <p>
                  We are delighted to inform you that your ward, <strong>{previewApp.name}</strong>, has been successfully selected for admission to <strong>{previewApp.class}</strong> at {templateSettings.headerTitle} for the academic session {new Date().getFullYear()}-{new Date().getFullYear() + 1}.
                </p>

                <p>
                  This offer is based on the performance in the entrance assessment/interview. We believe {previewApp.name} will be a valuable addition to our school community.
                </p>

                <p>
                  To confirm the seat, please complete the admission formalities and submit the required documents along with the admission fee by <strong>{new Date(Date.now() + 7 * 86400000).toLocaleDateString()}</strong>. Failure to do so may result in the cancellation of this offer.
                </p>

                <p>
                  We look forward to welcoming you and your child to the {templateSettings.headerTitle} family.
                </p>

                <div className="mt-12 flex justify-between items-end">
                  <div>
                    {templateSettings.principalSignature && <img src={templateSettings.principalSignature} className="h-12 mb-2 object-contain" alt="Signature" />}
                    <p className="font-bold">Authorized Signatory</p>
                    <p className="text-sm text-gray-500">Admissions Office</p>
                  </div>
                  {(templateSettings.schoolSeal || templateSettings.headerLogo) && (
                    <img src={templateSettings.schoolSeal || templateSettings.headerLogo} className="h-20 opacity-80 object-contain" alt="Seal" />
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-500 relative z-10">
                <p className="whitespace-pre-wrap">{templateSettings.footerText}</p>
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

      {/* TEMPLATE SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Settings size={18} /> Offer Letter Settings
              </h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">

              {/* HEADER SECTION */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Header Configuration</h4>
                  <p className="text-xs text-gray-500">Customize the school branding at the top of the letter.</p>
                </div>
                <div className="grid gap-3 p-4 border rounded-xl bg-gray-50/50">
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">School Name</label>
                    <input
                      value={templateSettings.headerTitle}
                      onChange={e => setTemplateSettings({ ...templateSettings, headerTitle: e.target.value })}
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      placeholder="e.g. ATELIER SCHOOL"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Tagline</label>
                    <input
                      value={templateSettings.headerSubtitle}
                      onChange={e => setTemplateSettings({ ...templateSettings, headerSubtitle: e.target.value })}
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      placeholder="e.g. Excellence in Education"
                    />
                  </div>
                  <div>
                    <ImageUploadField label="Logo Image" field="headerLogo" value={templateSettings.headerLogo} />
                  </div>
                </div>
              </div>

              {/* FOOTER SECTION */}
              <div className="space-y-4 pt-2 border-t">
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-900">Footer Configuration</h4>
                  <p className="text-xs text-gray-500">Set the contact details and address at the bottom.</p>
                </div>
                <div className="p-4 border rounded-xl bg-gray-50/50 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Footer Text</label>
                    <textarea
                      rows={3}
                      value={templateSettings.footerText}
                      onChange={e => setTemplateSettings({ ...templateSettings, footerText: e.target.value })}
                      className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white resize-none"
                      placeholder="Enter address, contact info, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ImageUploadField label="Principal Signature" field="principalSignature" value={templateSettings.principalSignature} />
                    </div>
                    <div>
                      <ImageUploadField label="School Seal" field="schoolSeal" value={templateSettings.schoolSeal} />
                    </div>
                  </div>
                </div>
              </div>

              {/* WATERMARK SECTION */}
              <div className="space-y-4 pt-2 border-t">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Watermark</h4>
                    <p className="text-xs text-gray-500">Add a background overlay (text or image)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={templateSettings.showWatermark}
                      onChange={e => setTemplateSettings({ ...templateSettings, showWatermark: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {templateSettings.showWatermark && (
                  <div className="grid gap-4 p-5 border border-blue-100 rounded-xl bg-blue-50/30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1 block">Watermark Type</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="wmType" className="text-blue-600" checked={!templateSettings.watermarkImage} onChange={() => setTemplateSettings({ ...templateSettings, watermarkImage: "" })} />
                            <span className="text-sm text-gray-700">Text</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="wmType" className="text-blue-600" checked={!!templateSettings.watermarkImage} onChange={() => { }} />
                            <span className="text-sm text-gray-700">Image</span>
                          </label>
                        </div>
                      </div>

                      {!templateSettings.watermarkImage ? (
                        <div className="col-span-1 md:col-span-2">
                          <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Text Content</label>
                          <div className="relative mt-1">
                            <Type size={16} className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                              value={templateSettings.watermarkText}
                              onChange={e => setTemplateSettings({ ...templateSettings, watermarkText: e.target.value })}
                              className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                              placeholder="e.g. OFFICIAL OFFER"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="col-span-1 md:col-span-2">
                          <ImageUploadField label="Watermark Image" field="watermarkImage" value={templateSettings.watermarkImage} />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Opacity</label>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">{templateSettings.watermarkOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={templateSettings.watermarkOpacity}
                        onChange={e => setTemplateSettings({ ...templateSettings, watermarkOpacity: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowSettings(false)} className="px-4 py-2 border rounded-lg hover:bg-white text-sm font-medium text-gray-600">Cancel</button>
              <button onClick={saveSettings} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
