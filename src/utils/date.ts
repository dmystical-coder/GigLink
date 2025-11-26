import { formatDistanceToNow } from 'date-fns';

export const getTimeRemaining = (deadline: Date): string => {
  const now = new Date();
  if (now > deadline) {
    return 'Expired';
  }
  return formatDistanceToNow(deadline, { addSuffix: true });
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
