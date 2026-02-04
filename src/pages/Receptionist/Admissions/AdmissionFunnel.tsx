import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../service/admissionService";

export default function AdmissionFunnel() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"this" | "last">("this");
  const [stats, setStats] = useState<any>({
    total: 0,
    counts: {}
  });

  useEffect(() => {
    // In a real app we might pass date range for "this month" vs "last month"
    // For now we just fetch all or default stats
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      // Calculate dates based on period if needed
      // const now = new Date();
      // const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      // ...
      const res = await admissionService.getAdmissionStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const getPercent = (count: number, total: number) => {
    if (!total) return 0;
    return Math.round((count / total) * 100);
  };

  // Map backend status to funnel steps
  // Backend statuses: Pending, Applied, Interview Scheduled, Interview Done, Approved, Enrolled, Rejected
  // Funnel: 
  // 1. Applied (Total)
  // 2. Documents Verified (Approved - or custom status if added?) -> Let's map "Pending" + "Approved" etc? 
  //    Actually "Documents Verified" is not a status in enum.
  //    Let's map closely:
  //    - Applied: Total count (or status='Pending')
  //    - Interviewed: status='Interview Done'
  //    - Offered: status='Approved' (assuming Approved = Offer Sent)
  //    - Enrolled: status='Enrolled'

  // Custom logic:
  // Applied = Total
  // Docs Verified = (Total - Rejected)? Or just a hardcoded step for now if we don't have that granular status.
  // We will map available statuses.

  const total = stats.total || 0;
  const counts = stats.counts || {};

  const appliedCount = total;
  // For "Documents Verified", we don't have a status. We'll skip or use "Pending" as proxy? 
  // Let's us use "Pending" + "Interview Scheduled" + others
  const interviewCount = (counts['Interview Done'] || 0) + (counts['Interview Scheduled'] || 0);
  const offerCount = (counts['Approved'] || 0) + (counts['Offer Sent'] || 0); // Assuming 'Approved' or 'Offer Sent'
  const enrolledCount = counts['Enrolled'] || 0;

  const dynamicSteps = [
    { id: 1, label: "Applied", value: appliedCount, percent: 100, color: "bg-blue-500", filter: "All" },
    { id: 2, label: "Interviewed", value: interviewCount, percent: getPercent(interviewCount, appliedCount), color: "bg-purple-500", filter: "Interview Done" },
    { id: 3, label: "Offered", value: offerCount, percent: getPercent(offerCount, appliedCount), color: "bg-orange-500", filter: "Offer Sent" }, // or Approved
    { id: 4, label: "Enrolled", value: enrolledCount, percent: getPercent(enrolledCount, appliedCount), color: "bg-green-500", filter: "Enrolled" },
  ];

  const routeMap: Record<string, string> = {
    Applied: "/admin/dashboard/receptionist/admissions/all",
    Interviewed: "/admin/dashboard/receptionist/admissions/interviews", // Or filter?
    Offered: "/admin/dashboard/receptionist/admissions/offers",
    Enrolled: "/admin/dashboard/receptionist/admissions/enrolled",
  };

  const handleNavigate = (step: any) => {
    // If we want to filter AllApplications list:
    // navigate("/admin/dashboard/receptionist/admissions/all?status=" + step.filter)
    // For now using simple routes if they exist, or fallback to All list
    navigate("/admin/dashboard/receptionist/admissions/all");
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
          {/* <option value="last">Last Month</option> */}
        </select>

      </div>

      {/* STEPS */}
      <div className="space-y-6">
        {dynamicSteps.map((step) => (
          <div
            key={step.id}
            onClick={() => handleNavigate(step)}
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
          <h4 className="text-2xl font-semibold text-gray-900">{getPercent(enrolledCount, appliedCount)}%</h4>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">{counts['Pending'] || 0}</h4>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">{counts['Interview Scheduled'] || 0}</h4>
          <p className="text-sm text-gray-500"> Interviews</p>
        </div>
      </div>
    </div>
  );
}
