import { Lock, Unlock, X } from "lucide-react";
import { useState, useEffect } from "react";
import classallocationService from "../../../service/classallocationService.js";
import { toast } from "react-toastify";

export default function SeatAllocation() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewAllocated, setViewAllocated] = useState(null);

  // Filters
  const [streamFilter, setStreamFilter] = useState("All");
  const [quotaFilter, setQuotaFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FETCH DATA ================= */

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await classallocationService.getClassAllocations({
        page: 1,
        limit: 100,
      });

      if (res.success) {
        /**
         * Convert class allocation list → seat matrix
         * Assumption:
         * - Each class has a fixed capacity (example: 40)
         * - Allocated = number of active allocations
         */
        const grouped = {};

        res.rows.forEach((row) => {
          const key = row.class?.name || "Unknown";

          if (!grouped[key]) {
            grouped[key] = {
              stream: row.class?.name,
              quota: "General",
              total: 40,
              allocated: 0,
              status: "Active",
              students: []
            };
          }

          if (row.is_active) {
            grouped[key].allocated += 1;
            grouped[key].students.push({
              name: row.admission?.student_name || "Unknown",
              id: row.admission_id,
              admission_no: row.admission?.addmission_number || "N/A"
            });
          }
        });

        const matrix = Object.values(grouped).map((r) => ({
          ...r,
          available: r.total - r.allocated,
          percent: Math.round((r.allocated / r.total) * 100),
        }));

        setData(matrix);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load seat allocation data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTERING ================= */

  const filteredData = data.filter((row) => {
    if (streamFilter !== "All" && row.stream !== streamFilter) return false;
    if (quotaFilter !== "All" && row.quota !== quotaFilter) return false;
    if (statusFilter !== "All" && row.status !== statusFilter) return false;
    return true;
  });

  /* ================= LOCK (UI ONLY) ================= */

  const toggleLock = (index) => {
    // ⚠️ Backend lock not implemented yet
    setData((prev) =>
      prev.map((r, i) =>
        i === index
          ? { ...r, status: r.status === "Locked" ? "Active" : "Locked" }
          : r
      )
    );
  };

  /* ================= STATS ================= */

  const totalSeats = data.reduce((s, r) => s + r.total, 0);
  const totalAllocated = data.reduce((s, r) => s + r.allocated, 0);
  const totalAvailable = data.reduce((s, r) => s + r.available, 0);
  const avgUtilization = totalSeats
    ? Math.round((totalAllocated / totalSeats) * 100)
    : 0;

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6">
      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Filter
            label="Filter by Stream"
            value={streamFilter}
            options={["All", ...new Set(data.map((d) => d.stream))]}
            onChange={setStreamFilter}
          />
          <Filter
            label="Quota"
            value={quotaFilter}
            options={["All", "General"]}
            onChange={setQuotaFilter}
          />
          <Filter
            label="Status"
            value={statusFilter}
            options={["All", "Active", "Locked"]}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Seat Allocation Matrix</h2>

        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <Th>Class</Th>
              <Th>Quota</Th>
              <Th>Total</Th>
              <Th>Allocated</Th>
              <Th>Available</Th>
              <Th>Utilization</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <SeatRow
                  key={i}
                  {...row}
                  locked={row.status === "Locked"}
                  onToggle={() => toggleLock(i)}
                  onViewAllocated={() => setViewAllocated(row)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Seats" value={totalSeats} />
        <StatCard title="Allocated" value={totalAllocated} color="text-blue-600" />
        <StatCard title="Available" value={totalAvailable} color="text-green-600" />
        <StatCard title="Avg Utilization" value={`${avgUtilization}%`} color="text-orange-500" />
      </div>

      {/* REUSABLE MODAL FOR ALLOCATED STUDENTS */}
      {viewAllocated && (
        <div className="fixed inset-0 !mt-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-lg">
                Allocated Students - {viewAllocated.stream || "Class"}
              </h3>
              <button
                onClick={() => setViewAllocated(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {viewAllocated.students && viewAllocated.students.length > 0 ? (
                <ul className="space-y-2">
                  {viewAllocated.students.map((stu, idx) => (
                    <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                      <div>
                        <p className="font-medium text-gray-900">{stu.name}</p>
                        <p className="text-xs text-gray-500">{stu.admission_no || "No ID"}</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">Allocated</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No students allocated yet.
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setViewAllocated(null)}
                className="px-4 py-2 bg-white border rounded text-sm font-medium hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= HELPERS ================= */

function Filter({ label, value, options, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3 text-left">{children}</th>;
}

function SeatRow({
  stream,
  quota,
  total,
  allocated,
  available,
  percent,
  locked,
  onToggle,
  onViewAllocated
}) {
  // Progress bar color logic: < 50% Blue, < 80% Orange, >= 80% Red
  let progressColor = "bg-blue-500";
  if (percent >= 80) progressColor = "bg-red-500";
  else if (percent >= 50) progressColor = "bg-orange-500";

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 font-medium">{stream}</td>
      <td className="px-4 py-3 text-gray-500">{quota}</td>
      <td className="px-4 py-3 font-semibold">{total}</td>

      {/* Clickable Allocated Count */}
      <td className="px-4 py-3">
        <button
          onClick={onViewAllocated}
          className="text-blue-600 font-bold hover:underline hover:text-blue-800"
          title="View Allocated Students"
        >
          {allocated}
        </button>
      </td>

      <td className="px-4 py-3 text-green-600 font-semibold">{available}</td>

      {/* Visual Utilization Bar */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8">{percent}%</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        {locked ? <span className="flex items-center gap-1 text-red-500"><Lock size={14} /> Locked</span> : <span className="flex items-center gap-1 text-green-500"><Unlock size={14} /> Active</span>}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={onToggle}
          className={`border px-3 py-1 rounded text-xs font-medium transition-colors ${locked ? "bg-red-50 text-red-600 border-red-200" : "bg-white hover:bg-gray-100"}`}
        >
          {locked ? "Unlock" : "Lock"}
        </button>
      </td>
    </tr>
  );
}

function StatCard({ title, value, color = "text-gray-900" }) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}
