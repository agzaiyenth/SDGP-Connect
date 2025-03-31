
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

const FormStepper = ({ currentStep, totalSteps }: FormStepperProps) => {
  const steps = [
    { label: "Project Basics", description: "Title and problem" },
    { label: "Media & Features", description: "Images and details" },
    { label: "Classification", description: "Type and domains" },
    { label: "Contact", description: "External links" },
    { label: "Team", description: "Members and slides" },
  ];

  return (
    <div className="mb-8 ">
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={index} className="flex flex-col items-center w-1/5 ">
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "absolute top-1/2 left-full h-0.5 w-full -translate-y-1/2",
                      isCompleted
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    )}
                  ></div>
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "font-medium",
                    isActive || isCompleted
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {steps[currentStep - 1].label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
