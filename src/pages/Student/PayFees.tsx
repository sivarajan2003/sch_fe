import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import jsPDF from "jspdf";

export default function PayFees() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fee details passed from dashboard
  const fee = location.state;

  // Helper to convert $ to ₹
  const formatINR = (value: string) =>
    value ? value.replace(/\$/g, "₹") : "₹0";

  // Form state
  const [form, setForm] = useState({
    studentName: "",
    className: "",
    feeType: fee?.title || "Exam Fees",
    amount: fee?.amount?.replace(/\$/g, "") || "", // ✅ STEP 1
    fineAmount: "",
    paymentDate: new Date().toISOString().slice(0, 10),
  });
  
  const downloadReceipt = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Fee Payment Receipt", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Student Name : ${form.studentName}`, 20, 40);
    doc.text(`Class        : ${form.className}`, 20, 50);
    doc.text(`Fee Type     : ${form.feeType}`, 20, 60);
    doc.text(`Amount       : ₹${form.amount}`, 20, 70);
    doc.text(`Fine Amount  : ₹${form.fineAmount || 0}`, 20, 80);
    doc.text(`Payment Date : ${form.paymentDate}`, 20, 90);
    doc.text(`Status       : Paid`, 20, 100);
  
    doc.line(20, 110, 190, 110);
  
    doc.text(
      "Thank you for your payment.\nThis is a system generated receipt.",
      20,
      125
    );
  
    doc.save("Fee_Receipt.pdf");
  };
  
  const handlePay = () => {
    // Later you can connect backend / Razorpay here
    alert(
      `Payment Successful ✅
Student: ${form.studentName}
Class: ${form.className}
Fee Type: ${form.feeType}
Amount: ₹${form.amount}
Fine: ₹${form.fineAmount || 0}
Date: ${form.paymentDate}`
    );

    navigate(-1);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-1">Pay Fees</h2>
      <p className="text-sm text-gray-500 mb-6">Fees / Payment</p>

      {/* Card */}
      <div className="bg-white rounded-xl border p-6 space-y-5">

        {/* Student Name */}
        <div>
          <label className="text-sm text-gray-500">Student Name</label>
          <input
            value={form.studentName}
            onChange={(e) =>
              setForm({ ...form, studentName: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Enter student name"
          />
        </div>

        {/* Class */}
        <div>
          <label className="text-sm text-gray-500">Class</label>
          <input
            value={form.className}
            onChange={(e) =>
              setForm({ ...form, className: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Eg: III - A"
          />
        </div>

        {/* Fee Type */}
        <div>
          <label className="text-sm text-gray-500">Fee Type</label>
          <select
            value={form.feeType}
            onChange={(e) =>
              setForm({ ...form, feeType: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option>Exam Fees</option>
            <option>Tuition Fees</option>
            <option>Mess Fees</option>
            <option>Transport Fees</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm text-gray-500">Amount</label>
          <input
  type="number"
  value={form.amount}
  onChange={(e) =>
    setForm({ ...form, amount: e.target.value })
  }
  className="w-full border rounded-lg px-3 py-2 mt-1"
  placeholder="Enter amount (₹)"
/>

<p className="text-sm text-gray-500 mt-1">
  Amount in INR: ₹{form.amount || 0}
</p>

        </div>

        {/* Fine Amount (Optional) */}
        <div>
          <label className="text-sm text-gray-500">
            Fine Amount (Optional)
          </label>
          <input
            type="number"
            value={form.fineAmount}
            onChange={(e) =>
              setForm({ ...form, fineAmount: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="₹0"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="text-sm text-gray-500">Payment Date</label>
          <input
            type="date"
            value={form.paymentDate}
            onChange={(e) =>
              setForm({ ...form, paymentDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Due Badge */}
        {fee?.due && (
          <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
            Due
          </span>
        )}

        <hr />

        {/* Actions */}
        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Confirm & Pay
        </button>
        <button
  onClick={downloadReceipt}
  className="w-full border border-green-600 text-green-600 py-2 rounded-lg"
>
  Download Receipt
</button>

        <button
          onClick={() => navigate(-1)}
          className="w-full border py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
