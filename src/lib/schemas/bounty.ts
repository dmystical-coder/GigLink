import { z } from 'zod';

// Define the tokens we accept (matches your TokenSelector component)
const SUPPORTED_TOKENS = ['ETH', 'USDC', 'DEGEN'] as const;

export const createBountySchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long.' })
    .max(100, { message: 'Title cannot exceed 100 characters.' }),
  
  description: z
    .string()
    .min(50, { message: 'Please provide more details (min 50 chars).' })
    .max(5000, { message: 'Description is too long.' }),
    
  // Categories/Tags
  tags: z
    .array(z.string())
    .min(1, { message: 'Select at least one category.' })
    .max(5, { message: 'You can select up to 5 tags.' }),

  // Reward Validation
  rewardAmount: z.coerce
    .number()
    .positive({ message: 'Reward must be greater than 0.' })
    .or(z.literal('')), // Handles empty input state gracefully before submit

  rewardToken: z.enum(['ETH', 'USDC', 'DEGEN']),

  // Date Validation
  deadline: z
    .date()
    .refine((date) => date > new Date(), {
      message: 'Deadline must be in the future.',
    }),
});

// 💡 Pro Tip: Export the Type to use in your Form Component
export type CreateBountyFormValues = z.infer<typeof createBountySchema>;
