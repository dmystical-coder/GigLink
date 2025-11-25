import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { base } from '@reown/appkit/networks';
import { PROJECT_ID } from './index';

export const networks = [base];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId: PROJECT_ID,
  networks
});

export const config = wagmiAdapter.wagmiConfig;
