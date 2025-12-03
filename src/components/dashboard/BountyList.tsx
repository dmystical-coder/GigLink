'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bounty, BountyStatus } from '@/types/bounty';
import { StatusBadge } from './StatusBadge';

interface BountyListProps {
  bounties: Bounty[];
  onMarkComplete?: (id: string) => void;
  onCancelBounty?: (id: string) => void;
}

export function BountyList({ bounties, onMarkComplete, onCancelBounty }: BountyListProps) {
  if (bounties.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">No bounties yet</h3>
        <p className="text-slate-500 mt-1 mb-6">Create your first bounty to get started.</p>
        <Link href="/create">
          <Button>Create Bounty</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bounties.map((bounty) => (
        <div
          key={bounty.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors group gap-4"
        >
          <div className="flex items-start gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {bounty.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 mt-1">
                <span>Created {formatDistanceToNow(bounty.createdAt)} ago</span>
                <span className="hidden sm:inline">•</span>
                <span>{bounty.applicantCount} applicants</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-0 sm:pl-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
            <div className="flex items-center gap-3 sm:block sm:text-right">
              <div className="font-bold text-slate-900">
                {bounty.reward.amount} {bounty.reward.token}
              </div>
              <div className="sm:mt-1 flex sm:justify-end">
                <StatusBadge status={bounty.status} />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2" aria-label="More options">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Bounty</DropdownMenuItem>
                {bounty.status !== BountyStatus.PAID && bounty.status !== BountyStatus.CANCELLED && onMarkComplete && (
                  <DropdownMenuItem 
                    className="text-green-600 font-medium"
                    onClick={() => onMarkComplete(bounty.id)}
                  >
                    Mark as Complete
                  </DropdownMenuItem>
                )}
                {bounty.status !== BountyStatus.CANCELLED && bounty.status !== BountyStatus.PAID && onCancelBounty && (
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onCancelBounty(bounty.id)}
                  >
                    Cancel Bounty
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
