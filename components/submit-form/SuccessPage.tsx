
'use client';
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white p-8 shadow-sm text-center dark:bg-background">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
        Project Submitted Successfully!
      </h2>
      
      <p className="text-slate-600 mb-6 max-w-md mx-auto dark:text-slate-400">
        Thank you for submitting your project. Our team will review your submission
        and get back to you soon.
      </p>
      
      <div className="space-x-4">
        <Button 
          onClick={() => router.push("/")} 
          variant="default"
        >
          Return Home
        </Button>
        
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
        >
          Submit Another Project
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
