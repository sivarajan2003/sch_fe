import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Step1Personal from "./steps/Step1Personal";
import Step2Academic from "./steps/Step2Academic";
import Step3PreviousSchool from "./steps/Step3PreviousSchool";
import Step4Documents from "./steps/Step4Documents";
import Step5Review from "./steps/Step5Review";

import { saveApplication } from "./storage";
import { AdmissionApplication } from "./types";

export default function AdmissionFunnel() {
  const navigate = useNavigate();

  // ✅ STATE MUST COME FIRST
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<AdmissionApplication>({
    personal: {},
    academic: {},
    previousSchool: {},
    documents: {},
  } as AdmissionApplication);

  // ✅ THEN FUNCTIONS
  const next = (data: any) => {
    const updated = { ...formData };

    if (step === 1) updated.personal = data;
    if (step === 2) updated.academic = data;
    if (step === 3) updated.previousSchool = data;
    if (step === 4) updated.documents = data;

    setFormData(updated);
    saveApplication(updated); // autosave
    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  const submit = () => {
    saveApplication(formData); // FINAL SAVE
    navigate("/admin/dashboard/receptionist/admissions/verification");
  };
  return (
    <div className="w-full">
      {/* PAGE CONTAINER */}
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 space-y-6">
        
        {step === 1 && (
          <Step1Personal
            data={formData.personal}
            onNext={next}
          />
        )}
  
        {step === 2 && (
          <Step2Academic
            data={formData.academic}
            onNext={next}
            onBack={back}
          />
        )}
  
        {step === 3 && (
          <Step3PreviousSchool
            data={formData.previousSchool}
            onNext={next}
            onBack={back}
          />
        )}
  
        {step === 4 && (
          <Step4Documents
            data={formData.documents}
            onNext={next}
            onBack={back}
          />
        )}
  
        {step === 5 && (
          <Step5Review
            data={formData}
            onBack={back}
            onSubmit={submit}
          />
        )}
      </div>
    </div>
  );
  
}
