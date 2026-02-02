import { useState } from "react";
import AddFeesModal from "../AddFeesModal";

const feesData = [
  {
    student: "Fahed III.C",
    class: "III-C",
    term: "Term 1",
    amount: "₹25000",
    status: "Paid",
    date: "15 Jun 2024",
  },
  {
    student: "Rahul V.A",
    class: "V-A",
    term: "Term 1",
    amount: "₹23000",
    status: "Pending",
    date: "—",
  },
  {
    student: "Anu IX.B",
    class: "IX-B",
    term: "Term 2",
    amount: "₹28000",
    status: "Paid",
    date: "02 Jun 2024",
  },
];

export default function FeesTable() {
  const [openAddFees, setOpenAddFees] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");

  return (
    <>
      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Fees Details</h4>
          <p className="text-sm text-gray-500">
            Student fee payment information
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Term</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Paid Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {feesData.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3 font-medium">
                  {item.student}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.class}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.term}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.amount}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {item.date}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      setSelectedStudent(item.student);
                      setOpenAddFees(true);
                    }}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs"
                  >
                    Add Fees
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <AddFeesModal
        open={openAddFees}
        onClose={() => setOpenAddFees(false)}
        studentName={selectedStudent}
      />
    </>
  );
}
