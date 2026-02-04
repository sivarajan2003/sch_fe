import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import admissionService from "../../../../service/admissionService";

import Stepper from "./Stepper";
import Step1Personal from "./steps/Step1Personal";
import Step2Academic from "./steps/Step2Academic";
import Step3PreviousSchool from "./steps/Step3PreviousSchool";
import Step4Documents from "./steps/Step4Documents";
import Step5Review from "./steps/Step5Review";

export default function ApplicationForm() {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    personal: {},
    academic: {},
    previousSchool: {},
    documents: {},
  });

  const nextStep = () => {
    if (step < 5) {
      // toast.success(`Step ${step} completed`);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      // Prepare JSON payload with document URLs
      const payload = {
        // --- PERSONAL ---
        student_name: `${formData.personal.firstName} ${formData.personal.lastName}`,
        date_of_birth: formData.personal.dob,
        gender: formData.personal.gender,
        address: formData.personal.address,
        parent_name: formData.personal.parentName,
        parent_number: formData.personal.phone,
        parent_email: formData.personal.email,
        addmission_number: `ADM-${Date.now()}`,

        // --- ACADEMIC ---
        class_applied_id: formData.academic.applyingClass,
        quota_category: formData.academic.quota,
        academic_achievements: formData.academic.achievements || null,

        // --- PREVIOUS SCHOOL ---
        previous_school: formData.previousSchool.schoolName || null,
        last_year_grade: formData.previousSchool.lastClass || null,
        year_of_passing: formData.previousSchool.yearCompleted
          ? parseInt(formData.previousSchool.yearCompleted)
          : null,
        reason_for_transfer: formData.previousSchool.reason || null,

        // --- DOCUMENT URLS (already uploaded to DO Spaces) ---
        birth_certificate: formData.documents.birth_certificate || null,
        tc_certificate: formData.documents.tc_certificate || null,
        passport_size_photo: formData.documents.passport_size_photo || null,
        address_proof: formData.documents.address_proof || null,

        // --- DEFAULTS ---
        admission_status: "Pending",
        is_active: true,
      };

      console.log("Submitting Admission Data...", payload);
      const res = await admissionService.createAdmission(payload);

      if (res.success) {
        toast.success("Application submitted successfully");
        navigate("/admin/dashboard/receptionist/admissions/all");
      } else {
        toast.error("Failed to submit application");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Error submitting application";
      toast.error(msg);
    }
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <h1 className="text-lg sm:text-xl font-semibold"></h1>
      <p className="text-xs sm:text-sm text-gray-500">
        Fill student admission form here.
      </p>

      <div className="sticky top-0 z-30 bg-white pb-3 sm:static sm:pb-0">
        <Stepper currentStep={step} />
      </div>
      <div className="max-w-5xl mx-auto"></div>
      {step === 1 && (
        <Step1Personal
          data={formData.personal}
          onNext={(data: any) => {
            setFormData({ ...formData, personal: data });
            nextStep();
          }}
        />
      )}

      {step === 2 && (
        <Step2Academic
          data={formData.academic}
          onBack={prevStep}
          onNext={(data: any) => {
            setFormData({ ...formData, academic: data });
            nextStep();
          }}
        />
      )}

      {step === 3 && (
        <Step3PreviousSchool
          data={formData.previousSchool}
          onBack={prevStep}
          onNext={(data: any) => {
            setFormData({ ...formData, previousSchool: data });
            nextStep();
          }}
        />
      )}

      {step === 4 && (
        <Step4Documents
          data={formData.documents}
          onBack={prevStep}
          onNext={(data: any) => {
            setFormData({ ...formData, documents: data });
            nextStep();
          }}
        />
      )}

      {step === 5 && (
        <Step5Review
          data={formData}
          onBack={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
