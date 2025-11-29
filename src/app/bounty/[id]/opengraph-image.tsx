import { ImageResponse } from 'next/og';
 
// Image metadata
export const alt = 'Bounty Details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default async function Image({ params }: { params: { id: string } }) {
  // In a real app, fetch data. For now, we mock based on ID or generic text.
  const { id } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0052FF, #0033AA)', // Base Blue
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 20, opacity: 0.8 }}>GigLink Bounty #{id}</div>
        <div style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.1 }}>
          Build the Future on Base
        </div>
        <div 
          style={{ 
            marginTop: 40, 
            background: 'white', 
            color: '#0052FF', 
            padding: '20px 40px', 
            borderRadius: '20px',
            fontSize: 40,
            fontWeight: 'bold'
          }}
        >
          Reward: 1.5 ETH
        </div>
      </div>
    ),
    { ...size }
  );
}
