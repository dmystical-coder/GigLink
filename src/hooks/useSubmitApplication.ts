import { useState } from 'react';
import { toast } from 'sonner';
import { ApplyFormValues } from '@/components/bounty/ApplyForm';

export function useSubmitApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitApplication = async (values: ApplyFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Submitted:', values);
      toast.success('Application submitted successfully!');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit application. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitApplication, isSubmitting };
}
