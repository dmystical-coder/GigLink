'use client';

import { useAppKit, useAppKitNetwork } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { base } from 'wagmi/chains';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ApplyButtonProps {
  onClick: () => void;
}

export function ApplyButton({ onClick }: ApplyButtonProps) {
  const { open } = useAppKit();
  const { isConnected, chainId } = useAccount();
  const { switchNetwork } = useAppKitNetwork();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button disabled className="w-full bg-slate-100 text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  // State 1: Not Connected -> Open Reown Modal
  if (!isConnected) {
    return (
      <Button onClick={() => open()} className="w-full bg-slate-900 text-white hover:bg-slate-800">
        Connect to Apply
      </Button>
    );
  }

  // State 2: Wrong Network -> Switch to Base
  if (chainId !== base.id) {
    return (
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={() => switchNetwork(base)}
      >
        Switch to Base
      </Button>
    );
  }

  // State 3: Ready -> Trigger Logic
  return (
    <Button onClick={onClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20">
      Apply Now
    </Button>
  );
}
