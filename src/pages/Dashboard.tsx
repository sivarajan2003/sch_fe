import { Users, GraduationCap, UsersRound, DollarSign } from "lucide-react";
import A1 from "../assets/a1.png";
import A6 from "../assets/a6.png";
import A7 from "../assets/a7.png";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import FeeCollectionChart from "../components/FeeCollectionChart";
import Calendar from "../components/Calendar";
import UpcomingEvents from "../components/UpcomingEvents";
import QuickStats from "../components/QuickStats";
import LeaveRequests from "../components/LeaveRequests";
import QuickLinks from "../components/QuickLinks";
import ClassRoutine from "../components/ClassRoutine";
import PerformanceCard from "../components/PerformanceCard";
import EarningsExpenses from "../components/EarningsExpenses";
import TopPerformers from "../components/TopPerformers";
import NoticeBoard from "../components/NoticeBoard";
import FeeSummaryCards from "../components/FeeSummaryCards";
import QuickActionCards from "../components/QuickActionCards";
import LastDashboardWidgets from "../components/LastDashboardWidgets";

import StudGif from "../assets/gif/stud1.gif";
import TeacherGif from "../assets/gif/students.gif";
import StaffGif from "../assets/gif/staff.gif";
import SubjectGif from "../assets/gif/sub.gif";

import StudentTable from "../components/tables/StudentTable";
import FeesTable from "../components/tables/FeesTable";
import { useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
import dashboardService from "../service/dashboardService";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
const [stats, setStats] = useState({
  totalStudents: 0,
  totalTeachers: 0,
  totalStaff: 0,
  totalSubjects: 0,

  activeStudents: 0,
  inactiveStudents: 0,

  activeTeachers: 0,
  inactiveTeachers: 0,

  activeStaff: 0,
  inactiveStaff: 0,

  activeSubjects: 0,
  inactiveSubjects: 0,

  studentPercent: 0,
  teacherPercent: 0,
  staffPercent: 0,
  subjectPercent: 0,
});
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  loadDashboard();
}, []);
  const navigate = useNavigate();
  const loadDashboard = async () => {
  try {
    const res = await dashboardService.getDashboardStats();

    console.log("Dashboard API:", res);

    setStats(res.data || {});
  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">
            Dashboard / Admin Dashboard
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate("/admin/dashboard/academic/classes/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm w-full sm:w-auto"
          >
            Add Class
          </button>
          <button
            onClick={() => navigate("/admin/dashboard/people/students/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm w-full sm:w-auto"
          >
            Add New Student
          </button>
          <button
            onClick={() => navigate("/admin/dashboard/fees")}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
          >
            Fees Details
          </button>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {showAlert && (
        <div className="flex items-center justify-between bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-2 mb-4">
          <div className="flex items-start sm:items-center gap-2 text-sm">
            <img src={A1} className="w-6 h-6 rounded-full" alt="student" />
            <span>
              <strong>Fahed III.C</strong> has paid Fees for the{" "}
              <strong>Term1</strong>
            </span>
          </div>

          <button
            onClick={() => setConfirmOpen(true)}
            className="text-green-600 hover:text-green-800 text-lg"
          >
            ✕
          </button>
        </div>
      )}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Remove Notification?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to remove this notification?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowAlert(false);
                  setConfirmOpen(false);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}


      {/* WELCOME BANNER */}
      <div className="relative bg-gradient-to-r from-[#0F0C29] via-[#302B63] to-[#24243E] text-white rounded-xl p-6 mb-6 overflow-hidden">
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              Welcome Back, Mr. Praga
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Have a Good day at work
            </p>
          </div>
          <p className="text-xs text-gray-300">
            ⏱ {currentTime.toLocaleString()}
          </p>


        </div>
      </div>
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={StudGif}
          title="Total Students"
          value={stats.totalStudents || 0}
         percent={`${stats.studentPercent || 0}`}
          percentBg="bg-red-100"
          percentText="text-red-600"
active={stats.activeStudents || 0}
inactive={stats.inactiveStudents || 0}
          iconBg="bg-pink-50"
          delay={0.1}
        />

        <StatCard
          icon={TeacherGif}
          title="Total Teachers"
          value={stats.totalTeachers || 0}
          percent={`${stats.teacherPercent || 0}`}
          percentBg="bg-blue-100"
          percentText="text-blue-600"
         active={stats.activeTeachers || 0}
inactive={stats.inactiveTeachers || 0}
          iconBg="bg-cyan-50"
          delay={0.2}
        />

        <StatCard
          icon={StaffGif}
          title="Total Staff"
          value={stats.totalStaff || 0}
          percent={`${stats.staffPercent || 0}`}
          percentBg="bg-yellow-100"
          percentText="text-yellow-600"
         active={stats.activeStaff || 0}
inactive={stats.inactiveStaff || 0}
          iconBg="bg-yellow-50"
          delay={0.3}
        />

        <StatCard
          icon={SubjectGif}
          title="Total Subjects"
          value={stats.totalSubjects || 0}
         percent={`${stats.subjectPercent || 0}`}
          percentBg="bg-green-100"
          percentText="text-green-600"
         active={stats.activeSubjects || 0}
inactive={stats.inactiveSubjects || 0}
          iconBg="bg-green-50"
          delay={0.4}
        />
      </div>

      {/* FEES + LEAVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <FeeCollectionChart />
        </div>
        <LeaveRequests />
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col gap-6">
          <Calendar />
          <UpcomingEvents />
        </div>

        <div className="flex flex-col gap-6">
          <QuickStats />
          <TopPerformers />
        </div>

        <div className="flex flex-col gap-6">
          <QuickLinks />
          <ClassRoutine />
          <PerformanceCard />
        </div>
      </div>

      {/* EARNINGS + NOTICE + FEES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <EarningsExpenses />
        </div>

        <div className="lg:col-span-2">
          <NoticeBoard />
        </div>

        <div className="lg:col-span-1">
          <FeeSummaryCards />
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-6">
        <QuickActionCards />
      </div>

      {/* LAST WIDGETS */}
      <div className="mb-6">
        <LastDashboardWidgets />
      </div>
    </>
  );
}
