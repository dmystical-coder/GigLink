'use client';

import { Navbar } from '@/components/Navbar';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Navbar />
      <PageContainer>
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Welcome to GigLink</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect your wallet to get started with decentralized micro-bounties.
                </p>
                <p className="text-sm text-muted-foreground">
                  Click the &quot;Connect Wallet&quot; button in the top right to begin.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-muted-foreground">You&apos;re connected! More features coming soon.</p>
          </div>
        )}
      </PageContainer>
    </>
  );
}
