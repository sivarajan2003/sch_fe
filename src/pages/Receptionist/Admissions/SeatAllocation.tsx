import { Lock, Unlock, Filter as FilterIcon } from "lucide-react";
import { useState, useEffect } from "react";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function SeatAllocation() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // Filters
  const [streamFilter, setStreamFilter] = useState("All");
  const [quotaFilter, setQuotaFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await admissionService.getSeatAllocation();
      if (res.success) {
        // The API returns one row per class with breakdown.
        // We want to flatten this if possible, or just use it.
        // For now, we will use the class-level rows as the primary data
        // ignoring detailed quota breakdown for rows, effectively showing "General/Combined" usage.
        // If we want detailed quota rows, we'd need to assume quotas have specific sub-capacities, which we don't track.
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load seat data");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((row) => {
    if (streamFilter !== "All" && row.stream !== streamFilter) return false;
    // Quota filter acts on the primary quota of the row. Since we returned "General" by default in service, check that.
    // If we want to filter by if the class HAS a quota student, we'd check breakdown.
    // For now, simplify:
    if (quotaFilter !== "All" && row.quota !== quotaFilter) return false;
    if (statusFilter !== "All" && row.status !== statusFilter) return false;
    return true;
  });

  const toggleLock = (index: number) => {
    // Mock toggle - backend doesn't support locking yet
    setData(prev => prev.map((r, i) => i === index ? { ...r, status: r.status === 'Locked' ? 'Active' : 'Locked' } : r));
  };

  // Stats
  const totalSeats = data.reduce((sum, r) => sum + r.total, 0);
  const totalAllocated = data.reduce((sum, r) => sum + r.allocated, 0);
  const totalAvailable = data.reduce((sum, r) => sum + r.available, 0);
  const avgUtilization = totalSeats ? Math.round((totalAllocated / totalSeats) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Filter
            label="Filter by Stream"
            value={streamFilter}
            options={["All", ...Array.from(new Set(data.map(d => d.stream)))]}
            onChange={setStreamFilter}
          />
          <Filter
            label="Filter by Quota"
            value={quotaFilter}
            options={["All", "General"]} // Backend current supports only unified capacity
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

      {/* ================= SEAT MATRIX TABLE ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg font-semibold">Seat Allocation Matrix</h2>
          <div className="flex flex-wrap gap-2">
            <SummaryChip label="Total Seats" value={String(totalSeats)} />
            <SummaryChip label="Allocated" value={String(totalAllocated)} />
            <SummaryChip label="Available" value={String(totalAvailable)} />
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>Stream</Th>
                <Th>Quota</Th>
                <Th>Total Seats</Th>
                <Th>Allocated</Th>
                <Th>Available</Th>
                <Th>Utilization</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={8} className="p-4 text-center">Loading...</td></tr> : filteredData.map((row, i) => (
                <SeatRow
                  key={i}
                  stream={row.stream}
                  quota={row.quota}
                  total={row.total}
                  allocated={row.allocated}
                  available={row.available}
                  percent={row.percent}
                  locked={row.status === "Locked"}
                  onToggle={() => toggleLock(i)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE VIEW (Cards) */}
      <div className="md:hidden space-y-4">
        {filteredData.map((row, i) => (
          <div key={i} className="bg-white border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div><p className="font-semibold">{row.stream}</p><span className="text-xs border rounded-full px-2 py-0.5">{row.quota}</span></div>
              {row.status === "Locked" ? (
                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full"><Lock size={14} /> Locked</span>
              ) : (
                <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"><Unlock size={14} /> Active</span>
              )}
            </div>
            <div className="grid grid-cols-3 text-center text-sm">
              <div><p className="text-gray-500">Total</p><p className="font-medium">{row.total}</p></div>
              <div><p className="text-gray-500">Allocated</p><p className="font-medium text-blue-600">{row.allocated}</p></div>
              <div><p className="text-gray-500">Available</p><p className={`font-medium ${row.available <= 5 ? "text-red-500" : "text-green-600"}`}>{row.available}</p></div>
            </div>
            <div className="space-y-1">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${row.percent > 90 ? "bg-red-500" : "bg-orange-400"}`} style={{ width: `${row.percent}%` }} />
              </div>
              <p className="text-xs text-gray-500">Utilization: {row.percent}%</p>
            </div>
            <button onClick={() => toggleLock(i)} className={`w-full py-2 rounded-lg border text-sm font-medium ${row.status === "Locked" ? "border-blue-500 text-blue-600" : "border-red-500 text-red-600"}`}>
              {row.status === "Locked" ? "Unlock" : "Lock"}
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Seats" value={String(totalSeats)} />
        <StatCard title="Allocated" value={String(totalAllocated)} color="text-blue-600" />
        <StatCard title="Available" value={String(totalAvailable)} color="text-green-600" />
        <StatCard title="Avg. Utilization" value={`${avgUtilization}%`} color="text-orange-500" />
      </div>
    </div>
  );
}

// Helpers
function Filter({ label, value, options, onChange }: any) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border rounded-lg px-3 py-2">
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
function Th({ children }: any) { return <th className="text-left px-4 py-3 font-medium">{children}</th>; }
function Td({ children, className = "" }: any) { return <td className={`px-4 py-4 ${className}`}>{children}</td>; }

function SeatRow({ stream, quota, total, allocated, available, percent, locked, onToggle }: any) {
  return (
    <tr className="border-t">
      <Td>{stream}</Td>
      <Td><span className="px-3 py-1 text-xs border rounded-full">{quota}</span></Td>
      <Td>{total}</Td>
      <Td className="text-blue-600">{allocated}</Td>
      <Td className={available <= 5 ? "text-red-500" : "text-green-600"}>{available}</Td>
      <Td>
        <div className="flex items-center gap-3">
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${percent > 90 ? "bg-red-500" : "bg-orange-400"}`} style={{ width: `${percent}%` }} />
          </div>
          <span>{percent}%</span>
        </div>
      </Td>
      <Td>
        {locked ? <span className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-1"><Lock size={14} /> Locked</span> : <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1"><Unlock size={14} /> Active</span>}
      </Td>
      <Td>
        <button onClick={onToggle} className={`px-4 py-2 rounded-lg border transition ${locked ? "border-blue-500 text-blue-600 hover:bg-blue-50" : "border-red-500 text-red-600 hover:bg-red-50"}`}>
          {locked ? "Unlock" : "Lock"}
        </button>
      </Td>
    </tr>
  );
}

function SummaryChip({ label, value }: any) {
  return <span className="px-4 py-1 border rounded-full text-sm">{label}: <b>{value}</b></span>;
}

function StatCard({ title, value, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-gray-500 mt-1">{title}</p>
    </div>
  );
}
