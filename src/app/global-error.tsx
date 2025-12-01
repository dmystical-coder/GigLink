'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Something went wrong!
              </h1>
              <p className="text-slate-600">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => reset()} variant="default">
                Try again
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline">
                Reload page
              </Button>
            </div>
            {error.digest && (
              <p className="text-xs text-slate-400">Error ID: {error.digest}</p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
