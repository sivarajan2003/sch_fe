import { Eye, Pencil, Trash2, FileText, ArrowLeft, RefreshCcw, Printer, Plus, CalendarDays, Filter, ArrowUpDown, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToSpaces } from "../../../utils/uploadToSpaces";
import {
    FileBadge,
    Image as ImageIcon,
    Home,
    Clock,
    AlertCircle,
    XCircle
} from "lucide-react";


// @ts-ignore
import admissionService from "../../../service/admissionService";
import { toast } from "react-toastify";

export default function ParentDocumentVerificationPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [previewDoc, setPreviewDoc] = useState<any>(null);
    const [openNewDoc, setOpenNewDoc] = useState(false); // Modal state

    // Filters
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchApplications();
    }, [startDate, endDate]); // Fetch on mount and date change

    const fetchApplications = async () => {
        setLoading(true);
        try {
            // Fetch all applications, maybe filtered by "Verifying Documents" in a real workflow, 
            // but current UI design shows a list of applications to select from. 
            // We'll fetch a reasonable limit or search.
            const res = await admissionService.getAdmissions({
                limit: 50, // Reasonable limit for sidebar list
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                search,
                order: JSON.stringify([['createdAt', 'DESC']])
            });
            console.log(res)
            if (res.success) {
                setData(res.rows);
                setTotalCount(res.count);
                if (res.rows.length > 0) {
                    setSelectedApp(res.rows[0]);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => fetchApplications();
    const handlePrint = () => window.print();
    const handleExport = () => { /* Export logic */ };


    // Map documents for the selected app
    const getDocuments = (app: any) => [
        {
            key: "birth_certificate",
            title: "Birth Certificate",
            url: app.birth_certificate,
            status: app.birth_certificate_status,
            remark: app.birth_certificate_remarks,
            icon: FileBadge
        },
        {
            key: "tc_certificate",
            title: "Transfer Certificate",
            url: app.tc_certificate,
            status: app.tc_certificate_status,
            remark: app.tc_certificate_remarks,
            icon: FileText
        },
        {
            key: "passport_size_photo",
            title: "Student Photo",
            url: app.passport_size_photo,
            status: app.passport_size_photo_status,
            remark: app.passport_size_photo_remarks,
            icon: ImageIcon
        },
        {
            key: "address_proof",
            title: "Address Proof",
            url: app.address_proof,
            status: app.address_proof_status,
            remark: app.address_proof_remarks,
            icon: Home
        }
    ];


    const documents = selectedApp ? getDocuments(selectedApp) : [];
    const getDocumentStats = (app: any) => {
        if (!app) return { total: 0, verified: 0, pending: 0, query: 0 };

        const docs = [
            app.birth_certificate_status,
            app.tc_certificate_status,
            app.passport_size_photo_status,
            app.address_proof_status
        ];

        const verified = docs.filter(s => s === "Verified").length;
        const pending = docs.filter(s => s === "Pending").length;
        const query = docs.filter(s => s === "Query" || s === "Rejected").length;

        return {
            total: docs.length,
            verified,
            pending,
            query
        };
    };
    const stats = getDocumentStats(selectedApp);
    const handleDocumentUpload = async (
        field: string,
        file: File
    ) => {
        if (!selectedApp) return;

        try {
            toast.info("Uploading document...");

            // Upload to Spaces
            const url = await uploadToSpaces(file, "admission/documents");

            // Update admission in DB
            const payload: any = {};
            payload[field] = url;
            payload[`${field}_status`] = "Pending"; // reset status
            payload[`${field}_remarks`] = "";

            await admissionService.updateAdmission(selectedApp.id, payload);

            toast.success("Document updated successfully!");

            // Update local state instantly
            setSelectedApp((prev: any) => ({
                ...prev,
                ...payload
            }));

            // Optional: refresh sidebar list
            fetchApplications();

        } catch (error: any) {
            console.error(error);
            toast.error("Upload failed");
        }
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/dashboard/receptionist")}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="Back to Receptionist Dashboard"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </button>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Document Verification</h2>
                            <p className="text-sm text-gray-500 mt-1">Dashboard / Receptionist / Documents</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleRefresh} className="p-2.5 border rounded-lg hover:bg-gray-50"><RefreshCcw size={16} /></button>
                        <button onClick={handlePrint} className="p-2.5 border rounded-lg hover:bg-gray-50"><Printer size={16} /></button>
                        {/* New Document Button - maybe redirects to edit app or dedicated upload? Keeping purely visual for now as logic is complex */}
                        {/* <button onClick={() => setOpenNewDoc(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1"><Plus size={14}/> New Document</button> */}
                    </div>
                </div>
            </div>


            {/* MASTER-DETAIL LAYOUT */}
            <main className="flex-1">
                <div className="">
                    <div className="mx-auto">
                        <div className="grid grid-cols-3 gap-6">

                            {/* LEFT SIDE - STUDENT PROFILE */}
                            <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold">Student Profile ({totalCount})</h3>
                                </div>
                                <div className="p-6 pt-0 space-y-3">
                                    {data.map((student) => (
                                        <div
                                            key={student.id}
                                            onClick={() => setSelectedApp(student)}
                                            className={`p-3 rounded-lg border cursor-pointer transition
                                            ${selectedApp?.id === student.id
                                                    ? "bg-blue-50 border-blue-500"
                                                    : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <p className="font-medium text-slate-900">
                                                {student.student_name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {student.addmission_number}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {selectedApp && (
                                    <div className="p-6 pt-0">

                                        <div className="text-center mb-6">
                                            <div className="w-32 h-32 rounded-full bg-slate-200 mx-auto mb-4 flex items-center justify-center">
                                                <img
                                                    src={selectedApp.passport_size_photo}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {selectedApp.student_name}
                                            </h3>
                                            <p className="text-sm text-slate-600">{selectedApp.addmission_number}</p>

                                            <div className="flex justify-center gap-2 mt-2">
                                                <span className="px-2 py-1 text-xs border rounded-full">
                                                    {selectedApp.class_name}
                                                </span>
                                                <span className="px-2 py-1 text-xs border rounded-full">
                                                    Section {selectedApp.class_section}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-6 border-t">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Applied On
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {selectedApp?.createdAt
                                                        ? new Date(selectedApp.createdAt).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })
                                                        : "-"}
                                                </span>

                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Quota
                                                </span>
                                                <span className="text-sm font-medium capitalize">
                                                    {selectedApp?.quota_category || "-"}
                                                </span>

                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Documents
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {stats.total} Uploaded
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 bg-blue-50 border rounded-lg">
                                            <p className="text-sm font-semibold text-blue-900">
                                                Verification Progress
                                            </p>
                                            <p className="text-xs text-blue-700">
                                                {stats.verified} verified, {stats.pending} pending
                                                {stats.query > 0 && `, ${stats.query} query raised`}
                                            </p>

                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* RIGHT SIDE - DOCUMENT VERIFICATION */}
                            <div className="rounded-lg border bg-white shadow-sm col-span-2 relative">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold">
                                        Document Verification
                                    </h3>
                                </div>

                                <div className="p-6 pt-0 space-y-6">

                                    {/* DOCUMENT CARD COMPONENT EXAMPLE */}
                                    {documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex justify-between mb-4">
                                                <div className="flex gap-2 items-center">
                                                    <doc.icon className="w-8 h-8 text-slate-600" />
                                                    <div>

                                                        <h4 className="text-base font-semibold">
                                                            {doc.title}
                                                        </h4>
                                                        <span className={`text-xs px-2 py-1 rounded-full
                                                        ${doc.status === "Verified"
                                                                ? "bg-green-100 text-green-700"
                                                                : doc.status === "Pending"
                                                                    ? "bg-amber-100 text-amber-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}>
                                                            {doc.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setPreviewDoc(doc)}
                                                    className="text-sm border px-3 py-1 rounded-md text-blue-600"
                                                >
                                                    View Document
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-xs font-medium block mb-1">
                                                        Remarks
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        defaultValue={doc.remark || ""}
                                                        placeholder="Add verification remarks..."
                                                        className="w-full border rounded-md px-3 py-4 text-sm"
                                                    />
                                                </div>

                                                <div className="flex gap-2">

                                                    <label className={`flex w-full justify-center items-center gap-2 py-2 rounded-md text-sm text-white cursor-pointer
  ${doc.status === "Pending"
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-green-600 hover:bg-green-700"}`}
                                                    >
                                                        <CheckCircle size={16} />
                                                        {doc.status === "Pending" ? "Upload" : "Reupload"}

                                                        <input
                                                            type="file"
                                                            hidden
                                                            accept="image/*,application/pdf"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    handleDocumentUpload(doc.key, file);
                                                                }
                                                            }}
                                                        />
                                                    </label>


                                                    <button className="flex w-full justify-center items-center gap-2 bg-slate-200 hover:bg-slate-300 py-2 rounded-md text-sm">
                                                        <AlertCircle size={16} />
                                                        Query
                                                    </button>

                                                </div>



                                            </div>
                                        </div>
                                    ))}

                                    {/* FOOTER BUTTONS */}
                                    <div className="pt-6 border-t flex gap-3">
                                        <button className="bg-[#2563eb] text-white w-1/4 ms-auto py-2 rounded-md">
                                            Save Progress
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* PREVIEW MODAL */}
            {previewDoc && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full p-4 relative max-h-[90vh] overflow-auto">
                        <button onClick={() => setPreviewDoc(null)} className="absolute top-4 right-4 text-xl font-bold bg-white rounded-full p-2 shadow">✕</button>
                        <h3 className="text-lg font-semibold mb-4">{previewDoc.title}</h3>
                        {previewDoc.url?.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                            <img src={previewDoc.url} className="w-full rounded-lg" />
                        ) : (
                            <iframe
                                src={previewDoc.url}
                                className="w-full h-[70vh] rounded-lg"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
