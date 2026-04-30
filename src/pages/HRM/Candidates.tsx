//candidates.tsx
import {
  RefreshCcw,
  Plus,
  Filter,
  ArrowUpDown,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import hrService from "../../service/hrService";
import { toast } from "react-toastify";
import {
  Eye,        
  Pencil,     
  Trash2      
} from "lucide-react";
type Candidate = {
  id: string;  
  name: string;
  email: string;
  status: string;
};

const statusStyle = (status: string) => {
  switch (status) {
    case "Selected":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

export default function HRCandidatesDashboard() {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal, setEditModal] = useState(false);
const [editData, setEditData] = useState<any>(null);
const [viewModal, setViewModal] = useState(false);
const [viewData, setViewData] = useState<any>(null);
  // form
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "Interview",
  });

  useEffect(() => {
    loadCandidates();
  }, [currentPage, rowsPerPage, sortOrder, statusFilter]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const res = await hrService.getHR();
      setData(res?.data || []);
    } catch {
      console.log("LOAD ERROR:", err);
      toast.error("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async (e: any) => {
  e.preventDefault();

  // 🔥 ADD THIS BLOCK
  if (!form.name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (!form.email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!form.email.includes("@")) {
    toast.error("Enter valid email");
    return;
  }

  try {
    await hrService.createHR(form);
    toast.success("Candidate Added ✅");
    setForm({ name: "", email: "", status: "Interview" });
    loadCandidates();
  } catch (err: any) {
    console.log("ADD ERROR:", err?.response?.data);

    const errorData = err?.response?.data;

    if (errorData?.errors?.length) {
      toast.error(errorData.errors[0]);
    } else if (errorData?.message) {
      toast.error(errorData.message);
    } else {
      toast.error("Failed to add candidate");
    }
  }
};
  const handleSelect = async (id: string) => {
    try {
      await hrService.selectHR(id);
      toast.success("Converted to Teacher 🎉");
      loadCandidates();
    } catch {
      toast.error("Failed");
    }
  };
const handleUpdate = async () => {
  try {
    await hrService.updateHR(editData.id, editData);
    toast.success("Updated ✅");
    setEditModal(false);
    loadCandidates();
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    toast.error("Update failed");
  }
};
  const filteredData = data.filter((item) => {
  const text = search.toLowerCase();

  const matchesSearch =
    item.name.toLowerCase().includes(text) ||
    item.email.toLowerCase().includes(text);

  const matchesStatus =
    statusFilter === "All" || item.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
const handleView = (item: Candidate) => {
  setViewData(item);
  setViewModal(true);
};
const handleEdit = (item: Candidate) => {
  setEditData(item);
  setEditModal(true);
};

const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");

  if (!confirmDelete) return;

  try {
    await hrService.deleteHR(id);
    toast.success("Deleted ✅");
    loadCandidates();
  } catch (err) {
    console.log("DELETE ERROR:", err);
    toast.error("Delete failed");
  }
};
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    {/* LEFT */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        HR Candidates
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / Admin / Candidates
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
      <button
        onClick={loadCandidates}
        className="p-2.5 border rounded-lg hover:bg-gray-50"
      >
        <RefreshCcw size={16} />
      </button>
    </div>

  </div>
</div>
      {/* ================= FORM ================= */}
     <div className="bg-white border rounded-2xl p-6">
  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
  >
    <input
      placeholder="Name"
      className="border rounded-lg px-3 py-2 text-sm"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      placeholder="Email"
      className="border rounded-lg px-3 py-2 text-sm"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <select
      className="border rounded-lg px-3 py-2 text-sm"
      value={form.status}
      onChange={(e) =>
        setForm({ ...form, status: e.target.value })
      }
    >
      <option>Interview</option>
      <option>Selected</option>
      <option>Rejected</option>
    </select>

    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center justify-center gap-2">
      <Plus size={14} />
      Add Candidate
    </button>
  </form>
</div>
      {/* ================= SUB HEADER ================= */}
     <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">

  {/* TOP ROW */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    <h3 className="text-lg font-semibold text-gray-900">
      Candidates ({filteredData.length})
    </h3>

    <div className="flex items-center gap-3 flex-wrap">

      {/* FILTER */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        <option>All</option>
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      {/* SORT */}
      <button
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
      >
        <ArrowUpDown size={16} />
        Sort {sortOrder === "asc" ? "Oldest" : "Newest"}
      </button>

    </div>
  </div>

  {/* BOTTOM ROW */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">

    {/* LEFT */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      Row Per Page
      <select
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      Entries
    </div>

    {/* RIGHT */}
    <input
      type="text"
      placeholder="Search by name or email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60"
    />

  </div>

</div>
      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm hidden md:table">
          <thead className="bg-gray-50">
            <tr>
             <th className="px-4 py-3 text-left text-gray-600 text-xs uppercase">NAME</th>
             <th className="px-4 py-3 text-left text-gray-600 text-xs uppercase">EMAIL</th>
              <th className="px-4 py-3 text-left text-gray-600 text-xs uppercase">STATUS</th>
              <th className="px-4 py-3 text-center text-gray-600 text-xs uppercase">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  No Data
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${statusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                 <td className="p-3 text-center">
  <div className="flex items-center justify-center gap-3">
    
    {/* VIEW */}
    <button
      onClick={() => handleView(item)}
      className="text-gray-400 hover:text-blue-600 transition"
    >
      <Eye size={18} />
    </button>

    {/* EDIT */}
    <button
      onClick={() => handleEdit(item)}
      className="text-gray-400 hover:text-yellow-500 transition"
    >
      <Pencil size={18} />
    </button>

    {/* DELETE */}
    <button
      onClick={() => handleDelete(item.id)}
      className="text-gray-400 hover:text-red-600 transition"
    >
      <Trash2 size={18} />
    </button>

    {/* SELECT */}
    {item.status !== "Selected" && (
      <button
        onClick={() => handleSelect(item.id)}
        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
      >
        Select
      </button>
    )}

  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* MOBILE VIEW */}
        <div className="md:hidden p-3 space-y-3">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 space-y-2"
            >
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.email}</p>

              <span
                className={`px-2 py-1 text-xs rounded ${statusStyle(
                  item.status
                )}`}
              >
                {item.status}
              </span>

              {item.status !== "Selected" && (
                <button
                  onClick={() => handleSelect(item.id)}
                  className="bg-green-600 text-white w-full py-1 rounded"
                >
                  Select
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-end gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
      {editModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-80 space-y-4">

      <h2 className="text-lg font-semibold">Edit Candidate</h2>

      <input
        className="w-full border px-3 py-2 rounded"
        value={editData?.name}
        onChange={(e) =>
          setEditData({ ...editData, name: e.target.value })
        }
      />

      <input
        className="w-full border px-3 py-2 rounded"
        value={editData?.email}
        onChange={(e) =>
          setEditData({ ...editData, email: e.target.value })
        }
      />

      <select
        className="w-full border px-3 py-2 rounded"
        value={editData?.status}
        onChange={(e) =>
          setEditData({ ...editData, status: e.target.value })
        }
      >
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditModal(false)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{viewModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    {/* CARD */}
    <div className="bg-white w-[360px] rounded-2xl shadow-2xl p-6 
                    transform transition-all duration-300 scale-95 animate-fadeIn">

      {/* HEADER */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        👁 View Candidate
      </h2>

      {/* CONTENT */}
      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Name</span>
          <span className="font-medium text-gray-800">{viewData?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium text-gray-800">{viewData?.email}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status</span>
          <span className={`px-2 py-1 rounded text-xs ${statusStyle(viewData?.status)}`}>
            {viewData?.status}
          </span>
        </div>

      </div>

      {/* BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setViewModal(false)}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}