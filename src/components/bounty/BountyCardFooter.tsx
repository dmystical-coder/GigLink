import { getTimeRemaining } from '@/utils/date';
import { Clock, Users } from 'lucide-react';

interface BountyCardFooterProps {
  deadline: Date;
  applicantCount: number;
}

/**
 * Displays the time remaining and applicant count for a bounty.
 */
export function BountyCardFooter({ deadline, applicantCount }: BountyCardFooterProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="w-3.5 h-3.5" />
        <span>{getTimeRemaining(deadline)}</span>
      </div>
      
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Users className="w-3.5 h-3.5" />
        <span>{applicantCount} applicants</span>
      </div>
    </div>
  );
}
