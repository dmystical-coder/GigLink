'use client';

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

interface FilterDropdownProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
  options: { label: string; value: string }[];
  label?: string;
}

export function FilterDropdown({ currentSort, onSortChange, options, label = 'Sort' }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-xl border-slate-200 text-slate-600" aria-label={label}>
          <ListFilter className="h-4 w-4" />
          <span className="hidden sm:inline">{label}: {options.find(o => o.value === currentSort)?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        {options.map((opt) => (
          <DropdownMenuItem 
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={currentSort === opt.value ? 'bg-blue-50 text-blue-600 font-medium' : ''}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
