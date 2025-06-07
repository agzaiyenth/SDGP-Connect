import { useState } from 'react';

export interface CompetitionSubmissionInput {
  name: string;
  image: string;
  competition_id: string;
  project_id: string;
}

export function useCompetitionSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitCompetition = async (data: CompetitionSubmissionInput) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/competition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const msg = await res.text();
        setError(msg || 'Submission failed');
        setIsSubmitting(false);
        return false;
      }
      setSuccess(true);
      setIsSubmitting(false);
      return true;
    } catch (e: any) {
      setError(e.message || 'Submission failed');
      setIsSubmitting(false);
      return false;
    }
  };

  return {
    isSubmitting,
    error,
    success,
    submitCompetition,
  };
}
