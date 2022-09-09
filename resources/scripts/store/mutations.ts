import { CreatedWordWithMeaning, LanguageAbbrev, UserData, WordInfo, UpdateMeaningPayload, SelectAddOtherMeaningToWordResponse, MeaningWithId } from '../types';
import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
    AddWordOtherMeaning = 'addWordOtherMeaning',
    AddNewWordMeaning = 'addNewWordMeaning',
    SetUser = 'setUser',
    CreateUserLangIfDoesntExist = 'createUserLangIfDoesntExist',
    SetUserLoaded = 'setUserLoaded',
    UpdateMeaning = 'updateMeaning',
};

// meaning with all, word 

export type Mutations = {
    [MutationType.AddWordOtherMeaning](state: State, payload: SelectAddOtherMeaningToWordResponse): void,
    [MutationType.AddNewWordMeaning](state: State, { createdWord, meaning }: CreatedWordWithMeaning): void,
    [MutationType.SetUser](state: State, userData: UserData): void,
    [MutationType.CreateUserLangIfDoesntExist](state: State, language: LanguageAbbrev): void,
    [MutationType.SetUserLoaded](state: State): void,
    [MutationType.UpdateMeaning](state: State, updateMeaningPayload: UpdateMeaningPayload): void,
};

export const mutations: MutationTree<State> & Mutations = {


    [MutationType.AddWordOtherMeaning]({ user }, { id, id_word, to_language, value, isGoogleTranslate }) {
        user.data
            .languages[to_language]!
            .words
            .find(wordInfo => wordInfo.id == id_word)!
            .meanings
            .unshift({ id, value, isGoogleTranslate });
    },


    [MutationType.AddNewWordMeaning]({ user }, { createdWord, meaning }) {
        const { id, word, level } = createdWord;
        user.data
            .languages[createdWord.from_language]!
            .words
            .unshift({
                id,
                word,
                level,
                meanings: [meaning],
            });
    },

    [MutationType.SetUser]({ user }, userData) {
        user.data = userData;
    },

    [MutationType.CreateUserLangIfDoesntExist]({ user }, language) {
        if(!user.data.languages[language])
        {
            user.data.languages[language] = { words: [] };
        }
    },


    [MutationType.SetUserLoaded]({ user }) {
        user.loaded = true;
    },


    [MutationType.UpdateMeaning]({ user }, { idMeaning, newMeaning, userLanguage }) {
        let shouldBreak: boolean = false;
        user.data.languages[userLanguage]!.words.every(wordInfo => {
            wordInfo.meanings.forEach(meaning => {
                if(meaning.id == idMeaning)
                {
                    meaning.value = newMeaning;
                    shouldBreak = true;
                }
            });
            return !shouldBreak;
        });
    },

};
