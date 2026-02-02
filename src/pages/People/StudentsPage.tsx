import { useState } from "react";
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
} from "lucide-react";
import AddFeesModal from "../../components/AddFeesModal";
import AddStudentModal from "../../components/AddStudentModal";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import s1 from "../../assets/stud/s1.png";
import s2 from "../../assets/stud/s2.png";
import s3 from "../../assets/stud/s3.png";
import s4 from "../../assets/stud/s4.png";
import s5 from "../../assets/stud/s5.png";
import s6 from "../../assets/stud/s6.png";
import s7 from "../../assets/stud/s7.png";
import s8 from "../../assets/stud/s8.png";
import s9 from "../../assets/stud/s9.png";
import s10 from "../../assets/stud/s10.png";

/* ================= STUDENT DATA ================= */
const students = [
  {
    id: "AD9982434",
    name: "Ananya Sharma",
    class: "VIII, A",
    rollNo: "35013",
    gender: "Female",
    joined: "10 Jan 2015",
    status: "Active",
    image: s1,
  },
  {
    id: "AD9982433",
    name: "Mohammed Arif",
    class: "IV, B",
    rollNo: "35012",
    gender: "Male",
    joined: "19 Aug 2014",
    status: "Active",
    image: s2,
  },
  {
    id: "AD9982432",
    name: "Kavya",
    class: "III, A",
    rollNo: "35011",
    gender: "Female",
    joined: "5 Dec 2017",
    status: "Active",
    image: s3,
  },
  {
    id: "AD9982431",
    name: "Joseph Mathew",
    class: "I, B",
    rollNo: "35010",
    gender: "Male",
    joined: "22 Mar 2018",
    status: "Active",
    image: s4,
  },
  {
    id: "AD9982430",
    name: "Ayesha Khan",
    class: "II, B",
    rollNo: "35009",
    gender: "Female",
    joined: "13 May 2017",
    status: "Inactive",
    image: s5,
  },
  {
    id: "AD9982429",
    name: "Rohit Verma",
    class: "III, B",
    rollNo: "35008",
    gender: "Male",
    joined: "20 Jun 2015",
    status: "Active",
    image: s6,
  },
  {
    id: "AD9982428",
    name: "Maria",
    class: "V, A",
    rollNo: "35007",
    gender: "Female",
    joined: "18 Jan 2023",
    status: "Active",
    image: s7,
  },
  {
    id: "AD9982427",
    name: "Suresh Kumar",
    class: "VI, A",
    rollNo: "35006",
    gender: "Male",
    joined: "26 Nov 2012",
    status: "Active",
    image: s8,
  },
  {
    id: "AD9982426",
    name: "Fatima Noor",
    class: "VIII, B",
    rollNo: "35005",
    gender: "Female",
    joined: "26 May 2020",
    status: "Inactive",
    image: s9,
  },
  {
    id: "AD9982425",
    name: "Arvind Choudhary",
    class: "VII, B",
    rollNo: "35004",
    gender: "Male",
    joined: "6 Oct 2022",
    status: "Active",
    image: s10,
  },
  {
    id: "AD9982434",
    name: "Ananya Sharma",
    class: "VIII, A",
    rollNo: "35013",
    gender: "Female",
    joined: "10 Jan 2015",
    status: "Active",
    image: s1,
  },
  {
    id: "AD9982428",
    name: "Maria",
    class: "V, A",
    rollNo: "35007",
    gender: "Female",
    joined: "18 Jan 2023",
    status: "Active",
    image: s7,
  },
];
/* ================= MAIN PAGE ================= */

export default function StudentsPage() {
    const [view, setView] = useState<"grid" | "table">("grid");
    const [openFees, setOpenFees] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [visibleCount, setVisibleCount] = useState(8);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [studentList, setStudentList] = useState(students);
    const [openAddStudent, setOpenAddStudent] = useState(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [openFilter, setOpenFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
    const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">("All");
//   const [startDate, setStartDate] = useState<string>(() =>
//   new Date().toISOString().split("T")[0]
// );
// const [endDate, setEndDate] = useState<string>(() =>
//   new Date().toISOString().split("T")[0]
// );

const [viewStudent, setViewStudent] = useState<any>(null);
const [editStudent, setEditStudent] = useState<any>(null);
const [deleteStudent, setDeleteStudent] = useState<any>(null);

const [openDate, setOpenDate] = useState(false);

const [startDate, setStartDate] = useState("2020-05-15");
const [endDate, setEndDate] = useState("2024-05-24");

    /* ✅ REAL TIME DATE */
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  
    /* EXPORT */
    const handleExport = () => {
      const headers = [
        "ID",
        "Name",
        "Class",
        "Roll No",
        "Gender",
        "Joined",
        "Status",
      ];
  
      const rows = studentList.map((s) => [
        s.id,
        s.name,
        s.class,
        s.rollNo,
        s.gender,
        s.joined,
        s.status,
      ]);
  
      const csv =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows].map((r) => r.join(",")).join("\n");
  
      const link = document.createElement("a");
      link.href = encodeURI(csv);
      link.download = "students_list.csv";
      link.click();
    };
    const handleSortByName = () => {
      const sorted = [...studentList].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    
      setStudentList(sorted);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    const filteredStudents = studentList.filter((s) => {
      const joinedDate = new Date(s.joined).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
    
      const dateMatch = joinedDate >= start && joinedDate <= end;
    
      const statusMatch =
        statusFilter === "All" || s.status === statusFilter;
    
      const genderMatch =
        genderFilter === "All" || s.gender === genderFilter;
    
      return dateMatch && statusMatch && genderMatch;
    });
    
    const downloadTeacherCSV = (teacher: any) => {
  const headers = [
    "ID",
    "Name",
    "Class",
    "Subject",
    "Email",
    "Phone",
    "Status",
  ];

  const row = [
    teacher.id,
    teacher.name,
    teacher.class,
    teacher.subject,
    teacher.email,
    teacher.phone,
    teacher.status,
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), row.join(",")].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${teacher.name}.csv`;
  link.click();
};

  return (
    <div className="space-y-6">
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
      <button className="p-2 border rounded-lg hover:bg-gray-50">
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
{studentList.slice(0, visibleCount).map((s) => (
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
              {students.map((s) => (
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
      {view === "grid" && visibleCount < students.length && (
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
  onAdd={(newStudent) =>
    setStudentList((prev) => [newStudent, ...prev])
  }
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
          onClick={() => {
            setStudentList((prev) =>
              prev.map((s) =>
                s.id === editStudent.id ? editStudent : s
              )
            );
            setEditStudent(null);
          }}
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
          onClick={() => {
            setStudentList((prev) =>
              prev.filter((st) => st.id !== deleteStudent.id)
            );
            setDeleteStudent(null);
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

      </div>
    </div>
  </div>
)}

    </div>
  );
}
