import { PageHeader } from '@/components/PageHeader';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="My Dashboard"
        description="Manage your bounties and track your submissions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
      />
      
      <div className="mt-8 grid gap-6">
        <div className="p-8 text-center border rounded-xl bg-slate-50 text-slate-500">
          Dashboard content coming soon...
        </div>
      </div>
    </div>
  );
}
