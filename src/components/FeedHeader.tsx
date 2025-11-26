import React from 'react';
import { SearchInput } from './SearchInput';
import { FilterDropdown } from './FilterDropdown';
import { ToggleGroup } from './ToggleGroup';
import { SORT_OPTIONS, VIEW_OPTIONS } from '@/constants/sort';

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
            options={SORT_OPTIONS}
          />
        </div>
      </div>
      
      <ToggleGroup
        value={viewMode}
        onChange={onViewModeChange}
        options={VIEW_OPTIONS}
      />
    </div>
  );
};
