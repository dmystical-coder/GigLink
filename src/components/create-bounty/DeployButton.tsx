'use client';

import { Loader2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeployButtonProps {
  isLoading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function DeployButton({ isLoading, onClick, disabled }: DeployButtonProps) {
  return (
    <Button 
      size="lg"
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Confirming on Base...
        </>
      ) : (
        <>
          <Rocket className="mr-2 h-4 w-4" />
          Deploy Bounty
        </>
      )}
    </Button>
  );
}
