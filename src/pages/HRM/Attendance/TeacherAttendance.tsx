import { useEffect, useState, useCallback } from "react";
import {
  RefreshCcw,
  Printer,
  CalendarDays,
  Filter,
  ArrowUpDown,
  Download,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getTeachers } from "../../../service/teacherService";
import attendanceService from "../../../service/attendanceService";

type AttendanceStatus = "Present" | "Late" | "Absent" | "Holiday" | "Halfday";

interface TeacherRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  attendance: AttendanceStatus;
  notes: string;
}

const STATUS_OPTIONS: AttendanceStatus[] = ["Present", "Late", "Absent", "Holiday", "Halfday"];

const today = () => new Date().toISOString().split("T")[0];

export default function TeacherAttendance() {
  const [teachers, setTeachers] = useState<TeacherRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today());
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | null>(null);
  const rowsPerPage = 10;

  /* ---- close dropdowns on outside click ---- */
  useEffect(() => {
    const close = () => { setOpenCalendar(false); setOpenFilter(false); };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* ---- fetch teachers + saved attendance for date ---- */
  const loadData = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const [teacherRes, attendanceRes] = await Promise.all([
        getTeachers({ limit: 200 }),
        attendanceService.getTeacherAttendanceByDate(date),
      ]);

      const teacherList: any[] = teacherRes?.rows ?? teacherRes?.data ?? [];
      const savedMap: Record<string, { attendance_status: AttendanceStatus; notes: string }> =
        attendanceRes?.data ?? {};

      const rows: TeacherRow[] = teacherList.map((t: any) => ({
        id: t.id,
        name: t.name,
        email: t.email ?? "",
        phone: t.phone ?? "",
        qualification: t.qualification ?? "",
        status: t.status ?? "Active",
        attendance: savedMap[t.id]?.attendance_status ?? "Present",
        notes: savedMap[t.id]?.notes ?? "",
      }));

      setTeachers(rows);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(selectedDate);
  }, [selectedDate, loadData]);

  /* ---- save attendance ---- */
  const handleSave = async () => {
    setSaving(true);
    try {
      const records = teachers.map((t) => ({
        person_id: t.id,
        person_name: t.name,
        attendance_status: t.attendance,
        notes: t.notes,
      }));
      await attendanceService.saveTeacherAttendance(selectedDate, records);
      toast.success("Attendance saved successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  /* ---- update a single row ---- */
  const updateRow = (id: string, field: "attendance" | "notes", value: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  /* ---- export CSV ---- */
  const handleExport = () => {
    const header = "Name,Email,Phone,Qualification,Status,Attendance,Notes";
    const rows = teachers.map(
      (t) => `${t.name},${t.email},${t.phone},${t.qualification},${t.status},${t.attendance},${t.notes}`
    );
    const csv = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `teacher_attendance_${selectedDate}.csv`;
    link.click();
  };

  /* ---- sort ---- */
  const handleSort = () => {
    setTeachers((prev) =>
      [...prev].sort((a, b) =>
        sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
    setSortAsc(!sortAsc);
  };

  /* ---- filter + search ---- */
  const filtered = teachers.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? t.attendance === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  /* ---- summary counts ---- */
  const summary = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = teachers.filter((t) => t.attendance === s).length;
    return acc;
  }, {} as Record<string, number>);

  const statusColor: Record<string, string> = {
    Present: "bg-green-100 text-green-700",
    Late: "bg-yellow-100 text-yellow-700",
    Absent: "bg-red-100 text-red-700",
    Holiday: "bg-blue-100 text-blue-700",
    Halfday: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border rounded-2xl px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Teacher Attendance</h2>
            <p className="text-sm text-gray-500 mt-1">Dashboard / HRM / Teacher Attendance</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
            <button
              onClick={() => loadData(selectedDate)}
              className="p-2.5 border rounded-lg hover:bg-gray-50"
              title="Refresh"
            >
              <RefreshCcw size={16} />
            </button>
            <button className="p-2.5 border rounded-lg" onClick={() => window.print()}>
              <Printer size={16} />
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <Download size={14} /> Export
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1 disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {STATUS_OPTIONS.map((s) => (
          <div key={s} className={`rounded-xl px-4 py-3 text-center ${statusColor[s]}`}>
            <p className="text-2xl font-bold">{summary[s] ?? 0}</p>
            <p className="text-xs mt-1">{s}</p>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="bg-white border rounded-xl px-6 py-4 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold">Teacher Attendance List</h3>

          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
            {/* DATE PICKER */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setOpenCalendar(!openCalendar); }}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
              >
                <CalendarDays size={14} />
                {selectedDate}
              </button>
              {openCalendar && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 mt-2 w-64 bg-white border rounded-xl shadow-lg p-4 z-40"
                >
                  <label className="text-sm text-gray-600">Select Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setCurrentPage(1);
                      setOpenCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setOpenFilter(!openFilter); setOpenCalendar(false); }}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                <Filter size={14} /> Filter
              </button>
              {openFilter && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-40"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setOpenFilter(false); setCurrentPage(1); }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => { setStatusFilter(null); setOpenFilter(false); }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              <ArrowUpDown size={14} /> Sort A-Z
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">{filtered.length} teachers</div>
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="border rounded-lg px-3 py-2 text-sm w-60"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-blue-600" />
        </div>
      )}

      {/* TABLE — desktop */}
      {!loading && (
        <>
          <div className="hidden lg:block bg-white border rounded-xl overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left w-[200px]">Name</th>
                  <th className="px-4 py-3 text-left w-[200px]">Email</th>
                  <th className="px-4 py-3 text-left w-[130px]">Phone</th>
                  <th className="px-4 py-3 text-left w-[360px]">Attendance</th>
                  <th className="px-4 py-3 text-left w-[180px]">Notes</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">
                      No teachers found
                    </td>
                  </tr>
                ) : (
                  paginated.map((t) => (
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{t.name}</td>
                      <td className="px-4 py-3 text-gray-500">{t.email}</td>
                      <td className="px-4 py-3 text-gray-500">{t.phone || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          {STATUS_OPTIONS.map((s) => (
                            <label key={s} className="flex items-center gap-1 whitespace-nowrap cursor-pointer">
                              <input
                                type="radio"
                                name={`att-${t.id}`}
                                checked={t.attendance === s}
                                onChange={() => updateRow(t.id, "attendance", s)}
                              />
                              {s}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          className="border rounded-lg px-2 py-1 text-xs w-full"
                          placeholder="Notes"
                          value={t.notes}
                          onChange={(e) => updateRow(t.id, "notes", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="lg:hidden space-y-4">
            {paginated.map((t) => (
              <div key={t.id} className="bg-white border rounded-2xl p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor[t.attendance]}`}>
                    {t.attendance}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{t.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Qualification</p>
                    <p className="font-medium">{t.qualification || "—"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  {STATUS_OPTIONS.map((s) => (
                    <label key={s} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`mob-att-${t.id}`}
                        checked={t.attendance === s}
                        onChange={() => updateRow(t.id, "attendance", s)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
                <input
                  placeholder="Notes"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={t.notes}
                  onChange={(e) => updateRow(t.id, "notes", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 px-4 py-3 border-t bg-white rounded-xl text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${p === currentPage ? "bg-blue-600 text-white" : "border"}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
