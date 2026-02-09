import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type AcademicYearItem = {
  id: string;
  name: string;
};

type Props = {
  onClose: () => void;
  onAdd: (payload: { name: string; section: string; capacity: number; is_active?: boolean; academicyear_id?: string }) => Promise<void> | void;
  academicYears: AcademicYearItem[]; // list from parent
};

export default function AddClassModal({ onClose, onAdd, academicYears }: Props) {
  const [form, setForm] = useState({
    name: "",
    section: "",
    capacity: "",
    is_active: true,
    academicyear_id: "",
  });
  const [loading, setLoading] = useState(false);

  // default select first academic year if available
  useEffect(() => {
    if (academicYears && academicYears.length > 0 && !form.academicyear_id) {
      setForm((p) => ({ ...p, academicyear_id: academicYears[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academicYears]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Name is required";
    if (!form.section.trim()) return "Section is required";
    const cap = Number(form.capacity);
    if (!form.capacity || isNaN(cap) || cap < 1) return "Capacity must be at least 1";
    if (!form.academicyear_id) return "Please choose an Academic Year";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    const payload = {
      name: form.name.trim(),
      section: form.section.trim(),
      capacity: Number(form.capacity),
      is_active: Boolean(form.is_active),
      academicyear_id: form.academicyear_id,
    };

    try {
      setLoading(true);
      await onAdd(payload);
      setForm({ name: "", section: "", capacity: "", is_active: true, academicyear_id: academicYears?.[0]?.id ?? "" });
      onClose();
    } catch (err) {
      console.error("Add class failed", err);
      alert("Failed to add class");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
  <div
    className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
    style={{ zIndex: 999999 }}
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
  >
    <div
      className="bg-white w-[480px] rounded-xl p-6"
      onMouseDown={(e) => e.stopPropagation()}
    >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Class</h3>
          <button onClick={onClose} disabled={loading} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Grade 1 / I"
              className="w-full border rounded px-3 py-2 text-sm"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Section <span className="text-red-500">*</span>
            </label>
            <input
              name="section"
              value={form.section}
              onChange={handleChange}
              placeholder="e.g. A / B"
              className="w-full border rounded px-3 py-2 text-sm"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Capacity (students) <span className="text-red-500">*</span>
            </label>
            <input
              name="capacity"
              type="number"
              min={1}
              value={form.capacity}
              onChange={handleChange}
              placeholder="Number of students (capacity)"
              className="w-full border rounded px-3 py-2 text-sm"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Academic Year <span className="text-red-500">*</span>
            </label>
            <select
              name="academicyear_id"
              value={form.academicyear_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              disabled={loading}
            >
              <option value="">-- Select academic year --</option>
              {academicYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              name="is_active"
              type="checkbox"
              checked={form.is_active}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4"
            />
            <label htmlFor="isActive" className="text-sm text-gray-600">
              Active
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded text-sm ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Class"}
            </button>
          </div>
        </form>
     </div>
  </div>,
  document.body
);
}
