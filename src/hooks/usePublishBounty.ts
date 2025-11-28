'use client';

import { useState } from 'react';
import { CreateBountyFormValues } from '@/lib/schemas/bounty';
import { useRouter } from 'next/navigation';

export function usePublishBounty() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const router = useRouter();

  const publishBounty = async (data: CreateBountyFormValues) => {
    setIsLoading(true);
    setIsSuccess(false);
    setHash(null);

    try {
      // 1. Simulate Network Delay (2 seconds for a "block" to be mined on Base)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Generate a fake transaction hash
      const mockHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setHash(mockHash);
      setIsSuccess(true);
      
      console.log('Bounty Published to "Chain":', data);

      // 3. Optional: Redirect to dashboard after short delay
      // setTimeout(() => router.push('/dashboard'), 1000);
      
    } catch (error) {
      console.error('Failed to publish bounty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    publishBounty,
    isLoading,
    isSuccess,
    hash
  };
}
