import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const STORAGE_KEY = "admission_applications";

export default function VerificationDetails() {
    const [documents, setDocuments] = useState([
        { key: "birth", title: "Birth Certificate", status: "Verified", remarks: "" },
        { key: "tc", title: "Previous School TC", status: "Pending", remarks: "" },
        { key: "address", title: "Address Proof", status: "Verified", remarks: "" },
        { key: "photo", title: "Passport Size Photo", status: "Query", remarks: "" },
        { key: "category", title: "Category Certificate", status: "Pending", remarks: "" },
      ]);
      
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const application = useMemo(() => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return list.find((a: any) => a.id === applicationId);
  }, [applicationId]);

  if (!application) {
    return <div className="p-6">Application not found</div>;
  }
  const updateDocStatus = (key: string, status: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.key === key ? { ...d, status } : d
      )
    );
  };
  const saveProgress = () => {
    localStorage.setItem(
      `verification_${application.id}`,
      JSON.stringify(documents)
    );
    alert("Verification progress saved successfully");
  };
  const markAllVerified = () => {
    setDocuments((prev) =>
      prev.map((d) => ({ ...d, status: "Verified" }))
    );
  
    updateApplicationStatus("Documents Verified");
  
    setTimeout(() => {
      navigate("/admin/dashboard/receptionist/admissions/verification");
    }, 1200);
  };
  
  const rejectApplication = () => {
    updateApplicationStatus("Rejected");
    alert("Application rejected");
    navigate(-1);
  };
  const updateApplicationStatus = (status: string) => {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  
    const updated = list.map((a: any) =>
      a.id === application.id ? { ...a, status } : a
    );
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };
       
  return (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {/* LEFT CARD */}
      <div className="bg-white border rounded-2xl p-4 sm:p-6">
        {/* BACK ARROW */}
<button
  onClick={() =>
    navigate("/admin/dashboard/receptionist/admissions/verification")
  }
  className="mb-3 flex items-center gap-2 text-sm touch-manipulation text-gray-600 hover:text-blue-600"
>
  <ArrowLeft className="w-4 h-4" />
  Back
</button>
      <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
  Verification
</h2>
<h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
  Student Documents
</h1>




<div className="flex flex-col items-center">

    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold">
      {application.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")}
    </div>

    <h3 className="mt-4 text-base sm:text-lg font-semibold">
      {application.name}
    </h3>

    <p className="text-sm text-gray-500">{application.id}</p>

    <div className="flex gap-2 mt-3">
      <span className="px-3 py-1 text-xs border rounded-full">
        {application.class}
      </span>
      <span className="px-3 py-1 text-xs border rounded-full">
        Science
      </span>
    </div>
  </div>

  <div className="mt-6 space-y-3 text-sm">
    <div className="flex justify-between">
      <span>Applied On</span>
      <span>15 Jan 2026</span>
    </div>
    <div className="flex justify-between">
      <span>Quota</span>
      <span>General</span>
    </div>
    <div className="flex justify-between">
      <span>Documents</span>
      <span>5 Uploaded</span>
    </div>
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
    onVerify={() => updateDocStatus(doc.key, "Verified")}
    onQuery={() => updateDocStatus(doc.key, "Query")}
  />
))}
  

  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-4 border-t">
  <button
    onClick={saveProgress}
    className="px-4 py-2 border rounded-lg"
  >
    Save Progress
  </button>

  <button
    onClick={markAllVerified}
    className="px-5 py-2 bg-green-600 text-white rounded-lg"
  >
    Mark All Verified
  </button>

  <button
    onClick={rejectApplication}
    className="px-5 py-2 bg-red-600 text-white rounded-lg"
  >
    Reject Application
  </button>
</div>

</div>

    </div>
  );
}
function DocumentCard({
    title,
    status,
    remarks,
    onVerify,
    onQuery,
  }: any) {
    return (
      <div className="border rounded-xl p-5 space-y-3">
        <div className="flex justify-between">
          <h4 className="font-semibold">{title}</h4>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              status === "Verified"
                ? "bg-green-100 text-green-700"
                : status === "Query"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        </div>
  
        <textarea
          className="w-full border rounded-lg p-3 text-sm min-h-[90px]"
          placeholder="Add remarks..."
          defaultValue={remarks}
        />
  
  <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onVerify}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            Verified
          </button>
          <button
            onClick={onQuery}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg"
          >
            Query
          </button>
        </div>
      </div>
    );
  }
  