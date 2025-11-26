import { formatDistanceToNow } from 'date-fns';

/**
 * Calculates the time remaining until a deadline.
 * @param deadline - The deadline date
 * @returns Relative time string (e.g., "in 3 days") or "Expired"
 */
export const getTimeRemaining = (deadline: Date): string => {
  const now = new Date();
  if (now > deadline) {
    return 'Expired';
  }
  return formatDistanceToNow(deadline, { addSuffix: true });
};

/**
 * Formats a date in a standard US format.
 * @param date - The date to format
 * @returns Formatted string (e.g., "Nov 26, 2025")
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
