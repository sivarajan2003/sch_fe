import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  onAdd: (group: any) => void;
}

export default function AddSubjectGroupModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    className: "",
    section: "",
    subjectGroup: "",
    createdDate: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.className || !form.section || !form.subjectGroup) return;

    onAdd({
      id: Date.now(),
      class: form.className,
      section: form.section,
      group: form.subjectGroup,
      date: form.createdDate || new Date().toLocaleDateString("en-GB"),
      status: form.status,
    });

    onClose();
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
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">Add Subject Group</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <input
            name="className"
            placeholder="Class"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          />

          <input
            name="section"
            placeholder="Section"
            className="border rounded-lg px-3 py-2"
            onChange={handleChange}
          />

          <input
            name="subjectGroup"
            placeholder="Subject Group"
            className="border rounded-lg px-3 py-2 col-span-2"
            onChange={handleChange}
          />

          <input
            type="date"
            name="createdDate"
            className="border rounded-lg px-3 py-2 col-span-2"
            onChange={handleChange}
          />

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
  </div>,
  document.body
);
}
