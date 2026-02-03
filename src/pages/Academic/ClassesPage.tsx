import React, { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  Filter,
  ArrowUpDown,
  Plus,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddClassModal from "../../components/AddClassModal";
import {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} from "../../service/classService"; // adjust path if needed
import { getAcademicyears } from "../../service/academicyearService"; // adjust path if needed

/* ================= PAGE ================= */

export default function ClassesPage() {
  const STORAGE_KEY = "academic_classes_ui"; // local cache (optional)
  const navigate = useNavigate();

  // UI state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // academic years
  const [academicYears, setAcademicYears] = useState<{ id: string; name: string }[]>([]);
  const [yearsLoading, setYearsLoading] = useState(false);

  // modal & selection state
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [openEditClass, setOpenEditClass] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);

  // filters / pagination / sort
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // date picker UI
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("2020-05-15");
  const [endDate, setEndDate] = useState("2024-05-24");

  useEffect(() => {
    fetchAcademicYears();
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => setOpenDate(false);
    if (openDate) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [openDate]);

  // ---------- ACADEMIC YEARS ----------
  const fetchAcademicYears = async () => {
    try {
      setYearsLoading(true);
      const res = await getAcademicyears({ limit: 500 });
      // support multiple shapes
      let rows: any[] = [];
      if (Array.isArray(res)) rows = res;
      else if (Array.isArray(res?.rows)) rows = res.rows;
      else if (Array.isArray(res?.data)) rows = res.data;
      else rows = res?.rows ?? res?.data ?? res ?? [];

      const mapped = (rows || []).map((r: any) => ({
        id: r.id,
        name: r.yearsbyname ?? r.year ?? r.name ?? String(r.id),
      }));
      setAcademicYears(mapped);
    } catch (err) {
      console.error("Failed to fetch academic years", err);
    } finally {
      setYearsLoading(false);
    }
  };

  // ---------- CLASSES / API ----------
  const mapServerToUI = (rows: any[]): any[] =>
    rows.map((r: any) => {
      // find academic year name if id present
      const ayId = r.academicyear_id ?? r.academicyear?.id ?? r.academic_year_id ?? r.academicyear_id;
      let ayName = "";
      if (ayId) {
        const found = academicYears.find((y) => String(y.id) === String(ayId));
        ayName = found ? found.name : String(ayId);
      } else if (r.academicyear && (r.academicyear.yearsbyname || r.academicyear.year)) {
        ayName = r.academicyear.yearsbyname ?? r.academicyear.year;
      }

      return {
        id: r.id ?? r._id ?? `${r.name}-${Math.random().toString(36).slice(2, 7)}`,
        className: r.name ?? r.className ?? r.grade ?? "",
        section: r.section ?? "",
        students: typeof r.capacity === "number" ? r.capacity : Number(r.students ?? r.capacity ?? 0),
        subjects: r.subjects ?? 0,
        status: typeof r.is_active === "boolean" ? (r.is_active ? "Active" : "Inactive") : (r.status ?? "Active"),
        academicyear_id: ayId ?? null,
        academicyear_name: ayName,
        _raw: r,
      };
    });

  const fetchClasses = async (params: any = {}) => {
    try {
      setLoading(true);
      const res = await getClasses({ limit: 500, ...params });

      let rows: any[] = [];
      if (Array.isArray(res)) rows = res;
      else if (Array.isArray(res?.rows)) rows = res.rows;
      else if (Array.isArray(res?.data)) rows = res.data;
      else rows = res?.rows ?? res?.data ?? res ?? [];

      const mapped = Array.isArray(rows) ? mapServerToUI(rows) : [];
      setData(mapped);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
    } catch (err) {
      console.error("Failed to fetch classes", err);
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) setData(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const handleRefresh = () => {
    setStatusFilter("All");
    setSearch("");
    setCurrentPage(1);
    fetchClasses();
  };

  const handleExport = () => {
    const headers = ["S.No", "Class", "Section", "Students", "Academic Year", "Status"];
    const rows = data.map((c, i) => [i + 1, c.className, c.section, c.students, c.academicyear_name || "", c.status].join(","));
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "classes.csv";
    link.click();
  };

  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc" ? a.className.localeCompare(b.className) : b.className.localeCompare(a.className)
    );
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddClass = async (payload: { name: string; section: string; capacity: number; is_active?: boolean; academicyear_id?: string }) => {
    try {
      setLoading(true);
      // createClass expects payload fields like name, section, capacity, maybe academicyear_id
      await createClass(payload);
      await fetchClasses();
      setOpenAddClass(false);
      alert("Class created successfully");
    } catch (err) {
      console.error("Create class failed", err);
      alert("Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClass = async (id: string, payload: any) => {
    try {
      setLoading(true);
      await updateClass(id, payload);
      await fetchClasses();
      setOpenEditClass(false);
      setEditingClass(null);
      alert("Class updated");
    } catch (err) {
      console.error("Update class failed", err);
      alert("Failed to update class");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Confirm delete class? This cannot be undone.")) return;
    try {
      setLoading(true);
      await deleteClass(id);
      await fetchClasses();
      alert("Class deleted");
    } catch (err) {
      console.error("Delete class failed", err);
      alert("Failed to delete class");
    } finally {
      setLoading(false);
    }
  };

  // ---------- FILTER / PAGINATION UI ----------
  const filteredData = data
    .filter((c) => (statusFilter === "All" ? true : c.status === statusFilter))
    .filter((c) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        String(c.className).toLowerCase().includes(q) ||
        String(c.section).toLowerCase().includes(q) ||
        String(c.id).toLowerCase().includes(q) ||
        String(c.academicyear_name ?? "").toLowerCase().includes(q)
      );
    });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDownloadClass = (c: any) => {
    const headers = ["S.No", "Class", "Section", "Capacity (students)", "Academic Year", "Status"];
    const sno = data.findIndex((d) => d.id === c.id) + 1;
    const values = [sno, c.className, c.section, c.students, c.academicyear_name ?? "", c.status];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), values.join(",")].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Class_${c.className}_${c.section}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 px-3 sm:px-4 md:px-6">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Classes</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / Academic / Classes</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <RefreshCcw size={16} />
            </button>

            <button onClick={() => window.print()} className="p-2.5 border rounded-lg hover:bg-gray-50">
              <Printer size={16} />
            </button>

            <button onClick={handleExport} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
              Export
            </button>

            <button
              onClick={() => setOpenAddClass(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
            >
              <Plus size={14} /> Add Class
            </button>
          </div>
        </div>
      </div>

      {/* SUB HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Class List</h3>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDate(!openDate);
                }}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm w-full sm:w-auto"
              >
                <CalendarDays size={16} />
                {startDate} - {endDate}
              </button>

              {openDate && (
                <div onClick={(e) => e.stopPropagation()} className="absolute left-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-lg z-30 p-4">
                  <label className="text-sm text-gray-600 block mb-1">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-4" />
                  <label className="text-sm text-gray-600 block mb-1">End Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-4" />
                  <button onClick={() => setOpenDate(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">Apply</button>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setOpenFilter(!openFilter)} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                <Filter size={16} />
                Filter
              </button>

              {openFilter && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-20">
                  { ["All", "Active", "Inactive"].map((s) => (
                    <button key={s} onClick={() => { setStatusFilter(s as any); setOpenFilter(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      {s}
                    </button>
                  )) }
                </div>
              )}
            </div>

            <button onClick={handleSort} className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
              <ArrowUpDown size={16} />
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-600 ml-2">
              Row Per Page
              <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border rounded px-2 py-1">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <input type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="border rounded-lg px-4 py-2 text-sm w-full sm:w-60" />
          </div>
        </div>
      </div>

      {/* TABLE (desktop) */}
      <div className="bg-white border rounded-xl overflow-x-auto hidden lg:block">
        <div className="min-w-[900px]">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">No of Students</th>
                <th className="px-4 py-3">Academic Year</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((c, idx) => {
                const sno = (currentPage - 1) * rowsPerPage + idx + 1;
                return (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">{sno}</td>
                    <td className="px-4 py-3 text-center">{c.className}</td>
                    <td className="px-4 py-3 text-center">{c.section}</td>
                    <td className="px-4 py-3 text-center">{c.students}</td>
                    <td className="px-4 py-3 text-center">{c.academicyear_name || "-"}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${c.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button title="View" onClick={() => { setSelectedClass(c); setOpenViewModal(true); }} className="text-gray-600 hover:text-blue-600"><Eye size={18} /></button>

                        <button title="Edit" onClick={() => { setEditingClass(c); setOpenEditClass(true); }} className="text-gray-600 hover:text-green-600"><Pencil size={18} /></button>

                        <button title="Delete" onClick={() => handleDeleteClass(c.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="space-y-4 lg:hidden">
        {paginatedData.map((c, idx) => {
          const sno = (currentPage - 1) * rowsPerPage + idx + 1;
          return (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">{sno}</span>
                <span className={`px-3 py-1 text-xs rounded-full ${c.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{c.status}</span>
              </div>

              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Class:</span> <span className="font-medium">{c.className}</span></p>
                <p><span className="text-gray-500">Section:</span> <span className="font-medium">{c.section}</span></p>
                <p><span className="text-gray-500">Capacity:</span> <span className="font-medium">{c.students}</span></p>
                <p><span className="text-gray-500">Academic Year:</span> <span className="font-medium">{c.academicyear_name || "-"}</span></p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => { setSelectedClass(c); setOpenViewModal(true); }} className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"><Eye size={14} /> View</button>
                <button onClick={() => { setEditingClass(c); setOpenEditClass(true); }} className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm"><Pencil size={14} /> Edit</button>
                <button onClick={() => handleDeleteClass(c.id)} className="flex items-center justify-center gap-1 border rounded-lg py-2 text-sm text-red-600"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2 px-4 py-3 border-t text-sm">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border"}`}>{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
      </div>

      {/* ADD MODAL */}
      {openAddClass && <AddClassModal onClose={() => setOpenAddClass(false)} onAdd={handleAddClass} academicYears={academicYears} />}

      {/* VIEW */}
      {openViewModal && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Class Details</h3>
              <button onClick={() => setOpenViewModal(false)} className="text-gray-500 hover:text-red-500">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              {/* <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Class ID</span><span className="font-medium">{selectedClass.id}</span></div> */}
              <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Class</span><span className="font-medium">{selectedClass.className}</span></div>
              <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Section</span><span className="font-medium">{selectedClass.section}</span></div>
              <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Capacity</span><span className="font-medium">{selectedClass.students}</span></div>
              <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Academic Year</span><span className="font-medium">{selectedClass.academicyear_name || "-"}</span></div>
              <div className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50"><span className="text-gray-500">Status</span><span className={`px-3 py-1 text-xs rounded-full ${selectedClass.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{selectedClass.status}</span></div>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t">
              <button onClick={() => handleDownloadClass(selectedClass)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Download</button>
              <button onClick={() => setOpenViewModal(false)} className="px-4 py-2 border rounded-lg text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {openEditClass && editingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Edit Class</h3>
              <button onClick={() => setOpenEditClass(false)}>✕</button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-gray-500">Class (name)</label>
                <input value={editingClass.className} onChange={(e) => setEditingClass({ ...editingClass, className: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Section</label>
                <input value={editingClass.section} onChange={(e) => setEditingClass({ ...editingClass, section: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Capacity (students)</label>
                <input type="number" value={editingClass.students} onChange={(e) => setEditingClass({ ...editingClass, students: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="text-gray-500">Academic Year</label>
                <select value={editingClass.academicyear_id ?? editingClass.academicyear_id} onChange={(e) => setEditingClass({ ...editingClass, academicyear_id: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                  <option value="">-- Select academic year --</option>
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-500">Status</label>
                <select value={editingClass.status} onChange={(e) => setEditingClass({ ...editingClass, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setOpenEditClass(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
              <button onClick={() => {
                const payload = {
                  name: editingClass.className,
                  section: editingClass.section,
                  capacity: Number(editingClass.students),
                  is_active: editingClass.status === "Active",
                } as any;
                if (editingClass.academicyear_id) payload.academicyear_id = editingClass.academicyear_id;
                handleUpdateClass(editingClass.id, payload);
              }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
