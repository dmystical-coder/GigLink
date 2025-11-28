import { BountyStatus, UserProfile } from '@/types/bounty';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BountyHeroProps {
  title: string;
  issuer: UserProfile;
  status: BountyStatus;
  createdAt: Date;
  deadline: Date;
}

export function BountyHero({ title, issuer, status, createdAt, deadline }: BountyHeroProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge 
          variant={status === BountyStatus.OPEN ? 'default' : 'secondary'}
          className={status === BountyStatus.OPEN ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20' : ''}
        >
          {status}
        </Badge>
        <span className="text-sm text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Posted {formatDistanceToNow(createdAt, { addSuffix: true })}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={issuer.avatarUrl} 
            alt={issuer.name} 
            className="w-6 h-6 rounded-full ring-2 ring-white shadow-sm"
          />
          <span className="font-medium text-slate-900">{issuer.name}</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Due {deadline.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
