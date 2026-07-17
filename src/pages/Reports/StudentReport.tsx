import React, { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { toast } from "react-toastify";
import { getStudents } from "../../service/studentService";
import { getClasses } from "../../service/classService";

type StudentRow = {
  id: string;
  name: string;
  class_name?: string;
  gender?: string;
  email?: string;
  number?: string;
  is_active?: boolean;
  date_of_birth?: string;
};

export default function StudentReport() {
  const [data, setData] = useState<StudentRow[]>([]);
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await getClasses({ limit: 500 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setClasses(rows.map((c: any) => ({ id: c.id, name: c.class_name ?? c.name ?? "" })));
    } catch {}
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents({ limit: 2000 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setData(rows.map((s: any) => ({
        id: s.id,
        name: s.name ?? s.student_name ?? `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim(),
        class_name: s.class_name ?? s.class ?? "",
        gender: s.gender,
        email: s.email,
        number: s.number ?? s.phone,
        is_active: s.is_active,
        date_of_birth: s.date_of_birth,
      })));
    } catch { toast.error("Failed to load student report"); }
    finally { setLoading(false); }
  };

  const filtered = data.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchClass = !classFilter || (s.class_name ?? "").toLowerCase().includes(classFilter.toLowerCase());
    const matchGender = !genderFilter || s.gender === genderFilter;
    return matchSearch && matchClass && matchGender;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const males = filtered.filter(s => s.gender === "Male").length;
  const females = filtered.filter(s => s.gender === "Female").length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Report</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Reports / Students</p>
        </div>
        <button onClick={fetchStudents} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Students", value: filtered.length, color: "bg-blue-50 text-blue-700" },
          { label: "Male", value: males, color: "bg-indigo-50 text-indigo-700" },
          { label: "Female", value: females, color: "bg-pink-50 text-pink-700" },
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
            <input className="w-full border rounded-xl pl-8 pr-4 py-2 text-sm" placeholder="Search student..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="border rounded-xl px-3 py-2 text-sm min-w-[150px]"
            value={classFilter} onChange={e => { setClassFilter(e.target.value); setPage(1); }}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select className="border rounded-xl px-3 py-2 text-sm"
            value={genderFilter} onChange={e => { setGenderFilter(e.target.value); setPage(1); }}>
            <option value="">All Genders</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["#", "Name", "Class", "Gender", "Email", "Phone", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400">No students found</td></tr>
                ) : paginated.map((s, i) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.class_name || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.gender ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.number ?? "—"}</td>
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
                <span>Page {page} of {totalPages} — {filtered.length} students</span>
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
