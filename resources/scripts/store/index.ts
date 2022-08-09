import { createStore } from 'vuex';
import { WordAndLanguage } from '../types';

const store = createStore({
    state: {
        user: {
            data: {
                words: [
                    { id: 1, language: 'portuguese', word: 'oi', level: 1, meanings: [ 'hello', 'hi' ] },
                ],
            },
            token: null,
        },
    },
    getters: {},
    actions: {

        checkWord({ commit }, { word, language }: WordAndLanguage) {
            
        },

    },
    mutations: {},
    modules: {}
});

export default store;
