'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_BOUNTIES } from '@/data/mock-bounties';
import { BountyCard } from '@/components/bounty/BountyCard';
import { BountyCardBadges } from '@/components/bounty/BountyCardBadges';
import { BountyCardFooter } from '@/components/bounty/BountyCardFooter';
import { BountyCardHeader } from '@/components/bounty/BountyCardHeader';
import { BountyReward } from '@/components/bounty/BountyReward';
import { BountyGrid } from '@/components/BountyGrid';
import { FeedHeader } from '@/components/bounty/FeedHeader';

import { useRouter } from 'next/navigation';

export default function BrowsePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('all');

  const filteredBounties = useMemo(() => {
    let result = [...MOCK_BOUNTIES];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (bounty) =>
          bounty.title.toLowerCase().includes(query) ||
          bounty.description.toLowerCase().includes(query) ||
          bounty.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by view mode (mock implementation for "My Bounties")
    if (viewMode === 'my') {
      // In a real app, this would filter by the connected user's address
      // For now, we'll just show bounties where the issuer is "Alice Dev" as a demo
      result = result.filter((bounty) => bounty.issuer.name === 'Alice Dev');
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'reward_desc':
          return b.reward.usdValue - a.reward.usdValue;
        case 'reward_asc':
          return a.reward.usdValue - b.reward.usdValue;
        case 'deadline_asc':
          return a.deadline.getTime() - b.deadline.getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, sortBy, viewMode]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Bounties</h1>
          <p className="mt-2 text-gray-600">Find work, get paid, and build your reputation.</p>
        </div>

        <FeedHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {filteredBounties.length > 0 ? (
          <BountyGrid>
            {filteredBounties.map((bounty) => (
              <BountyCard
                key={bounty.id}
                onClick={() => router.push(`/bounty/${bounty.id}`)}
              >
                <BountyCardHeader title={bounty.title} issuerAddress={bounty.issuer.address} />
                <BountyCardBadges status={bounty.status} tags={bounty.tags} />
                <BountyReward 
                  amount={bounty.reward.amount} 
                  token={bounty.reward.token} 
                  usdValue={bounty.reward.usdValue} 
                />
                <BountyCardFooter deadline={bounty.deadline} applicantCount={bounty.applicantCount} />
              </BountyCard>
            ))}
          </BountyGrid>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bounties found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
