import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCcw,
  LayoutList,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import { getClasses, createClass, updateClass, deleteClass } from "../../service/classService";
import { getAcademicyears } from "../../service/academicyearService";

type Section = {
  id: string;
  class_name: string;
  section: string;
  academic_year_id?: string;
  capacity?: number;
  is_active?: boolean;
};

const EMPTY_FORM = {
  class_name: "",
  section: "",
  academic_year_id: "",
  capacity: "",
};

export default function SectionPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [academicYears, setAcademicYears] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Section | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchAcademicYears();
    fetchSections();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const res = await getAcademicyears({ limit: 200 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setAcademicYears(rows.map((y: any) => ({ id: y.id, name: y.name ?? y.year_name ?? y.academic_year })));
    } catch {
      // silently fail
    }
  };

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await getClasses({ limit: 500 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      // Expand rows by section — each class can have multiple sections
      const expanded: Section[] = [];
      rows.forEach((cls: any) => {
        const sectionList: string[] =
          Array.isArray(cls.sections)
            ? cls.sections
            : typeof cls.section === "string"
            ? cls.section.split(",").map((s: string) => s.trim()).filter(Boolean)
            : ["A"];

        sectionList.forEach((sec) => {
          expanded.push({
            id: `${cls.id}_${sec}`,
            class_name: cls.class_name ?? cls.name ?? "",
            section: sec,
            academic_year_id: cls.academic_year_id,
            capacity: cls.capacity,
            is_active: cls.is_active,
          });
        });
      });
      setSections(expanded);
    } catch {
      toast.error("Failed to load sections");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (s: Section) => {
    setEditItem(s);
    setForm({
      class_name: s.class_name,
      section: s.section,
      academic_year_id: s.academic_year_id ?? "",
      capacity: s.capacity?.toString() ?? "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.class_name || !form.section) {
      toast.error("Class name and section are required");
      return;
    }
    try {
      const payload = {
        class_name: form.class_name,
        section: form.section,
        academic_year_id: form.academic_year_id || undefined,
        capacity: form.capacity ? Number(form.capacity) : undefined,
      };
      if (editItem) {
        const classId = editItem.id.split("_")[0];
        await updateClass(classId, payload);
        toast.success("Section updated");
      } else {
        await createClass(payload);
        toast.success("Section created");
      }
      setShowModal(false);
      fetchSections();
    } catch {
      toast.error("Failed to save section");
    }
  };

  const handleDelete = async (item: Section) => {
    if (!window.confirm(`Delete section ${item.class_name} - ${item.section}?`)) return;
    try {
      const classId = item.id.split("_")[0];
      await deleteClass(classId);
      toast.success("Section deleted");
      fetchSections();
    } catch {
      toast.error("Failed to delete section");
    }
  };

  const filtered = sections.filter(
    (s) =>
      s.class_name.toLowerCase().includes(search.toLowerCase()) ||
      s.section.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutList className="w-7 h-7 text-blue-600" />
            Sections
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Dashboard / Academic / Section
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={16} />
          Add Section
        </button>
      </div>

      {/* SEARCH & REFRESH */}
      <div className="bg-white rounded-2xl border p-5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[220px]">
          <label className="text-xs font-medium text-gray-500 mb-1 block">Search</label>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm"
              placeholder="Search class or section..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
        <button
          onClick={fetchSections}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm"
        >
          <RefreshCcw size={15} />
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading...</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">#</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Class</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Section</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Capacity</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                      No sections found
                    </td>
                  </tr>
                ) : (
                  paginated.map((item, i) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-500">
                        {(currentPage - 1) * rowsPerPage + i + 1}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-800">{item.class_name}</td>
                      <td className="px-5 py-3 text-gray-600">{item.section}</td>
                      <td className="px-5 py-3 text-gray-600">{item.capacity ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.is_active !== false
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.is_active !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-3 flex items-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t text-sm text-gray-600">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
                  >
                    Prev
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {editItem ? "Edit Section" : "Add Section"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Class Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    placeholder="e.g. Grade 5"
                    value={form.class_name}
                    onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    placeholder="e.g. A"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Academic Year
                </label>
                <select
                  className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                  value={form.academic_year_id}
                  onChange={(e) => setForm({ ...form, academic_year_id: e.target.value })}
                >
                  <option value="">Select academic year</option>
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Capacity</label>
                <input
                  type="number"
                  className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                  placeholder="Max students"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
              >
                {editItem ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
