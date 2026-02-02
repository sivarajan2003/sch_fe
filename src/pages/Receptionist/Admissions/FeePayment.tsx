import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Download,
  CreditCard,
  X,
} from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
interface FeePaymentState {
  applicationId: string;
  applicantName: string;
  className: string;
}

export default function FeePayment() {
  const location = useLocation();

  const state = location.state as FeePaymentState | null;

  const applicationId = state?.applicationId;
  const applicantName = state?.applicantName;
  const className = state?.className;
  
  

  
  const [showPayment, setShowPayment] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  /* ================= DOWNLOAD PDF ================= */
  const downloadInvoice = () => {
    const blob = new Blob(
      ["Invoice\nApplication ID: ADM-2026-0145\nAmount: ₹5000"],
      { type: "application/pdf" }
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice_ADM-2026-0145.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
<div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Admissions</h1>
        <p className="text-sm text-gray-500">
          Admission fee payment details.
        </p>
      </div>

      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= PAYMENT SUMMARY ================= */}
        <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5">
          <h2 className="text-lg font-semibold">Payment Summary</h2>

          <InfoRow
  label="Application ID"
  value={applicationId || "-"}
  highlight
/>

<InfoRow
  label="Applicant Name"
  value={applicantName || "-"}
/>

<InfoRow
  label="Class"
  value={className || "-"}
/>


          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <FeeRow label="Registration Fee" amount="₹2000" />
            <FeeRow label="Admission Fee" amount="₹3000" />
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span className="text-blue-600">₹5000</span>
            </div>
          </div>

          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
            <div>
              <p className="font-medium text-yellow-800">
                Payment Status
              </p>
              <p className="text-sm text-yellow-700">
                Awaiting payment confirmation
              </p>
            </div>
            <span className="px-3 py-3 rounded-full bg-gray-800 text-white text-xs">
              Pending
            </span>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Pay Now
          </button>

          <button
            onClick={() => setShowInvoice(true)}
            className="w-full border py-3 rounded-lg flex justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </div>

        {/* ================= PAYMENT HISTORY ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-semibold">Payment History</h2>

          <HistoryItem
            title="Registration Fee"
            date="18 Jan 2026 • PAY-001"
            amount="₹2000"
            status="paid"
            receipt="RC-001"
          />

          <HistoryItem
            title="Admission Fee"
            date="20 Jan 2026 • PAY-002"
            amount="₹3000"
            status="pending"
          />

          <HistoryItem
            title="Application Fee"
            date="15 Jan 2026 • PAY-003"
            amount="₹500"
            status="paid"
            receipt="RC-002"
          />
        </div>
      </div>

      {/* ================= PAY NOW MODAL ================= */}
      {showPayment && (
        <Modal onClose={() => setShowPayment(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Select Payment Method
          </h2>

          <div className="space-y-3">
            <PaymentOption label="Credit / Debit Card" />
            <PaymentOption label="UPI" />
            <PaymentOption label="Net Banking" />
            <PaymentOption label="Wallet" />
          </div>

          <div className="mt-6 space-y-3">
            <input className="input" placeholder="Card Number" />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="MM/YY" />
              <input className="input" placeholder="CVV" />
            </div>
            <input className="input" placeholder="Name on Card" />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={() => setShowPayment(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Pay ₹5000
            </button>
          </div>
        </Modal>
      )}

      {/* ================= DOWNLOAD MODAL ================= */}
      {showInvoice && (
        <Modal onClose={() => setShowInvoice(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Download Invoice
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Do you want to download the invoice PDF?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowInvoice(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={downloadInvoice}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Download
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
<div className="bg-white w-full max-w-lg rounded-xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */
function InfoRow({ label, value, highlight }: any) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className={highlight ? "text-blue-600 font-medium" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}

function FeeRow({ label, amount }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="font-medium">{amount}</span>
    </div>
  );
}

function HistoryItem({ title, date, amount, status, receipt }: any) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
<div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {status === "paid" ? (
            <span className="badge-green">
              <CheckCircle className="w-3 h-3" /> Paid
            </span>
          ) : (
            <span className="badge-yellow">
              <Clock className="w-3 h-3" /> Pending
            </span>
          )}
        </div>
        <span className="font-semibold">{amount}</span>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
      {receipt && (
        <button className="text-blue-600 flex items-center gap-1">
          <Download className="w-4 h-4" /> Download
        </button>
      )}
    </div>
  );
}

function PaymentOption({ label }: { label: string }) {
  return (
    <div className="border rounded-lg p-4 flex items-center gap-3">
      <input type="radio" />
      <span className="font-medium">{label}</span>
    </div>
  );
}
