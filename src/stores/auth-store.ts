import { DeviceCodeResponse, LimitedDevicesApi, UserInfoResponse } from '@app/auth/Google/LimitedDevicesApi.ts';
import { listen } from '@tauri-apps/api/event';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

const api = new LimitedDevicesApi(import.meta.env.VITE_DESKTOP_OAUTH_URL);
type State = {
    isFetching: boolean;
    user: UserInfoResponse | null;
    deviceCodeResponse: DeviceCodeResponse | null;
};

type Actions = {
    createDeviceCode: () => void;
    logout: () => void;
};

type Store = State & Actions;

const initialState: State = {
    isFetching: false,
    user: null,
    deviceCodeResponse: null,
};

const stateCreator: StateCreator<Store> = set => ({
    ...initialState,
    logout: () => set(initialState),
    createDeviceCode: () => {
        set({ isFetching: true });
        api.buildNewDeviceCode()
            .then(deviceCodeResponse => {
                set({ deviceCodeResponse });
                return api.startFetchTokenPolling();
            })
            .catch(error => {
                console.error('Error during device code creation:', error);
            }).finally(() => {
                set({ isFetching: false });
            });
    },
});

const persisted = persist(stateCreator, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
});

export const useAuthStore = create<Store>()(persisted);

listen<UserInfoResponse>(LimitedDevicesApi.EVENT_NAME, event => {
    useAuthStore.setState(s => ({
        ...s,
        user: event.payload,
    }));
}).catch(error => console.error(`Failed to get ${LimitedDevicesApi.EVENT_NAME} event due to: ${error.message}`, error));
