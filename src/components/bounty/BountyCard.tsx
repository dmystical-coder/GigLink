import { ReactNode } from 'react';

interface BountyCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export function BountyCard({ children, onClick }: BountyCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col justify-between 
                 w-full bg-white border border-slate-200 
                 rounded-xl p-5 cursor-pointer 
                 transition-all duration-300 ease-in-out
                 hover:shadow-lg hover:border-blue-500/30 hover:-translate-y-1"
    >
      {children}
    </div>
  );
}
