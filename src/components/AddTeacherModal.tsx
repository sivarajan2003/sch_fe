import { useState } from "react";
import { X } from "lucide-react";

export default function AddTeacherModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (teacher: any) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    experience: "",
    age: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name || !form.subject) return;

    onAdd({
      id: "T" + Math.floor(Math.random() * 900000),
      name: form.name,
      class: "—",
      subject: form.subject,
      email: `${form.name.toLowerCase().replace(" ", "")}@example.com`,
      phone: "+91 90000 00000",
      status: "Active",
      image: "https://i.pravatar.cc/150",
      experience: form.experience,
      age: form.age,
    });

    onClose();
    setForm({ name: "", subject: "", experience: "", age: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Teacher</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4 text-sm">

          <input
            placeholder="Teacher Name"
            className="w-full border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Subject"
            className="w-full border rounded-lg px-3 py-2"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <input
            placeholder="Experience (years)"
            className="w-full border rounded-lg px-3 py-2"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />

          <input
            placeholder="Age"
            className="w-full border rounded-lg px-3 py-2"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Add Teacher
          </button>
        </div>
      </div>
    </div>
  );
}
