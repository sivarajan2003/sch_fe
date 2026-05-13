import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export type TimeTableItem = {
  class_id: string;
  subject_id: string;
  academicyear_id: string;
  teacher_id: string;

  day_of_week: string;
  period_number: string;

  start_time: string;
  end_time: string;

  period_type: string;
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
  const [periodType, setPeriodType] = useState("CLASS");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSave = () => {
    if (!day || !date || !subject || !teacher || !from || !to) {
      alert("Please fill all fields");
      return;
    }

    onSave({
  class_id: "PUT_REAL_CLASS_UUID",
  subject_id: "PUT_REAL_SUBJECT_UUID",
  academicyear_id: "PUT_REAL_YEAR_UUID",
  teacher_id: "PUT_REAL_TEACHER_UUID",

  day_of_week: day,
  period_number: "1st",

  start_time: from,
  end_time: to,

  period_type: periodType,
});

    //onClose();
  };

  return createPortal(
   <div
    className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
    style={{ zIndex: 999999 }}
  >
   <div className="bg-white rounded-xl w-[520px] p-6 max-h-[90vh] overflow-auto">
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
          {/* PERIOD TYPE */}
<select
  value={periodType}
  onChange={(e) => setPeriodType(e.target.value)}
  className="w-full border rounded-lg px-3 py-2 text-sm"
>
  <option value="CLASS">Class Period</option>
  <option value="BREAK">Break</option>
  <option value="LUNCH">Lunch Break</option>
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
  disabled={periodType !== "CLASS"}
  placeholder="Subject Name"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  className="w-full border rounded-lg px-3 py-2 text-sm"
/>

          {/* TEACHER */}
        <input
  disabled={periodType !== "CLASS"}
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
  </div>,
  document.body
);
}
