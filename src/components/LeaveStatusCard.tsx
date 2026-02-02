import {
  CalendarDays,
  AlertCircle,
  HeartPulse,
  Thermometer,
} from "lucide-react";

const leaves = [
  {
    title: "Emergency Leave",
    date: "15 Jun 2024",
    status: "Pending",
    statusBg: "bg-blue-500",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    title: "Medical Leave",
    date: "15 Jun 2024",
    status: "Approved",
    statusBg: "bg-green-500",
    icon: HeartPulse,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Medical Leave",
    date: "15 Jun 2024",
    status: "Declined",
    statusBg: "bg-red-500",
    icon: HeartPulse,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Fever",
    date: "15 Jun 2024",
    status: "Approved",
    statusBg: "bg-green-500",
    icon: Thermometer,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
];

export default function LeaveStatusCard() {
  return (
    <div className="bg-white rounded-xl border p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sm">Leave Status</h3>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="w-4 h-4" />
          This Year
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {leaves.map((leave, i) => {
          const Icon = leave.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
            >
              {/* ICON */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${leave.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${leave.iconColor}`} />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <p className="text-sm font-medium">{leave.title}</p>
                <p className="text-xs text-gray-500">
                  Leave Date : {leave.date}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`px-3 py-1 text-xs rounded-full text-white ${leave.statusBg}`}
              >
                {leave.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
