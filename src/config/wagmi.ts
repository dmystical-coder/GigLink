import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from '@reown/appkit/networks';
import { PROJECT_ID } from './index';
import type { AppKitNetwork } from '@reown/appkit/networks';

export const networks = [base] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any,
  ssr: true,
  projectId: PROJECT_ID,
  networks
});

export const config = wagmiAdapter.wagmiConfig;
