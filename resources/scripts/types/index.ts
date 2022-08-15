export interface Link {
    name: string,
    href: string,
};

export type Language = 'portuguese' | 'english' | 'spanish' | 'latin';

export type LanguageAbbrev = 'pt' | 'en' | 'es' | 'la';

export interface Lesson {
    title: string,
    body: string,
    language: LanguageAbbrev,
    id?: number,
    created_at?: string,
    updated_at?: string,
};

export interface TranslatePayload {
    word: string,
    from_language: LanguageAbbrev,
    to_language: LanguageAbbrev,
};

export interface StoreWordPayload {
    word: string,
    meaning: Meaning,
    from_language: LanguageAbbrev,
    to_language: LanguageAbbrev,
};

export interface OptionValueAndName {
    value: string,
    name: string,
};

export interface Meaning {
    value: string,
    isGoogleTranslate: boolean,
};

export interface WordWithMeaning {
    word: string,
    meaning: Meaning,
};

export interface CreatedWord {
    id: number,
    id_user: number,
    to_language: LanguageAbbrev,
    from_language: LanguageAbbrev,
    word: LanguageAbbrev,
    level: number,
};

export interface CreatedWordWithMeaning {
    createdWord: CreatedWord,
    meaning: Meaning
};
