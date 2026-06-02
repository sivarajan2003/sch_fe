import { useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  onSave: (route: {
  route: string;
  status: "Active" | "Inactive";
  date: string;
}) => void;
};

export default function AddRouteModal({ onClose, onSave }: Props) {
  const [route, setRoute] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSave = () => {
    if (!route.trim()) return;

onSave({
  route,
  status,
  date: new Date().toISOString().split("T")[0],
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
       {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Route</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* ROUTE NAME */}
          <div>
            <label className="text-sm text-gray-600">Route Name</label>
            <input
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Enter route name"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
  </div>,
  document.body
);
}
