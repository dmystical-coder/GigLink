// src/config/index.ts

// Get the Project ID from Reown Cloud (https://cloud.reown.com)
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!PROJECT_ID) {
  throw new Error('Project ID is not defined');
}

export const metadata = {
  name: 'GigLink',
  description: 'Decentralized Micro-Bounties for the Atomic Economy',
  url: 'https://giglink.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};
