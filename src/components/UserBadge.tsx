'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { useBasename } from '@/hooks/useBasename';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function UserBadge() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  
  // Use our custom hook from Commit #27/28
  const { data: basename, isLoading: isBasenameLoading } = useBasename(address);

  if (!isConnected || !address) return null;

  // Helper to truncate 0x1234...5678
  const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  
  // Decide what name to show: Basename -> Address
  const displayName = basename || formattedAddress;
  
  // Generate initials for the avatar fallback (e.g., "blue.base.eth" -> "BL")
  const initials = basename 
    ? basename.slice(0, 2).toUpperCase() 
    : address.slice(0, 2).toUpperCase();

  return (
    <Button 
      variant="outline" 
      className="pl-2 pr-4 py-6 rounded-full border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-50/50 transition-all gap-3"
      onClick={() => open()}
    >
      <div className="relative">
        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
          {/* We can use a blochie or specialized avatar service here later */}
          <AvatarImage src={`https://avatars.jakerunzer.com/${address}`} />
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        {/* Online Indicator Dot */}
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
      </div>

      <div className="flex flex-col items-start text-sm">
        <span className="font-semibold text-slate-800 leading-none">
          {isBasenameLoading ? (
            <Skeleton className="h-3 w-16 mb-1" />
          ) : (
            displayName
          )}
        </span>
        <span className="text-[10px] text-slate-500 font-medium">
          {basename ? 'Verified Basename' : 'Connected'}
        </span>
      </div>
    </Button>
  );
}