import React, { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/client";

type GradeRow = {
  id: string;
  grade_name?: string;
  grade?: string;
  min_mark?: number;
  max_mark?: number;
  gpa?: number;
  remarks?: string;
  is_active?: boolean;
};

export default function GradeReport() {
  const [data, setData] = useState<GradeRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchGrades(); }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const res = await api.get("/school/grade", { params: { limit: 500 } });
      const rows = Array.isArray(res.data) ? res.data
        : Array.isArray(res.data?.rows) ? res.data.rows
        : Array.isArray(res.data?.data) ? res.data.data : [];
      setData(rows);
    } catch { toast.error("Failed to load grade report"); }
    finally { setLoading(false); }
  };

  const filtered = data.filter(g =>
    (g.grade_name ?? g.grade ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grade Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Grades</p>
        </div>
        <button onClick={fetchGrades} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 text-blue-700 rounded-2xl border p-5">
          <p className="text-sm font-medium opacity-75">Total Grades</p>
          <p className="text-3xl font-bold mt-1">{loading ? "—" : filtered.length}</p>
        </div>
        <div className="bg-green-50 text-green-700 rounded-2xl border p-5">
          <p className="text-sm font-medium opacity-75">Active Grades</p>
          <p className="text-3xl font-bold mt-1">{loading ? "—" : filtered.filter(g => g.is_active !== false).length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b">
          <input className="w-full max-w-xs border rounded-xl px-4 py-2 text-sm" placeholder="Search grade..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["#", "Grade", "Min Mark", "Max Mark", "GPA", "Remarks", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No grade data found</td></tr>
              ) : filtered.map((g, i) => (
                <tr key={g.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{g.grade_name ?? g.grade ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{g.min_mark ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{g.max_mark ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{g.gpa ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{g.remarks ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${g.is_active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {g.is_active !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
