import { CreatedWordWithMeaning } from '../types';
import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
    AddWordMeaning = 'addWordMeaning',
};

export type Mutations = {
    [MutationType.AddWordMeaning](state: State, { createdWord, meaning }: CreatedWordWithMeaning): void,
};

export const mutations: MutationTree<State> & Mutations = {

    [MutationType.AddWordMeaning]({ user }, { createdWord, meaning }) {

        const userWords = Object.entries(user.data.languages)
            .find(entries => entries[0] == createdWord.from_language)![1]
            .words;

        const selectedWord = userWords
            .find(userWordInfo => userWordInfo.word == createdWord.word);

        if(selectedWord)
        {
            selectedWord.meanings.unshift(meaning);
        }
        else
        {
            const { id, word, level } = createdWord;
            userWords.unshift({
                id,
                word,
                level,
                meanings: [meaning],
            });
        }
    },

};
