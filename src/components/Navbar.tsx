'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { UserBadge } from './UserBadge';
import { useBasename } from '@/hooks/useBasename';

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { data: basename } = useBasename(address);

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold">GigLink</span>
        </div>
        <div className="flex items-center space-x-4">
          {isConnected && address && (
            <UserBadge address={address} basename={basename} />
          )}
          <appkit-button />
        </div>
      </div>
    </nav>
  );
}
