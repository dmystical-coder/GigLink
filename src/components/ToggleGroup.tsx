import React from 'react';

interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg">
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
