import { StateCreator } from 'zustand';
import { AppState } from '../useAppStore';

export interface DraftSlice {
  text: string;
  previousText: string | null;

  setText: (text: string) => void;
  setPreviousText: (text: string | null) => void;
}

export const createDraftSlice: StateCreator<
  AppState,
  [],
  [],
  DraftSlice
> = (set) => ({
  text: '',
  previousText: null,

  setText: (text) => set({ text }),
  setPreviousText: (previousText) => set({ previousText }),
});
