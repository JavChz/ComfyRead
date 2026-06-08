import React from 'react';

interface OptionCardProps {
  label: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ label, icon, text, onClick }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
        {label}
      </span>
      <button
        onClick={onClick}
        className="w-full py-2 px-3 text-sm font-medium border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-400/50 rounded-xl bg-white dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex items-center justify-center gap-2"
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default OptionCard;
