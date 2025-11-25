import { useReadContract } from 'wagmi';
import { namehash } from 'viem/ens';
import { L2ResolverAbi } from '@/abis/L2Resolver';

// The Base L2 Resolver Address
const L2_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD';

export function useBasename(address: `0x${string}` | undefined) {
  return useReadContract({
    address: L2_RESOLVER_ADDRESS,
    abi: L2ResolverAbi,
    functionName: 'name',
    args: address ? [namehash(`${address.slice(2)}.addr.reverse`)] : undefined,
    query: {
      enabled: !!address,
    }
  });
}
