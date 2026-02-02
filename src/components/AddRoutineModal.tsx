import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function AddRoutineModal({ onClose, onSave }: Props) {
  const [form, setForm] = useState({
    id: "",
    className: "",
    section: "",
    teacher: "",
    subject: "",
    day: "",
    start: "",
    end: "",
    room: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.className || !form.teacher) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">Add Class Routine</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <input name="id" placeholder="Routine ID" className="border rounded-lg px-3 py-2" onChange={handleChange} />
          <input name="className" placeholder="Class" className="border rounded-lg px-3 py-2" onChange={handleChange} />

          <input name="section" placeholder="Section" className="border rounded-lg px-3 py-2" onChange={handleChange} />
          <input name="teacher" placeholder="Teacher" className="border rounded-lg px-3 py-2" onChange={handleChange} />

          <input name="subject" placeholder="Subject" className="border rounded-lg px-3 py-2" onChange={handleChange} />

          <select name="day" className="border rounded-lg px-3 py-2" onChange={handleChange}>
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

          <input type="time" name="start" className="border rounded-lg px-3 py-2" onChange={handleChange} />
          <input type="time" name="end" className="border rounded-lg px-3 py-2" onChange={handleChange} />

          <input name="room" placeholder="Class Room" className="border rounded-lg px-3 py-2" onChange={handleChange} />
          <input type="date" name="date" className="border rounded-lg px-3 py-2" onChange={handleChange} />

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
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
