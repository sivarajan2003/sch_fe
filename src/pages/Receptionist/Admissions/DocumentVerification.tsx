import { Eye, Pencil, Trash2, FileText, ArrowLeft, RefreshCcw, Printer, Plus, CalendarDays, Filter, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function DocumentVerification() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  const [openNewDoc, setOpenNewDoc] = useState(false); // Modal state

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [startDate, endDate]); // Fetch on mount and date change

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Fetch all applications, maybe filtered by "Verifying Documents" in a real workflow, 
      // but current UI design shows a list of applications to select from. 
      // We'll fetch a reasonable limit or search.
      const res = await admissionService.getAdmissions({
        limit: 50, // Reasonable limit for sidebar list
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        search,
        order: JSON.stringify([['createdAt', 'DESC']])
      });

      if (res.success) {
        setData(res.rows);
        setTotalCount(res.count);
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
  const handleExport = () => { /* Export logic */ };

  // Map documents for the selected app
  const getDocuments = (app: any) => {
    const docs = [];
    if (app.birth_certificate) docs.push({ name: "Birth Certificate", url: app.birth_certificate, type: 'pdf' }); // assumption
    if (app.tc_certificate) docs.push({ name: "Transfer Certificate", url: app.tc_certificate, type: 'pdf' });
    if (app.passport_size_photo) docs.push({ name: "Student Photo", url: app.passport_size_photo, type: 'image' });
    if (app.address_proof) docs.push({ name: "Address Proof", url: app.address_proof, type: 'pdf' });

    // Fix IDs logic: ensure full URL
    return docs.map(d => ({
      ...d,
      url: d.url.startsWith("http") ? d.url : `http://localhost:4000/${d.url}`,
      // Naive type detection
      type: d.url.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 'pdf'
    }));
  };

  const documents = selectedApp ? getDocuments(selectedApp) : [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard/receptionist")}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Back to Receptionist Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Document Verification</h2>
              <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
            <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
            {/* New Document Button - maybe redirects to edit app or dedicated upload? Keeping purely visual for now as logic is complex */}
            {/* <button onClick={() => setOpenNewDoc(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1"><Plus size={14}/> New Document</button> */}
          </div>
        </div>
      </div>

      {/* SUB HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Document List</h3>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenDate(!openDate)} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"><CalendarDays size={16} /> Date Range</button>
            {openDate && (
              <div className="absolute right-20 mt-32 w-72 bg-white border rounded shadow p-4 z-50">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded mb-2" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded mb-2" />
                <button onClick={() => { setOpenDate(false); fetchApplications(); }} className="w-full bg-blue-600 text-white rounded py-1">Apply</button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <input type="text" placeholder="Search Application..." value={search} onChange={e => { setSearch(e.target.value); fetchApplications(); }} className="w-full border rounded-lg px-4 py-2 text-sm" />
        </div>
      </div>

      {/* MASTER-DETAIL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: LIST */}
        <div className="lg:col-span-1 bg-white rounded-xl border p-4 space-y-4 overflow-y-auto max-h-[70vh]">
          <h3 className="text-lg font-semibold mb-2">Applications ({data.length})</h3>
          {loading ? <p className="text-center py-4">Loading...</p> : data.map(app => (
            <div key={app.id} onClick={() => setSelectedApp(app)} className={`p-4 rounded-xl border cursor-pointer transition ${selectedApp?.id === app.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{app.student_name}</p>
                  <p className="text-sm text-gray-500">{app.addmission_number || String(app.id).substring(0, 8)}</p>
                  <p className="text-sm text-gray-600 mt-1">{app.class_name || "N/A"} • {[app.birth_certificate, app.tc_certificate, app.passport_size_photo, app.address_proof].filter(Boolean).length} Docs</p>
                </div>
                {app.admission_status === "Verifying Documents" && <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Verifying</span>}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-6 min-h-[70vh]">
          {!selectedApp ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <FileText size={48} className="mb-4 opacity-40" />
              <h3 className="text-lg font-semibold text-gray-700">Select an Application</h3>
              <p className="text-sm mt-1">Choose an application to view documents</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">{selectedApp.student_name}</h2>
                <p className="text-sm text-gray-500">ID: {selectedApp.addmission_number || selectedApp.id}</p>
                <p className="text-sm text-gray-500">Status: {selectedApp.admission_status}</p>
              </div>

              {documents.length === 0 ? <p className="text-gray-500 italic">No documents uploaded.</p> : documents.map((doc, idx) => (
                <div key={idx} className="border rounded-xl p-5 bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500 uppercase">{doc.type}</p>
                  </div>
                  {doc.type === 'pdf' ? (
                    <a href={doc.url} target="_blank" download className="px-4 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50">Download</a>
                  ) : (
                    <button onClick={() => setPreviewDoc(doc)} className="px-4 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50">View Photo</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-4 relative max-h-[90vh] overflow-auto">
            <button onClick={() => setPreviewDoc(null)} className="absolute top-4 right-4 text-xl font-bold bg-white rounded-full p-2 shadow">✕</button>
            <h3 className="text-lg font-semibold mb-4">{previewDoc.name}</h3>
            {previewDoc.type === 'image' ? (
              <img src={previewDoc.url} className="w-full rounded-lg" />
            ) : (
              <iframe src={previewDoc.url} className="w-full h-[70vh] rounded-lg"></iframe>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
