import {
  Users,
  Save,
} from "lucide-react";

import { useParams } from "react-router-dom";
import { useState } from "react";

export default function TeacherAssignment() {
  const { id } = useParams();

  const [form, setForm] = useState({
    className: "",
    section: "",
    subject: "",
  });

  const handleSave = () => {
    console.log("Teacher ID:", id);
    console.log("Assignment:", form);

    alert("Teacher Assigned Successfully ✅");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl border p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            Teacher Assignment
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Dashboard / HR / Teacher Assignment
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl border p-6 max-w-2xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium text-gray-600">
              Class
            </label>

            <select
              className="w-full mt-2 border rounded-xl px-4 py-3"
              value={form.className}
              onChange={(e) =>
                setForm({
                  ...form,
                  className: e.target.value,
                })
              }
            >
              <option value="">Select Class</option>
              <option>1-A</option>
              <option>2-A</option>
              <option>3-A</option>
              <option>10-A</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Section
            </label>

            <select
              className="w-full mt-2 border rounded-xl px-4 py-3"
              value={form.section}
              onChange={(e) =>
                setForm({
                  ...form,
                  section: e.target.value,
                })
              }
            >
              <option value="">Select Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Subject
            </label>

            <select
              className="w-full mt-2 border rounded-xl px-4 py-3"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value,
                })
              }
            >
              <option value="">Select Subject</option>
              <option>Maths</option>
              <option>Science</option>
              <option>English</option>
              <option>Physics</option>
            </select>
          </div>

        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Save size={18} />
          Save Assignment
        </button>

      </div>
    </div>
  );
}