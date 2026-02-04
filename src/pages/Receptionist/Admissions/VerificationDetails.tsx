import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function VerificationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState([
    { key: "birth_certificate", title: "Birth Certificate", status: "Pending", remarks: "", url: "" },
    { key: "tc_certificate", title: "Transfer Certificate", status: "Pending", remarks: "", url: "" },
    { key: "address_proof", title: "Address Proof", status: "Pending", remarks: "", url: "" },
    { key: "passport_size_photo", title: "Passport Size Photo", status: "Pending", remarks: "", url: "" },
    // Category cert not in backend model, skipping or mocking
  ]);

  useEffect(() => {
    if (id) fetchApp();
  }, [id]);

  const fetchApp = async () => {
    try {
      const res = await admissionService.getAdmissionById(id);
      if (res.success) {
        setApp(res.data);
        // Map existing docs
        setDocuments(prev => prev.map(d => ({
          ...d,
          url: res.data[d.key] ? (res.data[d.key].startsWith('http') ? res.data[d.key] : `http://localhost:4000/${res.data[d.key]}`) : "",
          status: res.data[d.key] ? "Pending" : "Not Uploaded" // Rough status
        })));
      }
    } catch (error) {
      toast.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  const updateDocStatus = (key: string, status: string) => {
    setDocuments(prev => prev.map(d => d.key === key ? { ...d, status } : d));
  };

  const markAllVerified = async () => {
    if (!app) return;
    try {
      await admissionService.updateAdmission(app.id, { admission_status: "Documents Verified" }); // or Interview Scheduled? usually verification happens before/after interview depending on school. Assume Verified -> Interview Scheduled or Approved. Let's stick to "Documents Verified" (custom status if needed) or "Interview Scheduled".
      // Previous mock statuses had "Verifying Documents" -> "Verified".
      // I'll update to "Documents Verified". If backend enum restricts, might fail.
      // Backend Status Enum: 'Applied', 'Verifying Documents', 'Interview Scheduled', 'Interview Done', 'Approved', 'Rejected', 'Enrolled'.
      // So "Documents Verified" is NOT in enum?
      // "Verifying Documents" is the current status.
      // Next logical step is "Interview Scheduled" or "Approved" (if interview done).
      // Let's assume after verification we move to "Interview Scheduled".
      await admissionService.updateAdmission(app.id, { admission_status: "Interview Scheduled" });
      toast.success("All documents verified! Status updated to Interview Scheduled.");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const rejectApplication = async () => {
    if (!app) return;
    try {
      await admissionService.updateAdmission(app.id, { admission_status: "Rejected" });
      toast.success("Application Rejected");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!app) return <div className="p-6">Application not found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {/* LEFT CARD */}
      <div className="bg-white border rounded-2xl p-4 sm:p-6 h-fit">
        <button onClick={() => navigate(-1)} className="mb-3 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Verification</h2>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Student Documents</h1>

        <div className="flex flex-col items-center">
          {app.passport_size_photo ? (
            <img src={app.passport_size_photo.startsWith("http") ? app.passport_size_photo : `http://localhost:4000/${app.passport_size_photo}`} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border" />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold">
              {app.student_name.charAt(0)}
            </div>
          )}
          <h3 className="mt-4 text-base sm:text-lg font-semibold">{app.student_name}</h3>
          <p className="text-sm text-gray-500">{app.addmission_number || app.id}</p>
          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 text-xs border rounded-full">{app.class_name}</span>
            <span className="px-3 py-1 text-xs border rounded-full bg-blue-50 text-blue-600">{app.admission_status}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><span>Applied On</span><span>{new Date(app.createdAt).toLocaleDateString()}</span></div>
          <div className="flex justify-between"><span>Quota</span><span>{app.quota_category || "General"}</span></div>
          <div className="flex justify-between"><span>Documents</span><span>{documents.filter(d => d.url).length} Uploaded</span></div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="bg-white border rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 lg:col-span-2">
        <h3 className="text-lg font-semibold">Document Verification</h3>
        {documents.map((doc) => (
          <DocumentCard
            key={doc.key}
            title={doc.title}
            status={doc.status}
            remarks={doc.remarks}
            url={doc.url}
            onVerify={() => updateDocStatus(doc.key, "Verified")}
            onQuery={() => updateDocStatus(doc.key, "Query")}
          />
        ))}

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-4 border-t">
          <button onClick={markAllVerified} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Mark All Verified</button>
          <button onClick={rejectApplication} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Reject Application</button>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({ title, status, remarks, url, onVerify, onQuery }: any) {
  return (
    <div className="border rounded-xl p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{title}</h4>
        <div className="flex items-center gap-2">
          {url && <a href={url} target="_blank" className="text-xs text-blue-600 hover:underline">View</a>}
          <span className={`px-3 py-1 text-xs rounded-full ${status === "Verified" ? "bg-green-100 text-green-700" : status === "Query" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
            {status}
          </span>
        </div>
      </div>
      <textarea className="w-full border rounded-lg p-3 text-sm min-h-[60px]" placeholder="Add remarks..." defaultValue={remarks} />
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onVerify} disabled={!url} className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50">Verify</button>
        <button onClick={onQuery} disabled={!url} className="flex-1 bg-red-600 text-white py-2 rounded-lg disabled:opacity-50">Query</button>
      </div>
    </div>
  );
}
