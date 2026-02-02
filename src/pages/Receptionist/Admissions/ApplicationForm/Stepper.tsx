import { Check } from "lucide-react";

interface Props {
  currentStep: number;
}

const steps = [
  "Personal Details",
  "Academic Details",
  "Previous School",
  "Document Upload",
  "Review",
];

export default function Stepper({ currentStep }: Props) {
  return (
<div className="bg-white p-4 sm:p-6 rounded-xl border">
<div className="hidden sm:flex items-center justify-between">
        {steps.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div key={label} className="flex items-center w-full">
              {/* STEP */}
              <div className="flex flex-col items-center relative">
                {/* CIRCLE */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500"
                        : isActive
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-300"
                    }`}
                >
                  {/* ICON / DOT */}
                  {isCompleted && (
                    <Check className="w-5 h-5 text-white" />
                  )}

                  {isActive && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>

                {/* LABEL */}
                <p
                  className={`mt-1 sm:mt-2 text-[10px] sm:text-xs text-center whitespace-nowrap
                    ${
                      isCompleted
                        ? "text-green-600 font-medium"
                        : isActive
                        ? "text-blue-600 font-medium"
                        : "text-gray-400"
                    }`}
                >
                  {label}
                </p>
              </div>

              {/* CONNECTOR LINE */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-1 sm:mx-3 transition
                    ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* 📱 MOBILE STEPPER */}
<div className="sm:hidden">
  <div className="flex items-center justify-between mb-2">
    <p className="text-sm font-medium text-gray-700">
      Step {currentStep} of {steps.length}
    </p>
    <p className="text-sm text-blue-600 font-medium">
      {steps[currentStep - 1]}
    </p>
  </div>

  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-600 transition-all"
      style={{
        width: `${(currentStep / steps.length) * 100}%`,
      }}
    />
  </div>
</div>

    </div>
    
  );
}
