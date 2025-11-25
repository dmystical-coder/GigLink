'use client';

import React from 'react';

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold">GigLink</span>
        </div>
        <div className="flex items-center space-x-4">
          <appkit-button />
        </div>
      </div>
    </nav>
  );
}
