'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

import FormStepper from "./FormStepper";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSubmissionSchema, ProjectSubmissionSchema } from "@/validations/submit_project";
import SuccessPage from "./SuccessPage";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";
import { toast } from "sonner";
import { useSubmitProject } from "@/hooks/project/useSubmitProject";
import { Loader2 } from "lucide-react";
import useUploadImageToBlob from "@/hooks/azure/useUploadImageToBlob";

const TOTAL_STEPS = 5;

const ProjectSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedProjectId, setSubmittedProjectId] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { uploadImage } = useUploadImageToBlob();
  const router = useRouter();
  
  // Use our custom submission hook
  const { submitProject, isSubmitting, error } = useSubmitProject();

  const methods = useForm<ProjectSubmissionSchema>({
    resolver: zodResolver(projectSubmissionSchema),
    defaultValues: {
      metadata: {
        sdgp_year: "",
        group_num: "",
        title: "",
        subtitle: "",
        website: "",
        cover_image: "https://placehold.co/600x400/png?text=NO+IMAGE",
        logo: "https://placehold.co/100/png",
      },
      projectDetails: {
        problem_statement: "",
        solution: "",
        features: "",
        team_email: "",
        team_phone: "",
      },
      status: {
        status: "IDEA",
      },
      domains: [],
      projectTypes: [],
      sdgGoals: [],
      techStack: [],
      team: [{ name: "", linkedin_url: "", profile_image: null }],
      socialLinks: [],
      slides: []
    },
    mode: "onBlur",
  });

  const handleNext = async () => {
    const stepFieldsMap = {
      1: ["metadata.group_num", "metadata.sdgp_year", "metadata.title", "metadata.subtitle"],
      2: ["projectDetails.problem_statement", "projectDetails.solution", "projectDetails.features", "slides"],
      3: ["techStack", "projectTypes", "status.status", "sdgGoals", "domains"],
      4: ["socialLinks", "projectDetails.team_email", "projectDetails.team_phone"],
      5: ["team"],
    };
    const fieldsToValidate = stepFieldsMap[currentStep as keyof typeof stepFieldsMap];
    const results = await Promise.all(
      fieldsToValidate.map(field => methods.trigger(field as any))
    );
    const isValid = results.every(result => result === true);
    if (!isValid) {
      toast.error("Check your inputs", {
        description: "Please ensure all required fields are filled out correctly.",
      });
      return;
    }
    // Upload images if on step 1
    if (currentStep === 1) {
      setUploading(true);
      try {
        if (logoFile) {
          const url = await uploadImage(logoFile);
          methods.setValue("metadata.logo", url, { shouldValidate: true });
        }
        if (coverFile) {
          const url = await uploadImage(coverFile);
          methods.setValue("metadata.cover_image", url, { shouldValidate: true });
        }
      } catch (err) {
        toast.error("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }
      setUploading(false);
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

  const onSubmit: SubmitHandler<ProjectSubmissionSchema> = async (data) => {
    try {
      // Submit the project using our hook
      const result = await submitProject(data);
      console.log("Submission result:", result);
      
      if (result.success && result.data?.projectId) {
        // Show success message
        toast.success("Project Submitted!", {
          description: "Your project has been successfully submitted.",
        });
        
        // Store the project ID for use in the success page
        setSubmittedProjectId(result.data.projectId);
        setIsSubmitted(true);
        
        // redirect to the project page after a delay
        setTimeout(() => {
          router.push(`/project/${result?.data?.projectId}`);
        }, 3000);
      } else {
        // Show error message
        toast.error("Submission Failed", {
          description: result.message || "There was an error submitting your project. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error("Submission Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  if (isSubmitted) {
    return <SuccessPage projectId={submittedProjectId} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            logoPreviewUrl={logoPreviewUrl}
            setLogoPreviewUrl={setLogoPreviewUrl}
            coverFile={coverFile}
            setCoverFile={setCoverFile}
            coverPreviewUrl={coverPreviewUrl}
            setCoverPreviewUrl={setCoverPreviewUrl}
          />
        );
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
              disabled={currentStep === 1 || isSubmitting}
            >
              Previous
            </Button>
            
            {currentStep < TOTAL_STEPS ? (
              <Button 
                type="button" 
                onClick={handleNext}
                disabled={isSubmitting || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Project"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ProjectSubmissionForm;
