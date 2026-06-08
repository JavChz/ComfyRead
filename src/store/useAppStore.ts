import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LayoutMode = 'comfy' | 'compact';
export type ThemeMode = 'light' | 'dark';
export type FontFamily = 'sans' | 'serif' | 'mono';

export interface AppState {
  // Draft content
  text: string;

  // Customization preferences
  themeMode: ThemeMode;
  layoutMode: LayoutMode;
  fontSize: number; // in pixels
  lineHeight: number; // multiplier, e.g. 1.6
  readingWidth: number; // max-width in characters (ch)
  fontFamily: FontFamily;
  spellCheck: boolean;

  // Actions
  setText: (text: string) => void;
  setThemeMode: (theme: ThemeMode) => void;
  toggleThemeMode: () => void;
  setLayoutMode: (layout: LayoutMode) => void;
  toggleLayoutMode: () => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setReadingWidth: (width: number) => void;
  setFontFamily: (family: FontFamily) => void;
  setSpellCheck: (enabled: boolean) => void;
  resetSettings: () => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
};

const DEFAULT_SETTINGS = {
  themeMode: getInitialTheme(),
  layoutMode: 'comfy' as LayoutMode,
  fontSize: 20,
  lineHeight: 1.6,
  readingWidth: 65,
  fontFamily: 'sans' as FontFamily,
  spellCheck: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      text: '',
      ...DEFAULT_SETTINGS,

      setText: (text) => set({ text }),
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
      resetSettings: () =>
        set((state) => ({
          ...DEFAULT_SETTINGS,
          // Retain draft text even on settings reset
          text: state.text,
        })),
    }),
    {
      name: 'comfyread-storage', // Key name in localStorage
    }
  )
);
