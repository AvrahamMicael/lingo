import { GetterTree } from "vuex";
import { State } from "./state";
import { UserLanguages, LanguageAbbrev, LessonDisplay, DataAndLoaded } from '../types/index';

export type Getters = {
    userLanguages(state: State): UserLanguages,
    userName(state: State): string,
    isUserLoaded(state: State): boolean,
    userTranslationLanguage(state: State): LanguageAbbrev,
};

export const getters: GetterTree<State, State> & Getters = {


    userLanguages({ user }) {
        return user.data.languages;
    },


    userName({ user }) {
        return user.data.name;
    },


    isUserLoaded({ user }) {
        return user.loaded;
    },


    userTranslationLanguage({ user }) {
        return user.data.translation_language!;
    },

};
