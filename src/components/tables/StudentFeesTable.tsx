export default function StudentFeesTable() {
    const data = [
      { type: "Tuition", amount: 2500, status: "Paid" },
      { type: "Exam", amount: 500, status: "Pending" },
    ];
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Fee Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((f, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{f.type}</td>
                <td className="p-3">₹{f.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      f.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  