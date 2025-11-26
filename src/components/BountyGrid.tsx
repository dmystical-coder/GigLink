import React from 'react';

interface BountyGridProps {
  children: React.ReactNode;
}

export const BountyGrid: React.FC<BountyGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
};
