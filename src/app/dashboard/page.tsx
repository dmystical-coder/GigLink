import { PageHeader } from '@/components/PageHeader';
import { BountyList, Bounty } from '@/components/dashboard/BountyList';
import { SubmissionList, Submission } from '@/components/dashboard/SubmissionList';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock Data
const MOCK_BOUNTIES: Bounty[] = [
  {
    id: '1',
    title: 'Build a Responsive Landing Page',
    status: 'OPEN',
    rewardAmount: 0.5,
    rewardToken: 'ETH',
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    applicantCount: 3,
  },
  {
    id: '2',
    title: 'Integrate Web3 Wallet Connection',
    status: 'IN_PROGRESS',
    rewardAmount: 1000,
    rewardToken: 'USDC',
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    applicantCount: 8,
  },
  {
    id: '3',
    title: 'Fix Smart Contract Bug',
    status: 'COMPLETED',
    rewardAmount: 5000,
    rewardToken: 'DEGEN',
    createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    applicantCount: 1,
  },
];

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
        
        <Tabs defaultValue="bounties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bounties">My Bounties</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bounties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Recent Bounties</h2>
              <Button variant="link" className="text-blue-600">View All</Button>
            </div>
            <BountyList bounties={MOCK_BOUNTIES} />
          </TabsContent>
          
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Recent Submissions</h2>
              <Button variant="link" className="text-blue-600">View All</Button>
            </div>
            <SubmissionList submissions={MOCK_SUBMISSIONS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
