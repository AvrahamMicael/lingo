import { CreatedWordWithMeaning, LanguageAbbrev, UserData, WordInfo, UpdateMeaningPayload } from '../types';
import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
    AddWordMeaning = 'addWordMeaning',
    SetUser = 'setUser',
    CreateUserLangIfDoesntExist = 'createUserLangIfDoesntExist',
    SetUserLoaded = 'setUserLoaded',
    UpdateMeaning = 'updateMeaning',
};

export type Mutations = {
    [MutationType.AddWordMeaning](state: State, { createdWord, meaning }: CreatedWordWithMeaning): void,
    [MutationType.SetUser](state: State, userData: UserData): void,
    [MutationType.CreateUserLangIfDoesntExist](state: State, language: LanguageAbbrev): void,
    [MutationType.SetUserLoaded](state: State): void,
    [MutationType.UpdateMeaning](state: State, updateMeaningPayload: UpdateMeaningPayload): void,
};

export const mutations: MutationTree<State> & Mutations = {

    [MutationType.AddWordMeaning]({ user }, { createdWord, meaning }) {

        const userLanguageWords: WordInfo[] = Object.entries(user.data.languages)
            .find(entries => entries[0] == createdWord.from_language)![1]
            .words;

        const selectedWord: WordInfo | undefined = userLanguageWords
            .find(userWordInfo => userWordInfo.word == createdWord.word);

        if(selectedWord)
        {
            selectedWord.meanings.unshift(meaning);
        }
        else
        {
            const { id, word, level } = createdWord;
            userLanguageWords.unshift({
                id,
                word,
                level,
                meanings: [meaning],
            });
        }
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
