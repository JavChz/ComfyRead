import React from 'react';
import { MdSunny, MdNightlight, MdAlignHorizontalCenter, MdAlignHorizontalLeft } from 'react-icons/md';
import { useAppStore, FontFamily } from '../store/useAppStore';
import Switch from './ui/Switch';
import Slider from './ui/Slider';
import SegmentedControl from './ui/SegmentedControl';
import OptionCard from './ui/OptionCard';

const SettingsModal: React.FC = () => {
  const {
    themeMode,
    layoutMode,
    fontSize,
    lineHeight,
    readingWidth,
    fontFamily,
    spellCheck,
    persistDraft,
    toggleThemeMode,
    toggleLayoutMode,
    setFontSize,
    setLineHeight,
    setReadingWidth,
    setFontFamily,
    setSpellCheck,
    setPersistDraft,
    resetSettings,
  } = useAppStore();

  const fontOptions = [
    { value: 'sans', label: 'sans-serif' },
    { value: 'serif', label: 'serif' },
    { value: 'mono', label: 'mono' },
  ] as const;

  return (
    <div className="flex flex-col gap-6 py-2 select-none">
      {/* Theme & Layout Toggles */}
      <div className="grid grid-cols-2 gap-3">
        <OptionCard
          label="Theme"
          icon={themeMode === 'light' ? <MdSunny size={16} /> : <MdNightlight size={16} />}
          text={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          onClick={toggleThemeMode}
        />
        <OptionCard
          label="Layout"
          icon={layoutMode === 'comfy' ? <MdAlignHorizontalCenter size={16} /> : <MdAlignHorizontalLeft size={16} />}
          text={layoutMode === 'comfy' ? 'Comfy' : 'Compact'}
          onClick={toggleLayoutMode}
        />
      </div>

      {/* Typography */}
      <SegmentedControl<FontFamily>
        label="Typography"
        options={[...fontOptions]}
        value={fontFamily}
        onChange={setFontFamily}
      />

      {/* Sliders */}
      <Slider
        label="Font Size"
        value={fontSize}
        displayValue={`${fontSize}px`}
        min={14}
        max={32}
        step={1}
        defaultPercentage={33.33}
        defaultTitle="Default: 20px"
        onChange={setFontSize}
      />

      <Slider
        label="Line Height"
        value={lineHeight}
        displayValue={lineHeight.toFixed(1)}
        min={1.2}
        max={2.4}
        step={0.1}
        defaultPercentage={33.33}
        defaultTitle="Default: 1.6"
        onChange={setLineHeight}
      />

      <Slider
        label="Reading Width"
        value={readingWidth}
        displayValue={`${readingWidth}ch`}
        min={40}
        max={100}
        step={5}
        defaultPercentage={41.67}
        defaultTitle="Default: 65ch"
        onChange={setReadingWidth}
      />

      {/* Switches */}
      <div className="flex flex-col gap-0 mt-2">
        <Switch
          label="Remember Draft Text"
          description="Keep text saved when closing the page"
          checked={persistDraft}
          onChange={setPersistDraft}
        />
        
        <Switch
          label="Spell Check"
          description="Enable native browser spelling highlights"
          checked={spellCheck}
          onChange={setSpellCheck}
        />
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
