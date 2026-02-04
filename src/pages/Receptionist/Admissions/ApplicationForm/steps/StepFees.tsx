import { useState, useEffect } from "react";
import { CreditCard, Banknote, AlertCircle } from "lucide-react";

interface Props {
    data: any;
    onNext: (data: any) => void;
    onBack: () => void;
}

export default function StepFees({ data, onNext, onBack }: Props) {
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const r = localStorage.getItem("role") || "";
        setRole(r.toLowerCase());
    }, []);

    const [paymentMode, setPaymentMode] = useState<"cash" | "online">(
        data?.paymentMode || "online"
    );

    // For cash
    const [amount, setAmount] = useState(data?.amount || "500");
    const [receiptNo, setReceiptNo] = useState(data?.receiptNo || "");
    const [remark, setRemark] = useState(data?.remark || "");

    // For online
    const [onlineStatus, setOnlineStatus] = useState(data?.onlineStatus || "pending");

    const canCollectCash = ["admin", "receptionist", "super admin"].includes(role);

    // If role changes and they can't collect cash, force online
    useEffect(() => {
        if (role && !canCollectCash && paymentMode === 'cash') {
            setPaymentMode('online');
        }
    }, [role, canCollectCash, paymentMode]);

    const handleNext = () => {
        if (paymentMode === 'cash' && !amount) {
            alert("Please enter amount");
            return;
        }
        onNext({
            paymentMode,
            amount,
            receiptNo,
            remark,
            onlineStatus
        });
    };

    return (
        <div className="bg-white border rounded-xl mx-2 sm:mx-0">
            <div className="p-4 sm:p-6 space-y-6">
                <h2 className="text-lg font-semibold">Fees Collection</h2>

                <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-blue-900">Application Fee Required</p>
                        <p className="text-sm text-blue-700">A non-refundable application fee of ₹500 is required to process this application.</p>
                    </div>
                </div>

                {/* Payment Mode Selection */}
                <div>
                    <label className="block text-sm font-medium mb-3">Select Payment Mode</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {canCollectCash && (
                            <div
                                onClick={() => setPaymentMode("cash")}
                                className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition-colors ${paymentMode === "cash" ? "border-green-600 bg-green-50 ring-1 ring-green-600" : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className={`p-2 rounded-full ${paymentMode === "cash" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                    <Banknote className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Cash Payment</p>
                                    <p className="text-xs text-gray-500">Collect cash at counter</p>
                                </div>
                            </div>
                        )}

                        <div
                            onClick={() => setPaymentMode("online")}
                            className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition-colors ${paymentMode === "online" ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "hover:bg-gray-50"
                                }`}
                        >
                            <div className={`p-2 rounded-full ${paymentMode === "online" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium">Online Payment</p>
                                <p className="text-xs text-gray-500">Pay via UPI / Card / NetBanking</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cash Details */}
                {paymentMode === "cash" && (
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-sm font-semibold text-gray-700">Cash Collection Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Amount Collected (₹)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Receipt Number (Optional)</label>
                                <input
                                    type="text"
                                    value={receiptNo}
                                    onChange={(e) => setReceiptNo(e.target.value)}
                                    placeholder="Enter receipt no."
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Remark</label>
                                <textarea
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    placeholder="Any additional notes..."
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Online Details */}
                {paymentMode === "online" && (
                    <div className="space-y-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                            You will be redirected to the payment gateway after clicking "Next" or upon final submission.
                        </p>
                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t px-4 sm:px-6 py-4">
                <button
                    onClick={onBack}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-50">
                    Previous
                </button>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 rounded-lg border">
                        Save Draft
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    );
}
