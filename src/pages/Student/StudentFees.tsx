import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import StudentFeesTable from "../../components/tables/StudentFeesTable";

export default function StudentFees() {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Fees Details</h2>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Fees
        </button>
      </div>

      <StudentFeesTable />

      {openAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-[420px]">
            <h4 className="font-semibold mb-3">Add Fees</h4>

            <input className="border rounded w-full mb-2 px-3 py-2 text-sm" placeholder="Fee Type" />
            <input className="border rounded w-full mb-3 px-3 py-2 text-sm" placeholder="Amount" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenAdd(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
