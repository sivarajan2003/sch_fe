import { useState, useEffect } from "react";
// @ts-ignore
import admissionService from "../../../service/admissionService";
import { useNavigate } from "react-router-dom";

const statusStyle = (status: string) => {
  switch (status) {
    case "Enrolled":
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Interview Done":
    case "Interview Scheduled":
      return "bg-indigo-100 text-indigo-700";
    case "Offer Sent":
      return "bg-cyan-100 text-cyan-700";
    default: // Applied / Pending
      return "bg-gray-100 text-gray-600";
  }
};

export default function RecentApplications() {
  const [data, setData] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [viewApp, setViewApp] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecents();
  }, []);

  const fetchRecents = async () => {
    try {
      const res = await admissionService.getAdmissions({
        limit: 15,
        order: JSON.stringify([['createdAt', 'DESC']])
      });
      if (res.success && res.rows) {
        // Transform data
        const mapped = res.rows.map((item: any) => ({
          id: item.addmission_number || item.id.substring(0, 8),
          name: item.student_name,
          avatar: item.passport_size_photo ? (item.passport_size_photo.startsWith("uploads") ? `http://localhost:4000/${item.passport_size_photo}` : item.passport_size_photo) : `https://ui-avatars.com/api/?name=${item.student_name}&background=random`,
          class: item.class_name || "N/A",
          date: new Date(item.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }),
          status: item.admission_status,
          fullData: item,
        }));
        setData(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch recent applications", error);
    }
  };

  const visibleApplications = showAll ? data : data.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden px-0 sm:px-0">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Applications
          </h3>
          <p className="text-sm text-gray-500">
            Latest admission requests
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard/receptionist/admissions/all")}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      {/* TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Application ID</th>
              <th className="px-6 py-3 text-left">Student Name</th>
              <th className="px-6 py-3 text-left">Class</th>
              <th className="px-6 py-3 text-left">Applied On</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {visibleApplications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No recent applications found.
                </td>
              </tr>
            ) : (
              visibleApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {app.id}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={app.avatar}
                      className="w-9 h-9 rounded-full object-cover"
                      alt={app.name}
                    />
                    <span className="font-medium text-gray-900">
                      {app.name}
                    </span>
                  </td>

                  <td className="px-6 py-4">{app.class}</td>
                  <td className="px-6 py-4">{app.date}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setViewApp(app)}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>
      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4 p-4">
        {visibleApplications.map((app) => (
          <div
            key={app.id}
            className="border rounded-xl p-4 bg-white space-y-3"
          >
            {/* TOP */}
            <div className="flex items-center gap-3">
              <img
                src={app.avatar}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-xs text-gray-500">{app.id}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Class</p>
                <p>{app.class}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p>{app.date}</p>
              </div>
            </div>

            <span
              className={`inline-block px-3 py-1 rounded-full text-xs ${statusStyle(
                app.status
              )}`}
            >
              {app.status}
            </span>

            <button
              onClick={() => setViewApp(app)}
              className="w-full border rounded-lg py-2 text-blue-600 text-sm"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {viewApp && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden 
max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="bg-blue-50 px-4 sm:px-6 py-4 
flex flex-col sm:flex-row sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {viewApp.name}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-blue-600 font-medium">
                    {viewApp.id}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {viewApp.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setViewApp(null)}
                className="text-xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* TABS (ONLY OVERVIEW) */}
            <div className="border-b px-6">
              <button className="py-3 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
                Overview
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6">

              {/* STUDENT INFO */}
              <div className="bg-white p-5 rounded-xl border">
                <h3 className="font-semibold mb-4">Student Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
                  <p><b>Full Name:</b> {viewApp.name}</p>
                  <p><b>Applied On:</b> {viewApp.date}</p>
                  <p><b>Class:</b> {viewApp.class}</p>
                  <p><b>Status:</b> {viewApp.status}</p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="bg-white p-5 rounded-xl border">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-sm text-gray-600">—</p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="px-4 sm:px-6 py-4 border-t flex justify-center sm:justify-end">
              <button
                onClick={() => setViewApp(null)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
