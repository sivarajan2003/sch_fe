//teacher/dashboard.tsx 
import DashboardLayout from "../../components/DashboardLayout";
import T1Img from "../../assets/t1.png";
import T2 from "../../assets/t2.png";
import T3 from "../../assets/t3.png";
import T4 from "../../assets/t4.png";
import J1 from "../../assets/j1.png";
import J2 from "../../assets/j2.png";
import J3 from "../../assets/j3.png";
import JA from "../../assets/ja.png";
import JO from "../../assets/jo.png";
import GoodRightImg from "../../assets/good1.png";
import GoodImg from "../../assets/good.png";

import { useState, useEffect } from "react";
import { CalendarDays, FolderOpen, ChevronDown } from "lucide-react";
import {
  getTodayClasses,
  getUpcomingEvents,
  getTeacherAttendance,
  getBestPerformers,
  getStudentProgress,
  getTeacherSyllabus, getStudentMarks,
 getLeaveStatus,getDashboardCards
} from "../../service/teacherDashboardService";
type TodayClass = {
  start_time: string;
  end_time: string;
  class_name: string;
  section: string;
  subject: string;
};
type EventType = {
  title: string;
  date: string;
  time: string;
  bar: string;
  iconBg: string;
  teachers: number[];
};
const dummyTodayClasses = [
  {
    start_time: "09:00 AM",
    end_time: "10:00 AM",
    class_name: "IV",
    section: "A",
    subject: "Physics",
  },
  {
    start_time: "10:00 AM",
    end_time: "11:00 AM",
    class_name: "V",
    section: "B",
    subject: "Science",
  },
];

const dummyEvents = [
  {
    title: "Science Exhibition",
    date: "20 Jun 2026",
    time: "10:00 AM",
    bar: "bg-blue-500",
    iconBg: "bg-blue-100",
    teachers: [1, 2, 3],
  },
];

const dummyAttendance = {
  total: 24,
  present: 20,
  absent: 2,
  halfday: 1,
  late: 1,
  percentage: 83,
};

const dummyBestPerformers = [
  {
    name: "Class IV-A",
    value: 95,
    color: "bg-green-500",
  },
  {
    name: "Class V-B",
    value: 88,
    color: "bg-blue-500",
  },
];

const dummyStudentProgress = [
  {
    name: "Janet",
    class: "IV-A",
    percent: "95%",
    badge: "A",
    color: "bg-green-500",
    img: J1,
  },
];

const dummySyllabus = [
  {
    class_name: "IV-A",
    topic: "Newton Laws",
  },
  {
    class_name: "V-B",
    topic: "Electricity",
  },
];

const dummyStudentMarks = [
  {
    id: "ST001",
    student_name: "Janet",
    class_name: "IV",
    section: "A",
    marks_percentage: 95,
    cgpa: 9.5,
    status: "Pass",
  },
];

const dummyLeaveStatus = [
  {
    leave_type: "Medical Leave",
    leave_date: "15-06-2026",
    status: "Approved",
    statusColor: "bg-green-500",
    iconBg: "bg-green-100",
    icon: "🏥",
  },
];

const dummyCardData = {
  syllabus: {
    completed: 75,
    pending: 25,
  },
  bestTeacher: {
    name: "John Smith",
    rating: 4.8,
    subject: "Physics",
  },
};
export default function TeacherDashboard() {
  const [showEditProfile, setShowEditProfile] = useState(false);
const teacherName =
localStorage.getItem("teacherName") ||
localStorage.getItem("userName") ||
"Teacher";
const [teacherProfile, setTeacherProfile] = useState({
  id: "#T594651",
  name: teacherName,
  subject: "Physics",
  classes: "IV-A, V-B",
  avatar: T1Img,
});
const [todayClasses, setTodayClasses] =
  useState<TodayClass[]>([]);
   const [currentDate, setCurrentDate] = useState(new Date());

useEffect(() => {
  const teacherId =
    localStorage.getItem("teacherId");

if (!teacherId) {
   setTodayClasses(dummyTodayClasses);
   setCardData(dummyCardData);
   setSyllabusData(dummySyllabus);
   setAttendanceData(dummyAttendance);
   return;
}

  getTodayClasses(teacherId)
.then((res:any)=>{
   setTodayClasses(
      res?.data?.length
         ? res.data
         : dummyTodayClasses
   );
})
.catch(()=>{
   setTodayClasses(dummyTodayClasses);
});
}, []);

  const [openSection, setOpenSection] = useState(false);
const [selectedClass, setSelectedClass] = useState("All");

const classes = ["All","I","II","III","IV","V","VI","VII","VIII","IX","X"];

  const [open, setOpen] = useState(false);
const [tab, setTab] = useState("Present");
const [openSyllabus, setOpenSyllabus] = useState(false);
const [openReschedule, setOpenReschedule] = useState(false);
const [selectedTopic, setSelectedTopic] = useState(null);
const [showLeaveYearPopup, setShowLeaveYearPopup] = useState(false);
const leaveData = [
  { type: "Emergency Leave", status: "Pending", year: 2024 },
  { type: "Medical Leave", status: "Approved", year: 2024 },
  { type: "Medical Leave", status: "Declined", year: 2024 },
  { type: "Fever", status: "Approved", year: 2024 },
];

  const [openBestPerformers, setOpenBestPerformers] = useState(false);
  const studentImages: Record<string, string> = {
    Janet: J1,
    Joann: J2,
    Kathleen: J3,
    Gifford: JA,
    Lisa: JO,
  };
  const cardAnim = (i = 0) =>
  `animate-card card-hover [animation-delay:${i * 80}ms]`;

const [events, setEvents] =
  useState<EventType[]>([]);   
 const [attendanceData,
setAttendanceData] =
useState<any>(null);
  const [openAddEvent, setOpenAddEvent] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
  });
    
 

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
useEffect(() => {

  getUpcomingEvents()
.then((res:any)=>{
   setEvents(
      res?.data?.length
         ? res.data
         : dummyEvents
   );
})
.catch(()=>{
   setEvents(dummyEvents);
});

}, []);
useEffect(() => {

 const teacherId =
  localStorage.getItem("teacherId");

 if (!teacherId) {
   setTodayClasses(dummyTodayClasses);
   return;
}

 getTeacherAttendance(teacherId)
  .then((res: any) => {

   setAttendanceData(res.data);

  })
  .catch(() => {
  setAttendanceData(dummyAttendance);
});

}, []);
// first day of month (Mon based)
const firstDay = new Date(year, month, 1).getDay();
const startOffset = firstDay === 0 ? 6 : firstDay - 1;
const currentYear = new Date().getFullYear();

const yearLeaves = leaveData.filter(l => l.year === currentYear);

const totalLeaves = yearLeaves.length;
const approved = yearLeaves.filter(l => l.status === "Approved").length;
const pending = yearLeaves.filter(l => l.status === "Pending").length;
const declined = yearLeaves.filter(l => l.status === "Declined").length;

// total days
const daysInMonth = new Date(year, month + 1, 0).getDate();

// calendar cells
const days = [
  ...Array(startOffset).fill(null),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
];
const [showMonthAttendance, setShowMonthAttendance] = useState(false);

const monthAttendance =
attendanceData?.monthlyAttendance || [];

const presentList =
attendanceData?.monthlyAttendance?.filter(
  (d: any) => d.status === "Present"
) || [];

const absentList =
attendanceData?.monthlyAttendance?.filter(
  (d: any) => d.status === "Absent"
) || [];
// today
const today = new Date();
const isToday = (day: number) =>
  day === today.getDate() &&
  month === today.getMonth() &&
  year === today.getFullYear();

// month navigation
const prevMonth = () =>
  setCurrentDate(new Date(year, month - 1, 1));

const nextMonth = () =>
  setCurrentDate(new Date(year, month + 1, 1));

const [bestPerformers, setBestPerformers] =
  useState<any[]>([]);

const [studentProgress, setStudentProgress] =
  useState<any[]>([]);
  const [syllabusData, setSyllabusData] =
  useState<any[]>([]);
  const [studentMarks,setStudentMarks] = useState<any[]>([]);

const [leaveStatus,setLeaveStatus] = useState<any[]>([]);
const [cardData, setCardData] =
useState<any>(null);
useEffect(()=>{

 const teacherId =
 localStorage.getItem("teacherId");

 if(!teacherId) return;

 getDashboardCards(teacherId)
.then((res:any)=>{
   setCardData(
      res?.data?.data
         ? res.data.data
         : dummyCardData
   );
})
.catch(()=>{
   setCardData(dummyCardData);
});
},[]);
useEffect(() => {

 getBestPerformers()
  .then((res: any) => {

   setBestPerformers(
    res.data || []
   );
  })
 .catch(() => {
  setBestPerformers(dummyBestPerformers);
});
}, []);

useEffect(() => {
 getStudentProgress()
 .then((res: any) => {
   setStudentProgress(
    res.data || []
   );
  })
  .catch(() => {
  setStudentProgress(dummyStudentProgress);
});

}, []);
useEffect(() => {
 const teacherId =
  localStorage.getItem("teacherId");

 if (!teacherId) {
   setTodayClasses(dummyTodayClasses);
   setCardData(dummyCardData);
   setSyllabusData(dummySyllabus);
   setAttendanceData(dummyAttendance);
   return;
}

 getTeacherSyllabus(teacherId)
.then((res:any)=>{
   setSyllabusData(
      res?.data?.length
         ? res.data
         : dummySyllabus
   );
})
.catch(()=>{
   setSyllabusData(dummySyllabus);
});

}, []);
useEffect(() => {

 getStudentMarks()
  .then((res: any) => {
   setStudentMarks(
    res.data.data || []
   );
  })
  .catch(() => {
  setStudentMarks(dummyStudentMarks);
});

}, []);
useEffect(() => {

 getLeaveStatus()
.then((res:any)=>{

 const formatted =
   (res.data.data || []).map((l:any)=>({
      ...l,
      icon: "🏥",
      iconBg: "bg-green-100",
      statusColor:
        l.status === "Approved"
          ? "bg-green-500"
          : l.status === "Pending"
          ? "bg-blue-500"
          : "bg-red-500",
   }));

 setLeaveStatus(formatted);
})

}, []);
  const data = {
    Present: ["Janet", "Joann"],
    Absent: ["Gifford", "Lisa"],
    Late: ["Thomas"],
    "Half Day": [],
  };
  const todayDate = new Date().toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
);
  return (
    //<DashboardLayout>
<>
      {/* ================= PAGE TITLE ================= */}
      <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">
        Dashboard / Teacher Dashboard
      </p>

      {/* ================= BLUE BANNER ================= */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 mb-8">
  
  {/* dotted overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:16px_16px]" />

  {/* CONTENT */}
  <div className="relative flex items-center justify-between">
    
    {/* LEFT TEXT */}
    <div className="text-white max-w-[70%]">
      <h3 className="text-lg font-semibold">
Good Morning {teacherName}
      </h3>

      <p className="text-blue-100 text-sm mt-1">
        Have a good day at work
      </p>

      <p className="text-blue-100 text-sm mt-3">
        <b>Notice:</b> There is a staff meeting at <b>9AM</b> today.
      </p>
    </div>

    {/* RIGHT IMAGE 
    <img
      src={GoodRightImg}
      alt="Banner Illustration"
      className="hidden md:block h-[100px] object-contain absolute right-4 bottom-0"
    />*/}
  </div>
</div>


      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-6 gap-y-6 ">
        {/* ========== PROFILE (LEFT) ========== */}
        <div>
        <div className={`relative overflow-hidden rounded-xl p-5 text-white 
bg-gradient-to-r from-[#0F1025] to-[#1A1C3A] ${cardAnim(0)}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,200,255,0.15)_0%,transparent_40%)]" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
              <img
  src={T1Img}
  alt="Profile"
  className="w-16 h-16 rounded-xl border border-white/20 object-cover"
/>

                <div>
                <span className="inline-block text-[11px] bg-[#2D5BFF] px-2 py-0.5 rounded-md mb-1">
        #T594651
      </span>
      <p className="font-semibold">{teacherProfile.name}</p>
      <p className="text-xs text-gray-300">
  Classes : {teacherProfile.classes}
</p>
<p className="text-xs text-gray-300">
  {teacherProfile.subject}
</p>
                </div>
              </div>
              <button
  onClick={() => setShowEditProfile(true)}
  className="bg-blue-600 text-xs px-3 py-1 rounded"
>
  Edit Profile
</button>
            </div>
          </div>
        </div>

        {/* ========== SYLLABUS (CENTER) ========== */}
        <div>
        <div className={`bg-white rounded-xl border p-6 flex items-center gap-6 ${cardAnim(1)}`}>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="40" cy="40" r="34" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#22C55E"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="213"
                  strokeDashoffset="11"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
  {cardData?.syllabus?.completed || 0}%
</div>
</div>
<div>
  <h4 className="text-18px font-medium">
    Syllabus
  </h4>

  {cardData?.syllabus ? (
    <>
      <div className="flex items-center gap-2 text-xs mb-1">
        <span className="w-2 h-2 bg-green-500 rounded-full" />
        Completed : {cardData.syllabus.completed}%
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="w-2 h-2 bg-red-400 rounded-full" />
        Pending : {cardData.syllabus.pending}%
      </div>
    </>
  ) : (
    <div>No Syllabus Found</div>
  )}
</div>
          </div>
        </div>
        <div className={`bg-white rounded-xl border p-6 flex items-center gap-4 ${cardAnim(2)}`}>
  {/* Avatar */}
  <img
    src="https://i.pravatar.cc/100?img=32"
    alt="Best Teacher"
    className="w-14 h-14 rounded-lg object-cover"
  />

  {/* Info */}
  <div className="flex-1">
    <h4 className="text-18px font-medium">
  Best Teacher
</h4>

{cardData?.bestTeacher ? (
  <>
    <p className="text-xs text-gray-500 mt-1">
      {cardData.bestTeacher.name}
    </p>

    <div className="flex items-center gap-2 mt-2">

      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
        ⭐ {cardData.bestTeacher.rating}
      </span>

      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
        {cardData.bestTeacher.subject}
      </span>

    </div>
  </>
) : (
  <div className="text-xs text-gray-500">
    No Teacher Found
  </div>
)}
  </div>
</div>

        <div className="xl:col-span-2">
        <div className={`bg-white rounded-xl border p-4 ${cardAnim(2)}`}>
    <div className="flex justify-between mb-3">
      <h4 className="text-18px font-medium">Today's Class</h4>
      {todayClasses.length > 0 && (
  <span className="text-xs text-gray-500">
    {todayDate}
  </span>
)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

  {todayClasses.length > 0 ? (

    todayClasses.map((item: any, idx) => (
      <div
  key={idx}
  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
>
  <div className="flex items-center gap-2 mb-3">
    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
      📚
    </div>

    <div>
      <h5 className="font-semibold text-sm">
        {item.subject}
      </h5>

      <p className="text-xs text-gray-500">
        Class {item.class_name}-{item.section}
      </p>
    </div>
  </div>

  <div className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-2 rounded-lg">
     {item.start_time} - {item.end_time}
  </div>
</div>
    ))

  ) : (

    <div className="col-span-5 text-center py-8 text-gray-500">
      Timetable Not Found
    </div>

  )}

</div>    
  </div>
  
</div>
         {/* ================= SCHEDULES CARD ================= */}
         <div className="xl:row-span-3 sticky top-6 self-start">
        <div className="bg-white rounded-xl border px-5 py-5 min-h-[20px] flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-18px font-medium">Schedules</h4>
            {/* <button
              onClick={() => setOpenAddEvent(true)}
              className="text-xs text-blue-600 font-medium"
            >
              Add New
            </button> */}
          </div>

          {/* Month + Arrows */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">
              {monthNames[month]} {year}
            </p>
            <div className="flex gap-1">
              <button
                onClick={prevMonth}
                className="w-7 h-7 rounded-full border flex items-center justify-center text-xs"
              >
                ‹
              </button>
              <button
                onClick={nextMonth}
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs"
              >
                ›
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 text-center text-[11px] text-gray-400 mb-2">
            {["M","T","W","T","F","S","S"].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-6">
            {days.map((day, i) => (
              <div
                key={i}
                className={`py-2 rounded-lg transition
                  ${day ? "cursor-pointer hover:bg-gray-100" : ""}
                  ${isToday(day)
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-500"}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <h4 className="text-sm font-semibold mb-4">
            Upcoming Events
          </h4>

          <div className="space-y-4 overflow-y-auto pr-1">

  {events.length === 0 ? (
    <div className="text-center py-4 text-gray-500">
      No Events Found
    </div>
  ) : (
    events.map((e, i) => (
      <div key={i} className="flex gap-3">

        <div className={`w-1 rounded-full ${e.bar}`} />

        <div className="flex-1">
          <div className="flex items-center gap-3">

            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${e.iconBg}`}
            >
              📅
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{e.title}</p>
              <p className="text-xs text-gray-500">{e.date}</p>
            </div>

          </div>

          <div className="flex items-center justify-between pl-12 mt-1">
            <p className="text-xs text-gray-500">
              ⏰ {e.time}
            </p>

            <div className="flex -space-x-2">
              {e.teachers?.map((t, idx) => (
                <img
                  key={idx}
                  src={`https://i.pravatar.cc/24?img=${t}`}
                  className="w-6 h-6 rounded-full border border-white"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    ))
  )}

</div>
        </div>
      </div>

      {/* ================= ADD EVENT MODAL ================= */}
      {openAddEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[360px] p-6">

            <h3 className="text-base font-semibold mb-4">
              Add New Event
            </h3>

            <div className="space-y-3">
              <input
                placeholder="Event Title"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />

              <input
                placeholder="09:00 AM - 10:30 AM"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenAddEvent(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setEvents([
                    {
                      title: newEvent.title,
                      date: newEvent.date,
                      time: newEvent.time,
                      bar: "bg-blue-500",
                      iconBg: "bg-blue-100",
                      teachers: [9, 10],
                    },
                    ...events,
                  ]);
                  setOpenAddEvent(false);
                  setNewEvent({ title: "", date: "", time: "" });
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}




{/* ================= ATTENDANCE + PERFORMANCE SECTION ================= */}
<div className="xl:col-span-2 xl:row-start-3 grid grid-cols-1 md:grid-cols-2 gap-5">
<div className={`bg-white rounded-xl border p-4 ${cardAnim(4)}`}>

  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <h4 className="text-18px font-medium">Attendance</h4>

    <div className="flex items-center gap-1 text-xs text-gray-500">
    <button
  onClick={() => setShowMonthAttendance(true)}
  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
>
  This Month ▼
</button>
    </div>
  </div>

  {/* Last 7 Days */}
  <div className="border rounded-lg px-4 py-3 mb-5">
    <div className="flex justify-between items-center mb-3">
      <p className="text-xs font-medium">Last 7 Days</p>
{attendanceData?.fromDate && attendanceData?.toDate ? (
  <p className="text-[11px] text-gray-400">
    {attendanceData.fromDate} - {attendanceData.toDate}
  </p>
) : null}
    </div>

    <div className="flex gap-2">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
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

  {/* Total Days */}
  <p className="text-xs text-gray-500 mb-5 px-1">
    No of total working days <b className="text-gray-700">{attendanceData?.total || 0} Days</b>
  </p>

  {/* Stats */}
  <div className="grid grid-cols-4 text-center mb-6">
    <div>
      <p className="text-sm font-semibold">{attendanceData?.present || 0}</p>
      <p className="text-xs text-gray-500 mt-1">Present</p>
    </div>
    <div>
      <p className="text-sm font-semibold">{attendanceData?.absent || 0}</p>
      <p className="text-xs text-gray-500 mt-1">Absent</p>
    </div>
    <div>
      <p className="text-sm font-semibold">{attendanceData?.halfday || 0}</p>
      <p className="text-xs text-gray-500 mt-1">Halfday</p>
    </div>
    <div>
      <p className="text-sm font-semibold">{attendanceData?.late || 0}</p>
      <p className="text-xs text-gray-500 mt-1">Late</p>
    </div>
  </div>

  {/* Circular Chart */}
  <div className="flex justify-center mb-6">
    <div className="relative w-44 h-44">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="88"
          cy="88"
          r="70"
          stroke="#E5E7EB"
          strokeWidth="14"
          fill="none"
        />
        <circle
          cx="88"
          cy="88"
          r="70"
          stroke="#22C55E"
          strokeWidth="14"
          fill="none"
          strokeDasharray="439"
          strokeDashoffset="22"
          strokeLinecap="round"
        />
        <circle
          cx="88"
          cy="88"
          r="70"
          stroke="#EF4444"
          strokeWidth="14"
          fill="none"
          strokeDasharray="439"
          strokeDashoffset="330"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500">Attendance</p>
        <p className="text-2xl font-bold mt-1">{attendanceData?.percentage || 0}%</p>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="flex justify-center gap-5 text-xs text-gray-500 pt-2">
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-green-500 rounded-full" />
      Present
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-red-500 rounded-full" />
      Absent
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-blue-500 rounded-full" />
      Late
    </span>
    <span className="flex items-center gap-1">
      <span className="w-2 h-2 bg-gray-300 rounded-full" />
      Half Day
    </span>
  </div>

</div>
  <div className="space-y-6">
{/* ================= BEST PERFORMERS (CLASS LEFT, BAR RIGHT) ================= */}
<div className={`bg-white rounded-xl border p-5 ${cardAnim(5)}`}>
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Best Performers</h4>
    <span
  onClick={() => setOpenBestPerformers(true)}
  className="text-xs text-blue-600 cursor-pointer hover:underline"
>
  View All
</span>

  </div>

  {bestPerformers.map((item: any, i) => (
    <div key={i} className="flex items-center gap-3 mb-4">
      
      {/* Class Name (LEFT) */}
      <p className="text-xs font-medium w-20 text-gray-700">
        {item.name}
      </p>

      {/* Progress Bar (RIGHT) */}
      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`${item.color} h-full rounded-full flex items-center justify-between px-2`}
          style={{ width: `${item.value}%` }}
        >
          {/* Avatars (INSIDE LEFT) */}
          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/24?img=1"
              className="w-5 h-5 rounded-full border border-white"
            />
            <img
              src="https://i.pravatar.cc/24?img=2"
              className="w-5 h-5 rounded-full border border-white"
            />
            <img
              src="https://i.pravatar.cc/24?img=3"
              className="w-5 h-5 rounded-full border border-white"
            />
          </div>

          {/* Percentage (INSIDE RIGHT) */}
          <span className="text-[11px] font-semibold text-white">
            {item.value}%
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

    {/* STUDENT PROGRESS */}
    
    <div className={`bg-white rounded-xl border p-5 ${cardAnim(6)}`}>
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-18px font-medium">Student Progress</h4>

    <button
  onClick={() => setOpenBestPerformers(true)}
  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
>
  This Month
  <ChevronDown className="w-3 h-3" />
</button>

  </div>

  {/* Student rows */}
  {studentProgress.map((s: any, i) => (
    <div
      key={i}
      className="flex items-center justify-between border rounded-lg p-3 mb-3"
    >
      {/* Left: avatar + info */}
      <div className="flex items-center gap-3">
        <img
          src={s.img}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-medium">{s.name}</p>
          <p className="text-xs text-gray-500">{s.class}</p>
        </div>
      </div>

      {/* Right: icon + % */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">
          {s.badge}
        </div>

        <span
          className={`text-xs font-semibold text-white px-2 py-0.5 rounded ${s.color}`}
        >
          {s.percent}
        </span>
      </div>
    </div>
  ))}
</div>
  </div>
</div>
    </div>
      {/* ================= SYLLABUS / LESSON PLAN ================= */}
      <div className="xl:col-span-3 mt-8">
      <div className={`bg-white rounded-xl border p-5 ${cardAnim(7)}`}>


    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <h4 className="text-18px font-medium">Syllabus / Lesson Plan</h4>
      <span
  onClick={() => setOpenSyllabus(true)}
  className="text-xs text-blue-600 cursor-pointer hover:underline"
>
  View All
</span>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5">

      {syllabusData.length === 0 ? (
  <div className="col-span-4 text-center py-5">
    No Syllabus Found
  </div>
) : (
  syllabusData.map((item, i) => (
  <div key={i}>
    {item?.topic || "No Topic"}
  </div>
))
)}
    </div>
  </div>
</div>
{/* ================= STUDENT MARKS + LEAVE STATUS ================= */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
<div className={`xl:col-span-2 bg-white rounded-xl border p-5 ${cardAnim(12)}`}>

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-18px font-medium">Student Marks</h4>

      <div className="flex items-center gap-4 text-xs text-gray-500">
      <button
  onClick={() => setOpenBestPerformers(true)}
  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
>
  This Month
  <ChevronDown className="w-3 h-3" />
</button>


<div className="relative">
  <button
    onClick={() => setOpenSection(!openSection)}
    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
  >
    <FolderOpen className="w-4 h-4" />
    {selectedClass === "All" ? "All Sections" : `Class ${selectedClass}`}
    <ChevronDown className="w-3 h-3" />
  </button>

  {openSection && (
    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow w-28 z-20">
      {classes.map(c => (
        <div
          key={c}
          onClick={() => {
            setSelectedClass(c);
            setOpenSection(false);
          }}
          className="px-3 py-1.5 text-xs hover:bg-gray-100 cursor-pointer"
        >
          {c === "All" ? "All Classes" : `Class ${c}`}
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Marks %</th>
            <th>CGPA</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {
studentMarks.length === 0 ? (

<tr>
  <td
    colSpan={7}
    className="text-center py-8"
  >
    Marks Not Found
  </td>
</tr>

) : (

studentMarks.map((s:any,i:number)=>(
            <tr key={i} className="border-b last:border-none">

              <td className="py-3 text-gray-500">{s.id}</td>

              <td className="py-3">
                <div className="flex items-center gap-2">
                <img
  src={studentImages[s.student_name] || J1}
  alt={s.student_name}
  className="w-8 h-8 rounded-full object-cover border"
/>

                  <span className="font-medium"> {s.student_name} </span>
                </div>
              </td>

             <td>{s.class_name}</td>
<td>{s.section}</td>
<td>{s.marks_percentage}%</td>
             <td>{s.cgpa}</td>
              <td>
              <span
  className={`inline-flex items-center justify-center
    min-w-[48px] px-2 py-0.5
    rounded text-white text-[11px] font-medium
    ${s.status === "Pass" ? "bg-green-500" : "bg-red-500"}
  `}
>
  {s.status}
</span>

              </td>

           </tr>
))
)}
        </tbody>
      </table>
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
      <span>Showing 5 Entries</span>

      <div className="flex items-center gap-2">
        <span className="cursor-pointer">Pre</span>
        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded">
          1
        </span>
        <span className="text-blue-600 cursor-pointer">Next</span>
      </div>
    </div>
  </div>

  {/* ================= LEAVE STATUS (RIGHT – CARDS) ================= */}
  <div className={`bg-white rounded-xl border p-5 ${cardAnim(13)}`}>

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-18px font-medium">Leave Status</h4>
      <span
  onClick={() => setShowLeaveYearPopup(true)}
  className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-blue-600"
>
  <CalendarDays className="w-4 h-4" />
  This Year
  <ChevronDown className="w-3 h-3" />
</span>
   </div>

    {
leaveStatus.length === 0 ? (

<div className="text-center py-10">
  Leave Status Not Found
</div>

) : (

leaveStatus.map((l:any,i:number)=>(
      <div
        key={i}
        className="flex items-center justify-between border rounded-lg p-4 mb-3"
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${l.iconBg}`}
          >
            {l.icon}
          </div>

          <div>
            <p className="text-sm font-medium">{l.leave_type}</p>
            <p className="text-xs text-gray-500">
              Leave Date : {l.leave_date}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`text-[11px] px-2 py-0.5 rounded text-white ${l.statusColor}`}
        >
          {l.status}
        </span>
      </div>
    ))
)}
  </div>

</div>

{openBestPerformers && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    
    <div className="bg-white w-[460px] rounded-xl p-5 animate-card">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold">
          Best Performers – All Classes
        </h4>
        <button
          onClick={() => setOpenBestPerformers(false)}
          className="text-gray-400 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="space-y-5 max-h-[400px] overflow-y-auto pr-1">

        {bestPerformers.map((cls: any, i) => (
          <div key={i}>
            
            {/* Class Name */}
            <p className="text-xs font-semibold text-gray-500 mb-2">
              {cls.class || cls.name}
            </p>
            

            {/* Students */}
            {cls.students?.map((s: any, j: number) => (
              <div
                key={j}
                className="flex items-center justify-between border rounded-lg p-3 mb-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.img}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">{s.name}</p>
                </div>

                <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-0.5 rounded">
                  {s.score}
                </span>
              </div>
            ))}

          </div>
        ))}

      </div>
    </div>
  </div>
)}
{openSyllabus && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

    <div className="bg-white w-[520px] rounded-xl p-5 animate-card">

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h4 className="text-18px font-medium">
          Syllabus / Lesson Plan
        </h4>
        <button onClick={() => setOpenSyllabus(false)}>✕</button>
      </div>

      {/* List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {syllabusData.length === 0 ? (
  <div className="text-center py-5">
    No Syllabus Found
  </div>
) : (
  syllabusData.map((t, i) => (
    <div key={i}>
     <p>{t?.class_name || "-"}</p>
<p>{t?.topic || "No Topic"}</p>
    </div>
  ))
)}
      </div>
    </div>
  </div>
)}
{openReschedule && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

    <div className="bg-white w-[360px] rounded-xl p-5 animate-card">

      <h4 className="text-sm font-semibold mb-4">
        Reschedule Lesson
      </h4>

      <input
        type="date"
        className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
      />

      <input
        placeholder="09:00 AM - 10:00 AM"
        className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setOpenReschedule(false)}
          className="text-sm px-3 py-1 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpenReschedule(false)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
{showLeaveYearPopup && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-[360px] rounded-xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold">
          Leave Summary – {currentYear}
        </h4>
        <button
          onClick={() => setShowLeaveYearPopup(false)}
          className="text-gray-400 hover:text-red-500"
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

        <div className="border rounded-lg p-3 text-center text-green-600">
          <p className="text-lg font-bold">{approved}</p>
          Approved
        </div>

        <div className="border rounded-lg p-3 text-center text-blue-600">
          <p className="text-lg font-bold">{pending}</p>
          Pending
        </div>

        <div className="border rounded-lg p-3 text-center text-red-600">
          <p className="text-lg font-bold">{declined}</p>
          Declined
        </div>
      </div>

      {/* Leave Types */}
      <div className="space-y-2 text-xs">
        {yearLeaves.map((l, i) => (
          <div
            key={i}
            className="flex justify-between border rounded-lg px-3 py-2"
          >
            <span>{l.type}</span>
            <span className="font-medium">{l.status}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowLeaveYearPopup(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
      >
        Close
      </button>

    </div>
  </div>
)}
{showMonthAttendance && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    
    <div className="bg-white rounded-xl w-[420px] p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold">
          This Month Attendance
        </h4>
        <button
          onClick={() => setShowMonthAttendance(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {presentList.length}
          </p>
          <p className="text-gray-500">Present</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-red-600">
            {absentList.length}
          </p>
          <p className="text-gray-500">Absent</p>
        </div>
      </div>

      {/* Attendance List */}
      <div className="space-y-2 max-h-[260px] overflow-y-auto">

        {monthAttendance.length === 0 ? (
  <div className="text-center py-5 text-gray-500">
    No Attendance Found
  </div>
) : (
  monthAttendance.map((d: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs"
          >
            <span>{d.date}</span>

            <span
              className={`px-2 py-0.5 rounded-full text-white
                ${d.status === "Present"
                  ? "bg-green-500"
                  : "bg-red-500"}`}
            >
              {d.status}
            </span>
          </div>
       ))
)}

      </div>

      {/* Footer */}
      <button
        onClick={() => setShowMonthAttendance(false)}
        className="mt-4 w-full border rounded-lg py-2 text-xs hover:bg-gray-50"
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
        <h4 className="text-lg font-semibold">Edit Teacher Profile</h4>
        <button
          onClick={() => setShowEditProfile(false)}
          className="text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <input
          value={teacherProfile.name}
          onChange={e =>
            setTeacherProfile({ ...teacherProfile, name: e.target.value })
          }
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Teacher Name"
        />

        <input
          value={teacherProfile.subject}
          onChange={e =>
            setTeacherProfile({ ...teacherProfile, subject: e.target.value })
          }
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Subject"
        />

        <input
          value={teacherProfile.classes}
          onChange={e =>
            setTeacherProfile({ ...teacherProfile, classes: e.target.value })
          }
          className="border rounded w-full px-3 py-2 text-sm"
          placeholder="Classes (eg: IV-A, V-B)"
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
          onClick={() => setShowEditProfile(false)}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}

</>
   // </DashboardLayout>
  );
}
