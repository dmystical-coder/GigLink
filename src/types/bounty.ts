export type Token = 'ETH' | 'USDC' | 'DEGEN';

/**
 * Represents the current status of a bounty.
 */
export enum BountyStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  SUBMITTED = 'SUBMITTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export type BountyDifficulty = 'Beginner' | 'Intermediate' | 'Expert';

/**
 * Represents a user profile in the system (issuer or applicant).
 */
export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  address: `0x${string}`;
}

/**
 * Main Bounty interface representing a task or job.
 */
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
