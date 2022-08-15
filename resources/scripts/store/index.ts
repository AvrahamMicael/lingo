import { AxiosResponse } from 'axios';
import { createStore } from 'vuex';
import axiosClient from '../axios';
import useRoute from '../composables/useRoute';
import { CreatedWord, Meaning, StoreWordPayload, TranslatePayload, CreatedWordWithMeaning } from '../types';

const route = useRoute();

const store = createStore({
    state: {
        user: {
            data: {
                languages: {
                    pt: {
                        words: [
                            {
                                id: 1,
                                word: 'oi',
                                level: 1,
                                meanings: [
                                    { value: 'hi', isGoogleTranslate: true },
                                    { value: 'hello', isGoogleTranslate: false },
                                ],
                            },
                        ],
                    },
                    la: {
                        words: [
                            {
                                id: 1000,
                                word: 'vivamus',
                                level: 1,
                                meanings: [
                                    { value: "let's live", isGoogleTranslate: true },
                                ],
                            },
                        ],
                    },
                },
            },
            token: null,
        },
    },
    getters: {},
    actions: {

        async checkWord(_, translatePayload: TranslatePayload): Promise<AxiosResponse<{ meanings: Meaning[] }>> {

            return await axiosClient.get<{ meanings: Meaning[] }>(route('word.meanings', translatePayload));
        },

        async selectAddMeaning({ commit }, storeWordPayload: StoreWordPayload): Promise<AxiosResponse<CreatedWord>> {

            const promise = axiosClient.post<CreatedWord>(route('word.store'), storeWordPayload)
                .then(res => {
                    const createdWord = res.data;
                    const { meaning } = storeWordPayload;
                    commit('addWordMeaning', { createdWord, meaning });
                    return res;
                });
                
            return await promise;
        },

    },
    mutations: {

        addWordMeaning({ user }, { createdWord, meaning }: CreatedWordWithMeaning) {

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

    },
    modules: {}
});

export default store;
