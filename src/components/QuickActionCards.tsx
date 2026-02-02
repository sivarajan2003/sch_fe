import {
  ChevronRight,
} from "lucide-react";

import q1 from "../assets/gif/q1.gif";
import q2 from "../assets/gif/q2.gif";
import q3 from "../assets/gif/q3.gif";
import q4 from "../assets/gif/q4.gif";
import { useNavigate } from "react-router-dom";
/* ================= QUICK ACTION DATA ================= */

const actions = [
  {
    title: "View Attendance",
    gif: q1,
    bg: "bg-yellow-50",
    path: "/admin/dashboard/reports/attendance",
  },
  {
    title: "New Events",
    gif: q2,
    bg: "bg-green-50",
    path: "/admin/dashboard/management/sports",
  },
  {
    title: "Membership Plans",
    gif: q3,
    bg: "bg-red-50",
    path: "/admin/dashboard/management/library",
  },
  {
    title: "Finance & Accounts",
    gif: q4,
    bg: "bg-cyan-50",
    path: "/admin/dashboard/management/fees-collection",
  },
];

export default function QuickActionCards() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((item, index) => (
        <div
        key={index}
        // ✅ NAVIGATION HANDLER 
        onClick={() => item.path && navigate(item.path)}
        className={`
          group flex items-center justify-between p-4 rounded-xl
          border border-gray-200 ${item.bg}
          cursor-pointer
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-md
          active:scale-95
        `}
      >
          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* GIF ICON */}
            <div
              className="
                w-12 h-12 rounded-lg
                flex items-center justify-center
                bg-white
                transition-all duration-300
                group-hover:scale-110
              "
            >
              <img
                src={item.gif}
                alt={item.title}
                className="w-7 h-7 object-contain"
              />
            </div>

            {/* TITLE */}
            <p
              className="
                text-sm font-medium text-gray-800
                transition-colors duration-300
                group-hover:text-gray-900
              "
            >
              {item.title}
            </p>
          </div>

          {/* RIGHT ARROW */}
          <ChevronRight
            className="
              w-4 h-4 text-gray-400
              transition-all duration-300
              group-hover:translate-x-1 group-hover:text-gray-600
            "
          />
        </div>
      ))}
    </div>
  );
}
