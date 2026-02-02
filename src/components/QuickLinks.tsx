import {
  Calendar,
  BookOpen,
  ClipboardCheck,
  FileText,
  Layers,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const links = [
  { label: "Calendar", icon: Calendar, path: "/admin/dashboard/hrm/holidays", bg: "bg-green-100", color: "text-green-600" },
  { label: "Events", icon: Layers,  path: "/admin/dashboard/management/sports", bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Attendance", icon: ClipboardCheck,   path: "/admin/dashboard/reports/attendance", bg: "bg-yellow-100", color: "text-yellow-600" },
  { label: "Exams", icon: BookOpen, path: "/admin/dashboard/academic/examinations/exam", bg: "bg-cyan-100", color: "text-cyan-600" },
  { label: "Reports", icon: BarChart3,   path: "/admin/dashboard/reports/attendance", bg: "bg-purple-100", color: "text-purple-600" },
  { label: "Files", icon: FileText, path: "/admin/dashboard/reports/attendance", bg: "bg-red-100", color: "text-red-600" },
];

export default function QuickLinks() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 transition hover:shadow-md">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>

      <div className="grid grid-cols-3 gap-4">
        {links.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className="
              group flex flex-col items-center justify-center p-4 rounded-lg border
              cursor-pointer
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50
              active:scale-95
            "
          >
            {/* ICON admin/dashboard/hrm/holidays*/}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${item.bg}
                transition-all duration-300
                group-hover:scale-110 group-hover:rotate-6
              `}
            >
              <item.icon className={`${item.color} w-5 h-5`} />
            </div>

            {/* LABEL */}
            <span
              className="
                text-sm mt-2 text-gray-700
                transition-colors duration-300
                group-hover:text-gray-900
              "
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
