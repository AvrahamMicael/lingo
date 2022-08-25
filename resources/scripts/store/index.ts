import { createStore, createLogger, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import { state, State } from './state';
import { actions, Actions } from './actions';
import { mutations, Mutations } from './mutations';
import { Getters, getters } from './getters';

const store = createStore({
    plugins: import.meta.env.VITE_APP_ENV === 'local' ? [ createLogger() ] : [],
    getters,
    state,
    actions,
    mutations,
});

export type Store = Omit<
    VuexStore<State>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
};

export function useStore() {
    return store as Store;
};
