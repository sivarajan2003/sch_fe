import React, { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { toast } from "react-toastify";
import { getTeachers } from "../../service/teacherService";

type StaffRow = {
  id: string;
  name: string;
  email?: string;
  number?: string;
  desgination?: string;
  qualification?: string;
  gender?: string;
  hire_date?: string;
  salary?: number;
  is_active?: boolean;
};

export default function StaffReport() {
  const [data, setData] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await getTeachers({ limit: 500 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setData(rows);
    } catch { toast.error("Failed to load staff report"); }
    finally { setLoading(false); }
  };

  const filtered = data.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.desgination ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchGender = !genderFilter || s.gender === genderFilter;
    const matchStatus = !statusFilter
      || (statusFilter === "Active" && s.is_active !== false)
      || (statusFilter === "Inactive" && s.is_active === false);
    return matchSearch && matchGender && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalSalary = filtered.reduce((s, r) => s + (r.salary ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Staff</p>
        </div>
        <button onClick={fetchStaff} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Staff", value: filtered.length, color: "bg-blue-50 text-blue-700" },
          { label: "Active", value: filtered.filter(s => s.is_active !== false).length, color: "bg-green-50 text-green-700" },
          { label: "Total Salary", value: `$${totalSalary.toLocaleString()}`, color: "bg-purple-50 text-purple-700" },
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
            <input className="w-full border rounded-xl pl-8 pr-4 py-2 text-sm" placeholder="Search name, email, designation..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="border rounded-xl px-3 py-2 text-sm"
            value={genderFilter} onChange={e => { setGenderFilter(e.target.value); setPage(1); }}>
            <option value="">All Genders</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
          <select className="border rounded-xl px-3 py-2 text-sm"
            value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            <option>Active</option><option>Inactive</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["#", "Name", "Email", "Phone", "Designation", "Gender", "Hire Date", "Salary", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-400">No staff found</td></tr>
                ) : paginated.map((s, i) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.number ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.desgination ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.gender ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.hire_date ? new Date(s.hire_date).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.salary != null ? `$${s.salary.toLocaleString()}` : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.is_active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {s.is_active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t text-sm text-gray-600">
                <span>Page {page} of {totalPages} — {filtered.length} staff</span>
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
