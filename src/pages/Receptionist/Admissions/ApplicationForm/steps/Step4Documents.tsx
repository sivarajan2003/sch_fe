import { useState } from "react";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

function UploadBox({
  label,
  note,
  file,
  onChange,
}: {
  label: string;
  note: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
<div className="border-2 border-dashed rounded-xl p-4 sm:p-6">
      {!file ? (
        /* ===== UPLOAD STATE ===== */
        <label className="flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg">
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              onChange(e.target.files?.[0] || null)
            }
          />
          <div className="text-gray-500 mb-2 text-xl">⬆</div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-500">{note}</p>
        </label>
      ) : (
        /* ===== FILE PREVIEW STATE ===== */
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs text-gray-500">
              {file.name}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* VIEW */}
            <button
              type="button"
              onClick={() =>
                window.open(
                  URL.createObjectURL(file),
                  "_blank"
                )
              }
              className="px-3 py-1 text-sm border rounded-lg"
            >
              View
            </button>

            {/* REMOVE */}
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1 text-sm border border-red-500 text-red-600 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Step4Documents({
  data,
  onNext,
  onBack,
}: Props) {
  const [docs, setDocs] = useState({
    birthCert: null,
    leavingCert: null,
    photo: null,
    addressProof: null,
    ...data,
  });

  const isValid = docs.birthCert && docs.photo;

  return (
<div className="bg-white rounded-xl border overflow-hidden">
<h2 className="text-base sm:text-lg font-semibold">
  Document Upload
</h2>

      <UploadBox
  label="Birth Certificate *"
  note="PDF, JPG, PNG (Max 5MB)"
  file={docs.birthCert}
  onChange={(file) =>
    setDocs({ ...docs, birthCert: file })
  }
/>

<UploadBox
  label="Previous School Leaving Certificate"
  note="PDF, JPG, PNG (Max 5MB)"
  file={docs.leavingCert}
  onChange={(file) =>
    setDocs({ ...docs, leavingCert: file })
  }
/>


<UploadBox
  label="Passport Size Photo *"
  note="JPG, PNG (Max 2MB)"
  file={docs.photo}
  onChange={(file) =>
    setDocs({ ...docs, photo: file })
  }
/>
<UploadBox
  label="Address Proof"
  note="PDF, JPG, PNG (Max 5MB)"
  file={docs.addressProof}
  onChange={(file) =>
    setDocs({ ...docs, addressProof: file })
  }
/>

<div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-4 border-t px-4 sm:px-6 py-4">
        <button onClick={onBack} className="px-4 py-2 border rounded-lg">
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 border rounded-lg">
            Save Draft
          </button>
          <button
            disabled={!isValid}
            onClick={() => onNext(docs)}
            className="px-6 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
