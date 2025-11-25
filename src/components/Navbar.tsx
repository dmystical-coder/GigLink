'use client';

import React from 'react';

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">GigLink</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Wallet button will go here */}
        </div>
      </div>
    </nav>
  );
}
