import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "sonner";

interface Props {
    data: any;
    onBack: () => void;
    onSubmit: () => void;
  }
  
  export default function Step5Review({ data, onBack, onSubmit }: Props) {
    const { personal, academic, previousSchool, documents } = data;
  
   const [submitted, setSubmitted] = useState(false); // ✅ ADD THIS
    const navigate = useNavigate();                    // ✅ ADD THIS
    const handleSubmit = async () => {
      await onSubmit();
    
      const STORAGE_KEY = "admission_applications";
    
      // 🔹 Get existing applications
      const existing = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
    
      // 🔹 Create new application object
      const newApplication = {
        id: `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `${personal.firstName} ${personal.lastName}`,
        dob: personal.dob,
        phone: personal.phone,
        email: personal.email,
        class: academic.classApplying,
        status: "Submitted",              // ✅ STATUS SET HERE
        documents: "0/2",
        avatar: "https://i.pravatar.cc/40",
        address: personal.address,
      };
    
      // 🔹 Save back to localStorage
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newApplication, ...existing])
      );
    
      // 🔹 Redirect to All Applications
      navigate("/admin/dashboard/receptionist/admissions/all");
    };
    
    
     const Row = ({ label, value }: { label: string; value: any }) => (
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm sm:text-base font-medium text-gray-800">
          {value || "-"}
        </p>
      </div>
    );
  
    return (
<div className="bg-white rounded-xl border overflow-hidden">
  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
  <h2 className="text-base sm:text-lg font-semibold">
  Review & Submit
</h2>
  
        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Grid>
            <Row label="First Name" value={personal.firstName} />
            <Row label="Last Name" value={personal.lastName} />
            <Row label="Date of Birth" value={personal.dob} />
            <Row label="Gender" value={personal.gender} />
            <Row label="Parent / Guardian" value={personal.parentName} />
            <Row label="Phone" value={personal.phone} />
            <Row label="Email" value={personal.email} />
          </Grid>
  
          <div className="mt-3">
            <Row label="Address" value={personal.address} />
          </div>
        </Section>
  
        {/* ACADEMIC DETAILS */}
        <Section title="Academic Details">
          <Grid>
            <Row label="Applying Class" value={academic.classApplying} />
            <Row label="Stream" value={academic.stream} />
            <Row label="Quota" value={academic.quota} />
          </Grid>
  
          <div className="mt-3">
            <Row
              label="Achievements"
              value={academic.achievements}
            />
          </div>
        </Section>
  
        {/* PREVIOUS SCHOOL */}
        <Section title="Previous School">
          <Grid>
            <Row
              label="School Name"
              value={previousSchool.schoolName}
            />
            <Row
              label="Last Class"
              value={previousSchool.lastClass}
            />
            <Row
              label="Year Completed"
              value={previousSchool.yearCompleted}
            />
          </Grid>
  
          <div className="mt-3">
            <Row
              label="Reason for Transfer"
              value={previousSchool.reason}
            />
          </div>
        </Section>
  
        {/* DOCUMENTS */}
        <Section title="Documents Uploaded">
          <Grid>
            <Row
              label="Birth Certificate"
              value={documents.birthCert ? "Uploaded" : "Not Uploaded"}
            />
            <Row
              label="Leaving Certificate"
              value={
                documents.leavingCert ? "Uploaded" : "Not Uploaded"
              }
            />
            <Row
              label="Passport Photo"
              value={documents.photo ? "Uploaded" : "Not Uploaded"}
            />
            <Row
              label="Address Proof"
              value={
                documents.addressProof
                  ? "Uploaded"
                  : "Not Uploaded"
              }
            />
          </Grid>
        </Section>
  
        
            {/* FOOTER BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-4 border-t px-4 sm:px-6 py-4">
<button
  onClick={onBack}
  className="px-4 py-2 border rounded-lg"
>
  Previous
</button>

<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
  <button className="px-4 py-2 border rounded-lg">
    Save Draft
  </button>

  <button
    onClick={handleSubmit}
    className="px-6 py-2 rounded-lg bg-green-600 text-white"
  >
    Submit Application
  </button>
</div>

</div>
          </div>
          </div>
    );
  }
  
  /* ================= HELPERS ================= */
  
  function Section({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
<div className="border rounded-lg p-3 sm:p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">
          {title}
        </h3>
        {children}
      </div>
    );
  }
  
  function Grid({ children }: { children: React.ReactNode }) {
    return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {children}
      </div>
    );
  }
  