import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormErrors = {
  name?: string;
  rollNo?: string;
  className?: string;
  gender?: string;
  joined?: string;
};

export default function AddStudentPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    className: "",
    gender: "",
    joined: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /* ================= VALIDATION ================= */

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Student name is required";
    if (!form.rollNo.trim()) newErrors.rollNo = "Roll number is required";
    if (!form.className.trim()) newErrors.className = "Class is required";
    if (!form.gender.trim()) newErrors.gender = "Gender is required";
    if (!form.joined.trim()) newErrors.joined = "Joining date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }
  
    // simulate save
    console.log("Student Added:", form);
  
    toast.success("Student added successfully 🎉");
  
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1200); // wait so toast is visible
  };
  
  /* ================= UI ================= */

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-6">Add Student</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* NAME */}
        <div>
          <input
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Student Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* ROLL NO */}
        <div>
          <input
            className={`w-full border p-2 rounded ${
              errors.rollNo ? "border-red-500" : ""
            }`}
            placeholder="Roll Number"
            value={form.rollNo}
            onChange={(e) =>
              setForm({ ...form, rollNo: e.target.value })
            }
          />
          {errors.rollNo && (
            <p className="text-xs text-red-500 mt-1">{errors.rollNo}</p>
          )}
        </div>

        {/* CLASS */}
        <div>
          <input
            className={`w-full border p-2 rounded ${
              errors.className ? "border-red-500" : ""
            }`}
            placeholder="Class (e.g. VIII, A)"
            value={form.className}
            onChange={(e) =>
              setForm({ ...form, className: e.target.value })
            }
          />
          {errors.className && (
            <p className="text-xs text-red-500 mt-1">{errors.className}</p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <select
            className={`w-full border p-2 rounded ${
              errors.gender ? "border-red-500" : ""
            }`}
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
          )}
        </div>

        {/* JOIN DATE */}
        <div>
          <input
            type="date"
            className={`w-full border p-2 rounded ${
              errors.joined ? "border-red-500" : ""
            }`}
            value={form.joined}
            onChange={(e) =>
              setForm({ ...form, joined: e.target.value })
            }
          />
          {errors.joined && (
            <p className="text-xs text-red-500 mt-1">{errors.joined}</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Student
          </button>
        </div>
      </form>
    </div>
  );
}
