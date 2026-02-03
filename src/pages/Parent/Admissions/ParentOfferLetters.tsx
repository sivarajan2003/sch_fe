import { useState, useEffect } from "react";
import { Download, Smartphone, Mail, Globe } from "lucide-react";

export default function ParentOfferLetters() {
    const [myApp, setMyApp] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("admission_applications");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.length > 0) {
                setMyApp(parsed[0]);
            }
        }
        setLoading(false);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!myApp) return <div className="p-6 text-center text-gray-500">No active application found.</div>;

    const isReady = myApp.status === "Offer Accepted" || myApp.status === "Enrolled";

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border rounded-2xl m-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Mail size={40} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Offer Letter Not Yet Available</h2>
                <p className="text-gray-500 max-w-md mt-2">
                    Your application is currently under review or in the interview stage. Once the admission process is complete, your offer letter will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admission Offer</h1>
                    <p className="text-gray-500">View and download your official admission offer.</p>
                </div>
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm font-medium"
                >
                    <Download size={18} /> Download / Print
                </button>
            </div>

            {/* Letter Container - A4 ish Aspect Ratio */}
            <div className="bg-white shadow-xl border border-gray-200 rounded-none p-10 md:p-16 min-h-[1000px] text-gray-800 relative mx-auto max-w-[800px] print:shadow-none print:border-none print:w-full print:max-w-none">

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                    {/* Using a large icon as watermark if no logo image */}
                    <Globe size={500} />
                </div>

                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-blue-900 pb-8 mb-8">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-blue-900">Springfield International School</h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-[250px] leading-relaxed">
                            123 Education Lane, Knowledge Park<br />
                            Mumbai, Maharashtra - 400001
                        </p>
                    </div>
                    <div className="text-right text-sm text-gray-500 space-y-1">
                        <div className="flex items-center justify-end gap-2"><Smartphone size={14} /> +91 98765 43210</div>
                        <div className="flex items-center justify-end gap-2"><Globe size={14} /> www.springfield.edu</div>
                        <div className="flex items-center justify-end gap-2"><Mail size={14} /> admissions@springfield.edu</div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 text-justify leading-relaxed">

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="font-semibold">Ref: ADM/2026/OFF/{myApp.id?.split("-")[2] || "001"}</p>
                            <p className="text-gray-600">Date: {new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="font-bold text-lg mb-1">To,</p>
                        <p className="font-bold text-lg">{myApp.name}</p>
                        <p className="text-gray-700">Parent/Guardian: {myApp.parentName || "Parent"}</p>
                        <p className="text-gray-700">{myApp.address || "Mumbai, India"}</p>
                    </div>

                    <div className="mt-8">
                        <p className="font-bold text-xl text-center underline decoration-blue-200 decoration-2 underline-offset-4 mb-6">Subject: Offer of Admission for Grade {myApp.class?.replace("Grade ", "")}</p>

                        <p>Dear Parent,</p>

                        <p>
                            We are delighted to inform you that following a successful review of the application and interaction,
                            <strong> {myApp.name}</strong> has been selected for admission to <strong>{myApp.class}</strong> at Springfield International School for the academic year 2026-27.
                        </p>

                        <p>
                            We were impressed by the student's potential and believe they will be a valuable addition to our vibrant school community.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 border rounded-lg my-6">
                        <h3 className="font-bold text-gray-900 border-b pb-2 mb-3">Admission Details</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <span className="text-gray-600">Student Name:</span> <span className="font-semibold">{myApp.name}</span>
                            <span className="text-gray-600">Grade Admitted:</span> <span className="font-semibold">{myApp.class}</span>
                            <span className="text-gray-600">Application ID:</span> <span className="font-semibold">{myApp.id}</span>
                            <span className="text-gray-600">Session:</span> <span className="font-semibold">2026 - 2027</span>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold mb-2">Next Steps:</p>
                        <p>To confirm this seat, you are requested to complete the following formalities by <strong>{getDateAfterDays(7)}</strong>:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Payment of the admission fee (Non-refundable).</li>
                            <li>Submission of original Transfer Certificate (TC) from the previous school.</li>
                            <li>Submission of medical fitness certificate.</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <p>We look forward to welcoming you and your child to the Springfield family.</p>
                        <p className="mt-4">Sincerely,</p>
                    </div>

                    <div className="mt-12 flex justify-between items-end">
                        <div className="text-center">
                            <div className="h-16 w-32 mb-2 border-b border-gray-400"></div>
                            <p className="font-bold text-sm">Principal</p>
                            <p className="text-xs text-gray-500">Springfield Int. School</p>
                        </div>

                        <div className="text-center">
                            {/* Seal Placeholder */}
                            <div className="w-24 h-24 border-4 border-blue-900 rounded-full flex items-center justify-center text-blue-900 font-bold opacity-30 rotate-[-15deg]">
                                SEAL
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-0 w-full text-center text-xs text-gray-400">
                    <p>This is a computer-generated document and does not require a physical signature.</p>
                </div>

            </div>
        </div>
    );
}

function getDateAfterDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
}
