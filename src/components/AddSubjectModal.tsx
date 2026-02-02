import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onAdd: (subject: any) => void;
}

export default function AddSubjectModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    code: "",
    type: "Theory",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.id || !form.name || !form.code) return;
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">Add Subject</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <input
            name="id"
            placeholder="Subject ID"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Subject Name"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          />

          <input
            name="code"
            placeholder="Code"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          />

          <select
            name="type"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          >
            <option>Theory</option>
            <option>Practical</option>
          </select>

          <select
            name="status"
            className="border rounded-lg px-3 py-2 col-span-2"
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
