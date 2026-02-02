import DashboardLayout from "../../components/DashboardLayout";
import JaImg from "../../assets/ja.png";
import JoImg from "../../assets/jo.png";
import Event1 from "../../assets/e1.png";
import Event2 from "../../assets/e2.png";
import Event3 from "../../assets/e3.png";
import Event4 from "../../assets/e4.png";
import Event5 from "../../assets/e5.png";
import Event6 from "../../assets/e6.png";
import H1 from "../../assets/h1.png";
import H2 from "../../assets/h2.png";
import H3 from "../../assets/h3.png";
import H4 from "../../assets/h4.png";
import J1 from "../../assets/j1.png";
import J2 from "../../assets/j2.png";
import J3 from "../../assets/j3.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ParentDashboard() {
  const navigate = useNavigate();
  const [showEditParent, setShowEditParent] = useState(false);

const [parentProfile, setParentProfile] = useState({
  id: "#P124556",
  name: "Thomas Brown",
  child: "Janet",
  addedOn: "25 Mar 2024",
});

  const [statsRange, setStatsRange] = useState<"month" | "year">("month");
  const [showAllFeesPopup, setShowAllFeesPopup] = useState(false);
  const [showSelectChildPopup, setShowSelectChildPopup] = useState(false);
  const [showAllExamsPopup, setShowAllExamsPopup] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [showAllNotices, setShowAllNotices] = useState(false);

  const homeWorks = [
    {
      sub: "Physics",
      sc: "text-blue-600",
      ib: "bg-blue-100",
      ic: "📘",
      t: "Write about Theory of Pendulum",
      u: "Aaron",
      d: "16 Jun 2024",
      img: H1,
    },
    {
      sub: "Chemistry",
      sc: "text-green-600",
      ib: "bg-green-100",
      ic: "🧪",
      t: "Chemistry - Change of Elements",
      u: "Hellana",
      d: "18 Jun 2024",
      img: H2,
    },
    {
      sub: "Maths",
      sc: "text-red-500",
      ib: "bg-red-100",
      ic: "📐",
      t: "Maths - Problems to Solve Page 21",
      u: "Morgan",
      d: "21 Jun 2024",
      img: H3,
    },
    {
      sub: "English",
      sc: "text-cyan-600",
      ib: "bg-cyan-100",
      ic: "📖",
      t: "English - Vocabulary Introduction",
      u: "Daniel Josua",
      d: "21 Jun 2024",
      img: H4,
    },
  ];
  const examImages: Record<string, string> = {
    Janet: J1,
    Joann: J2,
    Kathleen: J3,
    Gifford: JaImg,
    Lisa: JoImg,
  };
  const events = [
    {
      title: "Parents, Teacher Meet",
      date: "15 July 2024",
      type: "Full Day",
      color: "bg-red-100 text-red-600",
      img: Event2,
    },
    {
      title: "Farewell",
      date: "11 Mar 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event3,
    },
    {
      title: "Annual Day",
      date: "15 July 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event4,
    },
    {
      title: "Holi Celebration",
      date: "15 July 2024",
      type: "Full Day",
      color: "bg-red-100 text-red-600",
      img: Event5,
    },
    {
      title: "Exam Result",
      date: "15 July 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event6,
    },
  ];
  const notices = [
    {
      title: "New Syllabus Instructions",
      date: "11 Mar 2024",
      desc: "Detailed syllabus instructions for the upcoming academic term.",
      bg: "bg-blue-100 text-blue-600",
    },
    {
      title: "World Environment Day",
      date: "21 Apr 2024",
      desc: "Activities and awareness programs related to environment day.",
      bg: "bg-green-100 text-green-600",
    },
    {
      title: "Exam Preparation Notification!",
      date: "13 Mar 2024",
      desc: "Guidelines and schedules for upcoming examinations.",
      bg: "bg-red-100 text-red-500",
    },
    {
      title: "Online Classes Preparation",
      date: "24 May 2024",
      desc: "Preparation guidelines for online class sessions.",
      bg: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Exam Time Table Release",
      date: "24 May 2024",
      desc: "Official exam timetable has been released.",
      bg: "bg-yellow-100 text-yellow-600",
    },
  ];
  
  const [showApplyLeave, setShowApplyLeave] = useState(false);
const [showRaiseRequest, setShowRaiseRequest] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [showAllEventsPopup, setShowAllEventsPopup] = useState(false);
const [showAllSubjectsPopup, setShowAllSubjectsPopup] = useState(false);

  const [showAllEvents, setShowAllEvents] = useState(false);
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
  
    const index = Math.round((x / rect.width) * (months.length - 1));
    setHoverIndex(Math.max(0, Math.min(index, months.length - 1)));
  };
  
  const handleMouseLeave = () => {
    setHoverIndex(null);
  };
  
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const examValues = statsRange === "month"
  ? [70,72,75,78,82,79,76,80,78,79,81,83]
  : [68,70,72,74,76,78,80,82,84,85,86,88];

const attendanceValues = statsRange === "month"
  ? [85,87,88,86,84,89,90,88,89,90,92,93]
  : [82,83,84,85,86,87,88,89,90,91,92,93];

const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const statisticsData = {
    month: {
      examAvg: "72%",
      attendanceAvg: "95%",
      examPoints: "0,160 80,150 160,130 240,110 320,120 400,140 480,110 600,80",
      attendancePoints: "0,140 80,130 160,140 240,150 320,110 400,90 480,95 600,85",
    },
    year: {
      examAvg: "78%",
      attendanceAvg: "90%",
      examPoints: "0,180 80,170 160,160 240,140 320,130 400,120 480,110 600,100",
      attendancePoints: "0,160 80,150 160,145 240,140 320,135 400,130 480,125 600,120",
    },
  };
  
  return (
    //<DashboardLayout>
<>
      {/* ================= PAGE TITLE ================= */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-semibold">Parent Dashboard</h2>
          <p className="text-sm text-gray-500">
            Dashboard / Parent Dashboard
          </p>
        </div>

        <div className="flex -space-x-2">
  <img
    src={JaImg}
    alt="Janet"
    className="w-9 h-9 rounded-full border-2 border-white object-cover"
  />
  <img
    src={JoImg}
    alt="Joann"
    className="w-9 h-9 rounded-full border-2 border-white object-cover"
  />
</div>

      </div>

      {/* ================= TOP GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 items-stretch">

        {/* ================= PROFILE ================= */}
        <div className="xl:col-span-2">
          <div className="h-full relative overflow-hidden rounded-xl p-3 text-white bg-gradient-to-r from-[#0F1025] to-[#1A1C3A]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,200,255,0.15)_0%,transparent_40%)]" />
            <div className="relative flex items-center gap-4">
            <img
  src={Event1}
  alt="Profile"
  className="w-14 h-14 rounded-xl border border-white/20 object-cover"
/>

              <div>
              <span className="inline-block text-[10px] px-2 py-[2px] rounded bg-blue-600 mb-1">
  {parentProfile.id}
</span>
<p className="font-semibold text-base">
  {parentProfile.name}
</p>     
<button
  onClick={() => setShowEditParent(true)}
  className="absolute top-3 right-3 text-xs bg-blue-600 px-3 py-1 rounded"
>
  Edit
</button>

<p className="text-xs text-gray-300">
  Added On : {parentProfile.addedOn} | Child : {parentProfile.child}
</p>
              </div>
            </div>
            
          </div>
          
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col gap-3">

          {/* Apply Leave */}
          <div
  onClick={() => setShowApplyLeave(true)}
  className="h-[60px] bg-white border rounded-xl px-4
             flex items-center justify-between cursor-pointer hover:bg-gray-50"
>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg 
                              flex items-center justify-center text-blue-600">
                📄
              </div>
              <p className="text-sm font-medium">Apply Leave</p>
            </div>
            <span className="text-gray-400 text-lg">›</span>
          </div>

          {/* Raise Request */}
          <div
  onClick={() => setShowRaiseRequest(true)}
  className="h-[60px] bg-white border rounded-xl px-4
             flex items-center justify-between cursor-pointer hover:bg-gray-50"
>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg 
                              flex items-center justify-center text-purple-600">
                📨
              </div>
              <p className="text-sm font-medium">Raise Request</p>
            </div>
            <span className="text-gray-400 text-lg">›</span>
          </div>

        </div>

        {/* ================= MEDICAL LEAVE ================= */}
        <div className="bg-green-50 border rounded-xl
                        flex flex-col items-center justify-center text-center px-3 py-3">

<div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center mb-2">
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Calendar */}
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />

    {/* Arrow */}
    <path d="M14 14h6v6" />
    <path d="M20 14l-7 7" />
  </svg>
</div>


          <p className="text-sm font-semibold">
            Medical Leaves (10)
          </p>

          <div className="flex gap-3 text-xs text-gray-600 mt-1">
            <span>Used : <b>05</b></span>
            <span>Available : <b>05</b></span>
          </div>
        </div>

        {/* ================= CASUAL LEAVE ================= */}
        <div className="bg-blue-50 border rounded-xl
                        flex flex-col items-center justify-center text-center px-4">

<div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mb-2">
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cube */}
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.27 6.96L12 12.01l8.73-5.05" />
    <path d="M12 22V12" />

    {/* Plus */}
    <line x1="18" y1="10" x2="18" y2="16" />
    <line x1="15" y1="13" x2="21" y2="13" />
  </svg>
</div>


          <p className="text-sm font-semibold">
            Casual Leaves (12)
          </p>

          <div className="flex gap-3 text-xs text-gray-600 mt-1">
            <span>Used : <b>05</b></span>
            <span>Available : <b>05</b></span>
          </div>
        </div>

      </div>
      {/* ================= EVENTS + STATISTICS ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

{/* ================= EVENTS LIST (LEFT) ================= */}
<div className="bg-white rounded-xl border p-5">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Events List</h4>
    <button
  onClick={() => setShowAllEventsPopup(true)}
  className="text-xs text-gray-600 hover:underline"
>
  Show All
</button>


  </div>

  {[
    {
      title: "Parents, Teacher Meet",
      date: "15 July 2024",
      type: "Full Day",
      color: "bg-red-100 text-red-600",
      img: Event2,
    },
    {
      title: "Farewell",
      date: "11 Mar 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event3,
    },
    {
      title: "Annual Day",
      date: "15 July 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event4,
    },
    {
      title: "Holi Celebration",
      date: "15 July 2024",
      type: "Full Day",
      color: "bg-red-100 text-red-600",
      img: Event5,
    },
    {
      title: "Exam Result",
      date: "15 July 2024",
      type: "Half Day",
      color: "bg-blue-100 text-blue-600",
      img: Event6,
    },
  ].map((e, i) => (
    <div
      key={i}
      className="flex items-center justify-between py-3 border-b last:border-none card-hover cursor-pointer"
      >
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={e.img}
          className="w-9 h-9 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-medium">{e.title}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA3AF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
  {e.date}
</p>
 </div>
      </div>

      {/* Badge */}
      <span
        className={`text-[10px] px-2 py-1 rounded ${e.color}`}
      >
        {e.type}
      </span>
    </div>
  ))}
</div>

{/* ================= STATISTICS (RIGHT) ================= */}
<div className="xl:col-span-2 bg-white rounded-xl border p-5">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Statistics</h4>

    <button
  onClick={() =>
    setStatsRange(prev => (prev === "month" ? "year" : "month"))
  }
  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
>
  {statsRange === "month" ? "This Month" : "This Year"}
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
  </svg>
</button>

  </div>

  {/* Legend */}
  <div className="flex items-center gap-6 text-xs text-gray-500 mb-4">
    <span className="flex items-center gap-2">
      <span className="w-2 h-2 bg-blue-600 rounded-full" />
      Avg. Exam Score : {statisticsData[statsRange].examAvg}
    </span>
    <span className="flex items-center gap-2">
      <span className="w-2 h-2 bg-cyan-500 rounded-full" />
      Avg. Attendance : {statisticsData[statsRange].attendanceAvg}
    </span>
  </div>

  {/* Chart (SVG – lightweight) */}
  <div className="relative h-[220px] w-full">

    {/* Grid */}
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-5">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="border-t border-l border-gray-100" />
      ))}
    </div>

    {/* Lines */}
    <svg
  viewBox="0 0 600 250"
  className="absolute inset-0 w-full h-full"
  preserveAspectRatio="none"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>

      {/* Exam Score */}
      <polyline
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        points={statisticsData[statsRange].examPoints}
        />

      {/* Attendance */}
      <polyline
        fill="none"
        stroke="#06B6D4"
        strokeWidth="3"
        points={statisticsData[statsRange].attendancePoints}
        />
{hoverIndex !== null && (
  <line
    x1={(hoverIndex / 11) * 600}
    y1="0"
    x2={(hoverIndex / 11) * 600}
    y2="250"
    stroke="#CBD5E1"
    strokeDasharray="4"
  />
)}

      {/* Highlight (Aug) */}
      <rect
        x="280"
        y="0"
        width="60"
        height="250"
        fill="#E0E7FF"
        opacity="0.6"
      />
    </svg>

    {/* Tooltip */}
    {hoverIndex !== null && (
  <div
    className="absolute bg-white shadow-md border rounded-lg px-3 py-2 text-xs pointer-events-none"
    style={{
      left: `${(hoverIndex / 11) * 100}%`,
      top: "30px",
      transform: "translateX(-50%)",
    }}
  >
    <p className="font-medium mb-1">{months[hoverIndex]} 2024</p>
    <p className="text-blue-600">
      Exam Score : {examValues[hoverIndex]}%
    </p>
    <p className="text-cyan-600">
      Attendance : {attendanceValues[hoverIndex]}%
    </p>
  </div>
)}

  </div>

  {/* Months */}
  <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
      <span key={m}>{m}</span>
    ))}
  </div>

</div>
</div>
{/* ================= LEAVE STATUS + HOME WORKS + FEES REMINDER ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

  {/* ================= LEAVE STATUS ================= */}
  <div className="bg-white rounded-xl border p-5">

{/* Header */}
<div className="flex items-center justify-between mb-4">
  <h4 className="text-18px font-medium">Leave Status</h4>
  {/*<span className="flex items-center gap-1 text-xs text-gray-500">
    📅 This Year
  </span>*/}
</div>

{[
  { title: "Emergency Leave", status: "Pending", s: "bg-blue-500", ib: "bg-red-100", ic: "text-red-500" },
  { title: "Medical Leave", status: "Approved", s: "bg-green-500", ib: "bg-blue-100", ic: "text-blue-500" },
  { title: "Medical Leave", status: "Declined", s: "bg-red-500", ib: "bg-blue-100", ic: "text-blue-500" },
  { title: "Fever", status: "Approved", s: "bg-green-500", ib: "bg-red-100", ic: "text-red-500" },
].map((l, i) => (
  <div
    key={i}
    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-3"
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${l.ib}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={l.ic}>
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div>
        <p className="text-sm font-medium leading-tight">{l.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">Leave Date : 15 Jun 2024</p>
      </div>
    </div>

    <span className={`text-[11px] px-3 py-0.5 rounded-full text-white ${l.s}`}>
      {l.status}
    </span>
  </div>
))}
</div>
{/* ================= HOME WORKS ================= */}
<div className="bg-white rounded-xl border p-5">

  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Home Works</h4>
    <span
  onClick={() => setShowAllSubjectsPopup(true)}
  className="text-xs text-gray-600 flex items-center gap-1 cursor-pointer hover:underline"
>
  📚 All Subjects
</span>

  </div>

  {homeWorks.map((h, i) => (
    <div
    key={i}
    className="flex gap-3 px-3 py-2.5 rounded-lg mb-2.5 card-hover cursor-pointer"
  >
  
      <img
        src={h.img}
        alt={h.sub}
        className="w-10 h-10 rounded-lg object-cover"
      />

      <div className="flex-1">
        <div className={`flex items-center gap-2 text-xs font-medium mb-0.5 ${h.sc}`}>
          <span className={`w-5 h-5 rounded-md flex items-center justify-center ${h.ib}`}>
            {h.ic}
          </span>
          {h.sub}
        </div>

        <p className="text-sm font-semibold leading-snug">{h.t}</p>

        <p className="text-xs text-gray-500 mt-0.5">
          👤 {h.u} &nbsp; Due by : {h.d}
        </p>
      </div>
    </div>
  ))}

</div>
{/* ================= FEES REMINDER ================= */}
<div className="bg-white rounded-xl border p-5">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Fees Reminder</h4>
    <span
  onClick={() => setShowAllFeesPopup(true)}
  className="text-xs text-gray-600 cursor-pointer hover:underline"
>
  View All
</span>
  </div>

  {[
    { t: "Transport Fees", a: "₹2500", d: "25 May 2024", ic: "🚌", ib: "bg-blue-100" },
    { t: "Book Fees", a: "₹2500", d: "25 May 2024", ic: "📘", ib: "bg-green-100" },
    { t: "Exam Fees", a: "₹2500 + ₹150", due: true, ic: "📝", ib: "bg-cyan-100" },
    { t: "Hostel", a: "₹2500", d: "25 May 2024", ic: "🏨", ib: "bg-red-100" },
  ].map((f, i) => (
    <div
  key={i}
  className="flex items-center justify-between px-4 py-3 rounded-lg border mb-3 hover:bg-gray-50 card-hover cursor-pointer"
>

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.ib}`}>
          {f.ic}
        </div>

        <div>
          <p className="text-sm font-medium">{f.t}</p>
          <p className={`text-xs ${f.due ? "text-red-500" : "text-gray-500"}`}>
            {f.a}
            {f.due && (
              <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">
                Due
              </span>
            )}
          </p>
        </div>
      </div>

      {f.due ? (
  <button
    onClick={() =>
      navigate("/parent/dashboard/fees/pay", {
        state: {
          title: f.t,
          amount: f.a,
          due: f.due,
        },
      })
    }
    className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded"
  >
    Pay now
  </button>
) : (

        <div className="text-xs text-gray-500 text-right">
          <p>Last Date</p>
          <p>{f.d}</p>
        </div>
      )}
    </div>
  ))}
</div>
</div>
{/* ================= EXAM RESULT + NOTICE BOARD ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

  {/* ================= EXAM RESULT ================= */}
  <div className="xl:col-span-2 bg-white rounded-xl border">

    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b">
      <h4 className="text-18px font-medium">Exam Result</h4>

      <div className="flex items-center gap-3 text-xs text-gray-500">
  <span
    onClick={() => setShowSelectChildPopup(true)}
    className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
  >
    📅 Select Child
  </span>

  <span
    onClick={() => setShowAllExamsPopup(true)}
    className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
  >
    📑 All Exams
  </span>
</div>

    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 text-gray-500">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="text-left">Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Marks %</th>
            <th>Exams</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {[
{ id: 35013, name: "Janet", cls: "III", sec: "A", marks: "89%", exam: "Quartely", status: "Pass" },
{ id: 35012, name: "Joann", img: 12, cls: "IV", sec: "B", marks: "88%", exam: "Practical", status: "Pass" },
            { id: 35011, name: "Kathleen", img: 13, cls: "II", sec: "A", marks: "21%", exam: "1st Term", status: "Pass" },
            { id: 35010, name: "Gifford", img: 14, cls: "I", sec: "B", marks: "69%", exam: "Mid Term", status: "Pass" },
            { id: 35009, name: "Lisa", img: 15, cls: "II", sec: "B", marks: "31%", exam: "Annual", status: "Fail" },
          ].map((s, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="px-4 py-3 text-gray-500">{s.id}</td>

              <td className="py-3">
                <div className="flex items-center gap-2">
                <img
  src={examImages[s.name]} 
  alt={s.name}
  className="w-8 h-8 rounded-full object-cover border"
/>

                  <span className="font-medium">{s.name}</span>
                </div>
              </td>

              <td className="text-center">{s.cls}</td>
              <td className="text-center">{s.sec}</td>
              <td className="text-center">{s.marks}</td>
              <td className="text-center text-gray-600">{s.exam}</td>

              <td className="text-center">
                <span
                  className={`px-3 py-0.5 rounded-full text-[11px] text-white font-medium
                    ${s.status === "Pass" ? "bg-green-500" : "bg-red-500"}`}
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center px-5 py-4 text-xs text-gray-500">
      <span>Showing 5 Entries</span>
      <span className="text-gray-600 cursor-pointer">View All</span>
    </div>
  </div>

  {/* ================= NOTICE BOARD ================= */}
  <div className="bg-white rounded-xl border">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b">
    <h4 className="text-18px font-medium">Notice Board</h4>
    <span
  onClick={() => setShowAllNotices(true)}
  className="text-xs text-gray-600 cursor-pointer hover:underline"
>
  View All
</span>
  </div>

  {/* Notices */}
  <div className="p-5 space-y-4">
    {[
      {
        title: "New Syllabus Instructions",
        date: "11 Mar 2024",
        bg: "bg-blue-100 text-blue-600",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        title: "World Environment Day",
        date: "21 Apr 2024",
        bg: "bg-green-100 text-green-600",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 2C7 7 6 11 6 14a6 6 0 0012 0c0-3-1-7-6-12z"
              stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        title: "Exam Preparation Notification!",
        date: "13 Mar 2024",
        bg: "bg-red-100 text-red-500",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 22a2 2 0 100-4 2 2 0 000 4zM12 2v14"
              stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        title: "Online Classes Preparation",
        date: "24 May 2024",
        bg: "bg-cyan-100 text-cyan-600",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="14" rx="2"
              stroke="currentColor" strokeWidth="2"/>
            <path d="M8 20h8" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        title: "Exam Time Table Release",
        date: "24 May 2024",
        bg: "bg-yellow-100 text-yellow-600",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M4 7h16v13H4z" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 7l8-4 8 4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
    ].map((n, i) => (
      <div
  key={i}
  className="flex items-center justify-between p-3 rounded-lg cursor-pointer card-hover"
>

        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${n.bg}`}
          >
            {n.icon}
          </div>

          <div>
            <p className="text-sm font-medium leading-tight">
              {n.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"
                  stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"
                  stroke="currentColor" strokeWidth="2"/>
              </svg>
              Added on : {n.date}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <span className="text-gray-400 text-lg">›</span>
      </div>
    ))}
  </div>
</div>

</div>
{showApplyLeave && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
<div className="bg-white rounded-xl w-[420px] p-5 animate-popup">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Apply Leave</h4>
        <button
          onClick={() => setShowApplyLeave(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>
{/* Student Details */}
<div className="space-y-3 mb-4">

  <input
    type="text"
    placeholder="Student Name"
    className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
  />

  <div className="grid grid-cols-2 gap-3">
    <input
      type="text"
      placeholder="Class"
      className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      placeholder="Section"
      className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

</div>


      {/* Form */}
      <div className="space-y-3 text-sm">

        <input
          type="number"
          placeholder="No of Leave Days"
          className="w-full border rounded-lg px-3 py-2"
        />

        <select className="w-full border rounded-lg px-3 py-2">
          <option>Select Leave Type</option>
          <option>Medical Leave</option>
          <option>Casual Leave</option>
          <option>Emergency Leave</option>
        </select>

        <textarea
          rows={3}
          placeholder="Reason for Leave"
          className="w-full border rounded-lg px-3 py-2 resize-none"
        />

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setShowApplyLeave(false)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>
        <button
  onClick={() => {
    setShowApplyLeave(false);
    setSuccessMessage("Leave Applied Successfully ✅");
  }}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
>
  Save
</button>

      </div>

    </div>
  </div>
)}
{showRaiseRequest && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
<div className="bg-white rounded-xl w-[420px] p-5 animate-popup">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Raise Request</h4>
        <button
          onClick={() => setShowRaiseRequest(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="space-y-3 text-sm">

        <input
          placeholder="Request Title"
          className="w-full border rounded-lg px-3 py-2"
        />

        <select className="w-full border rounded-lg px-3 py-2">
          <option>Select Category</option>
          <option>Transport</option>
          <option>Fees</option>
          <option>Academics</option>
          <option>Other</option>
        </select>

        <textarea
          rows={4}
          placeholder="Request Description"
          className="w-full border rounded-lg px-3 py-2 resize-none"
        />

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setShowRaiseRequest(false)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>
        <button
  onClick={() => {
    setShowRaiseRequest(false);
    setSuccessMessage("Request Submitted Successfully 🎉");
  }}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
>
  Submit
</button>

      </div>

    </div>
  </div>
)}
{successMessage && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[320px] p-6 text-center animate-card">

      <div className="text-4xl mb-3">✅</div>

      <p className="text-sm font-semibold mb-5">
        {successMessage}
      </p>

      <button
        onClick={() => setSuccessMessage("")}
        className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg"
      >
        OK
      </button>
    </div>
  </div>
)}
{showAllEventsPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[480px] max-h-[80vh] p-5  animate-popup overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">All Events</h4>
        <button
          onClick={() => setShowAllEventsPopup(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
        {events.map((e, i) => (
          <div
          key={i}
          className="flex items-center justify-between border rounded-lg p-3 card-hover cursor-pointer"
        >
        
            <div className="flex items-center gap-3">
              <img
                src={e.img}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium">{e.title}</p>
                <p className="text-xs text-gray-500">{e.date}</p>
              </div>
            </div>

            <span className={`text-[10px] px-2 py-1 rounded ${e.color}`}>
              {e.type}
            </span>
          </div>
        ))}
      </div>

    </div>
  </div>
)}
{showAllSubjectsPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5 max-h-[80vh] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">All Subjects</h4>
        <button
          onClick={() => setShowAllSubjectsPopup(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Subject List */}
      <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">

        {[
          { name: "Physics", teacher: "Aaron", icon: "📘", bg: "bg-blue-100 text-blue-600" },
          { name: "Chemistry", teacher: "Hellana", icon: "🧪", bg: "bg-green-100 text-green-600" },
          { name: "Maths", teacher: "Morgan", icon: "📐", bg: "bg-red-100 text-red-500" },
          { name: "English", teacher: "Daniel Josua", icon: "📖", bg: "bg-cyan-100 text-cyan-600" },
          { name: "Biology", teacher: "Sophia", icon: "🧬", bg: "bg-purple-100 text-purple-600" },
          { name: "Computer Science", teacher: "James", icon: "💻", bg: "bg-gray-100 text-gray-700" },
        ].map((s, i) => (
          <div
  key={i}
  className="flex items-center justify-between border rounded-lg p-3 card-hover cursor-pointer"
>

            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}
              >
                {s.icon}
              </div>

              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">
                  Teacher : {s.teacher}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
)}
{showAllFeesPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[420px] p-5 max-h-[80vh] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Fees Details</h4>
        <button
          onClick={() => setShowAllFeesPopup(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Fees List */}
      <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">

        {[
          { title: "Transport Fees", amount: "$2500", date: "25 May 2024", due: false, icon: "🚌", bg: "bg-blue-100" },
          { title: "Book Fees", amount: "$2500", date: "25 May 2024", due: false, icon: "📘", bg: "bg-green-100" },
          { title: "Exam Fees", amount: "$2500 + $150", due: true, icon: "📝", bg: "bg-cyan-100" },
          { title: "Hostel Fees", amount: "$2500", date: "25 May 2024", due: false, icon: "🏨", bg: "bg-red-100" },
          { title: "Library Fees", amount: "$500", date: "10 Jun 2024", due: false, icon: "📚", bg: "bg-purple-100" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.bg}`}>
                {f.icon}
              </div>

              <div>
                <p className="text-sm font-medium">{f.title}</p>
                <p className={`text-xs ${f.due ? "text-red-500" : "text-gray-500"}`}>
                  {f.amount}
                  {f.due && (
                    <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">
                      Due
                    </span>
                  )}
                </p>
              </div>
            </div>

            {f.due ? (
              <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded">
                Pay Now
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

      {/* Footer */}
      <button
        onClick={() => setShowAllFeesPopup(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>

    </div>
  </div>
)}
{showSelectChildPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-[420px] rounded-xl p-5 animate-card">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowSelectChildPopup(false)}
          className="text-xs text-blue-600"
        >
          ← Back
        </button>
        <h4 className="text-sm font-semibold">Select Child</h4>
        <span />
      </div>

      {/* Search */}
      <input
        placeholder="Search child name..."
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

      {/* Child List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {["Janet", "Joann", "Kathleen", "Gifford", "Lisa"].map((child) => (
          <div
            key={child}
            onClick={() => {
              setSelectedChild(child);
              setShowSelectChildPopup(false);
            }}
            className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
          >
            <img
              src={examImages[child]}
              className="w-9 h-9 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{child}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{showAllExamsPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-[640px] rounded-xl p-5 max-h-[80vh] overflow-hidden animate-card">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">All Exam Results</h4>
        <button
          onClick={() => setShowAllExamsPopup(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[60vh]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500">
              <th className="py-3 px-4 text-left">ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Marks %</th>
              <th>Exam</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[
              { id: 35013, name: "Janet", cls: "III", sec: "A", marks: "89%", exam: "Quarterly", status: "Pass" },
              { id: 35012, name: "Joann", cls: "IV", sec: "B", marks: "88%", exam: "Practical", status: "Pass" },
              { id: 35011, name: "Kathleen", cls: "II", sec: "A", marks: "21%", exam: "1st Term", status: "Pass" },
              { id: 35010, name: "Gifford", cls: "I", sec: "B", marks: "69%", exam: "Mid Term", status: "Pass" },
              { id: 35009, name: "Lisa", cls: "II", sec: "B", marks: "31%", exam: "Annual", status: "Fail" },
            ].map((s, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="px-4 py-3">{s.id}</td>
                <td className="py-3 font-medium">{s.name}</td>
                <td className="text-center">{s.cls}</td>
                <td className="text-center">{s.sec}</td>
                <td className="text-center">{s.marks}</td>
                <td className="text-center">{s.exam}</td>
                <td className="text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] text-white
                      ${s.status === "Pass" ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <button
        onClick={() => setShowAllExamsPopup(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  </div>
)}
{showAllNotices && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[520px] max-h-[80vh] p-5 overflow-hidden animate-card">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Notice Board</h4>
        <button
          onClick={() => setShowAllNotices(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Notices List */}
      <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
        {notices.map((n, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${n.bg}`}
              >
                📝
              </div>
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-xs text-gray-500">
                  Added on : {n.date}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-2">
              {n.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        onClick={() => setShowAllNotices(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  </div>
)}
{showEditParent && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl w-[380px] p-5 animate-card">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Edit Parent Profile</h4>
        <button
          onClick={() => setShowEditParent(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="space-y-3 text-sm">
        <input
          value={parentProfile.name}
          onChange={(e) =>
            setParentProfile({ ...parentProfile, name: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Parent Name"
        />

        <input
          value={parentProfile.child}
          onChange={(e) =>
            setParentProfile({ ...parentProfile, child: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Child Name"
        />
      </div>

      {/* Footer */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => setShowEditParent(false)}
          className="flex-1 border rounded-lg py-2 text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => setShowEditParent(false)}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}

</>
    //</DashboardLayout>
  );
}
