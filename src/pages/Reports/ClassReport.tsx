import React, { useEffect, useState } from "react";
import { RefreshCcw, Download } from "lucide-react";
import { toast } from "react-toastify";
import { getClasses } from "../../service/classService";
import { getStudents } from "../../service/studentService";

type ClassRow = {
  id: string;
  class_name: string;
  section?: string;
  total_students?: number;
  capacity?: number;
  is_active?: boolean;
};

export default function ClassReport() {
  const [data, setData] = useState<ClassRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchReport(); }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const [classRes, studentRes] = await Promise.all([
        getClasses({ limit: 500 }),
        getStudents({ limit: 2000 }),
      ]);
      const classes = Array.isArray(classRes) ? classRes
        : Array.isArray(classRes?.rows) ? classRes.rows
        : Array.isArray(classRes?.data) ? classRes.data : [];
      const students = Array.isArray(studentRes) ? studentRes
        : Array.isArray(studentRes?.rows) ? studentRes.rows
        : Array.isArray(studentRes?.data) ? studentRes.data : [];

      const countMap: Record<string, number> = {};
      students.forEach((s: any) => {
        const cid = s.class_id ?? s.class;
        if (cid) countMap[cid] = (countMap[cid] ?? 0) + 1;
      });

      setData(classes.map((c: any) => ({
        id: c.id,
        class_name: c.class_name ?? c.name ?? "",
        section: c.section,
        capacity: c.capacity,
        total_students: countMap[c.id] ?? 0,
        is_active: c.is_active,
      })));
    } catch { toast.error("Failed to load class report"); }
    finally { setLoading(false); }
  };

  const filtered = data.filter(d =>
    (d.class_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (d.section ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = filtered.reduce((sum, r) => sum + (r.total_students ?? 0), 0);
  const totalClasses = filtered.length;
  const activeClasses = filtered.filter(r => r.is_active !== false).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Class</p>
        </div>
        <button onClick={fetchReport} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Classes", value: totalClasses, color: "bg-blue-50 text-blue-700" },
          { label: "Active Classes", value: activeClasses, color: "bg-green-50 text-green-700" },
          { label: "Total Students", value: totalStudents, color: "bg-purple-50 text-purple-700" },
        ].map(card => (
          <div key={card.label} className={`rounded-2xl border p-5 ${card.color}`}>
            <p className="text-sm font-medium opacity-75">{card.label}</p>
            <p className="text-3xl font-bold mt-1">{loading ? "—" : card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b">
          <input className="w-full max-w-xs border rounded-xl px-4 py-2 text-sm" placeholder="Search class or section..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["#", "Class", "Section", "Students", "Capacity", "Occupancy %", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No data found</td></tr>
              ) : filtered.map((row, i) => {
                const occ = row.capacity && row.capacity > 0
                  ? Math.min(100, Math.round(((row.total_students ?? 0) / row.capacity) * 100)) : null;
                return (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{row.class_name}</td>
                    <td className="px-5 py-3 text-gray-600">{row.section ?? "—"}</td>
                    <td className="px-5 py-3 text-gray-800 font-medium">{row.total_students ?? 0}</td>
                    <td className="px-5 py-3 text-gray-600">{row.capacity ?? "—"}</td>
                    <td className="px-5 py-3">
                      {occ !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${occ >= 90 ? "bg-red-400" : occ >= 70 ? "bg-yellow-400" : "bg-green-400"}`}
                              style={{ width: `${occ}%` }} />
                          </div>
                          <span className="text-xs text-gray-600">{occ}%</span>
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.is_active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {row.is_active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
