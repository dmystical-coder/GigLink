/**
 * L2 Resolver ABI for Base Network
 * Used to resolve Basenames (reverse ENS lookups)
 * Contract: 0xC6d566A56A1aFf6508b41f6c90ff131615583BCD
 */
export const L2ResolverAbi = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: 'name', type: 'string' }],
  },
] as const;
