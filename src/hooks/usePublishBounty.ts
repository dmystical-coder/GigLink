'use client';

import { useState } from 'react';
import { CreateBountyFormValues } from '@/lib/schemas/bounty';
import { useConfetti } from '@/hooks/useConfetti';

export function usePublishBounty() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const { triggerConfetti } = useConfetti();

  const publishBounty = async (_data: CreateBountyFormValues) => {
    void _data;
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
      triggerConfetti();
      

      
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
