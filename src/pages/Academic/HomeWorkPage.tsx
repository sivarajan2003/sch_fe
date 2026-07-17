import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCcw,
  BookOpen,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  createHomework,
  getStudentHomework,
} from "../../service/homeworkService";
import { getStudents } from "../../service/studentService";

type Homework = {
  id?: string;
  student_id: string;
  student_name?: string;
  subject: string;
  title: string;
  description: string;
  due_date: string;
  status?: string;
};

const EMPTY_FORM: Omit<Homework, "id"> = {
  student_id: "",
  subject: "",
  title: "",
  description: "",
  due_date: "",
  status: "Pending",
};

export default function HomeWorkPage() {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Homework | null>(null);
  const [form, setForm] = useState<Omit<Homework, "id">>(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      fetchHomework(selectedStudentId);
    } else {
      setHomeworks([]);
    }
  }, [selectedStudentId]);

  const fetchStudents = async () => {
    try {
      const res = await getStudents({ limit: 500 });
      const rows = Array.isArray(res)
        ? res
        : Array.isArray(res?.rows)
        ? res.rows
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setStudents(
        rows.map((s: any) => ({
          id: s.id,
          name: s.name || s.student_name || `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim(),
        }))
      );
    } catch {
      toast.error("Failed to load students");
    }
  };

  const fetchHomework = async (studentId: string) => {
    try {
      setLoading(true);
      const res = await getStudentHomework(studentId);
      const rows = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setHomeworks(rows);
    } catch {
      toast.error("Failed to load homework");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (hw: Homework) => {
    setEditItem(hw);
    setForm({
      student_id: hw.student_id,
      subject: hw.subject,
      title: hw.title,
      description: hw.description,
      due_date: hw.due_date?.slice(0, 10) ?? "",
      status: hw.status ?? "Pending",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.student_id || !form.subject || !form.title || !form.due_date) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createHomework(form);
      toast.success("Homework saved");
      setShowModal(false);
      if (selectedStudentId) fetchHomework(selectedStudentId);
    } catch {
      toast.error("Failed to save homework");
    }
  };

  const filtered = homeworks.filter(
    (h) =>
      h.title?.toLowerCase().includes(search.toLowerCase()) ||
      h.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Homework
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Dashboard / Academic / Homework
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={16} />
          Assign Homework
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl border p-5 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Select Student
          </label>
          <select
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option value="">-- Select a student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Search
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm"
              placeholder="Search by title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => selectedStudentId && fetchHomework(selectedStudentId)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm"
        >
          <RefreshCcw size={15} />
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            Loading...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">#</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Subject</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Due Date</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    {selectedStudentId
                      ? "No homework found for this student."
                      : "Select a student to view their homework."}
                  </td>
                </tr>
              ) : (
                filtered.map((hw, i) => (
                  <tr key={hw.id ?? i} className="border-b hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {hw.title}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{hw.subject}</td>
                    <td className="px-5 py-3 text-gray-600">
                      {hw.due_date
                        ? new Date(hw.due_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          hw.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : hw.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {hw.status ?? "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-3 flex items-center gap-2">
                      <button
                        onClick={() => openEdit(hw)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {editItem ? "Edit Homework" : "Assign Homework"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Student <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                  value={form.student_id}
                  onChange={(e) =>
                    setForm({ ...form, student_id: e.target.value })
                  }
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    placeholder="e.g. Mathematics"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                    value={form.due_date}
                    onChange={(e) =>
                      setForm({ ...form, due_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm"
                  placeholder="Homework title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full mt-1.5 border rounded-xl px-4 py-2.5 text-sm resize-none"
                  placeholder="Describe the homework task..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
              >
                {editItem ? "Update" : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
