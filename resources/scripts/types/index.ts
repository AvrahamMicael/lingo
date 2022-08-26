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
    id_word?: number,
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

export type LoginForm = {
    email: string,
    password: string,
};

export type RegisterForm = LoginForm & {
    name: string,
    password_confirmation: string,
};

export type WordInfo = {
    id: number,
    id_user?: number,
    from_language?: LanguageAbbrev,
    word: string,
    level: number,
    meanings: Meaning[],
};

export type UserLanguageInfo = {
    words: WordInfo[],
};

export type UserLanguages = {
    pt?: UserLanguageInfo,
    en?: UserLanguageInfo,
    la?: UserLanguageInfo,
    es?: UserLanguageInfo,
};

export type UserData = {
    name: string,
    translation_language?: LanguageAbbrev,
    languages: UserLanguages,
};
