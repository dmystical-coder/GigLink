import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Banknote,
  CircleDashed
} from 'lucide-react';

// You can move this type to your global types file later if needed
export type ApplicationStatus = 'PENDING' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'PAID';
export type BountyStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

interface StatusBadgeProps {
  status: ApplicationStatus | BountyStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    // Application Statuses
    PENDING: {
      color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      icon: Clock,
      label: 'Pending Review'
    },
    IN_REVIEW: {
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Loader2,
      label: 'In Progress'
    },
    ACCEPTED: {
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      icon: CheckCircle2,
      label: 'Approved'
    },
    REJECTED: {
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: XCircle,
      label: 'Declined'
    },
    PAID: {
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: Banknote,
      label: 'Payment Sent'
    },
    
    // Bounty Statuses
    OPEN: {
      color: 'text-green-700 bg-green-50 border-green-200',
      icon: CircleDashed,
      label: 'Open'
    },
    IN_PROGRESS: { // Reusing IN_REVIEW style but different label if needed, or keeping same
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Clock,
      label: 'In Progress'
    },
    COMPLETED: {
      color: 'text-slate-700 bg-slate-50 border-slate-200',
      icon: CheckCircle2,
      label: 'Completed'
    },
    CANCELLED: {
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: XCircle,
      label: 'Cancelled'
    }
  };

  const config = styles[status] || styles.PENDING;
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-full text-xs font-medium border 
      ${config.color}
    `}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
