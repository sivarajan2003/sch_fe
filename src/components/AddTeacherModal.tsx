import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddTeacherModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (payload: any) => Promise<void> | void; // supports async
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    date_of_birth: "",
    gender: "Male",
    number: "",
    email: "",
    qualification: "",
    image: "",
    hire_date: "",
    desgination: "Teacher",
    salary: "",
    is_active: true,
  });

  if (!open) return null;

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.address.trim()) return "Address is required";
    if (!form.date_of_birth) return "Date of birth is required";
    if (!["Male", "Female", "Other"].includes(form.gender))
      return "Invalid gender";
    if (!form.number.trim() || form.number.trim().length < 7)
      return "Invalid phone number";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      return "Invalid email";
    if (!form.qualification.trim()) return "Qualification is required";
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (loading) return;

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    try {
      setLoading(true);

      const payload: any = {
        name: form.name.trim(),
        address: form.address.trim(),
        date_of_birth: new Date(form.date_of_birth)
          .toISOString()
          .split("T")[0],
        gender: form.gender,
        number: form.number.trim(),
        email: form.email.trim(),
        qualification: form.qualification.trim(),
      };

      if (form.image) payload.image = form.image;
      if (form.hire_date)
        payload.hire_date = new Date(form.hire_date)
          .toISOString()
          .split("T")[0];
      if (form.desgination) payload.desgination = form.desgination;
      if (form.salary) payload.salary = Number(form.salary);
      payload.is_active = form.is_active;

      // ⏳ wait for API response (parent handles API call)
      await onAdd(payload);

      // reset only after success
      setForm({
        name: "",
        address: "",
        date_of_birth: "",
        gender: "Male",
        number: "",
        email: "",
        qualification: "",
        image: "",
        hire_date: "",
        desgination: "Teacher",
        salary: "",
        is_active: true,
      });

      onClose();
    } catch (error) {
      console.error("Add teacher failed", error);
      alert("Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[520px] p-6 max-h-[90vh] overflow-auto">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Teacher</h3>
          <button onClick={onClose} disabled={loading} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <div className="space-y-3 text-sm">
          <div>
            <label htmlFor="name" className="text-xs text-gray-600 block mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="address" className="text-xs text-gray-600 block mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="dob" className="text-xs text-gray-600 block mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dob"
                type="date"
                value={form.date_of_birth}
                onChange={(e) =>
                  setForm({ ...form, date_of_birth: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="gender" className="text-xs text-gray-600 block mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone" className="text-xs text-gray-600 block mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                placeholder="+91 9xxxxxxxxx"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs text-gray-600 block mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="qualification" className="text-xs text-gray-600 block mb-1">
              Qualification <span className="text-red-500">*</span>
            </label>
            <input
              id="qualification"
              placeholder="e.g. M.Sc, B.Ed"
              value={form.qualification}
              onChange={(e) =>
                setForm({ ...form, qualification: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="desgination" className="text-xs text-gray-600 block mb-1">
                Designation (optional)
              </label>
              <select
                id="desgination"
                value={form.desgination}
                onChange={(e) =>
                  setForm({ ...form, desgination: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Teacher</option>
                <option>Assistant Teacher</option>
                <option>Head Master</option>
              </select>
            </div>

            <div>
              <label htmlFor="hire_date" className="text-xs text-gray-600 block mb-1">
                Hire Date (optional)
              </label>
              <input
                id="hire_date"
                type="date"
                value={form.hire_date}
                onChange={(e) => setForm({ ...form, hire_date: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="salary" className="text-xs text-gray-600 block mb-1">
                Salary (optional)
              </label>
              <input
                id="salary"
                type="number"
                placeholder="0"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="image" className="text-xs text-gray-600 block mb-1">
                Image URL (optional)
              </label>
              <input
                id="image"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isActive"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="isActive" className="text-xs text-gray-500">
              Active
            </label>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 text-sm text-white rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-busy={loading}
          >
            {loading ? "Saving..." : "Add Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
}
