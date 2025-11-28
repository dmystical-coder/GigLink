'use client';

import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { StatusBadge, ApplicationStatus } from './StatusBadge';

export interface Submission {
  id: string;
  bountyTitle: string;
  bountyReward: string;
  submittedAt: Date;
  status: ApplicationStatus;
}

interface SubmissionListProps {
  submissions: Submission[];
}

export function SubmissionList({ submissions }: SubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-slate-50">
        <h3 className="text-lg font-medium text-slate-900">No submissions yet</h3>
        <p className="text-slate-500 mt-1 mb-6">Find a bounty and start working!</p>
        <Button variant="outline">Browse Bounties</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors gap-4"
        >
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">
              {submission.bountyTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 mt-1">
              <span>Submitted {formatDistanceToNow(submission.submittedAt)} ago</span>
              <span className="hidden sm:inline">•</span>
              <span>Reward: {submission.bountyReward}</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <span className="text-sm font-medium text-slate-500 sm:hidden">Status:</span>
            <StatusBadge status={submission.status} />
          </div>
        </div>
      ))}
    </div>
  );
}
