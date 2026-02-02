import { useState } from "react";

const applications = [
    {
      id: "ADM-2026-0020",
      name: "Vihaan Rao",
      avatar: "https://i.pravatar.cc/40?img=1",
      class: "Grade 2",
      date: "20 Jan 2026",
      status: "Interview Done",
    },
    {
      id: "ADM-2026-0030",
      name: "Ishaan Desai",
      avatar: "https://i.pravatar.cc/40?img=2",
      class: "Nursery",
      date: "20 Jan 2026",
      status: "Enrolled",
    },
    {
      id: "ADM-2026-0037",
      name: "Pranav Verma",
      avatar: "https://i.pravatar.cc/40?img=3",
      class: "Grade 1",
      date: "20 Jan 2026",
      status: "Interview Done",
    },
    {
      id: "ADM-2026-0046",
      name: "Arnav Patel",
      avatar: "https://i.pravatar.cc/40?img=4",
      class: "Grade 3",
      date: "20 Jan 2026",
      status: "Offer Sent",
    },
    {
      id: "ADM-2026-0013",
      name: "Arjun Kulkarni",
      avatar: "https://i.pravatar.cc/40?img=5",
      class: "Grade 1",
      date: "19 Jan 2026",
      status: "Enrolled",
    },
  
    // ✅ ADDITIONAL 10 RECORDS
    {
      id: "ADM-2026-0041",
      name: "Ishaan Kulkarni",
      avatar: "https://i.pravatar.cc/40?img=6",
      class: "Grade 3",
      date: "19 Jan 2026",
      status: "Registered",
    },
    {
      id: "ADM-2026-0023",
      name: "Pranav Mehta",
      avatar: "https://i.pravatar.cc/40?img=7",
      class: "Grade 2",
      date: "18 Jan 2026",
      status: "Interview Done",
    },
    {
      id: "ADM-2026-0038",
      name: "Vihaan Sharma",
      avatar: "https://i.pravatar.cc/40?img=8",
      class: "Grade 3",
      date: "18 Jan 2026",
      status: "Registered",
    },
    {
      id: "ADM-2026-0049",
      name: "Aarav Singh",
      avatar: "https://i.pravatar.cc/40?img=9",
      class: "Nursery",
      date: "17 Jan 2026",
      status: "Offer Sent",
    },
    {
      id: "ADM-2026-0052",
      name: "Riya Malhotra",
      avatar: "https://i.pravatar.cc/40?img=10",
      class: "Grade 1",
      date: "17 Jan 2026",
      status: "Interview Done",
    },
    {
      id: "ADM-2026-0055",
      name: "Kabir Joshi",
      avatar: "https://i.pravatar.cc/40?img=11",
      class: "Grade 2",
      date: "16 Jan 2026",
      status: "Enrolled",
    },
    {
      id: "ADM-2026-0057",
      name: "Anaya Iyer",
      avatar: "https://i.pravatar.cc/40?img=12",
      class: "Nursery",
      date: "16 Jan 2026",
      status: "Registered",
    },
    {
      id: "ADM-2026-0060",
      name: "Dev Menon",
      avatar: "https://i.pravatar.cc/40?img=13",
      class: "Grade 3",
      date: "15 Jan 2026",
      status: "Interview Done",
    },
    {
      id: "ADM-2026-0063",
      name: "Sara Khan",
      avatar: "https://i.pravatar.cc/40?img=14",
      class: "Grade 1",
      date: "15 Jan 2026",
      status: "Offer Sent",
    },
    {
      id: "ADM-2026-0066",
      name: "Neil Fernandes",
      avatar: "https://i.pravatar.cc/40?img=15",
      class: "Grade 2",
      date: "14 Jan 2026",
      status: "Enrolled",
    },
  ];
  
  
  const statusStyle = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-green-100 text-green-700";
      case "Interview Done":
        return "bg-indigo-100 text-indigo-700";
      case "Offer Sent":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  
  export default function RecentApplications() {
    const [showAll, setShowAll] = useState(false);

const visibleApplications = showAll
  ? applications
  : applications.slice(0, 10);
  const [viewApp, setViewApp] = useState<any>(null);

    return (
<div className="bg-white rounded-2xl border shadow-sm overflow-hidden 
px-0 sm:px-0">
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
  onClick={() => setShowAll((prev) => !prev)}
  className="text-sm text-blue-600 font-medium hover:underline"
>
  {showAll ? "Show Less ↑" : "View All →"}
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
            {visibleApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {app.id}
                  </td>
  
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={app.avatar}
                      className="w-9 h-9 rounded-full"
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
              ))}
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
  