import { toast } from "react-toastify";
import React, { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onCreate: (payload: any) => Promise<void> | void;
};

export default function AddClassModal({ onClose, onCreate }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    section: "",
    capacity: "",
    subjects: "0",
    is_active: true,
  });

  const validate = () => {
    if (!form.name.trim()) return "Class name is required";
    if (!form.section.trim()) return "Section is required";
    if (!form.capacity || Number(form.capacity) < 1) return "Capacity must be at least 1";
    if (!form.id.trim()) return "Class ID is required";
    return null;
  };

  const handleSubmit = async () => {
    if (loading) return;
    const err = validate();
    if (err) {
      toast.info(err);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        // backend expects 'name', 'section', 'capacity'
        name: form.name.trim(),
        section: form.section.trim(),
        capacity: Number(form.capacity),
        is_active: form.is_active,
        // optional front-only fields we keep for UI compatibility
        clientMeta: {
          id: form.id.trim(),
          subjects: Number(form.subjects),
        },
      };

      await onCreate(payload);
      // success feedback handled by parent
      setForm({ id: "", name: "", section: "", capacity: "", subjects: "0", is_active: true });
      // parent will close modal on success
    } catch (err) {
      console.error("Create class failed", err);
      toast.error("Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[520px] p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Class</h3>
          <button onClick={onClose} disabled={loading}><X size={18} /></button>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Class ID <span className="text-red-500">*</span></label>
            <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="C123456" />
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">Class Name <span className="text-red-500">*</span></label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="Grade name (e.g. V)" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">Section <span className="text-red-500">*</span></label>
              <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="A" />
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-1">Capacity (No of Students) <span className="text-red-500">*</span></label>
              <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="30" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">No of Subjects (optional)</label>
              <input type="number" value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="3" />
            </div>

            <div className="flex items-center gap-2">
              <input id="isActive" type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4" />
              <label htmlFor="isActive" className="text-xs text-gray-500">Active</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className={`px-4 py-2 text-sm text-white rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>{loading ? "Saving..." : "Save Class"}</button>
        </div>
      </div>
    </div>
  );
}
