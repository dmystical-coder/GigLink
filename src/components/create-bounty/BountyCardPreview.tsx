'use client';

import { useAccount } from 'wagmi';
import { BountyCard } from '@/components/bounty/BountyCard';
import { BountyCardHeader } from '@/components/bounty/BountyCardHeader';
import { BountyCardBadges } from '@/components/bounty/BountyCardBadges';
import { BountyReward } from '@/components/bounty/BountyReward';
import { BountyCardFooter } from '@/components/bounty/BountyCardFooter';
import { BountyStatus } from '@/types/bounty';
import { BountyFormData } from './WizardProvider';

interface BountyCardPreviewProps {
  data: Partial<BountyFormData>;
}

export function BountyCardPreview({ data }: BountyCardPreviewProps) {
  const { address } = useAccount();

  // 1. Handle missing data gracefully with fallbacks
  const displayTitle = data.title || 'Untitled Bounty';
  const displayToken = data.rewardToken || 'ETH';
  const displayAmount = Number(data.rewardAmount) || 0;
  const displayTags = data.tags?.length ? data.tags : ['Category'];
  
  // 2. Mock calculation for USD (In real app, fetch price feed)
  const mockUsdValue = displayAmount * (displayToken === 'ETH' ? 2500 : 1); 

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Live Preview
        </span>
      </div>

      <div className="pointer-events-none select-none opacity-100"> 
        {/* pointer-events-none ensures they don't try to click buttons in preview */}
        <BountyCard>
          <BountyCardHeader 
            title={displayTitle} 
            issuerAddress={address || '0x0000...0000'} 
          />
          
          <BountyCardBadges 
            status={BountyStatus.OPEN} 
            tags={displayTags} 
          />
          
          <BountyReward 
            amount={displayAmount} 
            token={displayToken} 
            usdValue={mockUsdValue} 
          />
          
          <BountyCardFooter 
            deadline={data.deadline || new Date(Date.now() + 86400000 * 7)} // Default +7 days
            applicantCount={0} 
          />
        </BountyCard>
      </div>
      
      <p className="mt-4 text-center text-xs text-slate-500">
        * This is how your bounty will appear on the global feed.
      </p>
    </div>
  );
}
