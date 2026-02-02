import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onAdd: (data: any) => void;
};

export default function AddExamScheduleModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    subject: "",
    date: "",
    start: "",
    end: "",
    duration: "",
    room: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.subject || !form.date) return alert("Fill all fields");

    onAdd({
      id: Date.now().toString(),
      ...form,
      max: 100,
      min: 35,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Add Exam Schedule
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          
          <input
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 col-span-2"
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="time"
            name="start"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="time"
            name="end"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            name="duration"
            placeholder="Duration (eg: 3 hrs)"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            name="room"
            placeholder="Room No"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
