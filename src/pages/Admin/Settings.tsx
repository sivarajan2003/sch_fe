import { useState, useEffect } from "react";
import { Calendar, Bell, FileText, Save, RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";
import { getSettings, updateSettings } from "../../service/settingsService";

/* ================= MAIN ================= */

export default function Settings() {
  const [activeTab, setActiveTab] = useState("academic");
  const [settingsMap, setSettingsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      const map = res.data?.map ?? {};
      setSettingsMap(map);
    } catch {
      // silently use defaults if backend not reachable
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (payload: Record<string, string>) => {
    try {
      setSaving(true);
      await updateSettings(payload);
      setSettingsMap((prev) => ({ ...prev, ...payload }));
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage system configuration and preferences
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="p-2 border rounded-lg hover:bg-gray-50"
          title="Refresh"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        <TabButton label="Academic Year"          icon={Calendar} active={activeTab === "academic"}      onClick={() => setActiveTab("academic")} />
        <TabButton label="Notification Settings"  icon={Bell}     active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
        <TabButton label="Audit Logs"             icon={FileText} active={activeTab === "audit"}         onClick={() => setActiveTab("audit")} />
      </div>

      {/* CONTENT */}
      <div className="bg-white border rounded-xl p-6">
        {activeTab === "academic"      && <AcademicYearSettings map={settingsMap} saving={saving} onSave={saveSettings} />}
        {activeTab === "notifications" && <NotificationSettings map={settingsMap} saving={saving} onSave={saveSettings} />}
        {activeTab === "audit"         && <AuditLogs />}
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
        ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

/* ================= ACADEMIC YEAR ================= */

function AcademicYearSettings({ map, saving, onSave }: any) {
  const [year,   setYear]   = useState(map.academic_year        ?? "2024 - 2025");
  const [status, setStatus] = useState(map.academic_year_status ?? "Active");
  const [school, setSchool] = useState(map.school_name          ?? "");
  const [phone,  setPhone]  = useState(map.school_phone         ?? "");
  const [email,  setEmail]  = useState(map.school_email         ?? "");
  const [addr,   setAddr]   = useState(map.school_address       ?? "");

  // Sync when map loads from server
  useEffect(() => {
    if (map.academic_year)        setYear(map.academic_year);
    if (map.academic_year_status) setStatus(map.academic_year_status);
    if (map.school_name)          setSchool(map.school_name);
    if (map.school_phone)         setPhone(map.school_phone);
    if (map.school_email)         setEmail(map.school_email);
    if (map.school_address)       setAddr(map.school_address);
  }, [map]);

  const handleSave = () => {
    onSave({
      academic_year: year,
      academic_year_status: status,
      school_name: school,
      school_phone: phone,
      school_email: email,
      school_address: addr,
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Academic & School Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Academic Year"          value={year}   onChange={(e: any) => setYear(e.target.value)}   placeholder="e.g. 2025 - 2026" />
        <div>
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full h-10 px-3 border rounded-lg text-sm"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <Input label="School Name"    value={school} onChange={(e: any) => setSchool(e.target.value)} placeholder="School name" />
        <Input label="School Phone"   value={phone}  onChange={(e: any) => setPhone(e.target.value)}  placeholder="+1 000 000 0000" />
        <Input label="School Email"   value={email}  onChange={(e: any) => setEmail(e.target.value)}  placeholder="info@school.com" />
        <Input label="School Address" value={addr}   onChange={(e: any) => setAddr(e.target.value)}   placeholder="123 School Lane" />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

/* ================= NOTIFICATION SETTINGS ================= */

function NotificationSettings({ map, saving, onSave }: any) {
  const [notifs, setNotifs] = useState({
    notif_exam:           map.notif_exam           === "true",
    notif_fee_payment:    map.notif_fee_payment    === "true",
    notif_attendance:     map.notif_attendance     === "true",
    notif_system_updates: map.notif_system_updates === "true",
  });

  useEffect(() => {
    setNotifs({
      notif_exam:           map.notif_exam           === "true",
      notif_fee_payment:    map.notif_fee_payment    === "true",
      notif_attendance:     map.notif_attendance     === "true",
      notif_system_updates: map.notif_system_updates === "true",
    });
  }, [map]);

  const toggle = (key: string) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  const handleSave = () => {
    const payload: Record<string, string> = {};
    Object.entries(notifs).forEach(([k, v]) => { payload[k] = String(v); });
    onSave(payload);
  };

  const labels: Record<string, string> = {
    notif_exam:           "Exam Notifications",
    notif_fee_payment:    "Fee Payment Alerts",
    notif_attendance:     "Attendance Alerts",
    notif_system_updates: "System Updates",
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Notification Settings</h2>

      <div className="space-y-3">
        {Object.entries(notifs).map(([key, val]) => (
          <div
            key={key}
            className="flex items-center justify-between border rounded-lg px-4 py-3"
          >
            <span className="text-sm">{labels[key]}</span>
            <button
              onClick={() => toggle(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? "Saving..." : "Save Notifications"}
        </button>
      </div>
    </div>
  );
}

/* ================= AUDIT LOGS ================= */

function AuditLogs() {
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
            {[
              { id: 1, action: "Login",                          user: "Admin", date: "15 May 2025" },
              { id: 2, action: "Updated Academic Year",          user: "Admin", date: "14 May 2025" },
              { id: 3, action: "Deleted Fee Record",             user: "Admin", date: "13 May 2025" },
              { id: 4, action: "Changed Notification Settings",  user: "Admin", date: "12 May 2025" },
            ].map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
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
