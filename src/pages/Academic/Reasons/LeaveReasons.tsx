import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    student: "Karthik",
    class: "VIII - C",
    reason: "Medical leave",
    date: "10 Mar 2025",
  },
  {
    student: "Sneha",
    class: "VII - A",
    reason: "Family emergency",
    date: "11 Mar 2025",
  },
];

export default function LeaveReasons() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* 🔙 BACK HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("..")}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-lg font-semibold">Leave Reasons</h2>
      </div>

      {/* TABLE */}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Reason</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t text-sm">
              <td className="p-3">{row.student}</td>
              <td className="p-3">{row.class}</td>
              <td className="p-3">{row.reason}</td>
              <td className="p-3">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
