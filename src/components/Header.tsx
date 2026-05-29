import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  BarChart2,
  Maximize2,
  Minimize2,
  ChevronDown,
  Menu,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import A1 from "../assets/a1.png";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { CalendarDays } from "lucide-react";
import StatisticsChart from "../components/StatisticsChart";
import { getAcademicyears, createAcademicyear } from "../service/academicyearService.js";

export default function Header({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const [showStats, setShowStats] = useState(false);
  const [dark, setDark] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const [academicYears, setAcademicYears] = useState<{ id: string; name: string }[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Add Academic Year form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ yearsbyname: "", startdate: "", enddate: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    loadAcademicYears();
  }, []);

  useEffect(() => {
    const close = () => { setYearOpen(false); setProfileOpen(false); };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const loadAcademicYears = async () => {
    try {
      const res = await getAcademicyears({ limit: 100 });
      const payload = (res as any)?.data?.data ?? (res as any)?.data ?? res;
      const list: any[] = Array.isArray(payload)
        ? payload
        : payload?.rows ?? payload?.items ?? payload?.data ?? [];

      const years = list
        .map((y: any) => ({ id: y.id, name: y.yearsbyname ?? y.year ?? y.name }))
        .filter((y) => y.name);

      setAcademicYears(years);

      const saved = localStorage.getItem("academicYear");
      const savedMatch = years.find((y) => y.name === saved);
      if (savedMatch) {
        setSelectedYear(savedMatch.name);
      } else if (years.length) {
        setSelectedYear(years[years.length - 1].name);
        localStorage.setItem("academicYear", years[years.length - 1].name);
      }
    } catch (err) {
      console.error("Failed to load academic years", err);
    }
  };

  const handleAddAcademicYear = async () => {
    if (!addForm.yearsbyname.trim() || !addForm.startdate || !addForm.enddate) {
      setAddError("All fields are required");
      return;
    }
    setAddLoading(true);
    setAddError("");
    try {
      await createAcademicyear({
        yearsbyname: addForm.yearsbyname.trim(),
        startdate: addForm.startdate,
        enddate: addForm.enddate,
        is_active: true,
      });
      setAddForm({ yearsbyname: "", startdate: "", enddate: "" });
      setShowAddForm(false);
      await loadAcademicYears();
    } catch (err: any) {
      setAddError(err?.response?.data?.message ?? "Failed to create academic year");
    } finally {
      setAddLoading(false);
    }
  };
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
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border rounded-xl shadow-xl z-[50]">
              {/* existing years */}
              <div className="max-h-52 overflow-y-auto">
                {academicYears.length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-400">No academic years found</p>
                )}
                {academicYears.map((year) => (
                  <div
                    key={year.id}
                    onClick={() => {
                      localStorage.setItem("academicYear", year.name);
                      setSelectedYear(year.name);
                      setYearOpen(false);
                      setShowAddForm(false);
                      navigate("/admin/dashboard/academic/academic-year", {
                        state: { year: year.name },
                      });
                    }}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-sm flex items-center justify-between ${
                      selectedYear === year.name ? "bg-blue-50 text-blue-600 font-semibold" : ""
                    }`}
                  >
                    <span>{year.name}</span>
                    {selectedYear === year.name && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t" />

              {/* ADD FORM toggle */}
              {!showAddForm ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowAddForm(true); setAddError(""); }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-medium"
                >
                  <Plus size={14} /> Add Academic Year
                </button>
              ) : (
                <div className="p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-700">New Academic Year</p>
                    <button onClick={() => { setShowAddForm(false); setAddError(""); }}>
                      <X size={14} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="e.g. 2025 / 2026"
                    value={addForm.yearsbyname}
                    onChange={(e) => setAddForm({ ...addForm, yearsbyname: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                      <input
                        type="date"
                        value={addForm.startdate}
                        onChange={(e) => setAddForm({ ...addForm, startdate: e.target.value })}
                        className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                      <input
                        type="date"
                        value={addForm.enddate}
                        onChange={(e) => setAddForm({ ...addForm, enddate: e.target.value })}
                        className="w-full border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  {addError && <p className="text-xs text-red-500">{addError}</p>}

                  <button
                    onClick={handleAddAcademicYear}
                    disabled={addLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {addLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                    {addLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
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
