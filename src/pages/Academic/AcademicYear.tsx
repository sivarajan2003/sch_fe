import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// use the service instead of direct api calls
import {
  getAcademicyears,
  createAcademicyear,
  updateAcademicyear,
  deleteAcademicyear,
} from "../../service/academicyearService.js";

/* ================= DATA ================= */
interface AcademicYearType {
  id: string | number;
  year: string;
  start: string;
  end: string;
  current: "Yes" | "No";
  status: "Active" | "Inactive";
}

/* ================= PAGE ================= */
export default function AcademicYear() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.info("Login expired. Please login again.");
    return null;
  }
  const headerYear = localStorage.getItem("academicYear");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<AcademicYearType[]>([]);

  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingYear, setEditingYear] = useState<AcademicYearType | null>(null);
  const [form, setForm] = useState<{
    year: string;
    start: string;
    end: string;
    current: "Yes" | "No";
    status: "Active" | "Inactive";
  }>({
    year: "",
    start: "",
    end: "",
    current: "No",
    status: "Active",
  });
  const [yearSortAsc, setYearSortAsc] = useState(true);
  
  const [saving, setSaving] = useState(false);

  /* ACTIONS */
  const handleRefresh = () => {
    fetchAcademicYears();
  };
// STEP 1 – Load table data
useEffect(() => {
  fetchAcademicYears();
}, []);

// ✅ SINGLE SOURCE OF TRUTH FOR HEADER → POPUP


   const handlePrint = () => window.print();

  const sortByAcademicYear = () => {
    setData((prev) =>
      [...prev].sort((a, b) =>
        yearSortAsc ? a.year.localeCompare(b.year) : b.year.localeCompare(a.year)
      )
    );
    setYearSortAsc(!yearSortAsc);
  };


  const fetchAcademicYears = async () => {
  try {
    const res = await getAcademicyears();

    // ✅ backend always returns rows
    const rows = res?.rows ?? [];

    const mapped: AcademicYearType[] = rows.map((y: any) => ({
      id: y.id,
      year: y.yearsbyname,
      start: y.startdate,
      end: y.enddate,
      current: y.is_current ? "Yes" : "No", // safe even if missing
      status: y.is_active ? "Active" : "Inactive",
    }));

    setData(mapped);
  } catch (error) {
    console.error("Failed to load academic years", error);
  }
};


  const handleUpdateAcademicYear = async () => {
    if (!editingYear) return;

    // client-side validation
    if (!form.year || !form.start || !form.end) {
      toast.info("All fields are required");
      return;
    }
    if (new Date(form.start) > new Date(form.end)) {
      toast.info("Start date cannot be after End date");
      return;
    }

    try {
      const payload = {
        yearsbyname: form.year,
        startdate: new Date(form.start).toISOString().split("T")[0],
        enddate: new Date(form.end).toISOString().split("T")[0],
        is_current: form.current === "Yes",
        is_active: form.status === "Active",
      };

      await updateAcademicyear(editingYear.id, payload);

      setOpenEditModal(false);
      setEditingYear(null);
      setForm({
        year: "",
        start: "",
        end: "",
        current: "No",
        status: "Active",
      });
      fetchAcademicYears(); // reload from backend
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Update failed. See console for details.");
    }
  };

  const handleDeleteAcademicYear = async () => {
    if (!deleteId) return;

    try {
      await deleteAcademicyear(deleteId);
      setDeleteId(null);
      fetchAcademicYears(); // reload
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed. See console for details.");
    }
  };

  const handleAddAcademicYear = async () => {
    if (saving) return; 
  
    try {
      setSaving(true);
  
      // validation
      if (!form.year || !form.start || !form.end) {
        toast.info("All fields are required");
        return;
      }
  
      if (new Date(form.start) > new Date(form.end)) {
        toast.info("Start date cannot be after End date");
        return;
      }
  
      const payload = {
        yearsbyname: form.year,
        startdate: new Date(form.start).toISOString().split("T")[0],
        enddate: new Date(form.end).toISOString().split("T")[0],
        is_current: form.current === "Yes",
        is_active: form.status === "Active",
      };
  
      await createAcademicyear(payload); // ✅ ONE API CALL ONLY
  
      // close modal & reset
      setOpenAddModal(false);
      setForm({
        year: "",
        start: "",
        end: "",
        current: "No",
        status: "Active",
      });
      localStorage.setItem("academicYear", payload.yearsbyname);
      await fetchAcademicYears(); // reload once
    } catch (error: any) {
      console.error("Save failed", error);
      toast.info(
        error?.response?.data?.message ||
        error?.message ||
        "Save failed"
      );
    } finally {
      setSaving(false); // 🔓 unlock
    }
  };
  
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Academic Year</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / Academic / Academic Year</p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <RefreshCcw size={16} />
            </button>

            <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <Printer size={16} />
            </button>
            <button
              onClick={() => setOpenAddModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
            >
              <Plus size={14} />
              Add Academic Year
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Academic Year List</h3>
          <button
            onClick={sortByAcademicYear}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            <ArrowUpDown size={16} />
            Sort {yearSortAsc ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Academic Year</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((y, idx) => (

              <tr
                key={y.id}
                className="border-t hover:bg-blue-50 cursor-pointer"
                onClick={() => navigate(`/admin/dashboard/academic/academic-year/${y.id}`)}
              >
                {/* show serial number instead of id */}
                <td className="px-4 py-3">{idx + 1}</td>

                <td className="px-4 py-3">{y.year}</td>
                <td className="px-4 py-3">{y.start}</td>
                <td className="px-4 py-3">{y.end}</td>

                

                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">{y.status}</span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingYear(y);
                        setForm({
                          year: y.year,
                          start: y.start,
                          end: y.end,
                          current: y.current,
                          status: y.status,
                        });
                        setOpenEditModal(true);
                      }}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (y.current === "No") {
                          setDeleteId(y.id);
                        }
                      }}
                      disabled={y.current === "Yes"}
                      title={y.current === "Yes" ? "Current Academic Year cannot be deleted" : "Delete"}
                      className={`${
                        y.current === "Yes" ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-700"
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Add Academic Year</h3>
              <button onClick={() => setOpenAddModal(false)} className="text-gray-500 hover:text-red-500">
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-gray-500">Academic Year</label>
                <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Start Date</label>
                <input type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">End Date</label>
                <input type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Current Year</label>
                <select value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value as "Yes" | "No" })} className="w-full border rounded-lg px-3 py-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "Active" | "Inactive" })} className="w-full border rounded-lg px-3 py-2">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
            <button
  onClick={handleAddAcademicYear}
  disabled={saving}
  className={`px-4 py-2 rounded-lg text-sm text-white ${
    saving
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {saving ? "Saving..." : "Save"}
</button>


              <button onClick={() => setOpenAddModal(false)} className="px-4 py-2 border rounded-lg text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>

            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this Academic Year?</p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded-lg text-sm">
                Cancel
              </button>

              <button onClick={handleDeleteAcademicYear} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {openEditModal && editingYear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-5">Edit Academic Year</h3>

            {/* FORM */}
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-gray-500">Academic Year</label>
                <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Start Date</label>
                <input type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">End Date</label>
                <input type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>


              <div>
                <label className="text-gray-500">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "Active" | "Inactive" })} className="w-full border rounded-lg px-3 py-2">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setOpenEditModal(false)} className="px-4 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button onClick={handleUpdateAcademicYear} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
