import { Token } from '@/types/bounty';

/**
 * Formats a crypto amount with its token symbol.
 * @param amount - The amount to format
 * @param token - The token symbol (e.g., ETH, USDC)
 * @returns Formatted string (e.g., "1,000 ETH")
 */
export const formatCurrency = (amount: number, token: Token): string => {
  return `${amount.toLocaleString()} ${token}`;
};

/**
 * Formats a number as USD currency.
 * @param amount - The amount in USD
 * @returns Formatted string (e.g., "$1,000.00")
 */
export const formatUsd = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
