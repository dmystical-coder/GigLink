'use client';

import { useState } from 'react';
import { Bounty } from '@/types/bounty';
import { BountyReward } from '@/components/bounty/BountyReward';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { ApplyButton } from '@/components/bounty/ApplyButton';
import { ApplyModal } from '@/components/bounty/ApplyModal';
import { ApplyForm, ApplyFormValues } from '@/components/bounty/ApplyForm';
import { useSubmitApplication } from '@/hooks/useSubmitApplication';

interface BountySidebarProps {
  bounty: Bounty;
}

export function BountySidebar({ bounty }: BountySidebarProps) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { submitApplication, isSubmitting } = useSubmitApplication();

  const handleSubmit = async (values: ApplyFormValues) => {
    const success = await submitApplication(values);
    if (success) {
      setIsApplyOpen(false);
    }
  };
  return (
    <div className="space-y-6">
      <ApplyModal open={isApplyOpen} onOpenChange={setIsApplyOpen} trigger={null}>
        <ApplyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </ApplyModal>

      <div className="hidden lg:block">
        <ApplyButton onClick={() => setIsApplyOpen(true)} />
      </div>

      {/* Reward Card */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-900">Total Reward</h3>
        <BountyReward 
          amount={bounty.reward.amount} 
          token={bounty.reward.token} 
          usdValue={bounty.reward.usdValue} 
        />
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Difficulty</span>
            <span className="font-medium text-slate-900">{bounty.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {bounty.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
          Resources
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <ExternalLink className="w-3 h-3" />
              Contribution Guidelines
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <ShieldCheck className="w-3 h-3" />
              Security Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
