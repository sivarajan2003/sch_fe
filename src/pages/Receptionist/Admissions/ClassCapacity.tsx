import { useState, useEffect } from "react";
import admissionDashboardService from "../../../service/admissiondashboardService";

export default function ClassCapacity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCapacity();
  }, []);

  /* ================= FETCH CAPACITY ================= */

  const fetchCapacity = async () => {
    try {
      const res = await admissionDashboardService.getClassCapacity();
      if (res.success) {
        // Backend already returns clean structure
        // {
        //   class_id,
        //   class_name,
        //   total,
        //   allocated,
        //   available,
        //   percent
        // }
        setData(
          res.data.map((item) => ({
            name: item.class_name,
            filled: item.allocated,
            total: item.total,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load class capacity", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const getBarColor = (percent) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 80) return "bg-orange-500";
    return "bg-green-500";
  };

  const totalEnrolled = data.reduce((sum, c) => sum + c.filled, 0);
  const totalCapacity = data.reduce((sum, c) => sum + c.total, 0);
  const totalAvailable = totalCapacity - totalEnrolled;

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-6 bg-white border rounded-2xl h-64 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Class Capacity
        </h3>
        <p className="text-sm text-gray-500">
          Current enrollment status
        </p>
      </div>

      {/* CLASSES */}
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">
            No class data available
          </p>
        ) : (
          data.map((c) => {
            const percent =
              c.total > 0
                ? Math.round((c.filled / c.total) * 100)
                : 0;
            const remaining = c.total - c.filled;

            return (
              <div key={c.name} className="space-y-2">
                {/* TITLE */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">
                    {c.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {c.filled} / {c.total}
                  </span>
                </div>

                {/* BAR */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getBarColor(
                      percent
                    )} transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* FOOT NOTE */}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    {percent}% filled
                  </span>

                  <span
                    className={`font-medium ${
                      remaining <= 5
                        ? "text-red-600"
                        : remaining <= 10
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {remaining} seats available
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <h4 className="text-3xl font-bold text-green-600">
            {totalEnrolled}
          </h4>
          <p className="text-sm text-green-700">
            Total Enrolled
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <h4 className="text-3xl font-bold text-blue-600">
            {totalAvailable}
          </h4>
          <p className="text-sm text-blue-700">
            Available Seats
          </p>
        </div>
      </div>
    </div>
  );
}
