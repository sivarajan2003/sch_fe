import { useState } from "react";
import { Calendar, Bell, FileText } from "lucide-react";

/* ================= MAIN ================= */

export default function Settings() {
  const [activeTab, setActiveTab] = useState("academic");

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage system configuration and preferences
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        <TabButton
          label="Academic Year"
          icon={Calendar}
          active={activeTab === "academic"}
          onClick={() => setActiveTab("academic")}
        />
        <TabButton
          label="Notification Settings"
          icon={Bell}
          active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        />
        <TabButton
          label="Audit Logs"
          icon={FileText}
          active={activeTab === "audit"}
          onClick={() => setActiveTab("audit")}
        />
      </div>

      {/* CONTENT */}
      <div className="bg-white border rounded-xl p-6">
        {activeTab === "academic" && <AcademicYearSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "audit" && <AuditLogs />}
      </div>
    </div>
  );
}

/* ================= TAB BUTTON ================= */

function TabButton({ label, icon: Icon, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          active
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

/* ================= ACADEMIC YEAR ================= */

function AcademicYearSettings() {
  const [year, setYear] = useState("2024 - 2025");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Academic Year</h2>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Academic Year"
          value={year}
          onChange={(e: any) => setYear(e.target.value)}
        />

        <Input label="Status" value="Active" disabled />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => alert("Academic Year Updated ✅")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}

/* ================= NOTIFICATION SETTINGS ================= */

function NotificationSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notification Settings</h2>

      <Toggle label="Exam Notifications" />
      <Toggle label="Fee Payment Alerts" />
      <Toggle label="Attendance Alerts" />
      <Toggle label="System Updates" />
    </div>
  );
}

/* ================= AUDIT LOGS ================= */

function AuditLogs() {
  const logs = [
    { id: 1, action: "Login", user: "Admin", date: "15 May 2025" },
    { id: 2, action: "Updated Academic Year", user: "Admin", date: "14 May 2025" },
    { id: 3, action: "Deleted Fee Record", user: "Admin", date: "13 May 2025" },
    { id: 4, action: "Changed Notification Settings", user: "Admin", date: "12 May 2025" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Audit Logs</h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3">{log.user}</td>
                <td className="px-4 py-3">{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="mt-1 w-full h-10 px-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function Toggle({ label }: any) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
      <span className="text-sm">{label}</span>
      <input type="checkbox" className="w-5 h-5 accent-blue-600" />
    </div>
  );
}
