import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onAdd: (newClass: any) => void;
};

export default function AddClassModal({ onClose, onAdd }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newClass = {
      id: "C" + Math.floor(100000 + Math.random() * 900000),
      className: (form.className as any).value,
      section: (form.section as any).value,
      subject: (form.subject as any).value,
      students: Number((form.students as any).value),
      subjects: Number((form.subjectCount as any).value),
      status: "Active",
    };

    onAdd(newClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Class</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="className"
            placeholder="Class (eg: I, II, III)"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            name="section"
            placeholder="Section (eg: A, B)"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            name="subject"
            placeholder="Main Subject"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            name="students"
            type="number"
            placeholder="No of Students"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            name="subjectCount"
            type="number"
            placeholder="No of Subjects"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
