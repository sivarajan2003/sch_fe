import React, { useEffect, useState } from "react";
import { Users, Save, Plus, Trash2, RefreshCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getClasses } from "../../service/classService";
import { getSubjects } from "../../service/subjectService";
import {
  getClassSubjectTeachers,
  createClassSubjectTeacher,
  deleteClassSubjectTeacher,
} from "../../service/classsubjectteacherService";
import { getTeachers } from "../../service/teacherService";

type Assignment = {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  class_name?: string;
  subject_name?: string;
  teacher_name?: string;
};

export default function TeacherAssignment() {
  const { id: urlTeacherId } = useParams();

  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    teacher_id: urlTeacherId ?? "",
    class_id: "",
    subject_id: "",
  });

  useEffect(() => {
    fetchDropdowns();
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (urlTeacherId) setForm(f => ({ ...f, teacher_id: urlTeacherId }));
  }, [urlTeacherId]);

  const fetchDropdowns = async () => {
    try {
      const [classRes, subjectRes, teacherRes] = await Promise.all([
        getClasses({ limit: 500 }),
        getSubjects({ limit: 500 }),
        getTeachers({ limit: 500 }),
      ]);

      const toRows = (r: any) =>
        Array.isArray(r) ? r : Array.isArray(r?.rows) ? r.rows : Array.isArray(r?.data) ? r.data : [];

      setClasses(toRows(classRes).map((c: any) => ({ id: c.id, name: c.class_name ?? c.name ?? "" })));
      setSubjects(toRows(subjectRes).map((s: any) => ({ id: s.id, name: s.subject_name ?? s.name ?? "" })));
      setTeachers(toRows(teacherRes).map((t: any) => ({ id: t.id, name: t.name ?? "" })));
    } catch {
      toast.error("Failed to load dropdown data");
    }
  };

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await getClassSubjectTeachers({ limit: 200 });
      const rows = Array.isArray(res) ? res : Array.isArray(res?.rows) ? res.rows : Array.isArray(res?.data) ? res.data : [];
      setAssignments(rows);
    } catch {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.teacher_id || !form.class_id || !form.subject_id) {
      toast.error("Please select teacher, class, and subject");
      return;
    }
    try {
      setSaving(true);
      await createClassSubjectTeacher({
        teacher_id: form.teacher_id,
        class_id: form.class_id,
        subject_id: form.subject_id,
      });
      toast.success("Assignment saved");
      setForm(f => ({ ...f, class_id: "", subject_id: "" }));
      fetchAssignments();
    } catch {
      toast.error("Failed to save assignment");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (a: Assignment) => {
    if (!window.confirm("Remove this assignment?")) return;
    try {
      await deleteClassSubjectTeacher(a.id);
      toast.success("Assignment removed");
      fetchAssignments();
    } catch {
      toast.error("Failed to remove assignment");
    }
  };

  const getName = (list: { id: string; name: string }[], id: string) =>
    list.find(x => x.id === id)?.name ?? id;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-600" /> Teacher Assignment
        </h1>
        <p className="text-sm text-gray-500 mt-1">Dashboard / HR / Teacher Assignment</p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Assign Teacher to Class & Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Teacher</label>
            <select className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
              value={form.teacher_id} onChange={e => setForm({ ...form, teacher_id: e.target.value })}>
              <option value="">Select Teacher</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Class</label>
            <select className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
              value={form.class_id} onChange={e => setForm({ ...form, class_id: e.target.value })}>
              <option value="">Select Class</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Subject</label>
            <select className="w-full mt-2 border rounded-xl px-4 py-3 text-sm"
              value={form.subject_id} onChange={e => setForm({ ...form, subject_id: e.target.value })}>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={handleSave} disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save Assignment"}
          </button>
          <button onClick={fetchAssignments}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
            <RefreshCcw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* ASSIGNMENTS TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="text-base font-semibold text-gray-700">Current Assignments</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["#", "Teacher", "Class", "Subject", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No assignments yet</td></tr>
              ) : assignments.map((a, i) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {a.teacher_name ?? getName(teachers, a.teacher_id)}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {a.class_name ?? getName(classes, a.class_id)}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {a.subject_name ?? getName(subjects, a.subject_id)}
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => handleDelete(a)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
