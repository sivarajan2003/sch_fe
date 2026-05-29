import { useState, useEffect } from "react";
import {
  RefreshCcw, Printer, LayoutGrid, List,
  Filter, CalendarDays, ArrowUpDown, MoreVertical,
  Eye, Pencil, Trash2,
} from "lucide-react";
import guardianService from "../../service/guardianService";
import toast from "react-hot-toast";

export default function GuardianPage() {
  const [guardians, setGuardians] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedGuardian, setSelectedGuardian] = useState<any>(null);

  useEffect(() => { fetchGuardians(); }, []);

  const fetchGuardians = async () => {
    setLoading(true);
    try {
      const res = await guardianService.getGuardians();
      const rows = res.rows ?? res.data ?? [];
      setGuardians(rows.map((r: any) => ({
        ...r,
        image: r.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`,
        added: r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—",
        child: { name: r.child_name || "—", image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.child_name || "C")}&background=random` },
      })));
    } catch {
      toast.error("Failed to load guardians");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    setGuardians(prev => [...prev].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    ));
    setSortOrder(s => s === "asc" ? "desc" : "asc");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await guardianService.deleteGuardian(deleteId);
      toast.success("Guardian deleted");
      setDeleteId(null);
      fetchGuardians();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async () => {
    if (!selectedGuardian) return;
    try {
      await guardianService.updateGuardian(selectedGuardian.id, selectedGuardian);
      toast.success("Guardian updated");
      setSelectedGuardian(null);
      fetchGuardians();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-xl px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Guardian</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / People / Guardian</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchGuardians} className="p-2 border rounded-lg hover:bg-gray-50"><RefreshCcw size={14} /></button>
            <button onClick={() => window.print()} className="p-2 border rounded-lg hover:bg-gray-50"><Printer size={14} /></button>
            <button className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50">Export</button>
          </div>
        </div>

        <div className="border-t" />

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Guardian {view === "grid" ? "Grid" : "List"}</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setOpenDate(p => !p)} className="flex items-center gap-2 text-xs text-gray-500 border px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <CalendarDays size={14} /> {startDate && endDate ? `${startDate} - ${endDate}` : "Date Range"}
              </button>
              {openDate && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3 z-30">
                  <label className="text-xs text-gray-500">Start</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded px-2 py-1 text-xs mb-2" />
                  <label className="text-xs text-gray-500">End</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded px-2 py-1 text-xs mb-2" />
                  <button onClick={() => setOpenDate(false)} className="w-full bg-blue-600 text-white text-xs py-1 rounded">Apply</button>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setOpenFilter(p => !p)} className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <Filter size={14} /> Filter
              </button>
              {openFilter && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-30">
                  {["All", "Active", "Inactive"].map(f => (
                    <button key={f} onClick={() => setOpenFilter(false)} className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">{f}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex border rounded-lg overflow-hidden">
              <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}><LayoutGrid size={14} /></button>
              <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}><List size={14} /></button>
            </div>

            <button onClick={handleSort} className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <ArrowUpDown size={14} /> Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-10 text-gray-400">Loading...</div>}

      {/* GRID */}
      {!loading && view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guardians.map(g => (
            <div key={g.id} className="bg-white border rounded-2xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between text-xs text-blue-600 mb-3">
                <span>{g.guardian_id || g.id}</span>
                <div className="relative">
                  <button onClick={() => setOpenMenuId(openMenuId === g.id ? null : g.id)} className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                  {openMenuId === g.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
                      <button onClick={() => { setSelectedGuardian(g); setMode("view"); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"><Eye size={14} /> View</button>
                      <button onClick={() => { setSelectedGuardian(g); setMode("edit"); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"><Pencil size={14} /> Edit</button>
                      <button onClick={() => { setDeleteId(g.id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img src={g.image} className="w-12 h-12 rounded-full object-cover" alt={g.name} />
                <div>
                  <h4 className="text-sm font-semibold">{g.name}</h4>
                  <p className="text-xs text-gray-500">Added on {g.added}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pb-3 border-b">
                <div><p className="text-gray-500 mb-1">Email</p><p className="font-medium truncate">{g.email}</p></div>
                <div><p className="text-gray-500 mb-1">Phone</p><p className="font-medium">{g.phone}</p></div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <img src={g.child.image} className="w-7 h-7 rounded-full" alt={g.child.name} />
                  <span className="text-xs font-medium">{g.child.name}</span>
                </div>
                <button onClick={() => { setSelectedGuardian(g); setMode("view"); }} className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">View Details</button>
              </div>
            </div>
          ))}
          {guardians.length === 0 && <p className="col-span-3 text-center py-10 text-gray-400">No guardians found</p>}
        </div>
      )}

      {/* LIST */}
      {!loading && view === "list" && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Child</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guardians.map(g => (
                <tr key={g.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-blue-600">{g.guardian_id || g.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2"><img src={g.image} className="w-8 h-8 rounded-full" alt={g.name} />{g.name}</td>
                  <td className="px-4 py-3 text-center">{g.email}</td>
                  <td className="px-4 py-3 text-center">{g.phone}</td>
                  <td className="px-4 py-3 text-center">{g.child.name}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => { setSelectedGuardian(g); setMode("view"); }} className="text-gray-500 hover:text-blue-600"><Eye size={16} /></button>
                      <button onClick={() => { setSelectedGuardian(g); setMode("edit"); }} className="text-gray-500 hover:text-green-600"><Pencil size={16} /></button>
                      <button onClick={() => setDeleteId(g.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">Delete Guardian?</h3>
            <p className="text-sm text-gray-500 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW / EDIT MODAL */}
      {selectedGuardian && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6 relative">
            <button onClick={() => setSelectedGuardian(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button>
            <h3 className="text-lg font-semibold mb-4">{mode === "view" ? "Guardian Details" : "Edit Guardian"}</h3>

            <div className="flex items-center gap-4 mb-4">
              <img src={selectedGuardian.image} className="w-14 h-14 rounded-full object-cover" alt={selectedGuardian.name} />
              <div>
                <p className="font-medium">{selectedGuardian.name}</p>
                <p className="text-sm text-gray-500">Added on {selectedGuardian.added}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                {mode === "view" ? <p className="font-medium">{selectedGuardian.email}</p> :
                  <input className="w-full border rounded px-2 py-1" value={selectedGuardian.email} onChange={e => setSelectedGuardian({ ...selectedGuardian, email: e.target.value })} />}
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                {mode === "view" ? <p className="font-medium">{selectedGuardian.phone}</p> :
                  <input className="w-full border rounded px-2 py-1" value={selectedGuardian.phone} onChange={e => setSelectedGuardian({ ...selectedGuardian, phone: e.target.value })} />}
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mt-4">
              <div className="flex items-center gap-3">
                <img src={selectedGuardian.child.image} className="w-8 h-8 rounded-full" alt={selectedGuardian.child.name} />
                <span className="text-sm font-medium">{selectedGuardian.child.name}</span>
              </div>
              <span className="text-xs text-gray-500">Child</span>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {mode === "edit" && <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">Save</button>}
              <button onClick={() => setSelectedGuardian(null)} className="px-4 py-2 text-sm border rounded-lg">{mode === "view" ? "Close" : "Cancel"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
