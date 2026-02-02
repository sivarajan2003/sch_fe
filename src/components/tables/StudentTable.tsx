import { Edit, Trash2 } from "lucide-react";

export default function StudentTable() {
  const students = [
    { id: 1, name: "Fahed", class: "III-C", roll: 12, status: "Active" },
    { id: 2, name: "Ayaan", class: "IV-A", roll: 7, status: "Active" },
    { id: 3, name: "Sara", class: "II-B", roll: 19, status: "Inactive" },
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Students List</h3>
        <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          + Add Student
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Name</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-3 font-medium">{s.name}</td>
                <td>{s.class}</td>
                <td>{s.roll}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
