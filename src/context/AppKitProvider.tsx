'use client';

import { wagmiAdapter, networks } from '@/config/wagmi';
import { PROJECT_ID, metadata } from '@/config/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider, type Config } from 'wagmi';
import React, { type ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';

const queryClient = new QueryClient();

if (!PROJECT_ID) {
  throw new Error('Project ID is not defined');
}

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId: PROJECT_ID,
  metadata,
  features: {
    analytics: true
  }
});

export function AppKitProvider({
  children,
  cookies
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
