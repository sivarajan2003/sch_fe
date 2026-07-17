import React, { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { toast } from "react-toastify";
import { getPayroll } from "../../service/payrollService";

type PayrollRow = {
  id: string;
  employee_name?: string;
  teacher_name?: string;
  name?: string;
  department?: string;
  designation?: string;
  basic_salary?: number;
  allowances?: number;
  deductions?: number;
  net_salary?: number;
  month?: string;
  year?: number;
  status?: string;
  payment_date?: string;
};

export default function PayrollReport() {
  const [data, setData] = useState<PayrollRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  useEffect(() => { fetchPayroll(); }, []);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const res = await getPayroll();
      const rows = Array.isArray(res.data) ? res.data
        : Array.isArray(res.data?.rows) ? res.data.rows
        : Array.isArray(res.data?.data) ? res.data.data : [];
      setData(rows);
    } catch { toast.error("Failed to load payroll report"); }
    finally { setLoading(false); }
  };

  const getName = (r: PayrollRow) => r.employee_name ?? r.teacher_name ?? r.name ?? "—";

  const filtered = data.filter(r => {
    const matchSearch = getName(r).toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalNet = filtered.reduce((s, r) => s + (r.net_salary ?? 0), 0);
  const paid = filtered.filter(r => r.status === "Paid").length;
  const unpaid = filtered.filter(r => r.status !== "Paid").length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payroll Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Payroll</p>
        </div>
        <button onClick={fetchPayroll} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Net Payout", value: `$${totalNet.toLocaleString()}`, color: "bg-blue-50 text-blue-700" },
          { label: "Paid", value: paid, color: "bg-green-50 text-green-700" },
          { label: "Unpaid / Pending", value: unpaid, color: "bg-orange-50 text-orange-700" },
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
            <input className="w-full border rounded-xl pl-8 pr-4 py-2 text-sm" placeholder="Search employee..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="border rounded-xl px-3 py-2 text-sm"
            value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            <option>Paid</option><option>Pending</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["#", "Employee", "Basic Salary", "Allowances", "Deductions", "Net Salary", "Month", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No payroll records found</td></tr>
                ) : paginated.map((r, i) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{getName(r)}</td>
                    <td className="px-4 py-3 text-gray-600">{r.basic_salary != null ? `$${r.basic_salary.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.allowances != null ? `$${r.allowances.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.deductions != null ? `$${r.deductions.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{r.net_salary != null ? `$${r.net_salary.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{r.month ?? (r.payment_date ? new Date(r.payment_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—")}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {r.status ?? "Pending"}
                      </span>
                    </td>
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
