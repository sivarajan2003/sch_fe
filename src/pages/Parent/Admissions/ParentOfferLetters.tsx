import { useState, useEffect } from "react";
// @ts-ignore
import admissionService from "../../../service/admissionService";

import { Download } from "lucide-react";

export default function ParentOfferLetters() {
    const [myApp, setMyApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [templateSettings, setTemplateSettings] = useState({
        headerTitle: "ATELIER SCHOOL",
        headerSubtitle: "Excellence in Education",
        headerLogo: "",
        footerText: "123 School Lane, Education City\nContact: info@atelier.com | +1 234 567 890",
        watermarkText: "OFFICIAL OFFER",
        watermarkImage: "",
        watermarkOpacity: 10,
        showWatermark: true,
        principalSignature: "",
        schoolSeal: ""
    });

    // Load template settings from API
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await admissionService.getOfferLetterTemplate();
                if (res.success && res.data) {
                    const db = res.data;
                    setTemplateSettings({
                        headerTitle: db.header_title || "ATELIER SCHOOL",
                        headerSubtitle: db.header_subtitle || "Excellence in Education",
                        headerLogo: db.header_logo || "",
                        footerText: db.footer_text || "123 School Lane, Education City\nContact: info@atelier.com | +1 234 567 890",
                        watermarkText: db.watermark_text || "OFFICIAL OFFER",
                        watermarkImage: db.watermark_image || "",
                        watermarkOpacity: db.watermark_opacity || 10,
                        showWatermark: db.show_watermark !== undefined ? db.show_watermark : true,
                        principalSignature: db.principal_signature || "",
                        schoolSeal: db.school_seal || ""
                    });
                }
            } catch (error) {
                console.error("Failed to load template settings", error);
            }
        };
        loadSettings();
    }, []);

    useEffect(() => {
        const loadParentOffer = async () => {
            try {
                const res = await admissionService.getAdmissions();
                const rows = res?.rows || res?.data?.rows || [];

                const offer = rows.find(
                    (r: any) =>
                        r.admission_status === "Offer Sent" ||
                        r.admission_status === "Offer Accepted" ||
                        r.admission_status === "Enrolled"
                );

                if (offer) {
                    setMyApp({
                        id: offer.addmission_number || offer.id,
                        name: offer.student_name,
                        class: offer.class_name,
                        parentName: offer.parent_name,
                        address: offer.address,
                        status: offer.admission_status
                    });
                } else {
                    setMyApp(null);
                }

            } catch (error) {
                console.log("Parent Offer Error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadParentOffer();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!myApp) return <div className="p-6 text-center text-gray-500">No active application found.</div>;

    const isReady =
        myApp.status === "Offer Sent" ||
        myApp.status === "Offer Accepted" ||
        myApp.status === "Enrolled";

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border rounded-2xl m-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Download size={40} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Offer Letter Not Yet Available</h2>
                <p className="text-gray-500 max-w-md mt-2">
                    Your application is currently under review or in the interview stage. Once the admission process is complete, your offer letter will appear here.
                </p>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #offer-letter-print-area,
                    #offer-letter-print-area * {
                        visibility: visible;
                    }
                    #offer-letter-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 15px !important;
                        font-size: 11px !important;
                        line-height: 1.3 !important;
                    }
                    /* Aggressive size reduction for single page */
                    #offer-letter-print-area * {
                        line-height: 1.3 !important;
                    }
                    #offer-letter-print-area p,
                    #offer-letter-print-area span,
                    #offer-letter-print-area li {
                        font-size: 11px !important;
                        margin-top: 0.25rem !important;
                        margin-bottom: 0.25rem !important;
                    }
                    #offer-letter-print-area h1 {
                        font-size: 28px !important;
                        margin-bottom: 0.5rem !important;
                    }
                    #offer-letter-print-area h2 {
                        font-size: 22px !important;
                        margin-bottom: 0.25rem !important;
                    }
                    #offer-letter-print-area h3 {
                        font-size: 14px !important;
                        margin-bottom: 0.25rem !important;
                    }
                    #offer-letter-print-area .text-xs {
                        font-size: 9px !important;
                    }
                    #offer-letter-print-area .text-sm {
                        font-size: 10px !important;
                    }
                    #offer-letter-print-area .text-lg {
                        font-size: 13px !important;
                    }
                    #offer-letter-print-area .text-xl {
                        font-size: 14px !important;
                    }
                    #offer-letter-print-area .text-2xl {
                        font-size: 16px !important;
                    }
                    #offer-letter-print-area .text-3xl {
                        font-size: 22px !important;
                    }
                    /* Reduce spacing */
                    #offer-letter-print-area .space-y-6 > * + * {
                        margin-top: 0.5rem !important;
                    }
                    #offer-letter-print-area .space-y-4 > * + * {
                        margin-top: 0.25rem !important;
                    }
                    #offer-letter-print-area .mt-8,
                    #offer-letter-print-area .my-6 {
                        margin-top: 0.5rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    #offer-letter-print-area .mt-12 {
                        margin-top: 1rem !important;
                    }
                    #offer-letter-print-area .mb-6,
                    #offer-letter-print-area .mb-8 {
                        margin-bottom: 0.5rem !important;
                    }
                    #offer-letter-print-area .pb-6,
                    #offer-letter-print-area .pb-8 {
                        padding-bottom: 0.5rem !important;
                    }
                    #offer-letter-print-area .pt-6 {
                        padding-top: 0.5rem !important;
                    }
                    #offer-letter-print-area .p-6 {
                        padding: 0.5rem !important;
                    }
                    /* Reduce image sizes */
                    #offer-letter-print-area img {
                        max-height: 40px !important;
                    }
                    #offer-letter-print-area .h-20 {
                        height: 40px !important;
                    }
                    #offer-letter-print-area .h-12 {
                        height: 30px !important;
                    }
                    /* Compact watermark */
                    #offer-letter-print-area .text-\[100px\] {
                        font-size: 80px !important;
                    }
                }
            `}</style>
            <div className="max-w-5xl mx-auto p-4 md:p-8 print:p-0 print:m-0 print:max-w-full">

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
                <div id="offer-letter-print-area" className="bg-white shadow-xl border border-gray-200 rounded-none p-10 md:p-16 min-h-[1000px] text-gray-800 relative mx-auto max-w-[800px] print:shadow-none print:border-none print:w-full print:max-w-none overflow-hidden">

                    {/* WATERMARK */}
                    {templateSettings.showWatermark && (
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                            style={{ opacity: templateSettings.watermarkOpacity / 100 }}
                        >
                            {templateSettings.watermarkImage ? (
                                <img src={templateSettings.watermarkImage} alt="watermark" className="w-[80%] opacity-50 grayscale" />
                            ) : (
                                <h1 className="text-[100px] font-black text-gray-400 rotate-[-45deg] whitespace-nowrap border-4 border-gray-400 p-4 rounded-xl transform scale-150 opacity-20">
                                    {templateSettings.watermarkText}
                                </h1>
                            )}
                        </div>
                    )}

                    {/* HEADER */}
                    <div className="text-center border-b-2 border-blue-900 pb-6 mb-8 relative z-10">
                        {templateSettings.headerLogo && (
                            <img src={templateSettings.headerLogo} className="h-20 mx-auto mb-4" alt="School Logo" />
                        )}
                        <h2 className="text-3xl font-serif font-bold text-blue-900 tracking-wide uppercase">{templateSettings.headerTitle}</h2>
                        <p className="text-sm text-gray-600 font-medium tracking-wider mt-1 uppercase">{templateSettings.headerSubtitle}</p>
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-6 text-justify leading-relaxed relative z-10">

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="font-semibold">Ref: OFF/{new Date().getFullYear()}/{String(myApp.id).padStart(4, '0')}</p>
                                <p className="text-gray-600">Date: {new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">To the Parent/Guardian of:</p>
                                <p>{myApp.name}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="font-bold text-xl text-center underline decoration-blue-200 decoration-2 underline-offset-4 mb-6">
                                SUBJECT: ADMISSION OFFER FOR CLASS {myApp.class?.replace("Grade ", "")}
                            </p>

                            <p>Dear Parent,</p>

                            <p>
                                We are delighted to inform you that your ward, <strong>{myApp.name}</strong>, has been successfully selected for admission to <strong>{myApp.class}</strong> at {templateSettings.headerTitle} for the academic session {new Date().getFullYear()}-{new Date().getFullYear() + 1}.
                            </p>

                            <p>
                                This offer is based on the performance in the entrance assessment/interview. We believe {myApp.name} will be a valuable addition to our school community.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 border rounded-lg my-6">
                            <h3 className="font-bold text-gray-900 border-b pb-2 mb-3">Admission Details</h3>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <span className="text-gray-600">Student Name:</span> <span className="font-semibold">{myApp.name}</span>
                                <span className="text-gray-600">Grade Admitted:</span> <span className="font-semibold">{myApp.class}</span>
                                <span className="text-gray-600">Application ID:</span> <span className="font-semibold">{myApp.id}</span>
                                <span className="text-gray-600">Session:</span> <span className="font-semibold">{new Date().getFullYear()} - {new Date().getFullYear() + 1}</span>
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
                            <p>We look forward to welcoming you and your child to the {templateSettings.headerTitle} family.</p>
                            <p className="mt-4">Sincerely,</p>
                        </div>

                        <div className="mt-12 flex justify-between items-end">
                            <div>
                                {templateSettings.principalSignature && (
                                    <img src={templateSettings.principalSignature} className="h-12 mb-2 object-contain" alt="Signature" />
                                )}
                                <p className="font-bold">Authorized Signatory</p>
                                <p className="text-sm text-gray-500">Admissions Office</p>
                            </div>
                            {(templateSettings.schoolSeal || templateSettings.headerLogo) && (
                                <img
                                    src={templateSettings.schoolSeal || templateSettings.headerLogo}
                                    className="h-20 opacity-80 object-contain"
                                    alt="Seal"
                                />
                            )}
                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-500 relative z-10">
                        <p className="whitespace-pre-wrap">{templateSettings.footerText}</p>
                    </div>

                </div>
            </div>
        </>
    );
}

function getDateAfterDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
}
