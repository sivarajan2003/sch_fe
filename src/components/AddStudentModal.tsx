import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (student: any) => void;
}

export default function AddStudentModal({
  open,
  onClose,
  onAdd,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    class: "",
    rollNo: "",
    gender: "Male",
    joined: "",
    status: "Active",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl p-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Student</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Class (eg: VIII, A)"
            value={form.class}
            onChange={(e) =>
              setForm({ ...form, class: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Roll No"
            value={form.rollNo}
            onChange={(e) =>
              setForm({ ...form, rollNo: e.target.value })
            }
          />

          <select
            className="w-full border p-2 rounded"
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.joined}
            onChange={(e) =>
              setForm({ ...form, joined: e.target.value })
            }
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onAdd({
                id: "AD" + Math.floor(Math.random() * 999999),
                image: "https://i.pravatar.cc/150",
                ...form,
              });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
