import { GetterTree } from "vuex";
import { State } from "./state";
import { UserLanguages } from '../types/index';

export type Getters = {
    userLanguages(state: State): UserLanguages,
    userName(state: State): string,
    isUserLoaded(state: State): boolean,
};

export const getters: GetterTree<State, State> & Getters = {


    userLanguages(state) {
        return state.user.data.languages;
    },


    userName(state) {
        return state.user.data.name;
    },


    isUserLoaded(state) {
        return state.user.loaded;
    },

};
