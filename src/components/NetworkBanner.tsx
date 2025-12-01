'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Base Sepolia Chain ID: 84532
// Base Mainnet Chain ID: 8453
const TARGET_CHAIN_ID = 84532; 
const TARGET_CHAIN_NAME = 'Base Sepolia';

export function NetworkBanner() {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  if (!isConnected || chainId === TARGET_CHAIN_ID) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            You are connected to the wrong network. Please switch to {TARGET_CHAIN_NAME}.
          </p>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-amber-300 text-amber-900 hover:bg-amber-100 hover:text-amber-900 whitespace-nowrap"
          onClick={() => switchChain({ chainId: TARGET_CHAIN_ID })}
        >
          Switch Network
        </Button>
      </div>
    </div>
  );
}
