
'use client'
import { useState } from "react";

import FormStepper from "./FormStepper";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSubmissionSchema, ProjectSubmissionSchema } from "@/data/schemas/Project";
import SuccessPage from "./SuccessPage";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";
import { toast } from "sonner";

const TOTAL_STEPS = 5;

const ProjectSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const methods = useForm<ProjectSubmissionSchema>({
    resolver: zodResolver(projectSubmissionSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      problemStatement: "",
      solution: "",
      features: "",
      projectType: [],
      projectStatus: "idea",
      sdgGoals: [],
      projectDomains: [],
      externalLinks: {
        website: "",
        instagram: "",
        facebook: "",
        youtube: "",
        linkedin: "",
      },
      teamMembers: [{ name: "", linkedinUrl: "", profileImage: null }],
      teamContact: "",
      teamEmail: "",
      teamPhone: "",
      coverImage: null,
      appLogo: null,
      demoVideo: "",
      techStack: [],
      slideImages: [],
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    const stepFieldsMap = {
      1: ["title", "subtitle", "problemStatement", "solution"],
      2: ["coverImage", "demoVideo", "features"],
      3: ["techStack", "projectType", "projectStatus", "sdgGoals", "projectDomains"],
      4: ["externalLinks", "teamContact", "teamEmail", "teamPhone"],
      5: ["teamMembers", "slideImages"],
    };

    const fieldsToValidate = stepFieldsMap[currentStep as keyof typeof stepFieldsMap];
    
    const isValid = await methods.trigger(fieldsToValidate as any);
    
    if (!isValid) {
        toast("Check your inputs", {
            description: "Please ensure all required fields are filled out correctly.",
          })
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit: SubmitHandler<ProjectSubmissionSchema> = (data) => {
    console.log("Form submitted:", data);
    toast("Project Submitted!",{
      description: "Your project has been successfully submitted.",
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessPage />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 />;
      case 3:
        return <FormStep3 />;
      case 4:
        return <FormStep4 />;
      case 5:
        return <FormStep5 />;
      default:
        return <FormStep1 />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-background border md:p-8">
        <FormStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < TOTAL_STEPS ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">
                Submit Project
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ProjectSubmissionForm;
