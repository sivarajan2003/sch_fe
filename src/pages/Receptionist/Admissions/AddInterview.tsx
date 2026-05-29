import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import admissionService from "../../../service/admissionService";
import teacherService from "../../../service/teacherService";
import interviewService from "../../../service/interviewService";
import { toast } from "react-toastify";

export default function AddInterview() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    admission_id: "",
    teacher_id: "",
    interview_date: "",
    location: "Admin Office - Room 101",
    remarks: "",
  });

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const [admissionRes, teacherRes] = await Promise.all([
        admissionService.getAdmissions({
          limit: 100,
          filters: JSON.stringify({ is_active: true }),
          order: JSON.stringify([['createdAt', 'DESC']]),
        }),
        teacherService.getTeachers({ limit: 100 }),
      ]);

      if (admissionRes.success) {
        setAdmissions(admissionRes.rows || admissionRes.data?.rows || []);
      }

      if (teacherRes.success) {
        setTeachers(teacherRes.rows || teacherRes.data?.rows || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load admissions or teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.admission_id || !form.teacher_id || !form.interview_date || !form.location) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        admission_id: form.admission_id,
        teacher_id: form.teacher_id,
        interview_date: form.interview_date,
        location: form.location,
        remarks: form.remarks || null,
        status: "Scheduled",
      };

      const res = await interviewService.createInterview(payload);
      if (res.success) {
        toast.success("Interview created successfully");
        navigate("/admin/dashboard/receptionist/admissions/interviews");
      } else {
        toast.error(res.message || "Failed to create interview");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create interview");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Add Interview</h2>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Admissions / Add Interview</p>
        </div>
        <button onClick={() => navigate("/admin/dashboard/receptionist/admissions/interviews")} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4" /> Back to Interviews
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Select Admission</span>
            <select
              value={form.admission_id}
              onChange={(e) => handleChange('admission_id', e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Select student / admission</option>
              {admissions.map((admission: any) => (
                <option key={admission.id} value={admission.id}>
                  {admission.student_name} — {admission.addmission_number || admission.id}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Assign Teacher</span>
            <select
              value={form.teacher_id}
              onChange={(e) => handleChange('teacher_id', e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">Select teacher</option>
              {teachers.map((teacher: any) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name || teacher.email} {teacher.status ? `(${teacher.status})` : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Interview Date</span>
            <input
              type="date"
              value={form.interview_date}
              onChange={(e) => handleChange('interview_date', e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Remarks</span>
          <textarea
            value={form.remarks}
            onChange={(e) => handleChange('remarks', e.target.value)}
            rows={4}
            className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes for the interview"
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button type="button" onClick={() => navigate("/admin/dashboard/receptionist/admissions/interviews")} className="px-5 py-3 border rounded-xl text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 disabled:opacity-60">
            {submitting ? 'Saving...' : 'Save Interview'}
          </button>
        </div>
      </form>
    </div>
  );
}
