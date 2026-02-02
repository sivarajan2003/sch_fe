import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<number | null>(20);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const days: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 transition-all">
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="
              p-2 rounded-lg
              transition-all duration-200
              hover:bg-gray-100 hover:scale-110
              active:scale-95
            "
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextMonth}
            className="
              p-2 rounded-lg
              transition-all duration-200
              hover:bg-gray-100 hover:scale-110
              active:scale-95
            "
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* DATES */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => day && setSelectedDate(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              transition-all duration-200
              ${day === null ? "" : "cursor-pointer"}
              ${
                day === selectedDate
                  ? "bg-blue-600 text-white font-semibold scale-105 shadow-md animate-pulseOnce"
                  : "text-gray-700 hover:bg-gray-100 hover:-translate-y-0.5 active:scale-95"
              }
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-pulseOnce {
          animation: pulseOnce 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
