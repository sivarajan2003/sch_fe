import { useState, useEffect } from "react";
import {
  RefreshCcw, Printer, LayoutGrid, List,
  Filter, CalendarDays, ArrowUpDown, MoreVertical,
  Eye, Pencil, Trash2, Plus,
} from "lucide-react";
import parentService from "../../service/parentService";
import toast from "react-hot-toast";

type Parent = {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  added: string;
  status: string;
  occupation: string;
  image: string;
};

export default function ParentsPage() {
  const [parentsData, setParentsData] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewParent, setViewParent] = useState<Parent | null>(null);
  const [editParent, setEditParent] = useState<Parent | null>(null);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  useEffect(() => { fetchParents(); }, []);

  const fetchParents = async () => {
    setLoading(true);
    try {
      const res = await parentService.getParents({ limit: 200 });
      const rows = res.rows ?? res.data ?? [];
      setParentsData(rows.map((r: any) => ({
        _id: r.id,
        id: r.id.substring(0, 8).toUpperCase(),
        name: r.name,
        email: r.email,
        phone: r.phone || "—",
        address: r.address || "—",
        added: r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—",
        status: r.is_active ? "Active" : "Inactive",
        occupation: r.occupation || "—",
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`,
      })));
    } catch {
      toast.error("Failed to load parents");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sorted = [...parentsData].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setParentsData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleExport = () => {
    const csv = "data:text/csv;charset=utf-8," +
      ["ID,Name,Email,Phone,Added,Status", ...parentsData.map(p => `${p.id},${p.name},${p.email},${p.phone},${p.added},${p.status}`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "parents.csv";
    link.click();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await parentService.deleteParent(deleteId);
      toast.success("Parent deleted");
      setDeleteId(null);
      fetchParents();
    } catch {
      toast.error("Failed to delete parent");
    }
  };

  const handleEditSave = async () => {
    if (!editParent) return;
    try {
      await parentService.updateParent(editParent._id, {
        name: editParent.name,
        email: editParent.email,
        phone: editParent.phone,
      });
      toast.success("Parent updated");
      setEditParent(null);
      fetchParents();
    } catch {
      toast.error("Failed to update parent");
    }
  };

  const filtered = parentsData.filter(p =>
    statusFilter === "All" || p.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-xl px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Parents</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / People / Parents</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchParents} className="p-2 border rounded-lg hover:bg-gray-50"><RefreshCcw size={14} /></button>
            <button onClick={() => window.print()} className="p-2 border rounded-lg hover:bg-gray-50"><Printer size={14} /></button>
            <button onClick={handleExport} className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50">Export</button>
          </div>
        </div>

        <div className="border-t" />

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Parents {view === "grid" ? "Grid" : "List"}</h3>
          <div className="flex items-center gap-2">
            {/* DATE */}
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

            {/* FILTER */}
            <div className="relative">
              <button onClick={() => setOpenFilter(p => !p)} className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <Filter size={14} /> Filter
              </button>
              {openFilter && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                  {(["All", "Active", "Inactive"] as const).map(s => (
                    <button key={s} onClick={() => { setStatusFilter(s); setOpenFilter(false); }} className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100">{s}</button>
                  ))}
                </div>
              )}
            </div>

            {/* VIEW TOGGLE */}
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

      {/* LOADING */}
      {loading && <div className="text-center py-10 text-gray-400">Loading...</div>}

      {/* GRID */}
      {!loading && view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p._id} className="bg-white border rounded-2xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between text-xs text-blue-600 mb-3">
                <span>{p.id}</span>
                <div className="relative">
                  <button onClick={() => setOpenMenuId(openMenuId === p._id ? null : p._id)} className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical size={16} className="text-gray-500" />
                  </button>
                  {openMenuId === p._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
                      <button onClick={() => { setViewParent(p); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"><Eye size={14} /> View</button>
                      <button onClick={() => { setEditParent(p); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"><Pencil size={14} /> Edit</button>
                      <button onClick={() => { setDeleteId(p._id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img src={p.image} className="w-10 h-10 rounded-full object-cover" alt={p.name} />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{p.name}</h4>
                  <p className="text-xs text-gray-500">Added on {p.added}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pb-3 border-b">
                <div><p className="text-gray-500 mb-1">Email</p><p className="font-medium truncate">{p.email}</p></div>
                <div><p className="text-gray-500 mb-1">Phone</p><p className="font-medium">{p.phone}</p></div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{p.status}</span>
                <button onClick={() => setSelectedParent(p)} className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">View Details</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="col-span-3 text-center py-10 text-gray-400">No parents found</p>}
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
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-blue-600">{p.id}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={p.image} className="w-8 h-8 rounded-full" alt={p.name} />
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-center">{p.email}</td>
                  <td className="px-4 py-3 text-center">{p.phone}</td>
                  <td className="px-4 py-3 text-center">{p.added}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${p.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setViewParent(p)} className="text-gray-500 hover:text-blue-600"><Eye size={16} /></button>
                      <button onClick={() => setEditParent(p)} className="text-gray-500 hover:text-green-600"><Pencil size={16} /></button>
                      <button onClick={() => setDeleteId(p._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h3 className="text-lg font-semibold mb-2">Delete Parent?</h3>
            <p className="text-sm text-gray-500 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewParent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6">
            <h3 className="text-lg font-semibold mb-4">Parent Details</h3>
            <div className="flex items-center gap-4 mb-4">
              <img src={viewParent.image} className="w-14 h-14 rounded-full" alt={viewParent.name} />
              <div>
                <p className="font-medium">{viewParent.name}</p>
                <p className="text-sm text-gray-500">Added on {viewParent.added}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-500">Email</p><p className="font-medium">{viewParent.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{viewParent.phone}</p></div>
              <div><p className="text-gray-500">Address</p><p className="font-medium">{viewParent.address}</p></div>
              <div><p className="text-gray-500">Occupation</p><p className="font-medium">{viewParent.occupation}</p></div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setViewParent(null)} className="px-4 py-2 text-sm border rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editParent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Parent</h3>
            <div className="space-y-3">
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Name" value={editParent.name} onChange={e => setEditParent({ ...editParent, name: e.target.value })} />
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Email" value={editParent.email} onChange={e => setEditParent({ ...editParent, email: e.target.value })} />
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Phone" value={editParent.phone} onChange={e => setEditParent({ ...editParent, phone: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditParent(null)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              <button onClick={handleEditSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedParent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6 relative">
            <button onClick={() => setSelectedParent(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button>
            <div className="flex items-center gap-4 mb-5">
              <img src={selectedParent.image} className="w-14 h-14 rounded-full object-cover" alt={selectedParent.name} />
              <div>
                <h3 className="text-lg font-semibold">{selectedParent.name}</h3>
                <p className="text-sm text-gray-500">Added on {selectedParent.added}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Email</p><p className="font-medium">{selectedParent.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{selectedParent.phone}</p></div>
              <div><p className="text-gray-500">Address</p><p className="font-medium">{selectedParent.address}</p></div>
              <div><p className="text-gray-500">Status</p><span className={`text-xs px-2 py-0.5 rounded-full ${selectedParent.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{selectedParent.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
