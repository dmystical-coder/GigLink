import React from 'react';
import { SearchInput } from './SearchInput';
import { FilterDropdown } from './FilterDropdown';
import { ToggleGroup } from './ToggleGroup';

interface FeedHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (value: string) => void;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <div className="w-48">
          <FilterDropdown
            label="Sort by"
            value={sortBy}
            onChange={onSortChange}
            options={[
              { label: 'Newest First', value: 'newest' },
              { label: 'Highest Reward', value: 'reward_desc' },
              { label: 'Lowest Reward', value: 'reward_asc' },
              { label: 'Ending Soon', value: 'deadline_asc' },
            ]}
          />
        </div>
      </div>
      
      <ToggleGroup
        value={viewMode}
        onChange={onViewModeChange}
        options={[
          { label: 'All Bounties', value: 'all' },
          { label: 'My Bounties', value: 'my' },
        ]}
      />
    </div>
  );
};
