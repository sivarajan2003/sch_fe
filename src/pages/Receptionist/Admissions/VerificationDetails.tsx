import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

const DOC_STATUS = {
  VERIFIED: "Verified",
  REUPLOAD: "want to reupload",
  PENDING: "Pending",
};

export default function VerificationDetails() {
  const { applicationId: id } = useParams();
  const navigate = useNavigate();

  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchApp();
  }, [id]);

  /* ============================
     FETCH APPLICATION
  ============================ */

  const fetchApp = async () => {
    setLoading(true);
    try {
      const res = await admissionService.getAdmissionById(id);
      if (res.success) {
        const data = res.data;
        setApp(data);

        setDocuments([
          {
            key: "birth_certificate",
            statusKey: "birth_certificate_status",
            remarksKey: "birth_certificate_remarks",
            title: "Birth Certificate",
            url: data.birth_certificate || "",
            status: data.birth_certificate_status || DOC_STATUS.PENDING,
            remarks: data.birth_certificate_remarks || "",
            uploading: false,
            selectedFileName: "",
          },
          {
            key: "tc_certificate",
            statusKey: "tc_certificate_status",
            remarksKey: "tc_certificate_remarks",
            title: "Transfer Certificate",
            url: data.tc_certificate || "",
            status: data.tc_certificate_status || DOC_STATUS.PENDING,
            remarks: data.tc_certificate_remarks || "",
            uploading: false,
            selectedFileName: "",
          },
          {
            key: "address_proof",
            statusKey: "address_proof_status",
            remarksKey: "address_proof_remarks",
            title: "Address Proof",
            url: data.address_proof || "",
            status: data.address_proof_status || DOC_STATUS.PENDING,
            remarks: data.address_proof_remarks || "",
            uploading: false,
            selectedFileName: "",
          },
          {
            key: "passport_size_photo",
            statusKey: "passport_size_photo_status",
            remarksKey: "passport_size_photo_remarks",
            title: "Passport Size Photo",
            url: data.passport_size_photo || "",
            status: data.passport_size_photo_status || DOC_STATUS.PENDING,
            remarks: data.passport_size_photo_remarks || "",
            uploading: false,
            selectedFileName: "",
          },
        ]);
      } else {
        toast.error(res.message || "Failed to fetch application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  /* ============================
     UPDATE DOCUMENT STATUS (VERIFY / MARK WANT TO REUPLOAD)
  ============================ */

  const updateDocumentStatus = async (doc: any, status: string) => {
    try {
      setSaving(true);

      const payload: any = {
        [doc.statusKey]: status,
        [doc.remarksKey]: doc.remarks || null,
      };

      await admissionService.verifyAdmissionDocuments(app.id, payload);

      toast.success(`${doc.title} updated`);
      await fetchApp();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update document");
    } finally {
      setSaving(false);
    }
  };

  /* ============================
     HANDLE FILE REUPLOAD (UPLOAD NEW FILE)
     -- uses PUT /admission/admissions/:id with FormData
  ============================ */

  const getUploadFieldName = (docKey: string) => {
    switch (docKey) {
      case "birth_certificate":
        return "birthCert";
      case "tc_certificate":
        return "leavingCert";
      case "passport_size_photo":
        return "photo";
      case "address_proof":
        return "addressProof";
      default:
        return "file";
    }
  };

  const handleFileSelectAndUpload = async (doc: any, file: File | null) => {
    if (!file) return;
    const fieldName = getUploadFieldName(doc.key);

    // set uploading flag for this doc
    setDocuments(prev => prev.map(d => d.key === doc.key ? { ...d, uploading: true, selectedFileName: file.name } : d));

    try {
      const formData = new FormData();
      formData.append(fieldName, file);

      // Optionally you can include other meta, e.g., updated_by info,
      // but keep small - backend should associate uploader.
      // formData.append('updated_by', currentUserId);

      // axios will set proper headers automatically for FormData
      await admissionService.updateAdmission(app.id, formData);

      toast.success(`${doc.title} re-uploaded successfully`);
      await fetchApp();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to upload ${doc.title}`);
      // reset selectedFileName on failure
      setDocuments(prev => prev.map(d => d.key === doc.key ? { ...d, selectedFileName: "" } : d));
    } finally {
      // clear uploading for this doc
      setDocuments(prev => prev.map(d => d.key === doc.key ? { ...d, uploading: false } : d));
    }
  };

  /* ============================
     MARK ALL VERIFIED
  ============================ */

  const markAllVerified = async () => {
    try {
      setSaving(true);
      const payload: any = {};

      documents.forEach((d) => {
        payload[d.statusKey] = DOC_STATUS.VERIFIED;
        payload[d.remarksKey] = d.remarks || null;
      });

      await admissionService.verifyAdmissionDocuments(app.id, payload);

      // Also advance the admission status to Approved
      await admissionService.updateAdmission(app.id, {
        admission_status: "Approved",
      });

      toast.success("All documents verified — status set to Approved");
      await fetchApp();
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify documents");
    } finally {
      setSaving(false);
    }
  };

  /* ============================
     REJECT APPLICATION
  ============================ */

  const rejectApplication = async () => {
    try {
      await admissionService.updateAdmission(app.id, {
        admission_status: "Rejected",
      });
      toast.success("Application rejected");
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject application");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!app) return <div className="p-6">Application not found</div>;

  // CHECK IF ALL DOCUMENTS VERIFIED
  const allVerified =
    documents.length > 0 &&
    documents.every((d) => d.status === DOC_STATUS.VERIFIED);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* LEFT PANEL */}
      <div className="bg-white border rounded-2xl p-6 h-fit">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-sm uppercase text-gray-500 mb-1">Verification</h2>
        <h1 className="text-xl font-semibold mb-4">Student Documents</h1>

        <div className="flex flex-col items-center">
          {app.passport_size_photo ? (
            <img
              src={app.passport_size_photo}
              alt="student"
              className="w-28 h-28 rounded-full object-cover border"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold">
              {app.student_name?.charAt(0) ?? "U"}
            </div>
          )}
          <h3 className="mt-3 text-lg font-semibold">{app.student_name}</h3>
          <p className="text-sm text-gray-500">{app.addmission_number}</p>

          <span className="mt-3 px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
            {app.admission_status}
          </span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-white border rounded-2xl p-6 space-y-6 lg:col-span-2">
        <h3 className="text-lg font-semibold">Document Verification</h3>

        {documents.map((doc) => (
          <DocumentCard
            key={doc.key}
            doc={doc}
            saving={saving}
            onChange={(remarks: string) =>
              setDocuments((prev) =>
                prev.map((d) => (d.key === doc.key ? { ...d, remarks } : d))
              )
            }
            onVerify={() => updateDocumentStatus(doc, DOC_STATUS.VERIFIED)}
            // onRequestReupload -> mark status = want to reupload
            onRequestReupload={() => updateDocumentStatus(doc, DOC_STATUS.REUPLOAD)}
            // file upload handler for actual re-upload by admin/parent
            onFileSelect={async (file: File | null) =>
              handleFileSelectAndUpload(doc, file)
            }
          />
        ))}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          {!allVerified && (
            <button
              onClick={markAllVerified}
              disabled={saving}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Mark All Verified
            </button>
          )}
          <button
            onClick={rejectApplication}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================
   DOCUMENT CARD
   - shows upload input when status === want to reupload
   - hides action buttons when Verified
============================ */

function DocumentCard({
  doc,
  onVerify,
  onRequestReupload,
  onChange,
  onFileSelect,
  saving,
}: any) {
  const isVerified = doc.status === DOC_STATUS.VERIFIED;
  const isReuploadRequested = doc.status === DOC_STATUS.REUPLOAD;

  const badge =
    isVerified
      ? "bg-green-100 text-green-700"
      : isReuploadRequested
      ? "bg-red-100 text-red-700"
      : doc.url
      ? "bg-blue-100 text-blue-700"   // has URL = uploaded, awaiting review
      : "bg-gray-100 text-gray-500";  // no URL = not uploaded

  const statusLabel =
    isVerified
      ? "Verified"
      : isReuploadRequested
      ? "Want to Reupload"
      : doc.url
      ? "Uploaded — Pending Review"
      : "Not Uploaded";

  // local file input refless handler
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    onFileSelect(f);
  };

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{doc.title}</h4>
        <div className="flex gap-2 items-center">
          {doc.url && (
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              View
            </a>
          )}
          <span className={`px-3 py-1 text-xs rounded-full ${badge}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      <textarea
        className="w-full border rounded-lg p-3 text-sm"
        placeholder="Add remarks..."
        value={doc.remarks}
        onChange={(e) => onChange(e.target.value)}
        disabled={isVerified}
      />

      {/* ACTIONS:
          - if Verified => show nothing
          - else if status == want to reupload => show file input (upload)
          - else => show Verify + Want to Reupload buttons
      */}
      {isVerified ? null : isReuploadRequested ? (
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <label className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileInput}
              disabled={doc.uploading || saving}
              className="hidden"
              id={`file_${doc.key}`}
            />
            <button
              onClick={() => {
                // trigger the hidden input
                const el = document.getElementById(`file_${doc.key}`) as HTMLInputElement | null;
                el?.click();
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50"
              disabled={doc.uploading || saving}
            >
              {doc.uploading ? "Uploading..." : "Upload Replacement"}
            </button>
            <span className="text-xs text-gray-500">
              {doc.selectedFileName ? doc.selectedFileName : "Select file to upload"}
            </span>
          </label>

          {/* keep Verify button visible so admin can still override if needed */}
          <button
            onClick={onVerify}
            disabled={saving}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={onVerify}
            disabled={!doc.url || saving}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Verify
          </button>
          <button
            onClick={onRequestReupload}
            disabled={!doc.url || saving}
            className="flex-1 bg-orange-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Want to Reupload
          </button>
        </div>
      )}
    </div>
  );
}
