import React from 'react';
import { MdDarkMode, MdLightMode, MdSunny, MdNightlight, MdAlignHorizontalCenter, MdAlignHorizontalLeft } from 'react-icons/md';
import { useAppStore, ThemeMode, LayoutMode, FontFamily } from '../store/useAppStore';

const SettingsModal: React.FC = () => {
  const {
    themeMode,
    layoutMode,
    fontSize,
    lineHeight,
    readingWidth,
    fontFamily,
    spellCheck,
    toggleThemeMode,
    toggleLayoutMode,
    setFontSize,
    setLineHeight,
    setReadingWidth,
    setFontFamily,
    setSpellCheck,
    resetSettings,
  } = useAppStore();

  return (
    <div className="flex flex-col gap-6 py-2 select-none">
      {/* Theme & Layout Toggles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
            Theme
          </span>
          <button
            onClick={toggleThemeMode}
            className="w-full py-2 px-3 text-sm font-medium border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-400/50 rounded-xl bg-white dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex items-center justify-center gap-2"
          >
            {themeMode === 'light' ? <MdSunny size={16} /> : <MdNightlight size={16} />}
            {themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
            Layout
          </span>
          <button
            onClick={toggleLayoutMode}
            className="w-full py-2 px-3 text-sm font-medium border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-400/50 rounded-xl bg-white dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-850 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex items-center justify-center gap-2"
          >
            {layoutMode === 'comfy' ? <MdAlignHorizontalCenter size={16} /> : <MdAlignHorizontalLeft size={16} />}
            {layoutMode === 'comfy' ? 'Comfy' : 'Compact'}
          </button>
        </div>
      </div>

      {/* Font Family (Segmented Control) */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
          Typography
        </span>
        <div className="flex p-1 bg-stone-200/50 dark:bg-stone-800/60 rounded-xl border border-stone-200/20 dark:border-stone-800/40">
          {(['sans', 'serif', 'mono'] as FontFamily[]).map((font) => (
            <button
              key={font}
              onClick={() => setFontFamily(font)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                fontFamily === font
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {font === 'sans' ? 'sans-serif' : font}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
            Font Size
          </span>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 font-mono">
            {fontSize}px
          </span>
        </div>
        <div className="relative w-full flex items-center h-6">
          {/* Custom Track Background */}
          <div className="absolute left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 rounded-full pointer-events-none" />
          
          {/* Default Value Marker (behind thumb) */}
          <div
            style={{ left: '33.33%' }}
            className="absolute w-1.5 h-1.5 bg-stone-400 dark:bg-stone-600 rounded-full pointer-events-none transform -translate-x-1/2"
            title="Default: 20px"
          />

          {/* Range Input (z-10, transparent track) */}
          <input
            type="range"
            min="14"
            max="32"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-6 bg-transparent appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600 z-10 outline-none"
          />
        </div>
      </div>

      {/* Line Height Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
            Line Height
          </span>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 font-mono">
            {lineHeight.toFixed(1)}
          </span>
        </div>
        <div className="relative w-full flex items-center h-6">
          {/* Custom Track Background */}
          <div className="absolute left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 rounded-full pointer-events-none" />
          
          {/* Default Value Marker (behind thumb) */}
          <div
            style={{ left: '33.33%' }}
            className="absolute w-1.5 h-1.5 bg-stone-400 dark:bg-stone-600 rounded-full pointer-events-none transform -translate-x-1/2"
            title="Default: 1.6"
          />

          {/* Range Input (z-10, transparent track) */}
          <input
            type="range"
            min="1.2"
            max="2.4"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full h-6 bg-transparent appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600 z-10 outline-none"
          />
        </div>
      </div>

      {/* Reading Width Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
            Reading Width
          </span>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 font-mono">
            {readingWidth}ch
          </span>
        </div>
        <div className="relative w-full flex items-center h-6">
          {/* Custom Track Background */}
          <div className="absolute left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 rounded-full pointer-events-none" />
          
          {/* Default Value Marker (behind thumb) */}
          <div
            style={{ left: '41.67%' }}
            className="absolute w-1.5 h-1.5 bg-stone-400 dark:bg-stone-600 rounded-full pointer-events-none transform -translate-x-1/2"
            title="Default: 65ch"
          />

          {/* Range Input (z-10, transparent track) */}
          <input
            type="range"
            min="40"
            max="100"
            step="5"
            value={readingWidth}
            onChange={(e) => setReadingWidth(Number(e.target.value))}
            className="w-full h-6 bg-transparent appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600 z-10 outline-none"
          />
        </div>
      </div>

      {/* Spell Check Switch */}
      <div className="flex justify-between items-center py-1 border-t border-stone-250/20 dark:border-stone-800/30 mt-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Spell Check
          </span>
          <span className="text-[10px] text-stone-400 dark:text-stone-500">
            Enable native browser spelling highlights
          </span>
        </div>
        <button
          onClick={() => setSpellCheck(!spellCheck)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            spellCheck ? 'bg-amber-500' : 'bg-stone-250 dark:bg-stone-800'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              spellCheck ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end pt-2 mt-2 border-t border-stone-250/20 dark:border-stone-800/30">
        <button
          onClick={resetSettings}
          className="text-xs font-semibold text-stone-400 hover:text-red-500 dark:text-stone-500 dark:hover:text-red-400 transition-colors cursor-pointer outline-none focus-visible:underline"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
