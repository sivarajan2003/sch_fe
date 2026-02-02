import { useState } from "react";
import {
  BookOpen,
  Leaf,
  Bell,
  FileText,
  CalendarDays,
  Clock,
  X,
} from "lucide-react";

/* ================= NOTICE DATA (2025) ================= */

const notices = [
  {
    title: "New Syllabus Instructions",
    date: "11 Jan 2025",
    days: "20 Days",
    desc: "Updated syllabus structure has been released for the academic year 2025.",
    icon: BookOpen,
    bg: "bg-blue-50",
    color: "text-gray-600",
  },
  {
    title: "World Environment Day Program",
    date: "05 Jun 2025",
    days: "15 Days",
    desc: "School-wide programs, competitions and tree plantation activities are planned.",
    icon: Leaf,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    title: "Exam Preparation Notification",
    date: "18 Feb 2025",
    days: "12 Days",
    desc: "Students are advised to follow the preparation schedule and attend revision classes.",
    icon: Bell,
    bg: "bg-red-50",
    color: "text-red-500",
  },
  {
    title: "Online Classes Preparation",
    date: "10 Jul 2025",
    days: "02 Days",
    desc: "Online class timetable and platform access details will be shared soon.",
    icon: FileText,
    bg: "bg-cyan-50",
    color: "text-cyan-600",
  },
  {
    title: "Exam Time Table Release",
    date: "22 Aug 2025",
    days: "06 Days",
    desc: "Final examination timetable for Term II has been officially released.",
    icon: CalendarDays,
    bg: "bg-yellow-50",
    color: "text-yellow-600",
  },
];

export default function NoticeBoard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* ================= NOTICE BOARD ================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 h-full">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">
            Notice Board
          </h3>

          <span
            onClick={() => setOpenModal(true)}
            className="text-sm text-blue-600 cursor-pointer font-medium hover:underline"
          >
            View All
          </span>
        </div>

        {/* LIST (SHORT VIEW) */}
        <div className="relative space-y-8">

          {/* Vertical dotted line */}
          <div className="absolute left-[14px] top-6 bottom-6 border-l-2 border-dotted border-gray-200" />

          {notices.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="
                  group flex items-start justify-between gap-6
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-sm
                  cursor-pointer
                "
              >
                {/* ICON */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center
                      ${item.bg}
                      transition-transform duration-300
                      group-hover:scale-110 group-hover:rotate-3
                    `}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-800 transition">
  {item.title}
</p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Added on : {item.date}</span>
                  </div>
                </div>

                {/* DAYS */}
                <div className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap group-hover:bg-gray-200 transition">
                  <Clock className="w-3.5 h-3.5" />
                  {item.days}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= VIEW ALL MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[520px] max-h-[80vh] overflow-y-auto p-5">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                All Notices
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                className="hover:text-red-500 transition"
              >
                <X />
              </button>
            </div>

            {/* FULL NOTICE CONTENT */}
            <div className="space-y-6">
              {notices.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="
                      border rounded-lg p-4
                      transition-all duration-300
                      hover:bg-gray-50 hover:shadow
                      cursor-pointer
                    "
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`
                          w-9 h-9 rounded-full flex items-center justify-center
                          ${item.bg}
                          transition-transform duration-300
                          hover:scale-110
                        `}
                      >
                        <Icon className={`${item.color} w-4 h-4`} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Added on {item.date}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
