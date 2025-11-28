'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600 transition-colors"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Feed
    </Button>
  );
}
