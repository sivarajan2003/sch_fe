import { useState, useEffect } from "react";
// @ts-ignore
import admissionService from "../../../service/admissionService";

import { Calendar, MapPin, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

export default function ParentInterviews() {
    const [myApp, setMyApp] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [interviewMode, setInterviewMode] = useState("In-Person");

    const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadParentInterview = async () => {
    try {
      const res = await admissionService.getAdmissions();

      const rows = res?.rows || res?.data?.rows || [];

      console.log("🔥 Parent interview rows:", rows);

      const interviewApp = rows.find(
        (r:any) =>
          r.admission_status === "Interview Scheduled" ||
          r.admission_status === "Interview Done" ||
          r.admission_status === "Offer Accepted" ||
          r.admission_status === "Enrolled"
      );

      if (interviewApp) {
        setMyApp({
          id: interviewApp.addmission_number || interviewApp.id,
          name: interviewApp.student_name,
          status: interviewApp.admission_status,
          interviewDate: interviewApp.interview_date,
          interviewTime: interviewApp.interview_time,
          interviewMode: interviewApp.interview_mode || "In-Person"
        });
      } else {
        setMyApp(null);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  loadParentInterview();
}, []);



    const handleSchedule = async () => {
  if (!selectedDate || !selectedTime) {
    toast.error("Please select both date and time.");
    return;
  }

  try {
    await admissionService.updateAdmission(myApp.id, {
      admission_status: "Interview Scheduled",
      interview_date: selectedDate,
      interview_time: selectedTime,
      interview_mode: interviewMode
    });

    toast.success("Interview Scheduled Successfully!");

  } catch (e) {
    console.log(e);
  }
};

    if (loading) return <div className="p-6">Loading...</div>;
if (!myApp) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-lg font-semibold text-gray-700">
        No Interview Scheduled
      </h2>
      <p className="text-gray-500 mt-2">
        Once your application reaches the interview stage, details will appear here.
      </p>
    </div>
  );
}


    const isScheduled = myApp.status === "Interview Scheduled" || myApp.status === "Interview Done" || myApp.status === "Offer Accepted" || myApp.status === "Enrolled";

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Interview Process</h1>
                <p className="text-gray-500">Schedule and manage your admission interview.</p>
            </div>

            {/* Status Card */}
            <div className={`p-6 rounded-2xl border ${isScheduled ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"} flex items-start gap-4`}>
                <div className={`p-3 rounded-full ${isScheduled ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                    {isScheduled ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                    <h3 className={`text-lg font-semibold ${isScheduled ? "text-green-800" : "text-blue-800"}`}>
                        {isScheduled ? "Interview Scheduled" : "Action Required: Schedule Interview"}
                    </h3>
                    <p className={`mt-1 ${isScheduled ? "text-green-700" : "text-blue-700"}`}>
                        {isScheduled
                            ? `Your interview is confirmed for ${myApp.interviewDate || "20 Jan 2026"} at ${myApp.interviewTime || "10:00 AM"}.`
                            : "Your application has passed the initial review. Please select a convenient time for the interaction."}
                    </p>
                </div>
            </div>

            {!isScheduled ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Scheduling Form */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Calendar className="text-blue-600" /> Schedule Interview
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM"].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 px-3 rounded-lg border text-sm transition ${selectedTime === time ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50"}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                                <select
                                    className="w-full border rounded-lg p-3"
                                    value={interviewMode}
                                    onChange={(e) => setInterviewMode(e.target.value)}
                                >
                                    <option value="In-Person">In-Person (School Campus)</option>
                                    <option value="Online">Online (Zoom/Google Meet)</option>
                                </select>
                            </div>

                            <button
                                onClick={handleSchedule}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                Confirm Schedule
                            </button>
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border">
                            <h3 className="font-semibold text-gray-900 mb-4">What to expect?</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <ChevronRight size={16} className="text-blue-500 mt-0.5" />
                                    <span>Interactive session with the student to understand their interests.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight size={16} className="text-blue-500 mt-0.5" />
                                    <span>Brief discussion with parents regarding school policies and values.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight size={16} className="text-blue-500 mt-0.5" />
                                    <span>Verification of original documents.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <MapPin size={18} /> Location
                            </h3>
                            <p className="text-sm text-blue-800">
                                Administrative Block, Ground Floor<br />
                                Room 101, Springfield International School.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Scheduled View */
                <div className="bg-white border rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">You're All Set!</h2>
                    <p className="text-gray-500 mt-2">Your interview has been scheduled.</p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                            <p className="font-semibold text-gray-900 mt-1">{myApp.interviewDate || "20 Jan 2026"}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                            <p className="font-semibold text-gray-900 mt-1">{myApp.interviewTime || "10:00 AM"}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Mode</p>
                            <p className="font-semibold text-gray-900 mt-1">{myApp.interviewMode || "In-Person"}</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                        <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                        <p className="text-sm text-gray-600">Please arrive 15 minutes early. Bring all original documents uploaded during the application process.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
