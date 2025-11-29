import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GigLink',
    short_name: 'GigLink',
    description: 'Decentralized Bounty Platform on Base',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0052FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
