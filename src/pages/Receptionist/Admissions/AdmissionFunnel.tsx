import { useState } from "react";
import { useNavigate } from "react-router-dom";

const THIS_MONTH = [
  { id: 1, label: "Applied", value: 50, percent: 100, color: "bg-blue-500" },
  { id: 2, label: "Documents Verified", value: 45, percent: 90, color: "bg-cyan-500" },
  { id: 3, label: "Interviewed", value: 34, percent: 68, color: "bg-purple-500" },
  { id: 4, label: "Offered", value: 21, percent: 42, color: "bg-orange-500" },
  { id: 5, label: "Enrolled", value: 6, percent: 12, color: "bg-green-500" },
];

const LAST_MONTH = [
  { id: 1, label: "Applied", value: 40, percent: 100, color: "bg-blue-500" },
  { id: 2, label: "Documents Verified", value: 32, percent: 80, color: "bg-cyan-500" },
  { id: 3, label: "Interviewed", value: 20, percent: 50, color: "bg-purple-500" },
  { id: 4, label: "Offered", value: 12, percent: 30, color: "bg-orange-500" },
  { id: 5, label: "Enrolled", value: 5, percent: 12, color: "bg-green-500" },
];

export default function AdmissionFunnel() {
  const [period, setPeriod] = useState<"this" | "last">("this");

const steps = period === "this" ? THIS_MONTH : LAST_MONTH;
const navigate = useNavigate();

  // ✅ PUT IT HERE 👇
  const routeMap: Record<string, string> = {
    Applied: "/admin/dashboard/receptionist/admissions",
    "Documents Verified": "/admin/dashboard/receptionist/admissions/documents",
    Interviewed: "/admin/dashboard/receptionist/admissions/interviews",
    Offered: "/admin/dashboard/receptionist/admissions/offers",
    Enrolled: "/admin/dashboard/receptionist/admissions/enrolled",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 h-full transition hover:shadow-md">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Admission Funnel
          </h3>
          <p className="text-sm text-gray-500">
            Application conversion tracking
          </p>
        </div>

        <select
  value={period}
  onChange={(e) => setPeriod(e.target.value as "this" | "last")}
  className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
>
  <option value="this">This Month</option>
  <option value="last">Last Month</option>
</select>

      </div>

      {/* STEPS */}
      <div className="space-y-6">
      {steps.map((step) => (
  <div
    key={step.id}
    onClick={() => navigate(routeMap[step.label])}
    className="cursor-pointer group"
  >

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold flex items-center justify-center">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
  {step.label}
</span>

              </div>

              <div className="text-sm text-gray-700 font-medium">
                {step.percent}% &nbsp;
                <span className="font-semibold text-gray-900">
                  {step.value}
                </span>
              </div>
            </div>

            <div className="relative h-3.5 w-full bg-gray-100 overflow-hidden rounded-md">
  <div
    className={`absolute left-0 top-0 h-full ${step.color} transition-all duration-700`}
    style={{
      width: `${step.percent}%`,
      clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)",
    }}
  />
</div>

          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="grid grid-cols-3 gap-6 mt-10 text-center border-t pt-6">
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">12%</h4>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">44</h4>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">15</h4>
          <p className="text-sm text-gray-500">Pending Enrollment</p>
        </div>
      </div>
    </div>
  );
}
