'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { BountyList, Bounty } from '@/components/dashboard/BountyList';
import { SubmissionList, Submission } from '@/components/dashboard/SubmissionList';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, FolderOpen, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

// Mock Data
import { getMyBounties } from '@/data/mock-bounties';

// Mock Data
// Replaced by centralized mock data


const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    bountyTitle: 'Design a Logo for DeFi Protocol',
    bountyReward: '200 USDC',
    submittedAt: new Date(Date.now() - 86400000 * 1),
    status: 'PENDING',
  },
  {
    id: '2',
    bountyTitle: 'Write Technical Documentation',
    bountyReward: '0.1 ETH',
    submittedAt: new Date(Date.now() - 86400000 * 3),
    status: 'IN_REVIEW',
  },
  {
    id: '3',
    bountyTitle: 'Audit Smart Contract',
    bountyReward: '2.5 ETH',
    submittedAt: new Date(Date.now() - 86400000 * 15),
    status: 'ACCEPTED',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('applications');
  const [bounties, setBounties] = useState<Bounty[]>(getMyBounties());

  const handleMarkComplete = (id: string) => {
    setBounties(prev => prev.map(bounty => 
      bounty.id === id ? { ...bounty, status: 'COMPLETED' } : bounty
    ));
  };

  const handleCancelBounty = (id: string) => {
    setBounties(prev => prev.map(bounty => 
      bounty.id === id ? { ...bounty, status: 'CANCELLED' } : bounty
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="My Dashboard"
        description="Manage your bounties and track your submissions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' },
        ]}
        action={
          <Link href="/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Bounty
            </Button>
          </Link>
        }
      />
      
      <div className="mt-8">
        <StatsOverview />
        
        <DashboardTabs 
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'applications', label: 'My Applications', count: MOCK_SUBMISSIONS.length },
            { id: 'listings', label: 'My Listings', count: bounties.length },
            { id: 'history', label: 'Payment History' }
          ]}
        />

        <div className="min-h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'applications' && (
             MOCK_SUBMISSIONS.length === 0 ? (
               <EmptyState
                 icon={FolderOpen}
                 title="No active applications"
                 description="You haven't applied to any bounties yet. Browse the feed to find your first gig!"
                 actionLabel="Browse Bounties"
                 onAction={() => router.push('/')}
               />
             ) : (
               <SubmissionList submissions={MOCK_SUBMISSIONS} />
             )
          )}
          
          {activeTab === 'listings' && (
             bounties.length === 0 ? (
               <EmptyState
                 icon={Sparkles}
                 title="Create your first bounty"
                 description="Need help with a task? Publish a bounty to the network and get work done fast."
                 actionLabel="Create Bounty"
                 onAction={() => router.push('/create')}
               />
             ) : (
               <BountyList 
                 bounties={bounties} 
                 onMarkComplete={handleMarkComplete}
                 onCancelBounty={handleCancelBounty}
               />
             )
          )}

          {activeTab === 'history' && (
             <div className="text-center py-12 border rounded-xl bg-slate-50 text-slate-500">
               Payment history coming soon...
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
