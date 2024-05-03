import { PaletteMode } from '@mui/material';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

type State = {
    themeMode: PaletteMode | null;
};

type Actions = {
    setLightMode: () => void;
    setDarkMode: () => void;
};

type Store = State & Actions;

const initialState: State = {
    themeMode: null,
};

const stateCreator: StateCreator<Store> = set => ({
    ...initialState,
    setLightMode: () => set({ themeMode: 'light' }),
    setDarkMode: () => set({ themeMode: 'dark' }),
});

const persisted = persist(stateCreator, {
    name: 'settings-storage',
    storage: createJSONStorage(() => localStorage),
});

export const useSettingsStore = create<Store>()(persisted);
