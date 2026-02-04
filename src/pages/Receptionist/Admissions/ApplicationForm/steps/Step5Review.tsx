import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import SuccessAnimation from "../../../../../components/SuccessAnimation";
// @ts-ignore
import classService from "../../../../../service/classService";

interface Props {
  data: any;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export default function Step5Review({ data, onBack, onSubmit }: Props) {
  const { personal, academic, previousSchool, documents } = data;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [className, setClassName] = useState<string | null>(null);

  // Fetch class name from API using the class ID
  useEffect(() => {
    const fetchClassName = async () => {
      console.log("Fetching class name for ID:", academic.applyingClass);
      if (academic.applyingClass) {
        try {
          const res = await classService.getClassById(academic.applyingClass);
          console.log("Class fetch response:", res);
          if (res.success && res.data) {
            // Transform "Class 12" to "12th"
            let displayName = res.data.name;
            if (displayName.toLowerCase().startsWith("class ")) {
              const num = displayName.split(" ")[1];
              let suffix = "th";
              if (num === "1") suffix = "st";
              else if (num === "2") suffix = "nd";
              else if (num === "3") suffix = "rd";
              displayName = num + suffix;
            }
            setClassName(displayName);
          } else {
            setClassName("-");
          }
        } catch (error) {
          console.error("Failed to fetch class name:", error);
          setClassName("-"); // Show dash on error
        }
      } else {
        console.log("No applyingClass value found");
        setClassName("-");
      }
    };
    fetchClassName();
  }, [academic.applyingClass]);

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent double click

    setIsSubmitting(true);
    try {
      await onSubmit();
      setShowSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      // Error is already handled in parent component
    }
  };

  const Row = ({ label, value }: { label: string; value: any }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm sm:text-base font-medium text-gray-800">
        {value || "-"}
      </p>
    </div>
  );

  const DocumentRow = ({
    label,
    url
  }: {
    label: string;
    url: string | null;
  }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
      <div className="flex items-center gap-3">
        {url ? (
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className={`text-xs ${url ? 'text-green-600' : 'text-gray-500'}`}>
            {url ? 'Uploaded' : 'Not Uploaded'}
          </p>
        </div>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-700 underline"
        >
          View
        </a>
      )}
    </div>
  );

  return (
    <>
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
              <Row label="Applying Class" value={className === null ? "Loading..." : className} />
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
            <div className="space-y-3">
              <DocumentRow
                label="Birth Certificate"
                url={documents.birth_certificate}
              />
              <DocumentRow
                label="Leaving Certificate"
                url={documents.tc_certificate}
              />
              <DocumentRow
                label="Passport Photo"
                url={documents.passport_size_photo}
              />
              <DocumentRow
                label="Address Proof"
                url={documents.address_proof}
              />
            </div>
          </Section>

          {/* FOOTER BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-4 border-t">
            <button
              onClick={onBack}
              disabled={isSubmitting}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
              <button
                disabled={isSubmitting}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Draft
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <SuccessAnimation
        show={showSuccess}
        message="Application Submitted Successfully!"
        submessage="Your admission application has been received. We'll contact you soon."
        onComplete={() => {
          setShowSuccess(false);
          // Navigation will be handled by parent component
        }}
      />
    </>
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
