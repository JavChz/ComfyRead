import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSettingsSlice, SettingsSlice } from './slices/createSettingsSlice';
import { createDraftSlice, DraftSlice } from './slices/createDraftSlice';

export type { LayoutMode, ThemeMode, FontFamily } from './slices/createSettingsSlice';

export type AppState = SettingsSlice & DraftSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createDraftSlice(...a),
    }),
    {
      name: 'comfyread-storage',
      partialize: (state) => {
        const { previousText, text, ...settings } = state;
        if (state.persistDraft) {
          return { ...settings, text };
        }
        return settings;
      },
    }
  )
);
