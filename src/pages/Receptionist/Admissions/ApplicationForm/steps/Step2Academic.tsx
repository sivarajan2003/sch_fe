import { useState, useEffect } from "react";
// @ts-ignore
import classService from "../../../../../service/classService";

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

  const [classes, setClasses] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await classService.getClasses({ limit: 100 });
        if (res.success && Array.isArray(res.rows)) {
          // Sort logic
          const sortOrder = ["PreKG", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

          let sorted = res.rows.sort((a: any, b: any) => {
            const idxA = sortOrder.indexOf(a.name);
            const idxB = sortOrder.indexOf(b.name);
            // If both in list, sort by index
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            // If a in list, it comes first
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            // Fallback alphabetical
            return a.name.localeCompare(b.name);
          });

          // Filter out "Grade 1" if user specifically meant that string
          sorted = sorted.filter((c: any) => c.name !== "Grade 1");

          setClasses(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch classes", err);
      }
    };
    fetchClasses();
  }, []);

const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
) => {
if (e.target.name === "applyingClass") {
  const selectedId = e.target.value;

  const selectedClass = classes.find(
    (cls) => cls.id === selectedId
  );

  setForm({
    ...form,
    applyingClass: selectedId,
    applyingClassName: selectedClass?.name || "",
  });
} else {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

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
    console.log(form.applyingClassName)
    const isNursery =
      form.applyingClassName === "PreKG" ||
      form.applyingClassName === "LKG";

    onNext({
      ...form,
      isNursery,
    });
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
              {classes.map((cls) => {
                let displayName = cls.name;
                // Transform Class X -> Xth
                if (cls.name.toLowerCase().startsWith("class ")) {
                  const num = cls.name.split(" ")[1];
                  let suffix = " th";
                  if (num === "1") suffix = " st";
                  else if (num === "2") suffix = " nd";
                  else if (num === "3") suffix = " rd";
                  displayName = num + suffix; // e.g. "1st"
                }

                return (
                 <option key={cls.id} value={cls.id}>
                    {displayName}
                  </option>
                );
              })}
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
              <option value="General">General</option>
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
