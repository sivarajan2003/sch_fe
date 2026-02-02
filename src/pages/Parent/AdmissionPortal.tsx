import {
    CheckCircle,
    Clock,
    Bell,
    FileText,
    Upload,
    Download,
    Phone,
    Mail,
  } from "lucide-react";
  import { useState } from "react";
  import { Outlet, useLocation } from "react-router-dom";

  export default function AdmissionPortal() {
    const location = useLocation();

const isAdmissionRoot =
  location.pathname === "/parent/dashboard/admissions";

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [timeline, setTimeline] = useState([
      { label: "Application Submitted", done: true },
      { label: "Documents Verified", done: true },
      { label: "Fee Payment", done: false },
      { label: "Interview Scheduled", done: false },
      { label: "Admission Decision", done: false },
    ]);
    const handleRazorpayPayment = () => {
        const options = {
          key: "rzp_test_1234567890", // Razorpay Test Key
          amount: 300000, // ₹3000 in paise
          currency: "INR",
          name: "School ERP",
          description: "Admission Fee Payment",
          handler: function (response: any) {
         
  
  setShowReceipt(true);
            // SUCCESS
            setPaymentDone(true);
            setShowPaymentModal(false);
      
            // UPDATE TIMELINE
            setTimeline(prev =>
              prev.map(step =>
                step.label === "Fee Payment"
                  ? { ...step, done: true }
                  : step
              )
            );
      
            // SAVE (TEMP – LOCAL STORAGE)
            localStorage.setItem("admission_fee_paid", "true");
          },
          prefill: {
            name: "Mr. Kumar",
            email: "parent@email.com",
            contact: "9876543210",
          },
          theme: {
            color: "#2563eb",
          },
        };
      
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      const [showReceipt, setShowReceipt] = useState(false);
      const [showInterviewPopup, setShowInterviewPopup] = useState(false);

    return (
<div className="space-y-6 sm:space-y-8 px-3 sm:px-4 md:px-6 lg:px-0">

        {/* ✅ SHOW DASHBOARD ONLY ON ROOT */}
        {isAdmissionRoot && (
          <>
        {/* ================= IMG 1 – APPLICATION STATUS ================= */}
        <section className="bg-gray-50 text-gray-900 border border-blue-200 rounded-2xl 
p-4 sm:p-5 md:p-6">
        <div>
          <h2 className="text-2xl font-semibold">Parent Dashboard</h2>
          <p className="text-sm text-gray-500">
            Dashboard / Parent Dashboard
          </p>
        </div>
  <p className="text-sm opacity-90 mt-1">
    Track your child’s admission, documents, and fee status
  </p>

  <div className="mt-4 text-sm">
    <span className="opacity-80">Welcome back,</span>{" "}
    <span className="font-medium">Mr. Kumar</span>
  </div>
</section>

<section className="bg-blue-600 text-white rounded-2xl 
p-4 sm:p-5 md:p-6 
flex flex-col 
lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Application Status</h1>
            <p className="text-sm opacity-90">
              Track your child's admission application
            </p>
  
            <div className="flex flex-wrap gap-8 mt-4 text-sm">
              <div>
                <p className="opacity-80">Application ID</p>
                <p className="font-medium">ADM-2026-0145</p>
              </div>
              <div>
                <p className="opacity-80">Student Name</p>
                <p className="font-medium">Rajesh Kumar</p>
              </div>
              <div>
                <p className="opacity-80">Applying for</p>
                <p className="font-medium">Grade 1</p>
              </div>
            </div>
          </div>
  
          <span className="mt-4 lg:mt-0 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            Interview Scheduled
          </span>
        </section>
  
        {/* ================= IMG 2 – APPLICATION TIMELINE ================= */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="text-lg font-semibold mb-6">
            Application Timeline
          </h2>
  
          <div className="space-y-6">
            {[
              { label: "Application Submitted", date: "15 Jan 2026 • 10:30 AM", done: true },
              { label: "Documents Verified", date: "16 Jan 2026 • 02:15 PM", done: true },
              { label: "Fee Payment", date: "18 Jan 2026 • 11:00 AM", done: true },
              { label: "Interview Scheduled", date: "20 Jan 2026 • 03:00 PM", active: true },
              { label: "Admission Decision", date: "Pending" },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full
                    ${
                      step.done
                        ? "bg-green-100 text-green-600"
                        : step.active
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {step.done ? <CheckCircle size={18} /> : <Clock size={18} />}
                </div>
  
                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* ================= IMG 3 – NEXT ACTION REQUIRED ================= */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-yellow-800">
              Next Action Required
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your interview is scheduled for 20 Jan 2026 at 03:00 PM.
              Please arrive 15 minutes early with original documents.
            </p>
          </div>
          <button
  onClick={() => setShowInterviewPopup(true)}
  className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-orange-600"
>
  View Interview Instructions
</button>
</section>
  
        {/* ================= IMG 4 – NOTIFICATIONS ================= */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Notifications</h2>
            <button className="text-sm text-blue-600">
              Mark all as read
            </button>
          </div>
  
          <div className="space-y-2 sm:space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <Bell className="text-green-600" />
              <div>
                <p className="font-medium">
                  Interview scheduled for 20 Jan 2026
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
  
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Bell className="text-blue-600" />
              <div>
                <p className="font-medium">
                  Fee payment receipt available
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
  
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <Bell className="text-yellow-600" />
              <div>
                <p className="font-medium">
                  Upload Birth Certificate by 25 Jan 2026
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* ================= IMG 5 – DOCUMENTS + FEES ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">  
          {/* DOCUMENTS */}
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold mb-4">
              Required Documents
            </h2>
  
            {[
              { name: "Application Form", status: "Verified" },
              { name: "Birth Certificate", status: "Verified" },
              { name: "Address Proof", status: "Verified" },
              { name: "Previous School TC", status: "Upload Required" },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FileText />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {doc.status}
                    </p>
                  </div>
                </div>
  
                {doc.status === "Verified" ? (
                  <span className="text-green-600 text-sm">
                    ✔ Verified
                  </span>
                ) : (
                  <button className="flex items-center gap-2 text-blue-600 text-sm">
                    <Upload size={16} /> Upload
                  </button>
                )}
              </div>
            ))}
          </div>
  
          {/* FEES */}
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold mb-4">
              Fee Management
            </h2>
  
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-700">Pending Payment</p>
              <p className="text-xl font-bold">₹3,000</p>
  
              <button
  onClick={() => setShowPaymentModal(true)}
  className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg 
  hover:bg-orange-600 text-sm sm:text-base">
  Pay Now
</button>

            </div>
  
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Application Fee</span>
                <span className="text-green-600">₹500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Registration Fee</span>
                <span className="text-green-600">₹2000</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total Paid</span>
                <span>₹2,500</span>
              </div>
            </div>
          </div>
        </section>
        {showReceipt && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white max-w-md w-full rounded-2xl p-6">

      <h2 className="text-lg font-semibold mb-2">
        Payment Successful 🎉
      </h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-700">
          Admission Fee Paid
        </p>
        <p className="text-2xl font-bold">₹3,000</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Payment ID</span>
          <span>RZP2026XXXX</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className="text-green-600 font-medium">
            Success
          </span>
        </div>
      </div>

      <button
        onClick={() => setShowReceipt(false)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Close
      </button>

    </div>
  </div>
)}

        {/* ================= SUPPORT ================= */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold mb-4">Help & Support</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm">
            <div className="flex gap-3 items-center">
              <Phone /> +91 98765 43210
            </div>
            <div className="flex gap-3 items-center">
              <Mail /> admissions@school.edu
            </div>
            <div className="text-blue-600">
              FAQs →
            </div>
          </div>
        </section>
  {/* ================= PAYMENT MODAL ================= */}
{showPaymentModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

<div className="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 relative 
max-h-[90vh] overflow-y-auto">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowPaymentModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-2">
        Fee Payment
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Complete the pending admission payment
      </p>

      {/* AMOUNT */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-yellow-700">Amount Payable</p>
        <p className="text-2xl font-bold">₹3,000</p>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="payment" defaultChecked />
          <span>UPI / Google Pay / PhonePe</span>
        </label>

        <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="payment" />
          <span>Debit / Credit Card</span>
        </label>

        <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
          <input type="radio" name="payment" />
          <span>Net Banking</span>
        </label>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowPaymentModal(false)}
          className="w-1/2 border rounded-lg py-2"
        >
          Cancel
        </button>

        <button
  onClick={handleRazorpayPayment}
  className="w-1/2 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600"
>
  Pay ₹3,000
</button>

      </div>

    </div>
  </div>
)}
{showInterviewPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

      <button
        onClick={() => setShowInterviewPopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-1">
        School Interview Instructions
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Please read carefully before attending the interview
      </p>

      {/* INFO BOX */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-700 font-medium">
          Interview Schedule
        </p>
        <p className="text-sm mt-1">
          📅 <b>20 Jan 2026</b> <br />
          ⏰ <b>03:00 PM</b> <br />
          📍 School Campus – Admission Office
        </p>
      </div>

      {/* INSTRUCTIONS */}
      <ul className="space-y-3 text-sm text-gray-700">
        <li>✅ Please arrive <b>15 minutes early</b></li>
        <li>📄 Bring all <b>original documents</b></li>
        <li>👶 Child must be accompanied by a parent</li>
        <li>✍️ Carry a pen and necessary stationery</li>
        <li>📱 Mobile phones should be kept on silent</li>
      </ul>

      {/* FOOTER BUTTON */}
      <button
        onClick={() => setShowInterviewPopup(false)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Got it
      </button>

    </div>
  </div>
)}

</>
    )}

<Outlet />
      </div>
    );
  }
  