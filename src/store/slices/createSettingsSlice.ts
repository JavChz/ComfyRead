import { StateCreator } from 'zustand';
import { AppState } from '../useAppStore';

export type LayoutMode = 'comfy' | 'compact';
export type ThemeMode = 'light' | 'dark';
export type FontFamily = 'sans' | 'serif' | 'mono';

export interface SettingsSlice {
  themeMode: ThemeMode;
  layoutMode: LayoutMode;
  fontSize: number;
  lineHeight: number;
  readingWidth: number;
  fontFamily: FontFamily;
  spellCheck: boolean;
  persistDraft: boolean;

  setThemeMode: (theme: ThemeMode) => void;
  toggleThemeMode: () => void;
  setLayoutMode: (layout: LayoutMode) => void;
  toggleLayoutMode: () => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setReadingWidth: (width: number) => void;
  setFontFamily: (family: FontFamily) => void;
  setSpellCheck: (enabled: boolean) => void;
  setPersistDraft: (enabled: boolean) => void;
  resetSettings: () => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
};

export const DEFAULT_SETTINGS = {
  themeMode: getInitialTheme(),
  layoutMode: 'comfy' as LayoutMode,
  fontSize: 20,
  lineHeight: 1.6,
  readingWidth: 65,
  fontFamily: 'sans' as FontFamily,
  spellCheck: false,
  persistDraft: true,
};

export const createSettingsSlice: StateCreator<
  AppState,
  [],
  [],
  SettingsSlice
> = (set) => ({
  ...DEFAULT_SETTINGS,

  setThemeMode: (themeMode) => set({ themeMode }),
  toggleThemeMode: () =>
    set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  toggleLayoutMode: () =>
    set((state) => ({ layoutMode: state.layoutMode === 'comfy' ? 'compact' : 'comfy' })),
  setFontSize: (fontSize) => set({ fontSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setReadingWidth: (readingWidth) => set({ readingWidth }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setSpellCheck: (spellCheck) => set({ spellCheck }),
  setPersistDraft: (persistDraft) => set({ persistDraft }),
  resetSettings: () =>
    set(() => ({
      ...DEFAULT_SETTINGS,
    })),
});
