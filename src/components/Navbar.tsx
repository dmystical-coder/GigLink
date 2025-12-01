'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { UserBadge } from './UserBadge';

export function Navbar() {
  const { address, isConnected } = useAccount();

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg sm:text-xl font-bold">
            GigLink
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <Link href="/create" className="hover:text-slate-900 transition-colors">
              Create Bounty
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isConnected && address && (
            <UserBadge />
          )}
          <appkit-button />
        </div>
      </div>
    </nav>
  );
}
