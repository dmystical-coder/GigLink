import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Bounty, BountyStatus } from "@/types/bounty"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getBountyById(id: string): Promise<Bounty | null> {
  // Mock data simulation
  // In a real app, this would fetch from an API or database
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  if (id === '1') {
    return {
      id: '1',
      title: 'Build a Decentralized Voting System',
      description: `
# Project Overview
We need a secure, transparent, and efficient voting system built on Ethereum. This system will be used for DAO governance proposals.

## Key Features
- **Proposal Creation**: Users with a minimum token balance can create proposals.
- **Voting Mechanism**: Token-weighted voting.
- **Timelock**: Execution of passed proposals after a delay.

## Technical Requirements
- Smart Contracts: Solidity 0.8.x
- Frontend: Next.js + Wagmi
- Testing: Foundry

## Deliverables
1. Smart Contract Repository
2. Frontend Repository
3. Documentation
      `,
      issuer: {
        id: 'u1',
        name: 'DAO Master',
        address: '0x1234567890123456789012345678901234567890',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DAO'
      },
      reward: {
        amount: 5000,
        token: 'USDC',
        usdValue: 5000
      },
      deadline: new Date('2023-12-31'),
      status: BountyStatus.OPEN,
      difficulty: 'Intermediate',
      tags: ['Solidity', 'React', 'DeFi'],
      applicantCount: 12,
      createdAt: new Date('2023-11-01')
    };
  }
  
  return null;
}
