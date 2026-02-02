import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export default function AddClass() {
    const navigate = useNavigate();
  const STORAGE_KEY = "academic_classes";

  const initialForm = {
    id: "",
    className: "",
    section: "",
    students: "",
    teacherName: "",
    subjects: 0,
    status: "Active",
  };

  const [formData, setFormData] = useState<any>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
        !formData.id ||
        !formData.className ||
        !formData.section ||
        !formData.students ||
        !formData.subjects ||
        !formData.teacherName
      ) {
        toast.error("Please fill all fields");
        return;
      }      

    const saved =
      JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      const newClass = {
        ...formData,
        students: Number(formData.students),
        subjects: Number(formData.subjects), 
        status: "Active",
      };
       localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newClass, ...saved])
    );

    toast.success("Class created successfully");

     //✅ RESET FORM (stay on same page)
    setFormData(initialForm);
  };

  return (
<div className="p-6 space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center gap-3">
  <button
    onClick={() => navigate("/admin/dashboard")}
    className="w-fit px-3 py-2 border rounded-lg text-sm hover:bg-gray-50"
  >
    ← Back
  </button>

  <div>
    <h2 className="text-xl sm:text-2xl font-semibold">Add Class</h2>
    <p className="text-sm text-gray-500">
      Dashboard / Academic / Classes / Add Class
    </p>
  </div>
</div>


<div className="bg-white border rounded-xl p-4 sm:p-6 w-full sm:max-w-xl mx-auto">
        <div className="space-y-4">

        <Input label="Class ID" name="id" value={formData.id} onChange={handleChange} />
<Input label="Class" name="className" value={formData.className} onChange={handleChange} />
<Input label="Section" name="section" value={formData.section} onChange={handleChange} />
<Input label="No of Students" name="students" type="number" value={formData.students} onChange={handleChange} />
<Input label="No of Subjects" name="subjects" type="number" value={formData.subjects} onChange={handleChange} />
<Input label="Class Teacher" name="teacherName" value={formData.teacherName} onChange={handleChange} />
<div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
<button
  onClick={() => setFormData(initialForm)}
  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
>
  Cancel
</button>

<button
  onClick={handleSave}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
>
  Save Class
</button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-2 mt-1"
      />
    </div>
  );
}
