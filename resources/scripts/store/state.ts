import { Meaning } from '../types/index';

type WordInfo = {
    id: number,
    word: string,
    level: number,
    meanings: Meaning[],
};

type UserLanguageInfo = {
    words: WordInfo[],
};

type UserLanguages = {
    pt?: UserLanguageInfo,
    en?: UserLanguageInfo,
    la?: UserLanguageInfo,
    es?: UserLanguageInfo,
};

export type State = {
    user: {
        data: {
            languages: UserLanguages,
        },
        token: string | null,
    },
};

export const state: State = {
    user: {
        data: {
            languages: {
                la: {
                    words: [],
                },
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
            },
        },
        token: null,
    },
};
