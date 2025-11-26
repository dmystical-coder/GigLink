interface BountyToggleProps {
  view: string;
  onViewChange: (view: string) => void;
  options: { label: string; value: string }[];
}

export function BountyToggle({ view, onViewChange, options }: BountyToggleProps) {
  return (
    <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onViewChange(option.value)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            view === option.value 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-pressed={view === option.value}
          aria-label={`View ${option.label}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
