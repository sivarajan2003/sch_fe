import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onAdd: (room: {
    id: string;
    roomNo: string;
    capacity: number;
    status: "Active" | "Inactive";
  }) => void;
};

export default function AddClassRoomModal({ onClose, onAdd }: Props) {
  const [roomNo, setRoomNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSubmit = () => {
    if (!roomNo || !capacity) {
      alert("Please fill all fields");
      return;
    }

    const newRoom = {
      id: "R" + Math.floor(100000 + Math.random() * 900000),
      roomNo,
      capacity: Number(capacity),
      status,
    };

    onAdd(newRoom);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Class Room</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">

          {/* ROOM NO */}
          <div>
            <label className="text-sm text-gray-600">Room No</label>
            <input
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              placeholder="Eg: 101"
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* CAPACITY */}
          <div>
            <label className="text-sm text-gray-600">Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Eg: 50"
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

        {/* FOOTER */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
