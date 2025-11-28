import { LucideIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        {title}
      </h3>
      
      <p className="max-w-sm text-sm text-slate-500 mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="gap-2 bg-white hover:bg-slate-100">
          <PlusCircle className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
