//import DashboardLayout from "../../components/DashboardLayout";
import DashboardLayout from "../../components/DashboardLayout";

import StudentAvatar from "../../assets/s1.png";
import Tc1 from "../../assets/tc1.png";
import Tc2 from "../../assets/tc2.png";
import Tc3 from "../../assets/tc3.png";
import H1 from "../../assets/h1.png";
import H2 from "../../assets/h2.png";
import H3 from "../../assets/h3.png";
import H4 from "../../assets/h4.png";
import C1 from "../../assets/c1.png";
import C2 from "../../assets/c2.png";
import C3 from "../../assets/c3.png";
import C4 from "../../assets/c4.png";
import { X, Asterisk } from "lucide-react";
import { useRef } from "react";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import s1 from "../../assets/gif/s1.gif";
import s2 from "../../assets/gif/s2.gif";
import s3 from "../../assets/gif/s3.gif";
import s4 from "../../assets/gif/s4.gif";


export default function StudentDashboard() {
  const [showEditProfile, setShowEditProfile] = useState(false);

const [editProfile, setEditProfile] = useState({
  name: "Angelo Riana",
  className: "III",
  section: "C",
  rollNo: "36545",
});


  const navigate = useNavigate();
  const [showMonthDetails, setShowMonthDetails] = useState<boolean>(false);
/* ================== CALENDAR STATE ================== */
const [currentMonth, setCurrentMonth] = useState(6); // July (0-based)
const [currentYear, setCurrentYear] = useState(2025);
const [showAddExam, setShowAddExam] = useState(false);
const [showNextClass, setShowNextClass] = useState(false);
const [showExamPopup, setShowExamPopup] = useState(false);
const [showFeesPopup, setShowFeesPopup] = useState(false);
const [showViewExams, setShowViewExams] = useState(false);

const [rollNo, setRollNo] = useState("");
const [studentName, setStudentName] = useState("");
const [showResult, setShowResult] = useState(false);
const [activeQuarter, setActiveQuarter] = useState<keyof typeof examResults>("1st Quarter");
const [showQuarterMenu, setShowQuarterMenu] = useState(false);

/* ================== EXAMS STATE ================== */
const [exams, setExams] = useState([
  {
    title: "1st Quarterly",
    subject: "Mathematics",
    date: new Date(2025, 6, 6),
    time: "01:30 - 02:15 PM",
    room: "105",
  },
  {
    title: "2nd Quarterly",
    subject: "English",
    date: new Date(2025, 6, 12),
    time: "01:30 - 02:15 PM",
    room: "106",
  },
  {
    title: "2nd Quarterly",
    subject: "Physics",
    date: new Date(2025, 6, 12),
    time: "01:30 - 02:15 PM",
    room: "107",
  },
  {
    title: "2nd Quarterly",
    subject: "Chemistry",
    date: new Date(2025, 7, 12),
    time: "01:30 - 02:15 PM",
    room: "108",
  },
]);
/* ================= ATTENDANCE DATA ================= */

const attendanceData = [
  { date: "2025-05-14", status: "Present" },
  { date: "2025-05-15", status: "Present" },
  { date: "2025-05-16", status: "Absent" },
  { date: "2025-05-17", status: "Present" },
  { date: "2025-05-18", status: "Halfday" },
  { date: "2025-05-19", status: "Present" },
  { date: "2025-05-20", status: "Late" },
];

const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);

/* ================= MONTH FILTER ================= */
const selectedMonth = 4; // May (0-based)
const selectedYear = 2025;

const monthAttendance = attendanceData.filter(d => {
  const dt = new Date(d.date);
  return dt.getMonth() === selectedMonth && dt.getFullYear() === selectedYear;
});

/* ================= CALCULATIONS ================= */
const presentDays = monthAttendance.filter(d => d.status === "Present").length;
const absentDays = monthAttendance.filter(d => d.status === "Absent").length;
const halfDays = monthAttendance.filter(d => d.status === "Halfday").length;
const lateDays = monthAttendance.filter(d => d.status === "Late").length;

const totalWorkingDays = 26;

const attendancePercent = Math.round(
  (presentDays / totalWorkingDays) * 100
);
const leaveDays = absentDays;
const attendancePercentage = attendancePercent;
const [showAllNotices, setShowAllNotices] = useState(false);
const [showAllHomeWorks, setShowAllHomeWorks] = useState(false);

/* ================== CALENDAR HELPERS ================== */
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDay = new Date(currentYear, currentMonth, 1).getDay();

const examDays = exams
  .filter(
    e =>
      e.date.getMonth() === currentMonth &&
      e.date.getFullYear() === currentYear
  )
  .map(e => e.date.getDate());
  const uniqueExams = exams.filter(
    (exam, index, self) =>
      index ===
      self.findIndex(
        e =>
          e.subject === exam.subject &&
          e.date.getTime() === exam.date.getTime()
      )
  );
  
/* ================== MONTH NAVIGATION ================== */
const changeMonth = (dir: "prev" | "next") => {
  if (dir === "prev") {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else setCurrentMonth(m => m - 1);
  } else {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else setCurrentMonth(m => m + 1);
  }
};

/* ================== ADD EXAM ================== */
const handleAddExam = (dateValue: string) => {
  setExams(prev => [
    ...prev,
    {
      title: "Unit Test",
      subject: "Biology",
      date: new Date(dateValue),
      time: "10:00 - 11:00 AM",
      room: "12",
    },
  ]);
  setShowAddExam(false);
};
const facultyRef = useRef<HTMLDivElement | null>(null);

const scrollLeft = () => {
  facultyRef.current?.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  facultyRef.current?.scrollBy({ left: 300, behavior: "smooth" });
};

const [activePerfIndex, setActivePerfIndex] = useState<number | null>(2);
const handlePerfMove = (e: React.MouseEvent<SVGSVGElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const index = Math.round((x / rect.width) * (performanceLabels.length - 1));
  setActivePerfIndex(
    Math.max(0, Math.min(index, performanceLabels.length - 1))
  );
};

const handlePerfLeave = () => {
  setActivePerfIndex(null);
};

const todayClasses = [
  {
    sub: "English",
    time: "09:00 - 09:45 AM",
    img: Tc1,
    status: "Completed",
    c: "green",
  },
  {
    sub: "Chemistry",
    time: "10:45 - 11:30 AM",
    img: Tc2,
    status: "Completed",
    c: "green",
  },
  {
    sub: "Physics",
    time: "11:30 - 12:15 AM",
    img: Tc3,
    status: "Inprogress",
    c: "yellow",
  },
];

const nextClasses = [
  {
    sub: "Mathematics",
    time: "09:00 - 09:45 AM",
    img: Tc1,
    status: "Upcoming",
    c: "blue",
  },
  {
    sub: "Biology",
    time: "10:45 - 11:30 AM",
    img: Tc2,
    status: "Upcoming",
    c: "blue",
  },
];
const notices = [
  {
    title: "New Syllabus Instructions",
    date: "11 Mar 2025",
    icon: "📘",
    color: "text-blue-600",
  },
  {
    title: "World Environment Day",
    date: "21 Apr 2025",
    icon: "🌱",
    color: "text-green-600",
  },
  {
    title: "Exam Preparation Notification!",
    date: "13 Mar 2025",
    icon: "🔔",
    color: "text-red-600",
  },
  {
    title: "Online Classes Preparation",
    date: "24 May 2025",
    icon: "💻",
    color: "text-cyan-600",
  },
  {
    title: "Exam Time Table Release",
    date: "24 May 2025",
    icon: "📅",
    color: "text-yellow-600",
  },
  {
    title: "PTA Meeting Announcement",
    date: "02 Jun 2025",
    icon: "👨‍👩‍👧",
    color: "text-purple-600",
  },
  {
    title: "Holiday Declaration",
    date: "10 Jun 2025",
    icon: "🏖️",
    color: "text-orange-600",
  },
];
const allHomeWorks = [
  {
    sub: "Physics",
    color: "blue",
    title: "Write about Theory of Pendulum",
    teacher: "Aaron",
    due: "16 Jun 2025",
    percent: 90,
    img: H1,
  },
  {
    sub: "Chemistry",
    color: "green",
    title: "Chemistry - Change of Elements",
    teacher: "Hellana",
    due: "18 Jun 2025",
    percent: 65,
    img: H2,
  },
  {
    sub: "Maths",
    color: "yellow",
    title: "Maths - Problems to Solve Page 21",
    teacher: "Morgan",
    due: "21 Jun 2025",
    percent: 30,
    img: H3,
  },
  {
    sub: "English",
    color: "red",
    title: "English - Vocabulary Introduction",
    teacher: "Daniel Josua",
    due: "21 Jun 2025",
    percent: 10,
    img: H4,
  },
  {
    sub: "Biology",
    color: "green",
    title: "Biology – Cell Structure Notes",
    teacher: "Sophia",
    due: "23 Jun 2025",
    percent: 50,
    img: H2,
  },
  {
    sub: "History",
    color: "blue",
    title: "History – World War II Essay",
    teacher: "Robert",
    due: "25 Jun 2025",
    percent: 20,
    img: H1,
  },
];
const [showLeaveYearDetails, setShowLeaveYearDetails] = useState(false);
const leaveData = [
  {
    title: "Emergency Leave",
    date: "2025-06-15",
    reason: "Family emergency",
    status: "Pending",
  },
  {
    title: "Medical Leave",
    date: "2025-06-15",
    reason: "Hospital checkup",
    status: "Approved",
  },
  {
    title: "Medical Leave",
    date: "2025-06-15",
    reason: "Fever",
    status: "Declined",
  },
  {
    title: "Fever",
    date: "2025-06-15",
    reason: "Viral fever",
    status: "Approved",
  },
];
//const currentYear = 2025;

const yearLeaves = leaveData.filter(l => {
  return new Date(l.date).getFullYear() === currentYear;
});

const totalLeaves = yearLeaves.length;
const approvedLeaves = yearLeaves.filter(l => l.status === "Approved").length;
const pendingLeaves = yearLeaves.filter(l => l.status === "Pending").length;
const declinedLeaves = yearLeaves.filter(l => l.status === "Declined").length;

const examResults = {
  "1st Quarter": [
    { label: "Mat", value: 100 },
    { label: "Phy", value: 92 },
    { label: "Che", value: 90 },
    { label: "Eng", value: 80 },
    { label: "Sci", value: 70 },
  ],
  "2nd Quarter": [
    { label: "Mat", value: 85 },
    { label: "Phy", value: 88 },
    { label: "Che", value: 78 },
    { label: "Eng", value: 82 },
    { label: "Sci", value: 75 },
  ],
  "Final Exam": [
    { label: "Mat", value: 90 },
    { label: "Phy", value: 94 },
    { label: "Che", value: 89 },
    { label: "Eng", value: 85 },
    { label: "Sci", value: 88 },
  ],
};
const perfConfig: Record<
  PerfView,
  {
    label: string;
    xLabels: string[];
    exam: number[];
    attendance: number[];
  }
> = {
  week: {
    label: "This Week",
    xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    exam: [70, 72, 68, 75, 74, 78, 80],
    attendance: [90, 92, 88, 95, 93, 96, 98],
  },
  month: {
    label: "This Month",
    xLabels: ["W1", "W2", "W3", "W4"],
    exam: [68, 72, 75, 78],
    attendance: [92, 94, 95, 96],
  },
  year: {
    label: "2024 - 2025",
    xLabels: ["Q1", "Q2", "Half", "Model", "Final"],
    exam: [78, 74, 60, 68, 75],
    attendance: [72, 68, 55, 62, 70],
  },
};
type PerfView = "week" | "month" | "year";

const [perfView, setPerfView] = useState<PerfView>("year");
const [showPerfMenu, setShowPerfMenu] = useState(false);
const examScores = perfConfig[perfView].exam;
const attendanceScores = perfConfig[perfView].attendance;
const performanceLabels = perfConfig[perfView].xLabels;

  return (
    //<DashboardLayout>
    <>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Student Dashboard</h2>
          <p className="text-sm text-gray-500">
            Dashboard / Students Dashboard
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
  onClick={() => setShowExamPopup(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  Exam Result
</button>

<button
  onClick={() => setShowFeesPopup(true)}
  className="px-4 py-2 bg-gray-100 rounded-lg"
>
  Fees Details
</button>

        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 xl:auto-rows-min gap-6">

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">

          {/* PROFILE CARD */}
          <div className="rounded-xl p-4 sm:p-5 bg-[#0E1333] text-white
                animate-card card-interactive">


  {/* TOP SECTION */}
  <div className="flex items-start gap-4">
    <img
      src={StudentAvatar}
      alt="Student"
      className="w-14 h-14 rounded-lg border-2 border-white object-cover"
    />

    <div className="flex-1">
      {/* STUDENT ID */}
      <span className="inline-block text-[11px] bg-[#2D5BFF] px-2 py-0.5 rounded-md mb-1">
        #ST123456
      </span>
      {/* NAME */}
      <p className="font-semibold text-base leading-tight">
  {editProfile.name}
</p>
<p className="text-xs text-gray-300 mt-0.5">
  Class : {editProfile.className}, {editProfile.section} | Roll No : #{editProfile.rollNo}
</p>    </div>
  </div>

  {/* CENTER DASHED LINE */}
  <div className="border-t border-dashed border-gray-500/40 my-4" />

  {/* BOTTOM SECTION */}
  <div className="flex items-center justify-between">
    {/* LEFT */}
    <div className="flex items-center gap-2">
    
      <span className="bg-green-500 text-[10px] px-2 py-0.5 rounded-full font-medium">
        Pass
      </span>
    </div>
    <button
  onClick={() => setShowEditProfile(true)}
  className="bg-[#2D5BFF] hover:bg-blue-700 transition text-xs px-4 py-1.5 rounded-lg"
>
  Edit Profile
</button>

  </div>
</div>


          {/* TODAY'S CLASS */}
          <div className="bg-white border rounded-xl p-6 sm:p-9
                animate-card card-hover">
            <div className="flex items-center justify-between mb-3">
  <div>
    <h4 className="text-18px font-medium">
      {showNextClass ? "Next Class" : "Today’s Class"}
    </h4>
    <p className="text-xs text-gray-400">
      16 May 2025
    </p>
  </div>

  <button
    onClick={() => setShowNextClass(!showNextClass)}
    className="text-xs text-gray-600 hover:underline"
  >
    {showNextClass ? "‹ Today" : "Next ›"}
  </button>
</div>

{(showNextClass ? nextClasses : todayClasses).map((c, i) => (
  <div
    key={i}
    className="flex items-center gap-3 border rounded-lg p-3 mb-2"
  >
    <img
      src={c.img}
      className="w-10 h-10 rounded-lg object-cover"
    />

    <div className="flex-1">
      <p className="text-sm font-medium">{c.sub}</p>
      <p className="text-xs text-gray-500">{c.time}</p>
    </div>

    <span
      className={`text-xs px-3 py-0.5 rounded-full ${
        c.c === "green"
          ? "bg-green-100 text-green-600"
          : c.c === "yellow"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-blue-100 text-blue-600"
      }`}
    >
      {c.status}
    </span>
  </div>
))}
          </div>
        </div>
        {/* ================= ATTENDANCE ================= */}
        <div className="bg-white border rounded-xl p-4 sm:p-5
                animate-card card-hover">
  {/* Header */}
  <div className="flex items-center justify-between mb-3">
    <h4 className="text-18px font-medium">Attendance</h4>
    <button
  onClick={() => setShowAttendanceDetails(!showAttendanceDetails)}
  className="text-xs text-gray-600 flex items-center gap-1"
>
  📅 This Month
</button>

</div>

  {/* Working Days */}
<p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
  📘 No of total working days
  <b className="text-gray-700 ml-1">{totalWorkingDays} Days</b>
</p>

{/* Stats */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs mb-6">
  <div className="border rounded-lg py-3">
    <p className="font-semibold text-sm">{presentDays}</p>
    <p className="text-gray-500">Present</p>
  </div>
  <div className="border rounded-lg py-3">
    <p className="font-semibold text-sm">{absentDays}</p>
    <p className="text-gray-500">Absent</p>
  </div>
  <div className="border rounded-lg py-3">
    <p className="font-semibold text-sm">{halfDays}</p>
    <p className="text-gray-500">Halfday</p>
  </div>
  <div className="border rounded-lg py-3">
    <p className="font-semibold text-sm">{lateDays}</p>
    <p className="text-gray-500">Late</p>
  </div>
</div>

  {/* ===== FULL CIRCLE DONUT ===== */}
  <div className="flex justify-center mb-5">
    <div className="relative w-44 h-44">

      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#E5E7EB"
          strokeWidth="14"
          fill="none"
        />

        {/* Present – Green */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#22C55E"
          strokeWidth="14"
          fill="none"
          strokeDasharray="420 100"
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        {/* Absent – Red */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#EF4444"
          strokeWidth="14"
          fill="none"
          strokeDasharray="60 460"
          strokeDashoffset="-420"
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        {/* Half Day – Grey */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="#CBD5E1"
          strokeWidth="14"
          fill="none"
          strokeDasharray="40 480"
          strokeDashoffset="-480"
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        {/* Late – Blue dot */}
        <circle cx="155" cy="125" r="6" fill="#3B82F6" />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500">Attendance</p>
<p className="text-2xl font-bold">{attendancePercent}%</p>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="flex justify-center gap-4 text-xs text-gray-500 mb-4">
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-green-500 rounded-full" /> Present
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-red-500 rounded-full" /> Absent
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-blue-500 rounded-full" /> Late
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-gray-300 rounded-full" /> Half Day
    </span>
  </div>

  {/* Last 7 Days */}
  <div className="border rounded-lg p-3">
    <div className="flex justify-between text-xs text-gray-500 mb-2">
      <p className="font-medium">Last 7 Days</p>
      <p>14 May 2025 - 21 May 2025</p>
    </div>

    <div className="flex gap-2">
      {["M","T","W","T","F","S","S"].map((d, i) => (
        <span
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold
            ${
              i === 4
                ? "bg-red-500 text-white"
                : i > 4
                ? "bg-gray-100 text-gray-400"
                : "bg-green-500 text-white"
            }`}
        >
          {d}
        </span>
      ))}
    </div>
  </div>
  
</div>


 {/* ================= SCHEDULE CARD ================= */}
 <div className="bg-white border rounded-xl p-4 xl:row-span-2 animate-card card-hover">

{/* Header */}
<div className="flex items-center justify-between mb-4">
  <h4 className="text-18px font-medium">Schedules</h4>
  <span
  onClick={() => setShowViewExams(true)}
  className="text-xs text-blue-600 cursor-pointer hover:underline"
>
  View Exams
</span>
</div>

{/* Month Navigation */}
<div className="flex items-center justify-between mb-3">
  <p className="text-sm font-medium">
    {new Date(currentYear, currentMonth).toLocaleString("default", {
      month: "long",
    })}{" "}
    {currentYear}
  </p>

  <div className="flex gap-2">
    <button
      onClick={() => changeMonth("prev")}
      className="w-7 h-7 rounded-full border text-gray-400"
    >
      ‹
    </button>
    <button
      onClick={() => changeMonth("next")}
      className="w-7 h-7 rounded-full bg-black text-white"
    >
      ›
    </button>
  </div>
</div>

{/* Weekdays */}
<div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-2">
  {["S", "M", "T", "W", "T", "F", "S"].map(d => (
    <span key={d}>{d}</span>
  ))}
</div>

{/* Calendar */}
<div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs text-center mb-5">
  {[...Array(firstDay)].map((_, i) => (
    <div key={"e" + i} />
  ))}

{Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
  <div
    key={day}
    className={`relative w-8 h-8 flex items-center justify-center rounded-lg
      ${
        examDays.includes(day)
          ? "bg-blue-600 text-white font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
  >
    {day}

    {/* 🔵 exam indicator dot */}
    {examDays.includes(day) && (
      <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full" />
    )}
  </div>
))}

</div>

{/* Exams */}
<h5 className="text-18px font-medium">Exams</h5>

<div className="space-y-3">
  {exams
    .filter(
      e =>
        e.date.getMonth() === currentMonth &&
        e.date.getFullYear() === currentYear
    )
    .map((e, i) => {
      const daysLeft = Math.ceil(
        (e.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );

      return (
        <div key={i} className="border rounded-lg p-3">
  <div className="flex items-center justify-between mb-1">
    <p className="text-sm font-semibold">{e.subject}</p>

    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
      {daysLeft} Days More
    </span>
  </div>

  <p className="text-xs text-gray-500">
    🕒 {e.time}
  </p>

  <p className="text-xs text-blue-600">
    📍 Room No : {e.room}
  </p>
</div>
      );
    })}
</div>
</div>


        {/* ================= QUICK ACTIONS (HALF WIDTH) ================= */}
        <div className="xl:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

{[
    { title: "Pay Receipts", gif: s1, color: "blue" },
    { title: "Exam Result", gif: s2, color: "green" },
    { title: "Calendar", gif: s3, color: "yellow" },
    { title: "Attendance", gif: s4, color: "slate" },
  ].map((a, i) => (
    <div
    key={i}
    onClick={() => {
      switch (a.title) {
        case "Calendar":
          navigate("/student/dashboard/hrm/holidays");
          break;
        case "Attendance":
          navigate("/student/dashboard/reports/attendance");
          break;
        case "Exam Result":
          setShowExamPopup(true);
          break;
        case "Pay Receipts":
          navigate("/student/dashboard/reports/attendance"); // optional
          break;
      }
    }}
    className={`group bg-white rounded-xl border border-gray-200 border-b-4
      ${a.color === "blue" && "border-b-blue-600"}
      ${a.color === "green" && "border-b-green-600"}
      ${a.color === "yellow" && "border-b-yellow-500"}
      ${a.color === "slate" && "border-b-slate-800"}
      p-4 flex items-center gap-4 cursor-pointer
      transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
  >
  

      {/* GIF ICON */}
      <div
        className={`
          w-11 h-11 rounded-lg
          flex items-center justify-center
          bg-white
          transition-transform duration-300
          group-hover:scale-110
        `}
      >
        <img
          src={a.gif}
          alt={a.title}
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* TEXT */}
      <p className="text-sm font-medium text-gray-800 transition-colors duration-300">
        {a.title}
      </p>
    </div>
  ))}


</div>


      </div>
{/* ================= PERFORMANCE + HOME WORK ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
{/* ================= PERFORMANCE (LEFT) ================= */}
<div className="xl:col-span-2 bg-white rounded-xl border p-3">

  {/* Header */}
  <div className="flex items-center justify-between mb-2">
    <h4 className="text-18px font-medium">Performance</h4>
    <div className="relative">
  <span
    onClick={() => setShowPerfMenu(!showPerfMenu)}
    className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer hover:underline"
  >
    <CalendarDays className="w-4 h-4 text-gray-500" />
    {perfConfig[perfView].label}
  </span>

  {showPerfMenu && (
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow text-xs z-20">
      {(["week", "month", "year"] as PerfView[]).map(v => (
        <div
          key={v}
          onClick={() => {
            setPerfView(v);
            setShowPerfMenu(false);
            setActivePerfIndex(null);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
        >
          {v}
        </div>
      ))}
    </div>
  )}
</div>

  </div>

  {/* GRAPH CONTAINER */}
  <div className="relative bg-[#F8FAFF] rounded-lg p-4 sm:p-12">

    {/* Y Axis */}
    <div className="absolute left-2 top-3 bottom-8 flex flex-col justify-between text-xs text-gray-400">
      {[100, 75, 50, 25, 0].map(v => (
        <span key={v}>{v}</span>
      ))}
    </div>
    <div className="overflow-x-auto">
    <svg
  viewBox="0 0 500 220"
  className="ml-6 w-full h-40 sm:h-49"
  onMouseMove={handlePerfMove}
  onMouseLeave={handlePerfLeave}
>


      {/* GRID */}
      {[40, 80, 120, 160, 200].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#E5EDFF" />
      ))}

      {/* FOCUS AREA */}
      {activePerfIndex !== null && (
  <>
    <rect
      x={(activePerfIndex / 4) * 500 - 25}
      y="0"
      width="50"
      height="220"
      fill="#EEF2FF"
    />
    <line
      x1={(activePerfIndex / 4) * 500}
      y1="0"
      x2={(activePerfIndex / 4) * 500}
      y2="220"
      stroke="#94A3B8"
      strokeDasharray="3"
    />
  </>
)}


      {/* AREA FILL */}
      <path
        d="M0,60 125,80 250,110 375,90 500,70 L500,220 L0,220 Z"
        fill="#EDF2FF"
      />

      {/* ATTENDANCE */}
      <polyline
        points="0,60 125,80 250,110 375,90 500,70"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="2"
      />

      {/* EXAM SCORE */}
      <polyline
        points="0,45 125,65 250,95 375,75 500,55"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="2"
      />
    </svg>
    </div>
    {/* TOOLTIP */} 
    {activePerfIndex !== null && (
  <div
    className="absolute bg-white border rounded-lg px-4 py-2 shadow text-xs"
    style={{
      left: `${(activePerfIndex / 4) * 100}%`,
      top: "30px",
      transform: "translateX(-50%)",
    }}
  >
    <p className="font-medium mb-1">
      {performanceLabels[activePerfIndex]}
    </p>
    <p className="text-gray-400">
      Exam Score <b>{examScores[activePerfIndex]}%</b>
    </p>
    <p className="text-sky-500">
      Attendance <b>{attendanceScores[activePerfIndex]}%</b>
    </p>
  </div>
)}


    {/* X AXIS */}
    <div
  className="grid text-xs text-gray-400 mt-2 ml-8"
  style={{
    gridTemplateColumns: `repeat(${performanceLabels.length}, 1fr)`,
  }}
>
  {performanceLabels.map(l => (
    <span key={l} className="text-center">{l}</span>
  ))}
</div>

  </div>

  {/* LEGEND */}
  <div className="flex gap-6 mt-3 text-xs text-gray-500">
    <span className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-gray-400" />
      Avg Score : 72%
    </span>
    <span className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-blue-400" />
      Avg Attendance : 95%
    </span>
  </div>
</div>
{/* ================= HOME WORK (RIGHT) ================= */}
<div className="bg-white rounded-xl border p-4 sm:p-5
                animate-card card-hover">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
  <h4 className="text-18px font-medium">Home Works</h4>
  <span
  onClick={() => setShowAllHomeWorks(true)}
  className="text-xs text-blue-600 cursor-pointer hover:underline"
>
  📚 All Subject
</span>
</div>

{[
  {
    sub: "Physics",
    color: "blue",
    title: "Write about Theory of Pendulum",
    teacher: "Aaron",
    due: "16 Jun 2025",
    percent: 90,
    img: H1,
  },
  {
    sub: "Chemistry",
    color: "green",
    title: "Chemistry - Change of Elements",
    teacher: "Hellana",
    due: "18 Jun 2025",
    percent: 65,
    img: H2,
  },
  {
    sub: "Maths",
    color: "yellow",
    title: "Maths - Problems to Solve Page 21",
    teacher: "Morgan",
    due: "21 Jun 2025",
    percent: 30,
    img: H3,
  },
  {
    sub: "English",
    color: "red",
    title: "English - Vocabulary Introduction",
    teacher: "Daniel Josua",
    due: "21 Jun 2025",
    percent: 10,
    img: H4,
  },
].map((h, i) => (
  <div
    key={i}
    className="flex items-center gap-3 p-3 rounded-lg border mb-3"
  >
    {/* ✅ Local Image */}
    <img
      src={h.img}
      alt={h.sub}
      className="w-12 h-12 rounded-lg object-cover"
    />

    {/* Info */}
    <div className="flex-1">
      <p
        className={`text-xs font-medium ${
          h.color === "blue"
            ? "text-blue-600"
            : h.color === "green"
            ? "text-green-600"
            : h.color === "yellow"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {h.sub}
      </p>

      <p className="text-sm font-medium leading-snug">
        {h.title}
      </p>

      <p className="text-xs text-gray-500">
        👤 {h.teacher} &nbsp; Due by : {h.due}
      </p>
    </div>

    {/* Circular Progress */}
    <div className="relative w-9 h-9">
  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
    {/* Background circle */}
    <circle
      cx="18"
      cy="18"
      r="15.5"
      fill="none"
      stroke="#E5E7EB"
      strokeWidth="2.5"
    />

    {/* Progress circle */}
    <circle
      cx="18"
      cy="18"
      r="15.5"
      fill="none"
      stroke={
        h.color === "blue"
          ? "#3B82F6"
          : h.color === "green"
          ? "#22C55E"
          : h.color === "yellow"
          ? "#EAB308"
          : "#EF4444"
      }
      strokeWidth="2.5"
      strokeDasharray={`${(h.percent / 100) * 97.4} 97.4`}
      strokeLinecap="round"
    />
  </svg>

  {/* Percentage text */}
  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
    {h.percent}%
  </span>
</div>
</div>
))}

</div>
  </div>
{/* ================= LEAVE + EXAM + FEES ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

{/* ================= LEAVE STATUS ================= */}

<div className="bg-white rounded-xl border
                animate-card card-hover">

  {/* Header */}
  <div className="flex justify-between items-center px-5 py-4 border-b">
    <h4 className="text-18px font-medium">Leave Status</h4>
    <span
  onClick={() => setShowLeaveYearDetails(true)}
  className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer hover:underline"
>
  <CalendarDays className="w-4 h-4 text-gray-400" />
  This Year
</span>


  </div>

  <div className="px-5 py-3 pb-2">
    {[
      { title: "Emergency Leave", date: "15 Jun 2025", status: "Pending", icon: X, iconBg: "bg-red-100 text-red-500", badge: "bg-blue-500" },
      { title: "Medical Leave", date: "15 Jun 2025", status: "Approved", icon: Asterisk, iconBg: "bg-blue-100 text-blue-500", badge: "bg-green-500" },
      { title: "Medical Leave", date: "15 Jun 2025", status: "Declined", icon: Asterisk, iconBg: "bg-blue-100 text-blue-500", badge: "bg-red-500" },
      { title: "Fever", date: "15 Jun 2025", status: "Approved", icon: X, iconBg: "bg-red-100 text-red-500", badge: "bg-green-500" },
    ].map((l, i) => {
      const Icon = l.icon;
      return (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 last:mb-0 mb-2"
          >
          <div className="flex items-center gap-3">
            {/* ICON BOX */}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${l.iconBg}`}>
              <Icon size={16} />
            </div>

            <div>
              <p className="text-sm font-medium">{l.title}</p>
              <p className="text-xs text-gray-500">
                Leave Date : {l.date}
              </p>
            </div>
          </div>

          <span className={`text-xs px-3 py-1 rounded-full text-white ${l.badge}`}>
            {l.status}
          </span>
        </div>
      );
    })}
  </div>
</div>

{/* ================= EXAM RESULT ================= */}
<div className="bg-white rounded-xl border
                animate-card card-hover">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b">
    <h4 className="text-18px font-medium">Exam Result</h4>
    <div className="relative">
  <span
    onClick={() => setShowQuarterMenu(!showQuarterMenu)}
    className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer hover:underline"
  >
    <CalendarDays className="w-4 h-4 text-gray-400" />
    {activeQuarter}
  </span>

  {showQuarterMenu && (
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow text-xs z-20">
      {Object.keys(examResults).map(q => (
        <div
          key={q}
          onClick={() => {
            setActiveQuarter(q as keyof typeof examResults);
            setShowQuarterMenu(false);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {q}
        </div>
      ))}
    </div>
  )}
</div>

  </div>

  <div className="px-5 py-4">

    {/* Subject Pills */}
    <div className="flex gap-2 mb-4 flex-wrap">
  {examResults[activeQuarter].map(s => (
    <span
      key={s.label}
      className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-600"
    >
      {s.label} : {s.value}
    </span>
  ))}
</div>


    {/* Chart */}
    <div className="flex items-end justify-between h-52 px-4">

      {/* Y Axis */}
      <div className="flex flex-col justify-between h-full text-xs text-gray-400 mr-3">
        <span>100</span>
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>

      {/* Bars */}
      <div className="flex flex-1 items-end justify-between">

      <div className="flex flex-1 items-end justify-between">
  {examResults[activeQuarter].map((b, i) => (
    <div key={i} className="flex flex-col items-center gap-2">

      <div
        className={`w-10 rounded-lg ${
          b.value === Math.max(...examResults[activeQuarter].map(x => x.value))
            ? "bg-blue-600"
            : "bg-gray-200"
        }`}
        style={{ height: `${b.value * 1.5}px` }}
      />

      <span className="text-xs text-gray-500">{b.label}</span>
    </div>
  ))}
</div>


      </div>
    </div>

  </div>
</div>
{/* ================= FEES REMINDER ================= */}
<div className="bg-white rounded-xl border
                animate-card card-hover">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b">
    <h4 className="text-18px font-medium">Fees Reminder</h4>
    <span className="text-xs text-gray-500 flex items-center gap-1">
  <CalendarDays className="w-4 h-4 text-gray-400" />
  2024-2025
</span>
  </div>

  <div className="px-5 py-4 space-y-4">

    {[
      {
        title: "Transport Fees",
        amount: "$2500",
        date: "25 May 2025",
        icon: "🚌",
        iconBg: " text-blue-600",
      },
      {
        title: "Book Fees",
        amount: "$2500",
        date: "25 May 2025",
        icon: "📘",
        iconBg: "text-green-600",
      },
      {
        title: "Exam Fees",
        amount: "$2500",
        date: "25 May 2025",
        icon: "📝",
        iconBg: "text-purple-600",
      },
      {
        title: "Mess Fees",
        amount: "$2500 + $150",
        due: true,
        icon: "🍽️",
        iconBg: "text-red-600",
      },
      {
        title: "Hostel",
        amount: "$2500",
        date: "25 May 2025",
        icon: "🏨",
        iconBg: "text-yellow-600",
      },
    ].map((f, i) => (
      <div
        key={i}
        className="flex items-center justify-between border rounded-lg px-4 py-3"
      >
        {/* LEFT ICON + INFO */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${f.iconBg}`}
          >
            {f.icon}
          </div>

          <div>
            <p className="text-sm font-medium">{f.title}</p>
            <p
              className={`text-xs ${
                f.due ? "text-red-500" : "text-gray-500"
              }`}
            >
              {f.amount}
              {f.due && (
                <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">
                  Due
                </span>
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {f.due ? (
          <button className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded">
            Pay now
          </button>
        ) : (
          <div className="text-xs text-gray-500 text-right">
            <p>Last Date</p>
            <p>{f.date}</p>
          </div>
        )}
      </div>
    ))}

  </div>
</div>
</div>

{/* ================= CLASS FACULTIES ================= */}

<div className="bg-white rounded-xl border p-4 sm:p-5 mt-6
                animate-card card-hover">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Class Faculties</h4>
    <div className="hidden sm:flex gap-2">
  <button
    onClick={scrollLeft}
    className="w-8 h-8 rounded-full border flex items-center justify-center
               text-gray-500 hover:bg-gray-100 transition"
  >
    ‹
  </button>

  <button
    onClick={scrollRight}
    className="w-8 h-8 rounded-full border flex items-center justify-center
               text-gray-500 hover:bg-gray-100 transition"
  >
    ›
  </button>
</div>

  </div>
  {/* Faculty Cards */}
  <div
  ref={facultyRef}
  className="
    flex gap-4 overflow-x-auto scroll-smooth
    scrollbar-hide
  "
>
    {[
  {
    name: "Aaron",
    subject: "Chemistry",
    img: C1,
    email: "aaron@gmail.com",
    phone: "919876543210", // with country code
  },
  {
    name: "Hellana",
    subject: "English",
    img: C2,
    email: "hellana@gmail.com",
    phone: "919812345678",
  },
  
  {
    name: "Morgan",
    subject: "Physics",
    img: C3,
    email: "morgan@gmail.com",
    phone: "919834567890",
  },
  {
    name: "Daniel Josua",
    subject: "Spanish",
    img: C4,
    email: "daniel@gmail.com",
    phone: "919845612378",
  },
  {
    name: "Ram",
    subject: "Maths",
    img: C4,
    email: "ram123@gmail.com",
    phone: "919845612378",
  },
  {
    name: "Kumar",
    subject: "Social",
    img: C1,
    email: "kkummar@gmail.com",
    phone: "919845612378",
  },
]
.map((f, i) => (
  <div
  key={i}
  className="min-w-[240px] border rounded-lg p-4 flex-shrink-0"
>
          {/* Avatar + Info */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={f.img}
            alt={f.name}
            className="w-10 h-10 rounded-lg object-cover"
          />

          <div>
            <p className="text-sm font-semibold leading-tight">
              {f.name}
            </p>
            <p className="text-xs text-gray-500">
              {f.subject}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
  <a
    href={`mailto:${f.email}`}
    className="flex-1 flex items-center justify-center gap-1
               text-xs border rounded-md py-1.5
               text-gray-600 hover:bg-gray-50"
  >
    ✉️ Email
  </a>

  <a
    href={`https://wa.me/${f.phone}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-1
               text-xs border rounded-md py-1.5
               text-gray-600 hover:bg-gray-50"
  >
    💬 Chat
  </a>
</div>

      </div>
    ))}

  </div>
</div>
{/* ================= NOTICE + SYLLABUS + TODO ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
  {/* ================= NOTICE BOARD ================= */}
  <div className="bg-white rounded-xl border p-4 sm:p-5
                animate-card card-hover">
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Notice Board</h4>
    <span
  onClick={() => setShowAllNotices(true)}
  className="text-xs text-blue-600 cursor-pointer hover:underline"
>
  View All
</span>

  </div>

  {notices.slice(0, 5).map((n, i) => (
  <div
    key={i}
    className="flex items-start gap-3 py-3 border-b last:border-none"
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${n.color}`}
    >
      {n.icon}
    </div>

    <div className="flex-1">
      <p className="text-sm font-medium">{n.title}</p>
      <p className="text-xs text-gray-500">
        Added on : {n.date}
      </p>
    </div>

    <span className="text-gray-400">›</span>
  </div>
))}

</div>

{/* ================= SYLLABUS ================= */}
<div className="bg-white rounded-xl border p-5 animate-card card-hover">

  {/* Header */}
  <h4 className="text-lg font-semibold mb-3">
    Syllabus
  </h4>

  {/* Info box (BLUE like Image 1) */}
  <div className="
    flex items-start gap-2
    bg-blue-50 border border-blue-200
    text-blue-600 text-sm
    rounded-lg px-4 py-3
    mb-5
  ">
    <span className="text-lg">ℹ️</span>
    <p>
      These Result are obtained from the syllabus completion on the respective Class
    </p>
  </div>

  {/* Progress list */}
  {[
    { sub: "Maths", w: "20%", c: "bg-indigo-500" },
    { sub: "Physics", w: "35%", c: "bg-sky-400" },
    { sub: "Chemistry", w: "55%", c: "bg-blue-600" },
    { sub: "Botany", w: "45%", c: "bg-green-500" },
    { sub: "English", w: "65%", c: "bg-yellow-500" },
    { sub: "Spanish", w: "80%", c: "bg-red-500" },
  ].map((s, i) => (
    <div
      key={i}
      className="flex items-center gap-4 mb-3 last:mb-0"
    >
      {/* Subject */}
      <span className="w-24 text-sm font-medium text-gray-700">
        {s.sub}
      </span>

      {/* Progress bar */}
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${s.c} rounded-full`}
          style={{ width: s.w }}
        />
      </div>
    </div>
  ))}
</div>
  {/* ================= TODO ================= */}
  <div className="bg-white rounded-xl border p-4 sm:p-5
                animate-card card-hover">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-18px font-medium">Todo</h4>
      <span className="text-xs text-gray-500">Today</span>
    </div>
    {[
      { t: "Send Reminder to Students", time: "01:00 PM", status: "Completed", color: "bg-green-100 text-green-600", checked: true },
      { t: "Create Routine to new staff", time: "04:50 PM", status: "Inprogress", color: "bg-blue-100 text-blue-600" },
      { t: "Extra Class Info to Students", time: "04:55 PM", status: "Yet to Start", color: "bg-yellow-100 text-yellow-600" },
      { t: "Fees for Upcoming Academics", time: "04:55 PM", status: "Yet to Start", color: "bg-yellow-100 text-yellow-600" },
      { t: "English - Essay on Visit", time: "05:00 PM", status: "Yet to Start", color: "bg-yellow-100 text-yellow-600" },
    ].map((t, i) => (
      <div key={i} className="flex items-start gap-3 py-3 border-b last:border-none">
        <input type="checkbox" defaultChecked={t.checked} className="mt-1" />
        <div className="flex-1">
          <p className="text-sm font-medium">{t.t}</p>
          <p className="text-xs text-gray-500">{t.time}</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.color}`}>
          {t.status}
        </span>
      </div>
    ))}
  </div>

</div>
  {showAddExam && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-5 w-[300px]">
            <h4 className="text-sm font-semibold mb-3">Add Exam</h4>

            <input
              type="date"
              className="border rounded w-full text-xs px-2 py-2 mb-3"
              onChange={e => handleAddExam(e.target.value)}
            />

            <button
              onClick={() => setShowAddExam(false)}
              className="w-full border text-xs py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
{/* ================= ATTENDANCE MONTH POPUP ================= */}
{showAttendanceDetails && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[380px] p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold">
          Monthly Attendance Summary
        </h4>
        <button
          onClick={() => setShowAttendanceDetails(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* STUDENT INFO */}
      <div className="flex items-center gap-3 border rounded-lg p-3 mb-4">
        <img
          src={StudentAvatar}
          alt="Student"
          className="w-10 h-10 rounded-lg object-cover"
        />

        <div>
          <p className="text-sm font-semibold">
            Angelo Riana
          </p>
          <p className="text-xs text-gray-500">
            Class III • Section C
          </p>
        </div>
      </div>

      {/* ATTENDANCE STATS */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {attendancePercentage}%
          </p>
          <p className="text-gray-500">
            Attendance
          </p>
        </div>

        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-red-600">
            {leaveDays}
          </p>
          <p className="text-gray-500">
            Leave Days
          </p>
        </div>
      </div>

      {/* EXTRA DETAILS */}
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Total Working Days</span>
          <span className="font-medium">
            {totalWorkingDays}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Present Days</span>
          <span className="font-medium text-green-600">
            {presentDays}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Late / Half Day</span>
          <span className="font-medium text-blue-600">
            {lateDays + halfDays}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <button
        onClick={() => setShowAttendanceDetails(false)}
        className="mt-5 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>

    </div>
  </div>
)}
{showAllNotices && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] max-h-[500px] overflow-hidden shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h4 className="text-lg font-semibold">All Notices</h4>
        <button
          onClick={() => setShowAllNotices(false)}
          className="text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[420px]">
        {notices.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${n.color}`}
            >
              {n.icon}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-gray-500">
                Added on : {n.date}
              </p>
            </div>

            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{showAllHomeWorks && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[450px] max-h-[520px] overflow-hidden shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h4 className="text-lg font-semibold">All Home Works</h4>
        <button
          onClick={() => setShowAllHomeWorks(false)}
          className="text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 overflow-y-auto max-h-[450px]">
        {allHomeWorks.map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50"
          >
            <img
              src={h.img}
              alt={h.sub}
              className="w-12 h-12 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="text-xs font-medium text-blue-600">{h.sub}</p>
              <p className="text-sm font-medium">{h.title}</p>
              <p className="text-xs text-gray-500">
                👤 {h.teacher} • Due : {h.due}
              </p>
            </div>

            <span className="text-xs font-semibold">
              {h.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{showExamPopup && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Exam Result</h4>
        <button onClick={() => {
          setShowExamPopup(false);
          setShowResult(false);
        }}>✕</button>
      </div>

      {/* Input Form */}
      {!showResult && (
        <>
          <input
            placeholder="Roll Number"
            value={rollNo}
            onChange={e => setRollNo(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-3 text-sm"
          />

          <input
            placeholder="Student Name"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-4 text-sm"
          />

          <button
            onClick={() => setShowResult(true)}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            View Result
          </button>
        </>
      )}

      {/* Result Display */}
      {showResult && (
        <div className="border rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">
            {studentName} ({rollNo})
          </p>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs">
              Maths : 92
            </span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs">
              Physics : 88
            </span>
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded text-xs">
              Chemistry : 85
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs">
              English : 78
            </span>
          </div>

          <button
            onClick={() => setShowExamPopup(false)}
            className="mt-4 w-full border py-2 rounded"
          >
            Close
          </button>
        </div>
      )}

    </div>
  </div>
)}
{showFeesPopup && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5">

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Fees Details</h4>
        <button onClick={() => setShowFeesPopup(false)}>✕</button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between border p-3 rounded">
          <span>Tuition Fees</span>
          <span className="font-semibold">₹25,000</span>
        </div>
        <div className="flex justify-between border p-3 rounded">
          <span>Exam Fees</span>
          <span className="font-semibold">₹2,500</span>
        </div>
        <div className="flex justify-between border p-3 rounded">
          <span>Transport Fees</span>
          <span className="font-semibold">₹5,000</span>
        </div>
      </div>

      <button
        onClick={() => setShowFeesPopup(false)}
        className="mt-4 w-full border py-2 rounded"
      >
        Close
      </button>

    </div>
  </div>
)}
{showEditProfile && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[380px] p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Edit Profile</h4>
        <button
          onClick={() => setShowEditProfile(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <input
          value={editProfile.name}
          onChange={e =>
            setEditProfile({ ...editProfile, name: e.target.value })
          }
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Student Name"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            value={editProfile.className}
            onChange={e =>
              setEditProfile({ ...editProfile, className: e.target.value })
            }
            className="border rounded px-3 py-2 text-sm"
            placeholder="Class"
          />

          <input
            value={editProfile.section}
            onChange={e =>
              setEditProfile({ ...editProfile, section: e.target.value })
            }
            className="border rounded px-3 py-2 text-sm"
            placeholder="Section"
          />
        </div>

        <input
          value={editProfile.rollNo}
          onChange={e =>
            setEditProfile({ ...editProfile, rollNo: e.target.value })
          }
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Roll No"
        />
      </div>
      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => setShowEditProfile(false)}
          className="flex-1 border rounded-lg py-2 text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            // later you can call API here
            setShowEditProfile(false);
          }}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{showLeaveYearDetails && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">
          Leave Summary - {currentYear}
        </h4>
        <button
          onClick={() => setShowLeaveYearDetails(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold">{totalLeaves}</p>
          <p className="text-gray-500">Total Leaves</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-600">{approvedLeaves}</p>
          <p className="text-gray-500">Approved</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-blue-600">{pendingLeaves}</p>
          <p className="text-gray-500">Pending</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-red-600">{declinedLeaves}</p>
          <p className="text-gray-500">Declined</p>
        </div>
      </div>

      {/* Leave List */}
      <div className="space-y-3 max-h-[260px] overflow-y-auto">
        {yearLeaves.map((l, i) => (
          <div
            key={i}
            className="border rounded-lg p-3 text-xs"
          >
            <p className="font-medium text-sm">{l.title}</p>
            <p className="text-gray-500">
              📅 {new Date(l.date).toDateString()}
            </p>
            <p className="text-gray-500">
              📝 {l.reason}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-[10px]
                ${
                  l.status === "Approved"
                    ? "bg-green-500"
                    : l.status === "Pending"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
            >
              {l.status}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowLeaveYearDetails(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  </div>
)}
{showViewExams && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Exam Schedule</h4>
        <button
          onClick={() => setShowViewExams(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* EXAM LIST */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {exams.map((e, i) => (
          <div key={i} className="border rounded-lg p-3">
            <p className="text-sm font-semibold">{e.subject}</p>

            <p className="text-xs text-gray-500">
              📅 {e.date.toDateString()}
            </p>

            <p className="text-xs text-gray-500">
              🕒 {e.time}
            </p>

            <p className="text-xs text-blue-600">
              📍 Room No : {e.room}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <button
        onClick={() => setShowViewExams(false)}
        className="mt-4 w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
      >
        Close
      </button>

    </div>
  </div>
)}

  </> 
 // </DashboardLayout>
  );
}
