import { Token } from '@/types/bounty';

export const formatCurrency = (amount: number, token: Token): string => {
  return `${amount.toLocaleString()} ${token}`;
};

export const formatUsd = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
