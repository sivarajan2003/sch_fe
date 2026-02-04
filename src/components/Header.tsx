import { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Sun,
  Moon,
  BarChart2,
  Maximize2,
  Minimize2,
  ChevronDown, Menu,
} from "lucide-react";
import A1 from "../assets/a1.png";
import IN_FLAG from "../assets/in.png";
import US_FLAG from "../assets/us.png";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import StatisticsChart from "../components/StatisticsChart";
import { getAcademicyears } from "../service/academicyearService.js";

export default function Header({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const [showStats, setShowStats] = useState(false);

  const [dark, setDark] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [full, setFull] = useState(false);

  const [country, setCountry] = useState<"IN" | "US">("IN");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const close = () => setProfileOpen(false);
  //   window.addEventListener("click", close);
  //   return () => window.removeEventListener("click", close);
  // }, []);

  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");

  //const [selectedYear, setSelectedYear] = useState("2024 / 2025");
  const [notificationOpen, setNotificationOpen] = useState(false);

  //const academicYears = Array.from({ length: 6 }, (_, i) => {
  //const start = 2020 + i;
  //return `${start} / ${start + 1}`;
  //});
  useEffect(() => {
    async function loadAcademicYears() {
      try {
        const res = await getAcademicyears();

        // ✅ FULL normalization (same as academicyear.tsx)
        const payload =
          (res as any)?.data?.data ??
          (res as any)?.data ??
          res;

        const list: any[] = Array.isArray(payload)
          ? payload
          : payload?.rows ??
          payload?.items ??
          payload?.data ??
          [];

        const years = list
          .map((y: any) => y.yearsbyname ?? y.year ?? y.name)
          .filter(Boolean);

        console.log("HEADER YEARS:", years); // 🔍 DEBUG

        setAcademicYears(years);

        const saved = localStorage.getItem("academicYear");
        if (saved && years.includes(saved)) {
          setSelectedYear(saved);
        } else if (years.length) {
          setSelectedYear(years[years.length - 1]);
          localStorage.setItem("academicYear", years[years.length - 1]);
        }
      } catch (err) {
        console.error("Failed to load academic years", err);
      }
    }

    loadAcademicYears();
  }, []);
  // 🔹 Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFull(true);
    } else {
      document.exitFullscreen();
      setFull(false);
    }
  };

  return (
    <header className="relative z-[10] bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2">
      <div className="flex items-center justify-between gap-2 flex-wrap md:flex-nowrap">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">

          {/* 🍔 HAMBURGER MENU  */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* 🔍 SEARCH BAR */}
          <div className="relative w-[260px] hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* RIGHT ICONS  */}
        {/* ACADEMIC YEAR */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setYearOpen((prev) => !prev);
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span>Academic Year : {selectedYear || "Select"}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {yearOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-xl shadow-xl z-[50]">
              <div className="px-4 py-2 text-xs text-gray-500">
                Years count: {academicYears.length}
              </div>

              {academicYears.map((year) => (
                <div
                  key={year}
                  onClick={() => {
                    localStorage.setItem("academicYear", year);
                    setSelectedYear(year);
                    setYearOpen(false);

                    navigate("/admin/dashboard/academic/academic-year", {
                      state: { year },
                    });
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedYear === year ? "bg-blue-50 font-semibold" : ""
                    }`}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ICONS */}
        <div className="flex items-center gap-1 sm:gap-3">


          {/* Notification */}
          <IconBtn onClick={() => alert("Notifications")}>
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </IconBtn>
          {/* Stats */}
          <IconBtn onClick={() => setShowStats(true)}>
            <BarChart2 className="w-4 h-4" />
          </IconBtn>


          {/* Fullscreen */}
          <IconBtn onClick={toggleFullscreen}>
            {full ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </IconBtn>

          {/* Profile
          <div
            onClick={() => alert("Profile clicked")}
            className="w-6 h-6 rounded-full overflow-hidden border cursor-pointer"
          >
            <img
  src={A1}
  className="w-6 h-6 rounded-full"
  alt="student"
/>
          </div> */}
          <div className="relative">
            {/* PROFILE AVATAR */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
              }}
              className="w-8 h-8 rounded-full overflow-hidden border"
            >
              <img src={A1} className="w-full h-full object-cover" alt="profile" />
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">

                {/* PROFILE */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/admin/profile");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <User size={16} />
                  Profile
                </button>

                <div className="h-px bg-gray-200 my-1" />

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      {showStats && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white w-[600px] rounded-xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowStats(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>

            {/* GRAPH */}
            <StatisticsChart />
          </div>
        </div>
      )}

    </header>
  );
}

/* ICON BUTTON */
function IconBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
      relative 
      w-8 h-8 
      sm:w-9 sm:h-9 
      border border-gray-200 
      rounded-lg 
      flex items-center justify-center 
      text-gray-600 
      hover:bg-gray-100
    ">
      {children}
    </button>
  );
}
