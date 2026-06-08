import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  displayValue?: string | number;
  min: number;
  max: number;
  step: number;
  defaultPercentage: number; // e.g. 33.33 for positioning the default marker
  defaultTitle: string; // e.g. "Default: 20px"
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  defaultPercentage,
  defaultTitle,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
          {label}
        </span>
        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 font-mono">
          {displayValue ?? value}
        </span>
      </div>
      <div className="relative w-full flex items-center h-6">
        {/* Custom Track Background */}
        <div className="absolute left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 rounded-full pointer-events-none" />
        
        {/* Default Value Marker (behind thumb) */}
        <div
          style={{ left: `${defaultPercentage}%` }}
          className="absolute w-1.5 h-1.5 bg-stone-400 dark:bg-stone-600 rounded-full pointer-events-none transform -translate-x-1/2"
          title={defaultTitle}
        />

        {/* Range Input (z-10, transparent track) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-6 bg-transparent appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600 z-10 outline-none"
        />
      </div>
    </div>
  );
};

export default Slider;
