import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (data: { id: string; name: string }) => void;
};

export default function AddFeesGroupModal({ onClose, onSave }: Props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!id || !name) return alert("Please fill all fields");

    onSave({
      id,
      name,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-5">
          Add Fees Group
        </h2>

        {/* FORM */}
        <div className="space-y-4">
          {/* ID */}
          <div>
            <label className="text-sm text-gray-600">ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="FG80483"
            />
          </div>

          {/* FEES GROUP */}
          <div>
            <label className="text-sm text-gray-600">Fees Group</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="Tuition Fees"
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
