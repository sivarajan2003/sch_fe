import { useState } from "react";
import { Upload, FileCheck, Loader2, X, Eye } from "lucide-react";
import { uploadToSpaces } from "../../../../../utils/uploadToSpaces";
import { toast } from "react-toastify";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

interface UploadedDocument {
  file: File | null;
  url: string | null;
  uploading: boolean;
  progress: number;
}

function UploadBox({
  label,
  note,
  required = false,
  document,
  onChange,
}: {
  label: string;
  note: string;
  required?: boolean;
  document: UploadedDocument;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="border-2 border-dashed rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors">
      {!document.file && !document.url ? (
        /* ===== UPLOAD STATE ===== */
        <label className="flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors">
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
          <Upload className="w-12 h-12 text-blue-500 mb-3" />
          <p className="font-medium text-gray-900">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </p>
          <p className="text-sm text-gray-500 mt-1">{note}</p>
          <p className="text-xs text-blue-600 mt-2 font-medium">
            Click to upload
          </p>
        </label>
      ) : document.uploading ? (
        /* ===== UPLOADING STATE ===== */
        <div className="flex flex-col items-center text-center p-4">
          <Loader2 className="w-12 h-12 text-blue-500 mb-3 animate-spin" />
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500 mt-1">
            Uploading... {document.progress}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${document.progress}%` }}
            />
          </div>
        </div>
      ) : (
        /* ===== SUCCESS STATE ===== */
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <FileCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-gray-900">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {document.file?.name}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                Uploaded successfully
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* VIEW */}
            {document.url && (
              <button
                type="button"
                onClick={() => window.open(document.url!, "_blank")}
                className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            )}

            {/* REMOVE */}
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1.5 text-sm border border-red-500 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step4Documents({ data, onNext, onBack }: Props) {
  const [docs, setDocs] = useState<{
    birthCert: UploadedDocument;
    leavingCert: UploadedDocument;
    photo: UploadedDocument;
    addressProof: UploadedDocument;
  }>({
    birthCert: {
      file: null,
      url: data.birth_certificate || null,
      uploading: false,
      progress: 0,
    },
    leavingCert: {
      file: null,
      url: data.tc_certificate || null,
      uploading: false,
      progress: 0,
    },
    photo: {
      file: null,
      url: data.passport_size_photo || null,
      uploading: false,
      progress: 0,
    },
    addressProof: {
      file: null,
      url: data.address_proof || null,
      uploading: false,
      progress: 0,
    },
  });

  const handleFileChange = async (
    field: keyof typeof docs,
    file: File | null
  ) => {
    if (!file) {
      // Remove file
      setDocs({
        ...docs,
        [field]: { file: null, url: null, uploading: false, progress: 0 },
      });
      return;
    }

    // Set uploading state
    setDocs({
      ...docs,
      [field]: { file, url: null, uploading: true, progress: 0 },
    });

    try {
      // Simulate progress (since AWS SDK doesn't provide built-in progress)
      const progressInterval = setInterval(() => {
        setDocs((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            progress: Math.min(prev[field].progress + 10, 90),
          },
        }));
      }, 200);

      // Upload to DO Spaces
      const url = await uploadToSpaces(file, "admission/documents");

      // Clear progress interval
      clearInterval(progressInterval);

      // Set success state
      setDocs((prev) => ({
        ...prev,
        [field]: { file, url, uploading: false, progress: 100 },
      }));

      toast.success(`${field} uploaded successfully!`);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload ${field}: ${error.message}`);

      // Reset to initial state on error
      setDocs({
        ...docs,
        [field]: { file: null, url: null, uploading: false, progress: 0 },
      });
    }
  };

  const isValid = docs.birthCert.url && docs.photo.url;

  const handleNext = () => {
    // Pass only URLs to the next step
    onNext({
      birth_certificate: docs.birthCert.url,
      tc_certificate: docs.leavingCert.url,
      passport_size_photo: docs.photo.url,
      address_proof: docs.addressProof.url,
    });
  };

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h2 className="text-base sm:text-lg font-semibold">Document Upload</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload required documents. Files will be securely stored in the cloud.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <UploadBox
          label="Birth Certificate"
          note="PDF, JPG, PNG (Max 5MB)"
          required
          document={docs.birthCert}
          onChange={(file) => handleFileChange("birthCert", file)}
        />

        <UploadBox
          label="Previous School Leaving Certificate"
          note="PDF, JPG, PNG (Max 5MB)"
          document={docs.leavingCert}
          onChange={(file) => handleFileChange("leavingCert", file)}
        />

        <UploadBox
          label="Passport Size Photo"
          note="JPG, PNG (Max 2MB)"
          required
          document={docs.photo}
          onChange={(file) => handleFileChange("photo", file)}
        />

        <UploadBox
          label="Address Proof"
          note="PDF, JPG, PNG (Max 5MB)"
          document={docs.addressProof}
          onChange={(file) => handleFileChange("addressProof", file)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-t bg-gray-50">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-lg hover:bg-white"
        >
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            disabled={!isValid}
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {!isValid
              ? "Upload required documents first"
              : "Review & Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
