import React from 'react';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
        {label}
      </span>
      <div className="flex p-1 bg-stone-200/50 dark:bg-stone-800/60 rounded-xl border border-stone-200/20 dark:border-stone-800/40">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              value === option.value
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
