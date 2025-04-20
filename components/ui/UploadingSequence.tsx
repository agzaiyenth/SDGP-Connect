import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const uploadingTexts = [
  "Uploading your files...",
  "Hold on, we're processing your submission...",
  "Almost there...",
  "Finalizing your upload..."
];

export function UploadingSequence({ className }: { className?: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % uploadingTexts.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center gap-3  ${className || ""}`}>
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{uploadingTexts[step]}</span>
    </div>
  );
}
