import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onAdd: (department: {
    id: string;
    name: string;
    status: string;
    date: string;
  }) => void;
};

export default function AddDepartmentModal({ onClose, onAdd }: Props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!id || !name) return alert("Fill all fields");

    onAdd({
      id,
      name,
      status: "Active",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">Add Department</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Department ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="D757249"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Department Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="HR"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
