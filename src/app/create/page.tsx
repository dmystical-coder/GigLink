'use client';

import { useState } from 'react';
import { WizardProvider, useWizard } from '@/components/create-bounty/WizardProvider';
import { CreateBountyForm } from '@/components/create-bounty/CreateBountyForm';
import { PageHeader } from '@/components/PageHeader';
import { BountyCardPreview } from '@/components/create-bounty/BountyCardPreview';
import { PreviewToggle } from '@/components/create-bounty/PreviewToggle';

function CreateBountyContent() {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const { formData } = useWizard();

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Create Bounty"
        description="Create a new bounty to get help with your tasks."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Create Bounty' },
        ]}
        action={<PreviewToggle mode={mode} onToggle={setMode} />}
      />
      
      {mode === 'edit' ? (
        <CreateBountyForm />
      ) : (
        <div className="max-w-xl mx-auto mt-8">
          <BountyCardPreview data={formData} />
        </div>
      )}
    </div>
  );
}

export default function CreateBountyPage() {
  return (
    <WizardProvider>
      <CreateBountyContent />
    </WizardProvider>
  );
}
