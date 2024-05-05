import { kysely } from '@app/database';
import { Greetings } from '@app/database/dbTypes.ts';
import { Selectable } from 'kysely';
import { create } from 'zustand';
import type { StateCreator } from 'zustand/vanilla';

type State = {
    greetings: Selectable<Greetings>[];
};

type Actions = {
    addGreeting: (name: string) => void;
    getGreetings: () => void;
    deleteGreetings: (id: number) => void;
};

type Store = State & Actions;

const initialState: State = {
    greetings: [],
};

const stateCreator: StateCreator<Store> = (set, get) => ({
    ...initialState,
    getGreetings: () => {
        kysely
            .selectFrom('greetings')
            .selectAll()
            .orderBy('created_at', 'desc')
            .execute()
            .then(results => set({ greetings: results }))
            .catch(error => console.error(`Unable to fetch greet names: ${error.message}`));
    },
    addGreeting: async (name: string) => {
        try {
            await kysely.insertInto('greetings').values({ name }).execute();
            get().getGreetings();
        } catch (e) {
            let errorMessage = 'unknown';
            if (typeof e === 'string') {
                errorMessage = e;
            }

            if ((e as Error).message) {
                errorMessage = (e as Error).message;
            }

            console.error(`Could not save greeting name: ${errorMessage}`, e);
        }
    },
    deleteGreetings: async (id: number) => {
        try {
            await kysely.deleteFrom('greetings').where('id', '=', id).execute();
            get().getGreetings();
        } catch (e) {
            let errorMessage = 'unknown';
            if (typeof e === 'string') {
                errorMessage = e;
            }

            if ((e as Error).message) {
                errorMessage = (e as Error).message;
            }

            console.error(`Could not delete greeting: ${errorMessage}`, e);
        }
    },
});

export const useGreetings = create<Store>()(stateCreator);
