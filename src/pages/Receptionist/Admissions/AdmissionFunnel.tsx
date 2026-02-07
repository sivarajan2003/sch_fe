import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admissionDashboardService from "../../../service/admissiondashboardService";

export default function AdmissionFunnel() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("this");
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchFunnel();
  }, [period]);

  /* ================= FETCH FUNNEL ================= */

  const fetchFunnel = async () => {
    try {
      const res = await admissionDashboardService.getAdmissionFunnel();
      if (res.success) {
        const data = res.data || {};
        setCounts(data);

        // Total = sum of all statuses
        const totalCount = Object.values(data).reduce(
          (sum, val) => sum + Number(val || 0),
          0
        );
        setTotal(totalCount);
      }
    } catch (err) {
      console.error("Failed to fetch admission funnel", err);
    }
  };

  /* ================= HELPERS ================= */

  const getPercent = (count, base) => {
    if (!base) return 0;
    return Math.round((count / base) * 100);
  };

  /* ================= STATUS MAPPING =================
     Backend statuses:
     Applied, Pending, Approved, Interview Scheduled,
     Interview Done, Offer Sent, Enrolled, Rejected
  =================================================== */

  const appliedCount = total;
  const interviewedCount =
    (counts["Interview Scheduled"] || 0) +
    (counts["Interview Done"] || 0);

  const offeredCount =
    (counts["Approved"] || 0) +
    (counts["Offer Sent"] || 0);

  const enrolledCount = counts["Enrolled"] || 0;

  const steps = [
    {
      id: 1,
      label: "Applied",
      value: appliedCount,
      percent: 100,
      color: "bg-blue-500",
      route: "/admin/dashboard/receptionist/admissions/all",
    },
    {
      id: 2,
      label: "Interviewed",
      value: interviewedCount,
      percent: getPercent(interviewedCount, appliedCount),
      color: "bg-purple-500",
      route: "/admin/dashboard/receptionist/admissions/interviews",
    },
    {
      id: 3,
      label: "Offered",
      value: offeredCount,
      percent: getPercent(offeredCount, appliedCount),
      color: "bg-orange-500",
      route: "/admin/dashboard/receptionist/admissions/offers",
    },
    {
      id: 4,
      label: "Enrolled",
      value: enrolledCount,
      percent: getPercent(enrolledCount, appliedCount),
      color: "bg-green-500",
      route: "/admin/dashboard/receptionist/admissions/enrolled",
    },
  ];

  /* ================= NAVIGATION ================= */

  const handleNavigate = (route) => {
    navigate(route);
  };

  /* ================= UI ================= */

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
          onChange={(e) => setPeriod(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none"
        >
          <option value="this">This Month</option>
          {/* future: last month */}
        </select>
      </div>

      {/* FUNNEL STEPS */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => handleNavigate(step.route)}
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

      {/* FOOTER STATS */}
      <div className="grid grid-cols-3 gap-6 mt-10 text-center border-t pt-6">
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            {getPercent(enrolledCount, appliedCount)}%
          </h4>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            {counts["Pending"] || 0}
          </h4>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">
            {counts["Interview Scheduled"] || 0}
          </h4>
          <p className="text-sm text-gray-500">Interviews</p>
        </div>
      </div>
    </div>
  );
}
