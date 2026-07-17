//leaverequests.tsx
import { Check, X, Calendar } from "lucide-react";
import A6 from "../assets/a6.png";
import A7 from "../assets/a7.png";
import {
  getLeaves,
  approveLeave,
  rejectLeave,
} from "../service/leaverequestService";

import { useEffect, useState } from "react";
// const leaveData = [
//   {
//     id: 1,
//     name: "James",
//     role: "Physics Teacher",
//     type: "Emergency",
//     typeColor: "red",
//     leaveFrom: "2024-05-12",
//     leaveTo: "2024-05-13",
//     appliedOn: "2024-05-12",
//     img: A6,
//   },
//   {
//     id: 2,
//     name: "Hendrita",
//     role: "Maths Teacher",
//     type: "Medical",
//     typeColor: "green",
//     leaveFrom: "2024-05-17",
//     leaveTo: "2024-05-18",
//     appliedOn: "2024-05-12",
//     img: A7,
//   },
// ];

export default function LeaveRequests() {
  const [thisWeekOnly, setThisWeekOnly] = useState(false);

  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [confirmReject, setConfirmReject] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  
  const pendingLeaves = leaves.filter((item) => item.status === "Pending");

  const filteredLeaves = thisWeekOnly
  ? pendingLeaves.filter((item) => {
      const leaveDate = new Date(item.leave_from);
      return leaveDate >= startOfWeek && leaveDate <= endOfWeek;
    })
  : pendingLeaves;
const [errorMsg, setErrorMsg] = useState("");
useEffect(() => {
  loadLeaves();
}, []);

const loadLeaves = async () => {
  try {
    setErrorMsg("");

    const res = await getLeaves();

    setLeaves(res.data || []);
  } catch (err) {
    console.error(err);

    setErrorMsg(
      "Failed to load leave requests"
    );
  }
};
  return (
<div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 h-full transition hover:shadow-md">
      {successMsg && (
  <div className="mb-4 bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded-lg text-sm">
    ✅ {successMsg}
  </div>
)}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Leave Requests
        </h3>

        <button
          onClick={() => setThisWeekOnly((prev) => !prev)}
          className="
            flex items-center gap-2 text-sm text-gray-600
            border border-gray-200 px-3 py-1.5 rounded-lg
            transition-all duration-300
            hover:bg-gray-50 hover:shadow-sm
            active:scale-95
          "
        >
          <Calendar className="w-4 h-4" />
          {thisWeekOnly ? "All Requests" : "This Week"}
        </button>
      </div>

      {/* REQUEST LIST */}
      <div className="space-y-4">
      
  {filteredLeaves.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      No Leave Requests Found
    </div>
  ) : (
    filteredLeaves.map((item) => (
          <div
            key={item.id}
            className="
              group flex items-center justify-between
              border border-gray-100 rounded-lg p-4
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-sm hover:bg-gray-50
              cursor-pointer
            "
          >
<div className="flex items-start gap-3 w-full">
              <img
                src={A6}
                className="
                  w-10 h-10 rounded-lg object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
                alt={item.employee_name}
              />

              <div>
              <p className="font-medium text-gray-900 flex flex-wrap items-center gap-2">
                 {item.employee_name}
                  <span
                    className={`
                      ml-2 text-xs px-2 py-0.5 rounded
                      transition-colors duration-300
                      ${
                        item.typeColor === "red"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >
                    {item.leave_type}
                  </span>
                </p>

                <p className="text-sm text-gray-500">{item.employee_role}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 mt-1 text-xs text-gray-400">
                  <span>
                    Leave : {item.leave_from} - {item.leave_to}
                  </span>
                  <span>Apply on : {item.applied_on}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS or STATUS BADGE */}
            <div className="flex gap-2 justify-end sm:justify-start shrink-0">
              {item.status === "Approved" ? (
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  Approved
                </span>
              ) : item.status === "Rejected" ? (
                <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                  Rejected
                </span>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      try {
                        await approveLeave(item.id);
                        setSuccessMsg(`Leave approved for ${item.employee_name}`);
                        loadLeaves();
                        setTimeout(() => setSuccessMsg(""), 3000);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="
                      w-8 h-8 flex items-center justify-center rounded
                      bg-green-500 text-white
                      transition-all duration-200
                      hover:bg-green-600 hover:scale-110
                      active:scale-95
                    "
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setConfirmReject(item.id)}
                    className="
                      w-8 h-8 flex items-center justify-center rounded
                      bg-red-500 text-white
                      transition-all duration-200
                      hover:bg-red-600 hover:scale-110
                      active:scale-95
                    "
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
       ))
)}
      </div>
      {confirmReject !== null && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-5 w-[90%] max-w-[360px] shadow-lg">
      <h3 className="text-lg font-semibold mb-2">
        Reject Leave Request?
      </h3>

      <p className="text-sm text-gray-600 mb-5">
        Are you sure you want to reject this leave request?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmReject(null)}
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
  try {
    await rejectLeave(confirmReject);

    setConfirmReject(null);

    setSuccessMsg("Leave request rejected");

    loadLeaves();

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  } catch (err) {
    console.error(err);
  }
}}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
