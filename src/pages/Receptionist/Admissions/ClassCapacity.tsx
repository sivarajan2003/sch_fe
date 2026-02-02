export default function ClassCapacity() {
  const classes = [
    { name: "Nursery", filled: 28, total: 30 },
    { name: "Grade 1", filled: 78, total: 90 },
    { name: "Grade 2", filled: 85, total: 90 },
    { name: "Grade 3", filled: 56, total: 60 },
  ];

  const getBarColor = (percent: number) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 80) return "bg-orange-500";
    return "bg-green-500";
  };

  const totalEnrolled = classes.reduce((a, b) => a + b.filled, 0);
  const totalCapacity = classes.reduce((a, b) => a + b.total, 0);
  const totalAvailable = totalCapacity - totalEnrolled;

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
      <div className="space-y-6">
        {classes.map((c) => {
          const percent = Math.round((c.filled / c.total) * 100);
          const remaining = c.total - c.filled;

          return (
            <div key={c.name} className="space-y-2">
              
              {/* TITLE ROW */}
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
                  className={`h-full rounded-full ${getBarColor(percent)} transition-all duration-700`}
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
        })}
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
