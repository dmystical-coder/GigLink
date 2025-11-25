/**
 * Truncates an Ethereum address for display purposes
 * @param address - The full Ethereum address
 * @param chars - Number of characters to show on each end (default: 4)
 * @returns Truncated address in format "0x1234...5678"
 */
export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2 + 2) return address;
  
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
