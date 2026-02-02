import { Calendar, Clock, Users } from "lucide-react";
import { useState } from "react";

interface Event {
  title: string;
  date: string;
  time: string;
  color: string;
}
const formatMonthlyDate = (day: number) => {
  const now = new Date();

  const date = new Date(
    now.getFullYear(),     // current year
    now.getMonth(),        // current month
    day                   // fixed day
  );

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function UpcomingEvents() {
  const [showAll, setShowAll] = useState(false);


  const allEvents: Event[] = [
    
    {
      title: "Parents, Teacher Meet",
      date: formatMonthlyDate(15),
      time: "09:10 AM - 10:50 AM",
      color: "blue",
    },
    {
      title: "Staff Meeting",
      date: formatMonthlyDate(10),
      time: "09:10 AM - 10:50 AM",
      color: "indigo",
    },
    {
      title: "Vacation Meeting",
      date: formatMonthlyDate(7),
      time: "09:10 AM - 10:50 AM",
      color: "red",
    },
    {
      title: "Annual Sports Day",
      date: formatMonthlyDate(20),
      time: "08:30 AM - 01:00 PM",
      color: "blue",
    },
    {
      title: "PTA Discussion",
      date: formatMonthlyDate(22),
      time: "10:00 AM - 12:00 PM",
      color: "indigo",
    },
    {
      title: "Cultural Fest",
      date: formatMonthlyDate(25),
      time: "09:00 AM - 04:00 PM",
      color: "red",
    },
  ];
  
  const events = allEvents.slice(0, 3);
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Events
        </h3>
        <span
  onClick={() => setShowAll(true)}
  className="
    text-sm text-blue-600 font-medium cursor-pointer
    transition hover:underline hover:scale-105 active:scale-95
  "
>
  See All
</span>

      </div>
{/* EVENTS */}
<div className="space-y-4">
  {events.map((event, index) => (
    <div
      key={index}
      className="
        group relative bg-white rounded-lg border border-gray-200
        shadow-sm p-4 pl-5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-md hover:bg-gray-50
        cursor-pointer
      "
    >
      {/* LEFT COLOR LINE */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${
          event.color === "blue"
            ? "bg-blue-500"
            : event.color === "indigo"
            ? "bg-indigo-500"
            : "bg-red-500"
        }`}
      ></span>

      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              event.color === "blue"
                ? "bg-blue-50 text-blue-600"
                : event.color === "indigo"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            <Users className="w-5 h-5" />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {event.title}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              {event.date}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          {event.time}
        </div>

        <div className="flex -space-x-2">
          <img src="https://i.pravatar.cc/30?img=1" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src="https://i.pravatar.cc/30?img=2" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src="https://i.pravatar.cc/30?img=3" className="w-7 h-7 rounded-full border-2 border-white" />
        </div>
      </div>
    </div>
  ))}
</div>

      {/* ================= SEE ALL MODAL ================= */}
{showAll && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    {/* MODAL BOX */}
    <div className="bg-white w-[90%] max-w-xl rounded-xl p-6 shadow-xl animate-fadeIn">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Events</h3>
        <button
          onClick={() => setShowAll(false)}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* EVENT LIST */}
      {/* EVENT LIST */}
<div className="space-y-3 max-h-[400px] overflow-y-auto">
  {allEvents.map((event, index) => (
    <div
      key={index}
      className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50"
    >
      {/* COLOR BAR */}
      <span
        className={`w-1 h-10 rounded ${
          event.color === "blue"
            ? "bg-blue-500"
            : event.color === "indigo"
            ? "bg-indigo-500"
            : "bg-red-500"
        }`}
      ></span>

      {/* CONTENT */}
      <div className="flex-1">
        <p className="font-medium text-sm">{event.title}</p>
        <p className="text-xs text-gray-500">
          {event.date} • {event.time}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  </div>
)}

    </div>
  );
}
