import { useState } from "react";
import { X } from "lucide-react";

type Grade = {
  id: string;
  grade: string;
  percentage: string;
  points: number;
  status: "Active";
};

export default function AddGradeModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (grade: Grade) => void;
}) {
  const [id, setId] = useState("");
  const [grade, setGrade] = useState("");
  const [percentage, setPercentage] = useState("");
  const [points, setPoints] = useState("");

  const handleSave = () => {
    if (!id || !grade || !percentage || !points) {
      alert("Please fill all fields");
      return;
    }

    onAdd({
      id,
      grade,
      percentage,
      points: Number(points),
      status: "Active",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Grade</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          <input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Grade (Ex: A+)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Percentage (Ex: 80% - 90%)"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Grade Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
