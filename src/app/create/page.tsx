import { WizardProvider } from '@/components/create-bounty/WizardProvider';
import { CreateBountyForm } from '@/components/create-bounty/CreateBountyForm';
import { PageHeader } from '@/components/PageHeader';

export default function CreateBountyPage() {
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
      />
      <WizardProvider>
        <CreateBountyForm />
      </WizardProvider>
    </div>
  );
}
