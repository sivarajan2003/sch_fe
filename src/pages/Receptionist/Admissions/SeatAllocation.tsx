import { Lock, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import classallocationService from "../../../service/classallocationService.js";
import { toast } from "react-toastify";

export default function SeatAllocation() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
            };
          }

          if (row.is_active) grouped[key].allocated += 1;
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
}) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3">{stream}</td>
      <td className="px-4 py-3">{quota}</td>
      <td className="px-4 py-3">{total}</td>
      <td className="px-4 py-3 text-blue-600">{allocated}</td>
      <td className="px-4 py-3">{available}</td>
      <td className="px-4 py-3">{percent}%</td>
      <td className="px-4 py-3">
        {locked ? <Lock size={16} /> : <Unlock size={16} />}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={onToggle}
          className="border px-3 py-1 rounded-lg"
        >
          {locked ? "Unlock" : "Lock"}
        </button>
      </td>
    </tr>
  );
}

function StatCard({ title, value, color = "text-gray-900" }) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-500">{title}</p>
    </div>
  );
}
