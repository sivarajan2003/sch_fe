import { useState } from "react";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function Step3PreviousSchool({
  data,
  onNext,
  onBack,
}: Props) {
const isNursery = !!data?.isNursery;
console.log(isNursery)
const [form, setForm] = useState({
  schoolName: "",
  lastClass: "",
  yearCompleted: "",
  reason: "",
});

  const [errors, setErrors] = useState<any>({});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    if (isNursery) return true;
    const newErrors: any = {};

    if (!form.schoolName)
      newErrors.schoolName = "Previous school name is required";

    if (!form.lastClass)
      newErrors.lastClass = "Last class attended is required";

    if (!form.yearCompleted)
      newErrors.yearCompleted = "Year completed is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (isNursery) {
        onNext({
          schoolName: null,
          lastClass: null,
          yearCompleted: null,
          reason: null,
        });
      } else {
        onNext(form);
      }
    }
  };

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      {/* BODY */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h2 className="text-base sm:text-lg font-semibold">
          Previous School History
        </h2>

        {/* Previous School Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Previous School Name
          </label>
          <input
            name="schoolName"
            value={isNursery ? "null" : form.schoolName || ""}
            onChange={handleChange}
            disabled={isNursery}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100 disabled:text-gray-500"
          />
          {errors.schoolName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.schoolName}
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last Class */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Class Attended
            </label>
            <input
              name="lastClass"
              value={isNursery ? "null" : form.lastClass || ""}
              onChange={handleChange}
              disabled={isNursery}
              className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100 disabled:text-gray-500"
            />
            {errors.lastClass && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastClass}
              </p>
            )}
          </div>

          {/* Year Completed */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Year Completed
            </label>
            <input
              name="yearCompleted"
              value={isNursery ? "null" : form.yearCompleted || ""}
              onChange={handleChange}
              disabled={isNursery}
              className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100 disabled:text-gray-500"
            />
            {errors.yearCompleted && (
              <p className="text-xs text-red-500 mt-1">
                {errors.yearCompleted}
              </p>
            )}
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reason for Transfer
          </label>
          <textarea
            name="reason"
            value={isNursery ? "null" : form.reason || ""}
            onChange={handleChange}
            disabled={isNursery}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
      </div>

      {/* FOOTER (EXACT MATCH) */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t px-4 sm:px-6 py-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg border"
        >
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
