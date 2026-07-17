import React, { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { toast } from "react-toastify";
import { getAllLeaves } from "../../service/leaveService";

type LeaveRow = {
  id: string;
  employee_name?: string;
  leave_type?: string;
  start_date?: string;
  end_date?: string;
  days?: number;
  status?: string;
  reason?: string;
  department?: string;
};

export default function LeaveReport() {
  const [data, setData] = useState<LeaveRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  useEffect(() => { fetchLeaves(); }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await getAllLeaves();
      const rows = Array.isArray(res) ? res
        : Array.isArray(res?.rows) ? res.rows
        : Array.isArray(res?.data) ? res.data : [];
      setData(rows);
    } catch { toast.error("Failed to load leave report"); }
    finally { setLoading(false); }
  };

  const leaveTypes = Array.from(new Set(data.map(d => d.leave_type).filter(Boolean)));

  const filtered = data.filter(d => {
    const matchSearch = (d.employee_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (d.leave_type ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || d.status === statusFilter;
    const matchType = !typeFilter || d.leave_type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const approved = filtered.filter(d => d.status === "Approved").length;
  const pending = filtered.filter(d => d.status === "Pending").length;
  const rejected = filtered.filter(d => d.status === "Rejected").length;

  const statusColors: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leave Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Leave</p>
        </div>
        <button onClick={fetchLeaves} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: filtered.length, color: "bg-blue-50 text-blue-700" },
          { label: "Approved", value: approved, color: "bg-green-50 text-green-700" },
          { label: "Pending", value: pending, color: "bg-yellow-50 text-yellow-700" },
          { label: "Rejected", value: rejected, color: "bg-red-50 text-red-700" },
        ].map(card => (
          <div key={card.label} className={`rounded-2xl border p-5 ${card.color}`}>
            <p className="text-sm font-medium opacity-75">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{loading ? "—" : card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full border rounded-xl pl-8 pr-4 py-2 text-sm" placeholder="Search employee or type..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="border rounded-xl px-3 py-2 text-sm"
            value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            <option>Approved</option><option>Pending</option><option>Rejected</option>
          </select>
          {leaveTypes.length > 0 && (
            <select className="border rounded-xl px-3 py-2 text-sm"
              value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}>
              <option value="">All Types</option>
              {leaveTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["#", "Employee", "Leave Type", "Start Date", "End Date", "Days", "Status", "Reason"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No leave records found</td></tr>
                ) : paginated.map((row, i) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{row.employee_name ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{row.leave_type ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{row.start_date ? new Date(row.start_date).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{row.end_date ? new Date(row.end_date).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{row.days ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[row.status ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                        {row.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">{row.reason ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t text-sm text-gray-600">
                <span>Page {page} of {totalPages} — {filtered.length} records</span>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
