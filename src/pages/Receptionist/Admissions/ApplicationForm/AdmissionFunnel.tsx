// AdmissionFunnel.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// @ts-ignore
import admissionService from "../../../../service/admissionService";

import Step1Personal from "./steps/Step1Personal";
import Step2Academic from "./steps/Step2Academic";
import Step3PreviousSchool from "./steps/Step3PreviousSchool";
import Step4Documents from "./steps/Step4Documents";
import StepFees from "./steps/StepFees";
import Step5Review from "./steps/Step5Review";

import { saveApplication, getApplication, clearApplication } from "./storage";

function generateAdmissionNumber() {
  const ts = Date.now();
  const rand = Math.floor(Math.random() * 9000 + 1000).toString(16);
  return `ADM-${ts}-${rand}`;
}

/* -------------------------
   Helpers (defensive)
   ------------------------ */
const toNumberSafe = (v, fallback = 500) => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const s = v.trim();
    if (s === "") return fallback;
    const n = Number(s);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
};

const toISODateSafe = (v) => {
  if (!v) return new Date().toISOString();
  const d = typeof v === "string" || typeof v === "number" ? new Date(v) : v;
  const time = d?.getTime?.();
  return Number.isFinite(time) ? d.toISOString() : new Date().toISOString();
};

const normalizePaymentMethod = (raw, paymentModeFallback) => {
  if (!raw && paymentModeFallback === "cash") return "CASH";
  if (!raw) return "UPI";
  const u = String(raw).toUpperCase();
  if (["CARD", "UPI", "NET_BANKING", "CASH"].includes(u)) return u;
  return "UPI";
};

const normalizePaymentStatus = (raw, paymentModeFallback) => {
  if (paymentModeFallback === "cash") return "Completed";
  if (!raw) return "Pending";
  const s = String(raw).toLowerCase();
  if (["completed", "complete", "paid", "success"].includes(s)) return "Completed";
  if (["failed", "error"].includes(s)) return "Failed";
  return "Pending";
};

const extractFeeFields = (fees = {}) => {
  if (!fees || typeof fees !== "object") fees = {};

  // possible variants from UI or saved drafts
  const registrationCandidates = [
    fees.registration_fee,
    fees.total_amount,
    fees.amount,
    fees.amount_collected,
    fees?.amountCollected,
  ];

  const rawRegistration = registrationCandidates.find((c) => c !== undefined && c !== null);

  const registration_fee = toNumberSafe(rawRegistration, 500);
  const total_amount = toNumberSafe(
    fees.total_amount ?? fees.registration_fee ?? fees.amount ?? fees.amount_collected,
    registration_fee
  );

  const payment_method_raw =
    fees.payment_method ?? fees.paymentMethod ?? fees.payment_mode ?? fees.paymentMode ?? fees.method;

  const payment_method = normalizePaymentMethod(payment_method_raw, fees.payment_mode ?? fees.paymentMode);

  const payment_date_raw = fees.payment_date ?? fees.paymentDate ?? fees.paymentDateLocal ?? fees.payment_time ?? fees.paymentTime;
  const payment_date = toISODateSafe(payment_date_raw);

  const payment_status_raw = fees.payment_status ?? fees.paymentStatus ?? fees.onlineStatus ?? fees.status;
  const payment_status = normalizePaymentStatus(payment_status_raw, fees.payment_mode ?? fees.paymentMode);

  const receipt_no = fees.receipt_no ?? fees.receiptNo ?? fees.transaction_id ?? null;
  const fee_remark = fees.fee_remark ?? fees.remark ?? null;

  return {
    registration_fee,
    total_amount,
    payment_method,
    payment_date,
    payment_status,
    receipt_no,
    fee_remark,
  };
};

/* -------------------------
   Component
   ------------------------ */
export default function AdmissionFunnel() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(getApplication() || {});

  const next = (data) => {
  const updated = { ...formData };

  if (step === 1) updated.personal = data;
  if (step === 2) updated.academic = data;
  if (step === 3) updated.previousSchool = data;
  if (step === 4) updated.documents = data;

  if (step === 5) {
    // 🔥 MERGE fees instead of overwrite (THIS FIXES NaN ISSUE)
    updated.fees = {
      ...(updated.fees || {}),
      ...data,
    };
  }

  setFormData(updated);
  saveApplication(updated);
  setStep(step + 1);
};


  const back = () => setStep(Math.max(1, step - 1));

  const submit = async () => {
  if (submitting) return;
  setSubmitting(true);

  try {
    const { personal = {}, academic = {}, previousSchool = {}, documents = {}, fees = {} } = formData;

    // 🔒 HARD NORMALIZATION (FINAL SOURCE OF TRUTH)
    const registrationFee =
      typeof fees.registration_fee === "number"
        ? fees.registration_fee
        : typeof fees.total_amount === "number"
        ? fees.total_amount
        : 500;

    const payload = {
      addmission_number: generateAdmissionNumber(),

      // STUDENT
      student_name: `${personal.firstName} ${personal.lastName}`.trim(),
      date_of_birth: personal.dob,
      gender: personal.gender,
      address: personal.address,

      // CLASS
      class_applied_id: academic.applyingClass,
      quota_category: academic.quota,

      // PARENT
      parent_name: personal.parentName,
      parent_number: personal.phone,
      parent_email: personal.email,

      // PREVIOUS SCHOOL
      previous_school: previousSchool.schoolName,
      last_year_grade: previousSchool.lastClass,
      year_of_passing: Number(previousSchool.yearCompleted),
      reason_for_transfer: previousSchool.reason ?? null,

      // DOCUMENTS
      birth_certificate: documents.birth_certificate,
      tc_certificate: documents.tc_certificate,
      passport_size_photo: documents.passport_size_photo,
      address_proof: documents.address_proof,

      // STATUS
      admission_status: "Pending",
      is_active: true,

      // 💰 FEES — BACKEND SAFE (THIS FIXES EVERYTHING)
      registration_fee: registrationFee,
      total_amount: registrationFee,
      payment_method: fees.payment_method || "UPI",
      payment_date: fees.payment_date || new Date().toISOString(),
      payment_status: fees.payment_status || "Pending",
      receipt_no: fees.receipt_no ?? null,
      fee_remark: fees.fee_remark ?? null,
    };

    console.log("✅ FINAL PAYLOAD SENT TO BACKEND:", payload);

    const res = await admissionService.createAdmission(payload);

    if (res?.success === false) {
      throw new Error(res?.errors?.[0]?.message || "Admission failed");
    }

    toast.success("Admission submitted successfully");
    clearApplication();
    navigate("/admin/dashboard/receptionist/admissions/verification");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Admission failed");
    setSubmitting(false);
  }
};


  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 space-y-6">
        {step === 1 && <Step1Personal data={formData.personal} onNext={next} />}
        {step === 2 && <Step2Academic data={formData.academic} onNext={next} onBack={back} />}
        {step === 3 && <Step3PreviousSchool data={formData.previousSchool} onNext={next} onBack={back} />}
        {step === 4 && <Step4Documents data={formData.documents} onNext={next} onBack={back} />}
        {step === 5 && <StepFees data={formData.fees} onNext={next} onBack={back} />}
        {step === 6 && <Step5Review data={formData} onBack={back} onSubmit={submit} />}
      </div>
    </div>
  );
}
