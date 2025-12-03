import { BountyStatus } from '@/types/bounty';

interface BountyCardBadgesProps {
  status: BountyStatus;
  tags: string[];
}

/**
 * Displays status and tags for a bounty with color-coded badges.
 */
export function BountyCardBadges({ status, tags }: BountyCardBadgesProps) {
  const statusColors = {
    [BountyStatus.OPEN]: 'bg-green-100 text-green-700 border-green-200',
    [BountyStatus.ASSIGNED]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [BountyStatus.PAID]: 'bg-slate-100 text-slate-600 border-slate-200',
    [BountyStatus.SUBMITTED]: 'bg-purple-100 text-purple-700 border-purple-200',
    [BountyStatus.CANCELLED]: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Status Badge */}
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColors[status]}`}>
        {status.replace('_', ' ')}
      </span>

      {/* Tag Badges (Limit to 2) */}
      {tags.slice(0, 2).map((tag) => (
        <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-medium">
          {tag}
        </span>
      ))}
    </div>
  );
}
