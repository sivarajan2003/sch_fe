import { X } from "lucide-react";
import { useState } from "react";

type Exam = {
  id: string;
  name: string;
  date: string;
  start: string;
  end: string;
};

export default function AddExamModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (exam: Exam) => void;
}) {
  const [form, setForm] = useState<Exam>({
    id: "",
    name: "",
    date: "",
    start: "",
    end: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name || !form.date || !form.start || !form.end) {
      alert("Please fill all fields");
      return;
    }
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add Exam</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">Exam ID</label>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="E140525"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Exam Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Unit Test"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Exam Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Start Time</label>
            <input
              type="time"
              name="start"
              value={form.start}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">End Time</label>
            <input
              type="time"
              name="end"
              value={form.end}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
