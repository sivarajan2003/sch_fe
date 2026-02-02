import { useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Plus,
  Clock,
  CalendarDays,
} from "lucide-react";
import AddTimeTableModal, {
  TimeTableItem,
} from "../../components/AddTimeTableModal";


/* ================= DATA ================= */

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timetable: Record<string, any[]> = {
  Monday: [
    { time: "09:00 - 09:45 AM", subject: "Maths", teacher: "Jacquelin", color: "bg-pink-50" },
    { time: "09:45 - 10:30 AM", subject: "English", teacher: "Hellana", color: "bg-blue-50" },
    { time: "10:45 - 11:30 AM", subject: "Computer", teacher: "Daniel", color: "bg-green-50" },
    { time: "11:30 - 12:15 AM", subject: "Spanish", teacher: "Erickson", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Science", teacher: "Morgan", color: "bg-indigo-50" },
    { time: "02:15 - 03:00 PM", subject: "Chemistry", teacher: "Aaron", color: "bg-yellow-50" },
    { time: "03:15 - 04:00 PM", subject: "Physics", teacher: "Teresa", color: "bg-orange-50" },
  ],
  Tuesday: [
    { time: "09:00 - 09:45 AM", subject: "Spanish", teacher: "Erickson", color: "bg-blue-50" },
    { time: "09:45 - 10:30 AM", subject: "Physics", teacher: "Teresa", color: "bg-green-50" },
    { time: "10:45 - 11:30 AM", subject: "Chemistry", teacher: "Aaron", color: "bg-pink-50" },
    { time: "11:30 - 12:15 AM", subject: "Maths", teacher: "Jacquelin", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Computer", teacher: "Daniel", color: "bg-yellow-50" },
    { time: "02:15 - 03:00 PM", subject: "English", teacher: "Hellana", color: "bg-indigo-50" },
    { time: "03:15 - 04:00 PM", subject: "Science", teacher: "Morgan", color: "bg-orange-50" },
  ],
  Wednesday: [
    { time: "09:00 - 09:45 AM", subject: "Computer", teacher: "Daniel", color: "bg-green-50" },
    { time: "09:45 - 10:30 AM", subject: "Science", teacher: "Morgan", color: "bg-blue-50" },
    { time: "10:45 - 11:30 AM", subject: "Maths", teacher: "Jacquelin", color: "bg-pink-50" },
    { time: "11:30 - 12:15 AM", subject: "Chemistry", teacher: "Aaron", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Physics", teacher: "Teresa", color: "bg-yellow-50" },
    { time: "02:15 - 03:00 PM", subject: "English", teacher: "Hellana", color: "bg-indigo-50" },
    { time: "03:15 - 04:00 PM", subject: "Spanish", teacher: "Erickson", color: "bg-orange-50" },
  ],
  Thursday: [
    { time: "09:00 - 09:45 AM", subject: "Physics", teacher: "Teresa", color: "bg-yellow-50" },
    { time: "09:45 - 10:30 AM", subject: "Computer", teacher: "Daniel", color: "bg-green-50" },
    { time: "10:45 - 11:30 AM", subject: "English", teacher: "Hellana", color: "bg-blue-50" },
    { time: "11:30 - 12:15 AM", subject: "Science", teacher: "Morgan", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Spanish", teacher: "Erickson", color: "bg-orange-50" },
    { time: "02:15 - 03:00 PM", subject: "Chemistry", teacher: "Aaron", color: "bg-pink-50" },
    { time: "03:15 - 04:00 PM", subject: "Maths", teacher: "Jacquelin", color: "bg-indigo-50" },
  ],
  Friday: [
    { time: "09:00 - 09:45 AM", subject: "English", teacher: "Hellana", color: "bg-blue-50" },
    { time: "09:45 - 10:30 AM", subject: "Spanish", teacher: "Erickson", color: "bg-green-50" },
    { time: "10:45 - 11:30 AM", subject: "Physics", teacher: "Teresa", color: "bg-yellow-50" },
    { time: "11:30 - 12:15 AM", subject: "Chemistry", teacher: "Aaron", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Maths", teacher: "Jacquelin", color: "bg-pink-50" },
    { time: "02:15 - 03:00 PM", subject: "Computer", teacher: "Daniel", color: "bg-indigo-50" },
    { time: "03:15 - 04:00 PM", subject: "Science", teacher: "Morgan", color: "bg-orange-50" },
  ],
  Saturday: [
    { time: "09:00 - 09:45 AM", subject: "English", teacher: "Hellana", color: "bg-blue-50" },
    { time: "09:45 - 10:30 AM", subject: "Spanish", teacher: "Erickson", color: "bg-green-50" },
    { time: "10:45 - 11:30 AM", subject: "Physics", teacher: "Teresa", color: "bg-yellow-50" },
    { time: "11:30 - 12:15 AM", subject: "Chemistry", teacher: "Aaron", color: "bg-purple-50" },
    { time: "01:30 - 02:15 PM", subject: "Maths", teacher: "Jacquelin", color: "bg-pink-50" },
    { time: "02:15 - 03:00 PM", subject: "Computer", teacher: "Daniel", color: "bg-indigo-50" },
    { time: "03:15 - 04:00 PM", subject: "Science", teacher: "Morgan", color: "bg-orange-50" },
  ],
};

/* ================= PAGE ================= */

export default function TimeTablePage() {
  const [openAdd, setOpenAdd] = useState(false);
  

  const [openClass, setOpenClass] = useState(false);
  const [openWeek, setOpenWeek] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Class I-A");
  const [selectedWeek, setSelectedWeek] = useState("This Week");
  /* 📤 EXPORT TIME TABLE */
const handleExport = () => {
  const rows: string[] = [];

  // CSV Header
  rows.push("Day,Time,Subject,Teacher");

  Object.entries(timetable).forEach(([day, sessions]) => {
    sessions.forEach((item) => {
      rows.push(
        `${day},${item.time},${item.subject},${item.teacher}`
      );
    });
  });

  const csvContent =
    "data:text/csv;charset=utf-8," + rows.join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "time_table.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="space-y-6">

      {/* HEADER */}
      {/* ================= HEADER ================= */}
<div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-4">

  {/* TOP ROW */}
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-semibold">
        Time Table
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / Academic / Time Table
      </p>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex items-center gap-3">

      {/* REFRESH */}
      <button
        onClick={() => window.location.reload()}
        className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <RefreshCcw size={16} />
      </button>

      {/* PRINT */}
      <button
        onClick={() => window.print()}
        className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <Printer size={16} />
      </button>

      {/* EXPORT */}
      <button
  onClick={handleExport}
  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
>
  Export
</button>


      {/* ADD TIME TABLE */}
      <button
  onClick={() => setOpenAdd(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1"
>
  <Plus size={14} />
  Add Time Table
</button>

    </div>
  </div>
</div>
{/* ================= SUB HEADER (CORRECT PLACE) ================= */}
<div className="bg-white border rounded-xl px-5 py-4 flex items-center justify-between">

<h3 className="text-sm font-semibold text-gray-800">
  Time Table
</h3>

<div className="flex items-center gap-3">

  {/* CLASS DROPDOWN */}
  <div className="relative">
    <button
      onClick={() => setOpenClass(!openClass)}
      className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2"
    >
      {selectedClass}
      <ArrowUpDown size={14} />
    </button>

    {openClass && (
      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow w-36 z-20">
        {["Class I-A", "Class II-A", "Class III-A"].map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setSelectedClass(cls);
              setOpenClass(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            {cls}
          </button>
        ))}
      </div>
    )}
  </div>

  {/* WEEK DROPDOWN */}
  <div className="relative">
    <button
      onClick={() => setOpenWeek(!openWeek)}
      className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2"
    >
      <CalendarDays size={14} />
      {selectedWeek}
    </button>

    {openWeek && (
      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow w-44 z-20">
        {["This Week", "Last Week", "Next Week"].map((week) => (
          <button
            key={week}
            onClick={() => {
              setSelectedWeek(week);
              setOpenWeek(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            {week}
          </button>
        ))}
      </div>
    )}
  </div>

</div>
</div>

      {/* GRID */}
      <div className="grid grid-cols-6 gap-4">
        {days.map((day) => (
          <div key={day}>
            <h4 className="text-sm font-semibold mb-3">{day}</h4>

            <div className="space-y-3">
              {timetable[day].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-xs border ${item.color}`}
                >
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Clock size={12} /> {item.time}
                  </div>
                  <p className="font-medium text-gray-800">
                    Subject : {item.subject}
                  </p>
                  <div className="mt-3 bg-white rounded-lg px-3 py-2 flex items-center gap-3">
  <img
    src={`https://i.pravatar.cc/40?img=${i + 10}`}
    className="w-8 h-8 rounded-md object-cover"
    alt={item.teacher}
  />
  <span className="text-sm font-medium text-gray-700">
    {item.teacher}
  </span>
</div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BREAKS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { title: "Morning Break", time: "10:30 to 10:45 AM", color: "bg-blue-50" },
          { title: "Lunch", time: "10:30 to 10:45 AM", color: "bg-yellow-50" },
          { title: "Evening Break", time: "03:30 PM to 03:45 PM", color: "bg-indigo-50" },
        ].map((b, i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-1">{b.title}</h4>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} /> {b.time}
            </p>
          </div>
        ))}
      </div>
      {openAdd && (
  <AddTimeTableModal
    onClose={() => setOpenAdd(false)}
    onSave={(newItem: TimeTableItem) => {
      timetable[newItem.day].unshift({
        time: newItem.time,
        subject: newItem.subject,
        teacher: newItem.teacher,
        color: "bg-blue-50",
      });
      setOpenAdd(false);
    }}
  />
)}

    </div>
  );
}
