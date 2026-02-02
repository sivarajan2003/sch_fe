import { useState } from "react";
import { X } from "lucide-react";

export type TimeTableItem = {
  day: string;
  date: string;
  subject: string;
  teacher: string;
  time: string;
};

export default function AddTimeTableModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: TimeTableItem) => void;
}) {
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSave = () => {
    if (!day || !date || !subject || !teacher || !from || !to) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      day,
      date,
      subject,
      teacher,
      time: `${from} - ${to}`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Time Table</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* DAY */}
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* SUBJECT */}
          <input
            placeholder="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* TEACHER */}
          <input
            placeholder="Teacher Name"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* TIME */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
