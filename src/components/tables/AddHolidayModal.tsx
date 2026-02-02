import { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (holiday: any) => void;
}

export default function AddHolidayModal({ onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSave = () => {
    if (!title || !date) return;

    onAdd({
      id: `H${Math.floor(100000 + Math.random() * 900000)}`,
      title,
      date,
      description,
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Add Holiday</h3>

        {/* Holiday Title */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Holiday Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Enter holiday title"
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
            placeholder="Description"
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
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
