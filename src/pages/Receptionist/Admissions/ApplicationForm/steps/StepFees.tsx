// StepFees.tsx
import { useState, useEffect } from "react";
import { CreditCard, Banknote, AlertCircle } from "lucide-react";

interface Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

type PaymentMethod = "UPI" | "CARD" | "NET_BANKING" | "CASH";
type PaymentStatus = "Pending" | "Completed" | "Failed";

/**
 * Helper: convert many possible incoming names into ISO local input value (yyyy-mm-ddTHH:MM)
 */
const toLocalInput = (iso?: string) => {
  try {
    const base = iso ? new Date(iso) : new Date();
    // create local view (to show local time in datetime-local)
    const off = base.getTimezoneOffset();
    const local = new Date(base.getTime() - off * 60 * 1000);
    return local.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  } catch {
    return new Date().toISOString().slice(0, 16);
  }
};

/**
 * Helper: from local input value (YYYY-MM-DDTHH:mm) to ISO string
 */
const fromLocalInputToISO = (local: string) => {
  if (!local) return new Date().toISOString();
  // local is like "2026-02-06T10:30"
  const d = new Date(local);
  return d.toISOString();
};

const normalizeMethod = (raw?: any): PaymentMethod => {
  if (!raw) return "UPI";
  const u = String(raw).toUpperCase();
  if (u === "CARD") return "CARD";
  if (u === "NET_BANKING") return "NET_BANKING";
  if (u === "CASH") return "CASH";
  return "UPI";
};

const normalizeStatus = (raw?: any, fallback: PaymentStatus = "Pending"): PaymentStatus => {
  if (!raw) return fallback;
  const s = String(raw).toLowerCase();
  if (["completed", "complete", "paid", "success"].includes(s)) return "Completed";
  if (["failed", "error"].includes(s)) return "Failed";
  return "Pending";
};

export default function StepFees({ data, onNext, onBack }: Props) {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const r = localStorage.getItem("role") || "";
    setRole(r.toLowerCase());
  }, []);

  const canCollectCash = ["admin", "receptionist", "super admin"].includes(role);

  // --- normalize incoming amount (accept registration_fee, total_amount, amount)
  const initialAmountFromData = (() => {
    const candidates = [
      data?.registration_fee,
      data?.total_amount,
      data?.amount,
      data?.amount_collected,
    ];
    for (const c of candidates) {
      if (typeof c === "number" && Number.isFinite(c) && c > 0) return c;
      if (typeof c === "string" && c.trim() !== "" && !Number.isNaN(Number(c))) {
        const n = Number(c);
        if (Number.isFinite(n) && n > 0) return n;
      }
    }
    return 500;
  })();

  const [paymentMode, setPaymentMode] = useState<"cash" | "online">(
    (data?.payment_mode === "cash" || data?.paymentMode === "cash" || data?.payment_method === "CASH")
      ? "cash"
      : "online"
  );

  const [amount, setAmount] = useState<number>(initialAmountFromData);

  const [receiptNo, setReceiptNo] = useState<string>(
    (data?.receipt_no ?? data?.receiptNo ?? data?.transaction_id) || ""
  );

  const [remark, setRemark] = useState<string>(data?.fee_remark ?? data?.remark ?? "");

  // Payment date: accept payment_date or paymentDate or fallback now
  const initialPaymentDateISO = data?.payment_date ?? data?.paymentDate ?? data?.paymentTime ?? new Date().toISOString();
  const [paymentDateLocal, setPaymentDateLocal] = useState<string>(toLocalInput(initialPaymentDateISO));

  // Payment method accepts both payment_method (backend) and paymentMethod (frontend)
  const initialMethod = normalizeMethod(data?.payment_method ?? data?.paymentMethod ?? data?.method);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialMethod);

  // Payment status accepts both payment_status or paymentStatus or onlineStatus
  const initialStatus = normalizeStatus(data?.payment_status ?? data?.paymentStatus ?? data?.onlineStatus ?? (paymentMode === "cash" ? "Completed" : "Pending"), paymentMode === "cash" ? "Completed" : "Pending");

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(initialStatus);

  // If role prevents cash collection, force online mode
  useEffect(() => {
    if (!canCollectCash && paymentMode === "cash") {
      setPaymentMode("online");
    }
  }, [canCollectCash, paymentMode]);

  const handleNext = () => {
    // Validate amount
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    // Build final payload with BACKEND field names (Zod-safe)
    const finalPayload = {
      // numeric
      registration_fee: Number(amount),
      total_amount: Number(amount),

      // method: uppercase enum required by backend
      payment_method: paymentMode === "cash" ? "CASH" : normalizeMethod(paymentMethod),

      // payment_date as ISO string
      payment_date: fromLocalInputToISO(paymentDateLocal),

      // status title-cased enum required by backend
      payment_status: paymentMode === "cash" ? "Completed" : normalizeStatus(paymentStatus, "Pending"),

      // optional
      receipt_no: receiptNo || null,
      fee_remark: remark || null,
    };

    onNext(finalPayload);
  };

  return (
    <div className="bg-white border rounded-xl mx-2 sm:mx-0">
      <div className="p-4 sm:p-6 space-y-6">
        <h2 className="text-lg font-semibold">Fees Collection</h2>

        <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Application Fee Required</p>
            <p className="text-sm text-blue-700">A non-refundable application fee of ₹500 is required.</p>
          </div>
        </div>

        {/* Payment mode */}
        <div>
          <label className="block text-sm font-medium mb-3">Select Payment Mode</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {canCollectCash && (
              <div
                onClick={() => setPaymentMode("cash")}
                className={`cursor-pointer border rounded-lg p-4 flex gap-3 ${paymentMode === "cash" ? "border-green-600 bg-green-50" : "hover:bg-gray-50"}`}
              >
                <Banknote />
                <div>
                  <p className="font-medium">Cash Payment</p>
                  <p className="text-xs text-gray-500">Collect cash at counter</p>
                </div>
              </div>
            )}

            <div
              onClick={() => setPaymentMode("online")}
              className={`cursor-pointer border rounded-lg p-4 flex gap-3 ${paymentMode === "online" ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
            >
              <CreditCard />
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-xs text-gray-500">UPI / Card / NetBanking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            min={1}
            value={Number.isFinite(Number(amount)) ? amount : ""}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") {
                setAmount(0);
                return;
              }
              const n = Number(v);
              setAmount(Number.isFinite(n) ? n : 0);
            }}
            className="w-full max-w-xs border rounded-lg px-3 py-2"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Date & Time</label>
          <input
            type="datetime-local"
            value={paymentDateLocal}
            onChange={(e) => setPaymentDateLocal(e.target.value)}
            className="w-full max-w-xs border rounded-lg px-3 py-2"
          />
        </div>

        {/* Cash-specific */}
        {paymentMode === "cash" && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Receipt Number (optional)</label>
              <input value={receiptNo} onChange={(e) => setReceiptNo(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Remark (optional)</label>
              <textarea value={remark} onChange={(e) => setRemark(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={2} />
            </div>
          </div>
        )}

        {/* Online-specific */}
        {paymentMode === "online" && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="w-full border rounded-lg px-3 py-2">
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
                <option value="NET_BANKING">Net Banking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Status</label>
              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)} className="w-full border rounded-lg px-3 py-2">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Transaction / Receipt No (optional)</label>
              <input value={receiptNo} onChange={(e) => setReceiptNo(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Remark (optional)</label>
              <textarea value={remark} onChange={(e) => setRemark(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={2} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between border-t px-4 py-4">
        <button onClick={onBack} className="border px-4 py-2 rounded-lg">Previous</button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-5 py-2 rounded-lg">Next Step</button>
      </div>
    </div>
  );
}
