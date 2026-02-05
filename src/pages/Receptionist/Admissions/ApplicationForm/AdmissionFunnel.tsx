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

export default function AdmissionFunnel() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<any>(getApplication());

  /* ============================
     STEP NAVIGATION
  ============================ */

  const next = (data: any) => {
    const updated = { ...formData };

    if (step === 1) updated.personal = data;
    if (step === 2) updated.academic = data;
    if (step === 3) updated.previousSchool = data;
    if (step === 4) updated.documents = data;
    if (step === 5) updated.fees = data;

    setFormData(updated);
    saveApplication(updated);
    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  /* ============================
     FINAL SUBMIT
  ============================ */

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const { personal, academic, previousSchool, documents, fees } = formData;

      /* ============================
         BUILD BACKEND PAYLOAD
      ============================ */

      const payload: any = {
        // STUDENT
        student_name: `${personal.firstName} ${personal.lastName}`,
        date_of_birth: personal.dob,
        gender: personal.gender,
        address: personal.address,

        // CLASS
        class_applied_id: academic.applyingClass,
        quota_category: academic.quota,
        academic_achievements: academic.achievements,

        // PARENT
        parent_name: personal.parentName,
        parent_number: personal.phone,
        parent_email: personal.email,

        // PREVIOUS SCHOOL
        previous_school: previousSchool.schoolName,
        last_year_grade: previousSchool.lastClass,
        year_of_passing: Number(previousSchool.yearCompleted) || null,
        reason_for_transfer: previousSchool.reason,

        // DOCUMENTS
        birth_certificate: documents.birth_certificate,
        tc_certificate: documents.tc_certificate,
        passport_size_photo: documents.passport_size_photo,
        address_proof: documents.address_proof,

        // STATUS
        admission_status: "Pending",
      };

      /* ============================
         FEE PAYMENT MAPPING
      ============================ */

      if (fees?.paymentMode === "cash") {
        payload.registration_fee = Number(fees.amount || 500);
        payload.total_amount = Number(fees.amount || 500);
        payload.payment_method = "CASH";
        payload.payment_date = new Date().toISOString();
      } else {
        payload.registration_fee = 500;
        payload.total_amount = 500;
        payload.payment_method = "UPI"; // default for online
        payload.payment_date = new Date().toISOString();
      }

      /* ============================
         API CALL
      ============================ */

      const res = await admissionService.createAdmission(payload);

      if (!res?.success) {
        throw new Error(res?.message || "Admission failed");
      }

      toast.success("Admission submitted successfully");
      clearApplication();

      navigate("/admin/dashboard/receptionist/admissions/verification");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit application");
      setSubmitting(false);
    }
  };

  /* ============================
     RENDER
  ============================ */

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
