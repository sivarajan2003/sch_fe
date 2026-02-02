import { useState } from "react";

type Props = {
  onClose: () => void;
  onAdd: (leave: any) => void;
};

export default function AddLeaveModal({ onClose, onAdd }: Props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSave = () => {
    if (!id || !name) return;

    onAdd({
      id,
      name,
      status,
      date: new Date().toLocaleDateString("en-GB"),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">

        {/* HEADER */}
        <h3 className="text-lg font-semibold mb-4">
          Add Leave
        </h3>

        {/* FORM */}
        <div className="space-y-4">

          {/* ID */}
          <div>
            <label className="text-sm text-gray-600">
              Leave ID
            </label>
            <input
              type="text"
              placeholder="LT748300"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* LEAVE TYPE */}
          <div>
            <label className="text-sm text-gray-600">
              Leave Type
            </label>
            <input
              type="text"
              placeholder="Medical Leave"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-600">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
