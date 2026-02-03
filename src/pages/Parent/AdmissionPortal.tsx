import {
  CheckCircle,
  Clock,
  Bell,
  FileText,
  Upload,
  Download,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdmissionPortal() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmissionRoot = location.pathname === "/parent/dashboard/admissions";

  // --- STATE ---
  const [applications, setApplications] = useState<any[]>([]);
  const [myApp, setMyApp] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0); // to force re-read

  // Modals
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false); // For viewing details
  const [showScheduleModal, setShowScheduleModal] = useState(false);   // For scheduling
  const [showReceipt, setShowReceipt] = useState(false);

  // --- LOAD DATA ---
  useEffect(() => {
    const saved = localStorage.getItem("admission_applications");
    if (saved) {
      const parsed = JSON.parse(saved);
      setApplications(parsed);
      // For demo: pick the first application, or one with a specific name/ID if needed
      // If no apps, we might show "Start New Application" state. 
      // utilizing the first one found or create a dummy if empty for demo purposes:
      if (parsed.length > 0) {
        setMyApp(parsed[0]);
      }
    }
  }, [refreshKey]);

  // --- TIMELINE LOGIC ---
  // Steps: Applied -> Fee Payment -> Verifying Documents -> Interview -> Offer -> Enrolled
  const getTimeline = (status: string) => {
    const steps = [
      { label: "Application Submitted", statusMatch: ["Applied", "Verifying Documents", "Interview Scheduled", "Interview Done", "Offer Accepted", "Enrolled"] },
      { label: "Fee Payment", statusMatch: ["Verifying Documents", "Interview Scheduled", "Interview Done", "Offer Accepted", "Enrolled"] }, // Assumes fee paid to move to verification
      { label: "Documents Verification", statusMatch: ["Interview Scheduled", "Interview Done", "Offer Accepted", "Enrolled"] },
      { label: "Interview Process", statusMatch: ["Interview Done", "Offer Accepted", "Enrolled"] },
      { label: "Admission Offer", statusMatch: ["Offer Accepted", "Enrolled"] },
    ];

    return steps.map((step) => {
      const isDone = step.statusMatch.includes(status);
      // specific active logic could be added here
      return { ...step, done: isDone };
    });
  };

  const timeline = myApp ? getTimeline(myApp.status) : [];


  // --- HANDLERS ---
  const updateStatus = (newStatus: string) => {
    if (!myApp) return;
    const updated = { ...myApp, status: newStatus };
    const updatedList = applications.map((a) => (a.id === myApp.id ? updated : a));

    localStorage.setItem("admission_applications", JSON.stringify(updatedList));
    setApplications(updatedList);
    setMyApp(updated);
    setRefreshKey((prev) => prev + 1);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowReceipt(true);
    // Move to next stage
    updateStatus("Verifying Documents");
    toast.success("Payment Received & Application moved to Review!");
  };

  const handleScheduleInterview = (date: string, time: string) => {
    // In a real app, this would save the date. For now, update status.
    updateStatus("Interview Scheduled");
    setShowScheduleModal(false);
    toast.success(`Interview Scheduled on ${date} at ${time}`);
  };

  if (!isAdmissionRoot) {
    return (
      <div className="space-y-6 sm:space-y-8 px-3 sm:px-4 md:px-6 lg:px-0">
        <Outlet />
      </div>
    );
  }

  if (!myApp) {
    // Empty State for Parent
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No Applications Found</h2>
        <button
          onClick={() => navigate("/parent/dashboard/admissions/new")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-3 sm:px-4 md:px-6 lg:px-0">

      {/* ================= HEADER ================= */}
      <section className="bg-gray-50 text-gray-900 border border-blue-200 rounded-2xl p-4 sm:p-5 md:p-6">
        <div>
          <h2 className="text-2xl font-semibold">Parent Dashboard</h2>
          <p className="text-sm text-gray-500">Dashboard / Admissions</p>
        </div>
        <p className="text-sm opacity-90 mt-1">
          Track your child’s admission progress.
        </p>
        <div className="mt-4 text-sm">
          <span className="opacity-80">Applicant:</span>{" "}
          <span className="font-medium text-blue-700">{myApp.name}</span>
        </div>
      </section>

      {/* ================= STATUS BANNER ================= */}
      <section className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-semibold">Application Status</h1>
          <p className="text-sm opacity-90 mt-1">Current Stage in Admission Process</p>
          <div className="flex flex-wrap gap-8 mt-4 text-sm">
            <div>
              <p className="opacity-70">Application ID</p>
              <p className="font-medium">{myApp.id}</p>
            </div>
            <div>
              <p className="opacity-70">Class</p>
              <p className="font-medium">{myApp.class}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 text-center">
          <span className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-sm inline-block">
            {myApp.status}
          </span>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="bg-white rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-6">Application Timeline</h2>
        <div className="space-y-6">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                 ${step.done ? "bg-green-50 border-green-500 text-green-600" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                {step.done ? <CheckCircle size={18} /> : <Clock size={18} />}
              </div>
              <div>
                <p className={`font-medium ${step.done ? "text-gray-900" : "text-gray-500"}`}>{step.label}</p>
                <p className="text-xs text-gray-400">{step.done ? "Completed" : "Pending"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ACTION CENTER ================= */}
      {/* Logic: Show specific cards based on Status */}

      {/* 1. FEE PAYMENT (If Applied) */}
      {myApp.status === "Applied" && (
        <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Action Required: Pay Admission Fee</h3>
              <p className="text-sm text-yellow-700 mt-1">Please pay the admission fee to proceed to document verification.</p>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-yellow-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-yellow-700 shadow-sm"
            >
              Pay Fee Now (₹3,000)
            </button>
          </div>
        </section>
      )}

      {/* 2. DOCUMENT VERIFICATION */}
      {myApp.status === "Verifying Documents" && (
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600"><FileText size={24} /></div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Under Review</h3>
              <p className="text-sm text-blue-700">Your documents are currently being verified by the admissions team. You will be notified once the interview is scheduled.</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. INTERVIEW SCHEDULING (Allow user to schedule if status implies needs scheduling) */}
      {/* For this demo, let's assume if status is 'Verifying Documents' (Review Done) -> Parent can schedule. 
          But status logic in AllApplications says 'Interview Scheduled' or 'Interview Done'.
          Let's add a button to 'Schedule Interview' if we are in a hypothetical 'Ready for Interview' state,
          OR just allow re-scheduling if 'Interview Scheduled'.
          Let's assume 'Verifying Documents' -> 'Interview Ready' (hidden step) -> 'Interview Scheduled'.
          We'll add a manual trigger here for demo.
      */}
      {myApp.status === "Verifying Documents" && (
        // Demo helper to push it forward
        <div className="mt-2 text-right">
          <button onClick={() => updateStatus("Interview Scheduled")} className="text-xs text-gray-400 underline hover:text-blue-600">
            (Demo: Fast Forward to Interview Ready)
          </button>
        </div>
      )}

      {myApp.status === "Interview Scheduled" && (
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-green-800">Interview Scheduled</h3>
            <p className="text-sm text-green-700 mt-1">Your interview is set. Click view for details.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInterviewModal(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700"
            >
              View Details
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="border border-green-600 text-green-700 px-5 py-2 rounded-lg text-sm hover:bg-green-50"
            >
              Reschedule
            </button>
          </div>
        </section>
      )}

      {/* 4. OFFER LETTER */}
      {/* If Offer Accepted (or Offer Generated) */}
      {(myApp.status === "Offer Accepted" || myApp.status === "Enrolled") && (
        <section className="bg-purple-50 border border-purple-200 rounded-2xl p-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-purple-800">🎉 Congratulations!</h3>
            <p className="text-sm text-purple-700 mt-1">Your admission offer letter is ready.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-purple-700 shadow"
          >
            <Download size={18} /> Download Offer Letter
          </button>
        </section>
      )}


      {/* ================= MODALS ================= */}

      {/* Payment Modal */}
      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)} title="Pay Admission Fee">
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg flex justify-between items-center">
              <span className="text-yellow-800 font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">₹3,000</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Select Payment Method:</p>
              <div className="border p-3 rounded flex gap-3 hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="pay" defaultChecked /> <span>UPI / GPay / PhonePe</span>
              </div>
              <div className="border p-3 rounded flex gap-3 hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="pay" /> <span>Credit / Debit Card</span>
              </div>
            </div>

            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-4"
            >
              Confirm Payment
            </button>
          </div>
        </Modal>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <Modal onClose={() => setShowReceipt(false)} title="Payment Successful">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Payment Received</h3>
            <p className="text-gray-500">Your application is now under review.</p>
            <button onClick={() => setShowReceipt(false)} className="w-full bg-green-600 text-white py-2 rounded-lg">Close</button>
          </div>
        </Modal>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <Modal onClose={() => setShowScheduleModal(false)} title="Schedule Interview">
          <form onSubmit={(e) => {
            e.preventDefault();
            // @ts-ignore
            const date = e.target.date.value;
            // @ts-ignore
            const time = e.target.time.value;
            // @ts-ignore
            const type = e.target.type?.value || "In-Person";
            handleScheduleInterview(date, time);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input name="date" type="date" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
              <input name="time" type="time" required className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
              <select name="type" className="w-full border rounded-lg p-2">
                <option>In-Person (School Campus)</option>
                <option>Online (Zoom/Meet)</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Confirm Schedule</button>
          </form>
        </Modal>
      )}

      {/* View Interview Details Modal */}
      {showInterviewModal && (
        <Modal onClose={() => setShowInterviewModal(false)} title="Interview Details">
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
              <Calendar className="text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-blue-900">20 Jan 2026</p>
                <p className="text-sm text-blue-700">03:00 PM</p>
                <p className="text-xs text-gray-500 mt-1">Admin Office - Room 101</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Please arrive 15 minutes early.</p>
              <p>• Bring original documents.</p>
              <p>• Student must be present.</p>
            </div>
            <button onClick={() => setShowInterviewModal(false)} className="w-full border py-2 rounded-lg">Close</button>
          </div>
        </Modal>
      )}

    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}