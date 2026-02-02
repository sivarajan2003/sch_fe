import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onSave: (route: {
    id: string;
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
      id: "RT" + Math.floor(100000 + Math.random() * 900000),
      route,
      status,
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
      <div className="bg-white w-[420px] rounded-xl p-6 relative">
        
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
    </div>
  );
}
