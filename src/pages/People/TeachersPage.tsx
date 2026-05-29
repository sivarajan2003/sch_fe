import React, { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Mail,
  Phone,
  Plus,
  Eye,
  Pencil,
  CalendarDays,
  Trash2,
} from "lucide-react";

import AddTeacherModal from "../../components/AddTeacherModal";
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher as apiDeleteTeacher,
} from "../../service/teacherService.js";

/* ================= TYPES ================= */
type Teacher = {
  id: string;
  name: string;
  address?: string;
  date_of_birth?: string; // 'YYYY-MM-DD' or ISO
  gender?: "Male" | "Female" | "Other";
  number?: string;
  email?: string;
  qualification?: string;
  image?: string | null;
  hire_date?: string | null;
  subjects?: string[] | Record<string, any> | null;
  desgination?: string | null;
  salary?: number | null;
  is_active?: boolean;
  // fallback UI props
  class?: string;
  subject?: string;
  phone?: string;
  status?: "Active" | "Inactive";
};

/* ================= PAGE ================= */
export default function TeachersPage() {
  //const isLocked = true; // 🔒 enable full blur lock
  const userRole = "Admin"; //  change dynamically later
  const isLocked = userRole !== "Admin"; //  Admin bypass lock
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Login expired. Please login again.");
    return null;
  }

  const [openAddTeacher, setOpenAddTeacher] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">(
    "All"
  );

  const [view, setView] = useState<"grid" | "table">("grid");
  const [data, setData] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openDate, setOpenDate] = useState(false);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacherModal, setDeleteTeacherModal] = useState<Teacher | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  /* LOAD TEACHERS */
  const fetchTeachers = async (opts: { page?: number; limit?: number } = {}) => {
    try {
      setLoading(true);
      const params: any = {
        page: opts.page ?? 1,
        limit: opts.limit ?? 100, // fetch plenty — you can add pagination later
      };

      // date filters
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      // status filter
      if (statusFilter === "Active") params.is_active = true;
      else if (statusFilter === "Inactive") params.is_active = false;

      const res = await getTeachers(params);
      // backend may return { rows: [...], count, page } OR { data: [...] }
      const rows: any[] = res?.rows ?? res?.data ?? res?.items ?? [];
      // map to UI-friendly shape
      const mapped: Teacher[] = Array.isArray(rows)
        ? rows.map((r: any) => ({
            id: r.id,

            // API does not send name/email/phone/dob/gender in your sample response,
            // so we provide safe fallbacks without changing the rest of the UI.
            name: r.name || r.desgination || "Teacher",
            address: r.address || "N/A",
            date_of_birth: r.date_of_birth
              ? typeof r.date_of_birth === "string"
                ? r.date_of_birth.split("T")[0]
                : new Date(r.date_of_birth).toISOString().split("T")[0]
              : "",
            gender: r.gender || "Other",
            number: r.number || "",
            email: r.email || "",
            qualification: r.qualification || "",
            image:
              r.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                r.desgination || "Teacher"
              )}&background=random`,
            hire_date: r.hire_date
              ? new Date(r.hire_date).toISOString().split("T")[0]
              : "",
            subjects: r.subjects,
            desgination: r.desgination || "",
            salary: r.salary ?? null,
            is_active:
              typeof r.is_active === "boolean" ? r.is_active : r.is_active === 1,
            // UI fallbacks
            class: "—",
            subject: Array.isArray(r.subjects)
              ? r.subjects.join(", ") || "—"
              : r.subjects || "—",
            phone: r.number || "",
            status:
              (typeof r.is_active === "boolean"
                ? r.is_active
                : r.is_active === 1)
                ? "Active"
                : "Inactive",
          }))
        : [];
      setData(mapped);
    } catch (err) {
      console.error("Failed to load teachers", err);
      alert("Failed to load teachers. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // set default date range: past 30 days
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);
    setStartDate(past.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  }, []);

  // refetch when filters change
  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, startDate, endDate]);

  /* SORT */
  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setData(sorted);
    setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
  };

  /* EXPORT (all current rows) */
  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Address",
      "DateOfBirth",
      "Gender",
      "Number",
      "Email",
      "Qualification",
      "Designation",
      "Salary",
      "HireDate",
      "Status",
    ];
    const rows = data.map((t) =>
      [
        t.id,
        t.name,
        t.address ?? "",
        t.date_of_birth ?? "",
        t.gender ?? "",
        t.number ?? "",
        t.email ?? "",
        t.qualification ?? "",
        t.desgination ?? "",
        t.salary ?? "",
        t.hire_date ?? "",
        t.status ?? (t.is_active ? "Active" : "Inactive"),
      ].join(",")
    );
    const csv =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "teachers.csv";
    link.click();
  };

  /* CREATE */
  const handleCreateTeacher = async (payload: any) => {
    try {
      setLoading(true);
      // ensure date format
      if (payload.date_of_birth) {
        payload.date_of_birth = new Date(payload.date_of_birth)
          .toISOString()
          .split("T")[0];
      }
      const res = await createTeacher(payload);
      // backend may return created object inside res.data or res
      const created = res?.data ?? res;
      // refresh list (safer)
      await fetchTeachers();
      setOpenAddTeacher(false);
    } catch (err: any) {
      console.error("Create teacher failed", err);
      alert(err?.response?.data?.message ?? err?.message ?? "Create failed");
    } finally {
      setLoading(false);
    }
  };

  /* UPDATE */
  const handleSaveEdit = async () => {
    if (!editTeacher) return;
    try {
      setLoading(true);
      const payload: any = {
        name: editTeacher.name,
        address: editTeacher.address,
        date_of_birth: editTeacher.date_of_birth,
        gender: editTeacher.gender,
        number: editTeacher.number,
        email: editTeacher.email,
        qualification: editTeacher.qualification,
        // other optional fields as needed...
      };
      await updateTeacher(editTeacher.id, payload);
      await fetchTeachers();
      setEditTeacher(null);
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */
  const handleConfirmDelete = async () => {
    if (!deleteTeacherModal) return;
    try {
      setLoading(true);
      await apiDeleteTeacher(deleteTeacherModal.id);
      // optimistic update or refetch
      setData((prev) => prev.filter((t) => t.id !== deleteTeacherModal.id));
      setDeleteTeacherModal(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  /* DOWNLOAD single teacher CSV */
  const downloadTeacherCSV = (teacher: Teacher) => {
    const headers = [
      "ID",
      "Name",
      "Address",
      "DateOfBirth",
      "Gender",
      "Number",
      "Email",
      "Qualification",
      "Designation",
      "Salary",
      "HireDate",
      "Status",
    ];
    const row = [
      teacher.id,
      teacher.name,
      teacher.address ?? "",
      teacher.date_of_birth ?? "",
      teacher.gender ?? "",
      teacher.number ?? "",
      teacher.email ?? "",
      teacher.qualification ?? "",
      teacher.desgination ?? "",
      teacher.salary ?? "",
      teacher.hire_date ?? "",
      teacher.status ?? (teacher.is_active ? "Active" : "Inactive"),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${teacher.name}.csv`;
    link.click();
  };

  /* filter by UI status label */
  const filteredData =
    statusFilter === "All"
      ? data
      : data.filter(
          (t) =>
            (t.status ?? (t.is_active ? "Active" : "Inactive")) === statusFilter
        );

  return (
    <div className="relative">
      {/* 🔒 FULL PAGE BLUR LOCK */}
      {isLocked && (
        <div
          className="
        absolute inset-0 z-50
        bg-white/40
        backdrop-blur-xl
        flex items-center justify-center
        rounded-xl
      "
        >
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
            <p className="text-sm font-semibold text-gray-800">
              Subscription Upgrade Required — Contact Atelier Creation
            </p>

            <button
              onClick={() => (window.location.href = "tel:+919999999999")}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg"
            >
              📞 Call Atelier
            </button>
          </div>
        </div>
      )}

      {/* ===== ORIGINAL CONTENT WRAPPER ===== */}
      <div className={`space-y-6 ${isLocked ? "pointer-events-none select-none" : ""}`}>
        {/* ================= HEADER + SUBHEADER ================= */}
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Teachers</h2>
              <p className="text-sm text-gray-500 mt-1">Dashboard / People / Teachers</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchTeachers()}
                className="p-2 border rounded-lg hover:bg-gray-50"
              >
                <RefreshCcw size={14} />
              </button>

              <button
                onClick={() => window.print()}
                className="p-2 border rounded-lg hover:bg-gray-50"
              >
                <Printer size={14} />
              </button>

              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50"
              >
                Export
              </button>

              <button
                onClick={() => setOpenAddTeacher(true)}
                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg font-medium"
              >
                Add Teacher
              </button>
            </div>
          </div>

          <div className="border-t" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-semibold text-gray-900">Teachers Grid</h4>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setOpenDate((p) => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs text-gray-500 hover:bg-gray-50"
                >
                  <CalendarDays size={14} />
                  {startDate} - {endDate}
                </button>

                {openDate && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-3 z-30">
                    <label className="text-xs text-gray-500">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-xs mb-2"
                    />

                    <label className="text-xs text-gray-500">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-xs mb-3"
                    />

                    <div className="flex justify-between">
                      <button
                        onClick={() => setOpenDate(false)}
                        className="text-xs text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setOpenDate(false);
                          fetchTeachers();
                        }}
                        className="text-xs text-blue-600 font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setOpenFilter((p) => !p)}
                  className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs hover:bg-gray-50"
                >
                  <Filter size={14} />
                  Filter
                </button>

                {openFilter && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg p-2 z-20">
                    {["All", "Active", "Inactive"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setStatusFilter(s as any);
                          setOpenFilter(false);
                        }}
                        className="block w-full text-left px-3 py-1.5 text-xs rounded hover:bg-gray-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 ${
                    view === "grid" ? "bg-blue-600 text-white" : "text-gray-600"
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`p-2 ${
                    view === "table" ? "bg-blue-600 text-white" : "text-gray-600"
                  }`}
                >
                  <List size={14} />
                </button>
              </div>

              <button
                onClick={handleSort}
                className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-xs hover:bg-gray-50"
              >
                <ArrowUpDown size={14} /> Sort By A-Z
              </button>
            </div>
          </div>
        </div>

        {/* ================= GRID VIEW ================= */}
        {view === "grid" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.slice(0, visibleCount).map((t) => (
                <div
                  key={t.id}
                  className="bg-white border rounded-2xl p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
                >
                  <div className="flex justify-between items-center border-b pb-3 mb-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        t.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.status}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === t.id ? null : t.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === t.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-20">
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              setViewTeacher(t);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                          >
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              setEditTeacher(t);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                          >
                            <Pencil size={14} /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              setDeleteTeacherModal(t);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3 px-1">
                    <img
                      src={t.image ?? `https://i.pravatar.cc/150?u=${t.id}`}
                      className="w-10 h-10 rounded-full"
                      alt={t.name}
                    />
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                    </div>
                  </div>

                  <div className="border-t border-b py-3 text-xs text-gray-600 space-y-1 mb-3">
                    <p className="flex gap-1 items-center">
                      <Mail size={12} /> {t.email || "N/A"}
                    </p>
                    <p className="flex gap-1 items-center">
                      <Phone size={12} /> {(t.number ?? t.phone) || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-1 bg-gray-50 rounded-lg px-3 py-2 mb-3 text-xs text-gray-600">
                    <p>
                      <b>Designation:</b> {t.desgination || "—"}
                    </p>
                    <p>
                      <b>Qualification:</b> {t.qualification || "—"}
                    </p>
                    <p>
                      <b>Salary:</b> {t.salary != null ? `₹${t.salary}` : "—"}
                    </p>
                    <p>
                      <b>Hire Date:</b> {t.hire_date || "—"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600">
                      {t.qualification ?? "—"}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedTeacher(t);
                        setOpenDetails(true);
                      }}
                      className="text-xs bg-gray-200 px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredData.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((v) => v + 4)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= DETAILS MODAL (small) ================= */}
        {openDetails && selectedTeacher && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[400px] p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    selectedTeacher.image ??
                    `https://i.pravatar.cc/150?u=${selectedTeacher.id}`
                  }
                  className="w-14 h-14 rounded-full"
                  alt={selectedTeacher.name}
                />
                <div>
                  <h3 className="font-semibold">{selectedTeacher.name}</h3>
                </div>
              </div>

              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <b>Email:</b> {selectedTeacher.email || "N/A"}
                </p>
                <p>
                  <b>Phone:</b> {(selectedTeacher.number ?? selectedTeacher.phone) || "N/A"}
                </p>
                <p>
                  <b>Status:</b> {selectedTeacher.status}
                </p>
                <p>
                  <b>Qualification:</b> {selectedTeacher.qualification || "N/A"}
                </p>
                <p>
                  <b>Designation:</b> {selectedTeacher.desgination || "N/A"}
                </p>
                <p>
                  <b>Salary:</b>{" "}
                  {selectedTeacher.salary != null ? `₹${selectedTeacher.salary}` : "N/A"}
                </p>
                <p>
                  <b>Hire Date:</b> {selectedTeacher.hire_date || "N/A"}
                </p>
                <p>
                  <b>DOB:</b> {selectedTeacher.date_of_birth || "N/A"}
                </p>
                <p>
                  <b>Gender:</b> {selectedTeacher.gender || "N/A"}
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setOpenDetails(false)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADD TEACHER MODAL ================= */}
        <AddTeacherModal
          open={openAddTeacher}
          onClose={() => setOpenAddTeacher(false)}
          onAdd={async (newTeacher) => {
            // newTeacher contains frontend form fields; call API
            await handleCreateTeacher(newTeacher);
          }}
        />

        {/* ================= VIEW TEACHER (large) ================= */}
        {viewTeacher && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[420px] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Teacher Details</h3>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    viewTeacher.image ?? `https://i.pravatar.cc/150?u=${viewTeacher.id}`
                  }
                  className="w-14 h-14 rounded-full"
                  alt={viewTeacher.name}
                />
                <div>
                  <p className="font-medium">{viewTeacher.name}</p>
                </div>
              </div>

              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <b>Email:</b> {viewTeacher.email || "N/A"}
                </p>
                <p>
                  <b>Phone:</b> {(viewTeacher.number ?? viewTeacher.phone) || "N/A"}
                </p>
                <p>
                  <b>Status:</b> {viewTeacher.status}
                </p>
                <p>
                  <b>Qualification:</b> {viewTeacher.qualification || "N/A"}
                </p>
                <p>
                  <b>Designation:</b> {viewTeacher.desgination || "N/A"}
                </p>
                <p>
                  <b>Salary:</b>{" "}
                  {viewTeacher.salary != null ? `₹${viewTeacher.salary}` : "N/A"}
                </p>
                <p>
                  <b>Hire Date:</b> {viewTeacher.hire_date || "N/A"}
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => downloadTeacherCSV(viewTeacher)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  Download
                </button>
                <button
                  onClick={() => setViewTeacher(null)}
                  className="px-4 py-2 text-sm border rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL ================= */}
        {editTeacher && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[420px] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Teacher</h3>

              <div className="space-y-3">
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editTeacher.name}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, name: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editTeacher.email ?? ""}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, email: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editTeacher.number ?? ""}
                  onChange={(e) =>
                    setEditTeacher({ ...editTeacher, number: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editTeacher.qualification ?? ""}
                  onChange={(e) =>
                    setEditTeacher({
                      ...editTeacher,
                      qualification: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditTeacher(null)}
                  className="px-4 py-2 text-sm border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE CONFIRM ================= */}
        {deleteTeacherModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[380px] rounded-xl p-6">
              <h3 className="text-lg font-semibold">Delete Teacher?</h3>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete <b> {deleteTeacherModal.name}</b>?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setDeleteTeacherModal(null)}
                  className="px-4 py-2 text-sm border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}