import { useState } from "react";
import { X } from "lucide-react";

interface AddSportModalProps {
  onClose: () => void;
  onAdd: (sport: {
    id: string;
    name: string;
    coach: string;
    year: number;
  }) => void;
}

export default function AddSportModal({
  onClose,
  onAdd,
}: AddSportModalProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [coach, setCoach] = useState("");
  const [year, setYear] = useState("");

  const handleSave = () => {
    if (!id || !name || !coach || !year) return;

    onAdd({
      id,
      name,
      coach,
      year: Number(year),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Sport</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            placeholder="Sport ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Sport Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Coach Name"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Started Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
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
