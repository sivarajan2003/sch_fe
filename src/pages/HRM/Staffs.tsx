import React, { useEffect, useState } from "react";
import { Users, Plus, Pencil, Trash2, RefreshCcw, Search, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from "../../service/teacherService";

type Staff = {
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

const EMPTY: Omit<Staff, "id"> = {
  name: "", email: "", number: "", desgination: "",
  qualification: "", gender: "Male", hire_date: "", salary: undefined, is_active: true,
};

export default function Staffs() {
  const [data, setData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState<Staff | null>(null);
  const [editItem, setEditItem] = useState<Staff | null>(null);
  const [form, setForm] = useState<Omit<Staff, "id">>(EMPTY);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => { fetchStaffs(); }, []);

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const res = await getTeachers({ limit: 500 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setData(rows);
    } catch { toast.error("Failed to load staff"); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (s: Staff) => {
    setEditItem(s);
    setForm({ name: s.name, email: s.email ?? "", number: s.number ?? "", desgination: s.desgination ?? "",
      qualification: s.qualification ?? "", gender: s.gender ?? "Male",
      hire_date: s.hire_date?.slice(0, 10) ?? "", salary: s.salary, is_active: s.is_active ?? true });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name) { toast.error("Name is required"); return; }
    try {
      if (editItem) { await updateTeacher(editItem.id, form); toast.success("Staff updated"); }
      else { await createTeacher(form); toast.success("Staff added"); }
      setShowModal(false); fetchStaffs();
    } catch { toast.error("Failed to save staff"); }
  };

  const handleDelete = async (s: Staff) => {
    if (!window.confirm(`Delete ${s.name}?`)) return;
    try { await deleteTeacher(s.id); toast.success("Staff deleted"); fetchStaffs(); }
    catch { toast.error("Failed to delete"); }
  };

  const filtered = data.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.desgination?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" /> Staffs
          </h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard / HRM / Staffs</p>
        </div>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium">
          <Plus size={16} /> Add Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[220px]">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm" placeholder="Search name, email, designation..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>
        <button onClick={fetchStaffs} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <RefreshCcw size={15} /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["#","Name","Email","Phone","Designation","Gender","Status","Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400">No staff found</td></tr>
                ) : paginated.map((s, i) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.email ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.number ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.desgination ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{s.gender ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.is_active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {s.is_active !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-1.5">
                      <button onClick={() => setViewItem(s)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><Eye size={14} /></button>
                      <button onClick={() => openEdit(s)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(s)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t text-sm text-gray-600">
                <span>Page {page} of {totalPages} — {filtered.length} total</span>
                <div className="flex gap-2">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50">Prev</button>
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Staff Details</h2>
              <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[["Name", viewItem.name], ["Email", viewItem.email], ["Phone", viewItem.number],
                ["Designation", viewItem.desgination], ["Qualification", viewItem.qualification],
                ["Gender", viewItem.gender], ["Hire Date", viewItem.hire_date], ["Salary", viewItem.salary]
              ].map(([label, val]) => val ? (
                <div key={label as string} className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{String(val)}</span>
                </div>
              ) : null)}
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">{editItem ? "Edit Staff" : "Add Staff"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Name <span className="text-red-500">*</span></label>
                  <input className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="Full name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input type="email" className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="email@school.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <input className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="+1 000 000 0000"
                    value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Designation</label>
                  <input className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Librarian"
                    value={form.desgination} onChange={e => setForm({ ...form, desgination: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Qualification</label>
                  <input className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. B.Sc."
                    value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Gender</label>
                  <select className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Hire Date</label>
                  <input type="date" className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    value={form.hire_date} onChange={e => setForm({ ...form, hire_date: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Salary</label>
                  <input type="number" className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm" placeholder="0.00"
                    value={form.salary ?? ""} onChange={e => setForm({ ...form, salary: e.target.value ? Number(e.target.value) : undefined })} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSubmit} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium">
                {editItem ? "Update" : "Add Staff"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
