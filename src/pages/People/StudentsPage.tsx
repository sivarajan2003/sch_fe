import { useState, useEffect } from "react";
import {
  LayoutGrid,
  List,
  Phone,
  Mail,
  MessageCircle,
  RefreshCcw,
  Printer,
  Filter,
  CalendarDays,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import AddFeesModal from "../../components/AddFeesModal";
import AddStudentModal from "../../components/AddStudentModal";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import studentService from "../../service/studentService";
import toast from "react-hot-toast";

/* ================= MAIN PAGE ================= */

export default function StudentsPage() {
  const isLocked = false;
  const [view, setView] = useState<"grid" | "table">("grid");
  const [openFees, setOpenFees] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [studentList, setStudentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">("All");
  const [viewStudent, setViewStudent] = useState<any>(null);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [deleteStudent, setDeleteStudent] = useState<any>(null);
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudents({ limit: 200 });
      const rows = res.rows ?? res.data ?? [];
      setStudentList(rows.map((r: any) => ({
        id: r.admission_number || r.id,
        _id: r.id,
        name: r.name,
        class: r.academic_year || "—",
        rollNo: r.roll_number,
        gender: r.gender,
        joined: r.admission_date ? new Date(r.admission_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—",
        status: r.is_active ? "Active" : "Inactive",
        image: r.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`,
        email: r.parent_email || "",
        phone: r.parent_phone || "",
        _raw: r,
      })));
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  /* EXPORT */
  const handleExport = () => {
    const headers = ["ID", "Name", "Class", "Roll No", "Gender", "Joined", "Status"];
    const rows = studentList.map((s) => [s.id, s.name, s.class, s.rollNo, s.gender, s.joined, s.status]);
    const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "students_list.csv";
    link.click();
  };

  const handleSortByName = () => {
    const sorted = [...studentList].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setStudentList(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredStudents = studentList.filter((s) => {
    const statusMatch = statusFilter === "All" || s.status === statusFilter;
    const genderMatch = genderFilter === "All" || s.gender === genderFilter;
    return statusMatch && genderMatch;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteStudent) return;
    try {
      await studentService.deleteStudent(deleteStudent._id);
      toast.success("Student deleted");
      setDeleteStudent(null);
      fetchStudents();
    } catch {
      toast.error("Failed to delete student");
    }
  };

  const handleEditSave = async () => {
    if (!editStudent) return;
    try {
      await studentService.updateStudent(editStudent._id, {
        name: editStudent.name,
        gender: editStudent.gender,
      });
      toast.success("Student updated");
      setEditStudent(null);
      fetchStudents();
    } catch {
      toast.error("Failed to update student");
    }
  };

  const downloadTeacherCSV = (s: any) => {
    const csv = "data:text/csv;charset=utf-8," + ["ID,Name,Class,Roll,Gender,Joined,Status", `${s.id},${s.name},${s.class},${s.rollNo},${s.gender},${s.joined},${s.status}`].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${s.name}.csv`;
    link.click();
  };

  return (
  <div className="relative">

    {/* 🔒 FULL PAGE BLUR LOCK */}
     {isLocked && (
  <div
    className="
      absolute inset-0 z-50
      bg-white/20
      backdrop-blur-sm
      flex items-center justify-center
      rounded-xl
    "
  >
        <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">

          <p className="text-sm font-semibold text-gray-800">
            Subscription Upgrade Required — Contact Atelier Creation
          </p>

          <button
            onClick={() => window.location.href = "tel:+919999999999"}
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg"
          >
            📞 Call Atelier
          </button>

        </div>
      </div>
    )}

    {/* ===== ORIGINAL CONTENT WRAPPER ===== */}
    <div className={`space-y-6 ${isLocked ? "pointer-events-none select-none" : ""}`}>

{/* ================= HEADER ================= */}
<div className="bg-white border rounded-xl px-5 py-4">

  {/* ===== TOP ROW ===== */}
  <div className="flex items-center justify-between">
    {/* LEFT */}
    <div>
    <h2 className="text-2xl font-semibold text-gray-900">
        Students
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Dashboard / People / Students Grid
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-2">
      <button className="p-2 border rounded-lg hover:bg-gray-50" onClick={fetchStudents}>
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
        onClick={() => setOpenAddStudent(true)}
        className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg"
      >
        Add Student
      </button>
    </div>
  </div>

  {/* DIVIDER */}
  <div className="border-t my-3" />

  {/* ===== SUB HEADER ===== */}
  <div className="flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-4">
    <h3 className="text-lg font-semibold text-gray-900">
        Students Grid
      </h3>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">
      {/* CALENDAR */}
<div className="relative">
  <button
    onClick={() => setOpenDate((prev) => !prev)}
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
          onClick={() => setOpenDate(false)}
          className="text-xs text-blue-600 font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>

      {/* FILTER */}
<div className="relative">
  <button
    onClick={() => setOpenFilter((prev) => !prev)}
    className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
  >
    <Filter size={14} />
    Filter
  </button>

  {/* FILTER DROPDOWN */}
  {openFilter && (
    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg p-3 z-30">

      {/* STATUS OPTIONS */}
      <div className="space-y-2">
        {["All", "Active", "Inactive"].map((s) => (
          <label
            key={s}
            className="flex items-center gap-2 text-xs cursor-pointer"
          >
            <input
              type="radio"
              checked={statusFilter === s}
              onChange={() => setStatusFilter(s as any)}
            />
            {s}
          </label>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between mt-4 text-xs">
        <button
          onClick={() => {
            setStatusFilter("All");
            setOpenFilter(false);
          }}
          className="text-gray-500 hover:underline"
        >
          Cancel
        </button>

        <button
          onClick={() => setOpenFilter(false)}
          className="text-blue-600 hover:underline"
        >
          Apply
        </button>
      </div>
    </div>
  )}
</div>

      {/* GRID / LIST */}
      <div className="flex border rounded-lg overflow-hidden">
        <button
          onClick={() => setView("grid")}
          className={`p-2 ${
            view === "grid"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          <LayoutGrid size={14} />
        </button>

        <button
          onClick={() => setView("table")}
          className={`p-2 ${
            view === "table"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          <List size={14} />
        </button>
      </div>
      <button
        onClick={handleSortByName}
        className="flex items-center gap-1 text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
      >
        <ArrowUpDown size={14} />
        Sort By A-Z
      </button>
    </div>

  </div>
</div>

      {/* ================= GRID VIEW ================= */}
     
{view === "grid" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{filteredStudents.slice(0, visibleCount).map((s) => (
      <div
        key={s.id}
        className="bg-white border rounded-xl p-4 hover:shadow-md transition"
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between pb-3 border-b">
          <span className="text-xs font-medium text-blue-600">
            {s.id}
          </span>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                s.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {s.status}
            </span>

            <div className="relative">
  <button
    onClick={() =>
      setOpenMenuId(openMenuId === s.id ? null : s.id)
    }
    className="p-1 rounded hover:bg-gray-100"
  >
    <MoreVertical size={16} className="text-gray-500" />
  </button>

  {/* DROPDOWN */}
  {openMenuId === s.id && (
    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
      
      <button
  onClick={() => {
    setOpenMenuId(null);
    setViewStudent(s);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
>
  <Eye size={14} /> View
</button>
<button
  onClick={() => {
    setOpenMenuId(null);
    setEditStudent(s);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
>
  <Pencil size={14} /> Edit
</button>
<button
  onClick={() => {
    setOpenMenuId(null);
    setDeleteStudent(s);
  }}
  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
>
  <Trash2 size={14} /> Delete
</button>


    </div>
  )}
</div>
          </div>
        </div>

        {/* PROFILE BOX */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 my-4">
          <img
            src={s.image}
            alt={s.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              {s.name}
            </h4>
            <p className="text-xs text-gray-500">{s.class}</p>
          </div>
        </div>

       {/* INFO */}
<div className="grid grid-cols-3 gap-y-3 text-xs text-gray-600 pb-4 border-b">
  <div>
    <p className="text-gray-500">Roll No</p>
    <p className="font-medium text-gray-800">
      {s.rollNo}
    </p>
  </div>
  <div>
    <p className="text-gray-500">Gender</p>
    <p className="font-medium text-gray-800">
      {s.gender}
    </p>
  </div>
  <div>
    <p className="text-gray-500">Joined On</p>
    <p className="font-medium text-gray-800">
      {s.joined}
    </p>
  </div>
</div>


        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <MessageCircle size={14} />
            </button>
            {/* PHONE */}
  <a
    href={`tel:+919876543210`}
    className="p-2 border rounded-lg hover:bg-gray-50"
    title="Call"
  >
    <Phone size={14} />
  </a>

  {/* EMAIL */}
  <a
    href={`mailto:${s.name.replace(" ", ".").toLowerCase()}@school.com`}
    className="p-2 border rounded-lg hover:bg-gray-50"
    title="Email"
  >
    <Mail size={14} />
  </a>
          </div>

          <button
  onClick={() => {
    setSelectedStudent(s.name);
    setOpenFees(true);
  }}
  className="px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
>
  Add Fees
</button>

        </div>
      </div>
    ))}
  </div>
)}

      {/* ================= TABLE VIEW ================= */}
      {view === "table" && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Roll</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-blue-600">
                    {s.id}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={s.image}
                      className="w-8 h-8 rounded-full"
                    />
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.class}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.rollNo}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.gender}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.joined}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        s.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <MoreVertical size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "grid" && visibleCount < filteredStudents.length && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setVisibleCount((prev) => prev + 4)}
      className="
        flex items-center gap-2
        px-5 py-2
        text-sm font-medium
        bg-blue-600 text-white
        rounded-lg
        hover:bg-blue-700
        transition
      "
    >
      Load More
    </button>
  </div>
)}
      <AddFeesModal
  open={openFees}
  onClose={() => setOpenFees(false)}
  studentName={selectedStudent}
/>
<AddStudentModal
  open={openAddStudent}
  onClose={() => setOpenAddStudent(false)}
  onAdd={async (newStudent: any) => {
    try {
      await studentService.createStudent(newStudent);
      toast.success("Student added");
      setOpenAddStudent(false);
      fetchStudents();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add student");
    }
  }}
/>
{viewStudent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-4">
        Student Profile
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={viewStudent.image}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="font-medium">{viewStudent.name}</p>
          <p className="text-sm text-gray-500">
            {viewStudent.class}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <p><b>Roll No:</b> {viewStudent.rollNo}</p>
        <p><b>Gender:</b> {viewStudent.gender}</p>
        <p><b>Joined:</b> {viewStudent.joined}</p>
        <p><b>Status:</b> {viewStudent.status}</p>
      </div>

      <div className="flex justify-between mt-6">
      <button
  onClick={() => {
    const headers = [
      "ID",
      "Name",
      "Class",
      "Roll No",
      "Gender",
      "Joined",
      "Status",
    ];

    const row = [
      viewStudent.id,
      viewStudent.name,
      viewStudent.class,
      viewStudent.rollNo,
      viewStudent.gender,
      viewStudent.joined,
      viewStudent.status,
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), row.join(",")].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `${viewStudent.name}.csv`;
    link.click();
  }}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
>
  Download 
</button>

        <button
          onClick={() => setViewStudent(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{editStudent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-4">
        Edit Student
      </h3>

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editStudent.name}
          onChange={(e) =>
            setEditStudent({ ...editStudent, name: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={editStudent.class}
          onChange={(e) =>
            setEditStudent({ ...editStudent, class: e.target.value })
          }
        />

        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={editStudent.gender}
          onChange={(e) =>
            setEditStudent({
              ...editStudent,
              gender: e.target.value,
            })
          }
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditStudent(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleEditSave}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{deleteStudent && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[380px] rounded-xl p-6">

      <h3 className="text-lg font-semibold text-gray-900">
        Confirm Delete
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Are you sure you want to delete
        <span className="font-semibold"> {deleteStudent.name}</span>?
        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">

        {/* CANCEL */}
        <button
          onClick={() => setDeleteStudent(null)}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>

        {/* CONFIRM DELETE */}
        <button
          onClick={handleDeleteConfirm}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
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
