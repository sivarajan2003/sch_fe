import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  studentName: string;
}

export default function AddFeesModal({
  open,
  onClose,
  studentName,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Fees</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form className="space-y-4">
          
          {/* STUDENT */}
          <div>
            <label className="text-sm text-gray-600">Student</label>
            <input
              type="text"
              value={studentName}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-sm"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-600">Payment Date</label>
            <input
              type="date"
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600">Fee Type</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option>Tuition Fee</option>
              <option>Exam Fee</option>
              <option>Transport Fee</option>
              <option>Hostel Fee</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
            >
              Save Fees
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
