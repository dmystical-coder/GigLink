'use client';

interface Tab {
  id: string;
  label: string;
  count?: number; // Optional badge count (e.g., "3" active applications)
}

interface DashboardTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function DashboardTabs({ tabs, activeTab, onChange }: DashboardTabsProps) {
  return (
    <div className="border-b border-slate-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                group flex items-center gap-2 py-4 px-1 text-sm font-medium border-b-2 transition-all duration-200
                ${isActive 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              <span>{tab.label}</span>
              
              {/* Optional Count Badge */}
              {tab.count !== undefined && (
                <span className={`
                  px-2 py-0.5 rounded-full text-[10px] 
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
