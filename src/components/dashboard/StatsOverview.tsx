'use client';

import { Wallet, Layers, CheckCircle, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ label, value, subValue, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          {subValue && (
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {subValue}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      
      {/* Optional Trend Indicator */}
      {trend === 'up' && (
        <div className="mt-4 flex items-center text-xs text-green-600 font-medium bg-green-50 w-fit px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>+12% this month</span>
        </div>
      )}
    </div>
  );
}

export function StatsOverview() {
  // In Phase 3, we will fetch this data from your Smart Contract/Graph
  // For now, we use static "Success State" data to look good.
  const stats = [
    {
      label: 'Total Earned',
      value: '2.4 ETH',
      subValue: '~$6,200 USD',
      icon: Wallet,
      trend: 'up' as const,
    },
    {
      label: 'Active Applications',
      value: '3',
      subValue: 'Waiting for review',
      icon: Layers,
    },
    {
      label: 'Bounties Completed',
      value: '12',
      subValue: 'All time',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard 
          key={stat.label}
          label={stat.label}
          value={stat.value}
          subValue={stat.subValue}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}
