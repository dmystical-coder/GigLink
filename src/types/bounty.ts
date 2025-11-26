export type Token = 'ETH' | 'USDC' | 'DEGEN';

export enum BountyStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  SUBMITTED = 'SUBMITTED',
  PAID = 'PAID',
}

export type BountyDifficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  address: `0x${string}`;
}

export interface Bounty {
  id: string;
  title: string;
  description: string; // Markdown supported
  issuer: UserProfile;
  reward: {
    amount: number;
    token: Token;
    usdValue: number; // For display approximation
  };
  deadline: Date;
  status: BountyStatus;
  difficulty: BountyDifficulty;
  tags: string[];
  applicantCount: number;
  createdAt: Date;
}
