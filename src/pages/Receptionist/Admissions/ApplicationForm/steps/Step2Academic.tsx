import { useState } from "react";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step2Academic({ data, onNext, onBack }: Props) {
  const [form, setForm] = useState({
    applyingClass: "",
    stream: "",
    quota: "",
    achievements: "",
    ...data,
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.applyingClass)
      newErrors.applyingClass = "Class is required";
    if (!form.quota) newErrors.quota = "Quota category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(form);
    }
  };

  return (
<div className="bg-white border rounded-xl overflow-hidden">
      {/* FORM BODY */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-semibold">
  Academic Details
</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applying for Class */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Applying for Class <span className="text-red-500">*</span>
            </label>
            <select
              name="applyingClass"
              value={form.applyingClass}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select class</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="10">Class 10</option>
            </select>
            {errors.applyingClass && (
              <p className="text-xs text-red-500 mt-1">
                {errors.applyingClass}
              </p>
            )}
          </div>

          {/* Stream */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Stream
            </label>
            <select
              name="stream"
              value={form.stream}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Grade/Class</option>
              <option value="grade1">Grade1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
              <option value="grade4">Grade 4</option>
            </select>
          </div>

          {/* Quota Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Quota Category <span className="text-red-500">*</span>
            </label>
            <select
              name="quota"
              value={form.quota}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select quota</option>
              <option value="general">General</option>
              <option value="management">Management</option>
              <option value="sports">Sports</option>
              <option value="minority">Minority</option>
            </select>
            {errors.quota && (
              <p className="text-xs text-red-500 mt-1">{errors.quota}</p>
            )}
          </div>

          {/* Academic Achievements */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Academic Achievements (if any)
            </label>
            <textarea
              name="achievements"
              value={form.achievements}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Mention any awards, certificates, or achievements"
            />
          </div>
        </div>
      </div>

      {/* FOOTER (Exactly like Image) */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t px-4 sm:px-6 py-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg border"
        >
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 rounded-lg border">
            Save Draft
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
