import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  onSave: (data: {
    id: string;
    name: string;
    status: "Active" | "Inactive";
    date: string;
  }) => void;
};

export default function AddDesignationModal({ onClose, onSave }: Props) {
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  // auto-generate ID
  const generatedId = `DS${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = () => {
    if (!designation.trim()) {
      alert("Please enter designation name");
      return;
    }

    onSave({
      id: generatedId,
      name: designation,
      status,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    onClose();
  };

 return createPortal(
  <div
    className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
    style={{ zIndex: 999999 }}
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      className="bg-white rounded-xl w-[420px] p-6"
      onMouseDown={(e) => e.stopPropagation()}
    >
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Designation</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* ===== BODY ===== */}
        <div className="p-5 space-y-4">

          {/* ID */}
          <div>
            <label className="text-sm text-gray-600">ID</label>
            <input
              value={generatedId}
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          {/* DESIGNATION */}
          <div>
            <label className="text-sm text-gray-600">Designation</label>
            <input
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter designation name"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
  </div>,
  document.body
);
}
