import React from 'react';

interface SwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex justify-between items-center py-1 border-t border-stone-250/20 dark:border-stone-800/30 mt-2">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
          {label}
        </span>
        {description && (
          <span className="text-[10px] text-stone-400 dark:text-stone-500">
            {description}
          </span>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
          checked ? 'bg-amber-500' : 'bg-stone-250 dark:bg-stone-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
