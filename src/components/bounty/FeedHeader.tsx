import React from 'react';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterDropdown } from '@/components/ui/FilterDropdown';
import { BountyToggle } from './BountyToggle';
import { SORT_OPTIONS, VIEW_OPTIONS } from '@/constants/sort';

interface FeedHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (value: string) => void;
}

export function FeedHeader({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FeedHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <BountyToggle 
          view={viewMode} 
          onViewChange={onViewModeChange} 
          options={VIEW_OPTIONS}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <SearchInput 
          value={searchQuery} 
          onSearch={onSearchChange} 
        />
        <FilterDropdown 
          currentSort={sortBy} 
          onSortChange={onSortChange} 
          options={SORT_OPTIONS}
          label="Sort"
        />
      </div>
    </div>
  );
}
