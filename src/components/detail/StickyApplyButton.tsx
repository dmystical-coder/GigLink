'use client';

import { useState } from 'react';
import { ApplyButton } from '@/components/bounty/ApplyButton';
import { ApplyModal } from '@/components/bounty/ApplyModal';
import { ApplyForm, ApplyFormValues } from '@/components/bounty/ApplyForm';
import { useSubmitApplication } from '@/hooks/useSubmitApplication';

export function StickyApplyButton() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { submitApplication, isSubmitting } = useSubmitApplication();

  const handleSubmit = async (values: ApplyFormValues) => {
    const success = await submitApplication(values);
    if (success) {
      setIsApplyOpen(false);
    }
  };

  return (
    <>
      <ApplyModal open={isApplyOpen} onOpenChange={setIsApplyOpen} trigger={null}>
        <ApplyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </ApplyModal>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 lg:hidden z-40">
        <ApplyButton onClick={() => setIsApplyOpen(true)} />
      </div>
    </>
  );
}
