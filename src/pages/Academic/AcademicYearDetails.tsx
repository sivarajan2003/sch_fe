//import { useParams, useNavigate } from "react-router-dom";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";

interface ClassData {
  id: number;
  className: string;
  students: number;
  sections: number;
}
 
export default function AcademicYearDetails() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!year) return;
  
    const fetchClasses = async () => {
      try {
        const res = await api.get(
          `/school/class?academicyear_id=${year}`
        );
        setClasses(res.data.data);
      } catch (error) {
        console.error("Failed to load classes", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClasses();
  }, [year]);
  const totalClasses = classes.length;
const totalStudents = classes.reduce(
  (sum, c) => sum + (c.students || 0),
  0
);
const totalSections = classes.reduce(
  (sum, c) => sum + (c.sections || 0),
  0
);

  return (
    <div className="p-6 space-y-6">
      <button
  onClick={() => navigate("/admin/dashboard/academic/academic-year")}
  className="text-blue-600 hover:underline mb-4"
>
  ← Back
</button>

      <h2 className="text-2xl font-semibold">
      Academic Year Details
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
  <div className="bg-white border rounded-xl p-4">
    <p className="text-gray-500 text-sm">Total Classes</p>
    <p className="text-2xl font-semibold">{totalClasses}</p>
  </div>

  <div className="bg-white border rounded-xl p-4">
    <p className="text-gray-500 text-sm">Total Students</p>
    <p className="text-2xl font-semibold">{totalStudents}</p>
  </div>

  <div className="bg-white border rounded-xl p-4">
    <p className="text-gray-500 text-sm">Total Sections</p>
    <p className="text-2xl font-semibold">{totalSections}</p>
  </div>
</div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Class</th>
              <th className="p-3">Students</th>
              <th className="p-3">Sections</th>
            </tr>
          </thead>
          <tbody>
          {classes.map((c, i) => (

              <tr key={i} className="border-t">
                <td className="p-3">{c.className}</td>
                <td className="p-3">{c.students}</td>
                <td className="p-3">{c.sections}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
