import { CreatedWordWithMeaning, LanguageAbbrev, UserData, WordInfo, UpdateMeaningPayload, SelectAddOtherMeaningToWordResponse, MeaningWithId } from '../types';
import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
    UpdateWordLevel = 'updateWordLevel',
    LogUserOut = 'LogUserOut',
    AddWordOtherMeaning = 'addWordOtherMeaning',
    AddNewWordMeaning = 'addNewWordMeaning',
    DeleteMeaning = 'deleteMeaning',
    SetUser = 'setUser',
    CreateUserLangIfDoesntExist = 'createUserLangIfDoesntExist',
    SetUserLoaded = 'setUserLoaded',
    UpdateMeaning = 'updateMeaning',
};

// meaning with all, word 

export type Mutations = {
    [MutationType.UpdateWordLevel](state: State, payload: { id_word: number, level: number }): void,
    [MutationType.LogUserOut](state: State): void,
    [MutationType.AddWordOtherMeaning](state: State, payload: SelectAddOtherMeaningToWordResponse): void,
    [MutationType.AddNewWordMeaning](state: State, { createdWord, meaning }: CreatedWordWithMeaning): void,
    [MutationType.DeleteMeaning](state: State, payload: { id_meaning: number, language: LanguageAbbrev }): void,
    [MutationType.SetUser](state: State, userData: UserData): void,
    [MutationType.CreateUserLangIfDoesntExist](state: State, language: LanguageAbbrev): void,
    [MutationType.SetUserLoaded](state: State): void,
    [MutationType.UpdateMeaning](state: State, updateMeaningPayload: UpdateMeaningPayload): void,
};

export const mutations: MutationTree<State> & Mutations = {

    [MutationType.UpdateWordLevel]({ user }, { id_word, level }) {
        const wordInfo = Object.values(user.data.languages)
            .find(languageInfo => languageInfo.words.some(wordInfo => wordInfo.id == id_word))!
            .words
            .find(wordInfo => wordInfo.id == id_word)!;

        wordInfo.level = level;
        if(level == -1) wordInfo.meanings = [];
    },


    [MutationType.LogUserOut]({ user }) {
        user.data.name = '';
        delete user.data.translation_language;
        user.data.languages = {};
        user.loaded = false;
    },


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


    [MutationType.DeleteMeaning]({ user }, { id_meaning, language }) {
        const wordInfo: WordInfo = user.data
            .languages[language]!
            .words
            .find(wordInfo => wordInfo.meanings.some(meaning => meaning.id == id_meaning))!;

        wordInfo.meanings.every((meaning, index, meanings) => {
                const shouldSkip: boolean = meaning.id != id_meaning;
                if(!shouldSkip) meanings.splice(index, 1);
                return shouldSkip;
            });

        if(wordInfo.meanings.length == 0) wordInfo.level = -1;
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
