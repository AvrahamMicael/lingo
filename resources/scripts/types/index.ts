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
    image?: string | null,
    created_at?: string,
    updated_at?: string,
};

export interface LessonWithAllData extends Lesson {
    id: number,
    image: string | null,
    created_at: string,
    updated_at: string,
    username: string,
};

export interface LessonDisplay {
    id: number,
    image: string | null,
    created_at: string,
    username: string,
    title: string,
};

export interface TranslatePayload {
    word: string,
    from_language: LanguageAbbrev,
    to_language: LanguageAbbrev,
};

export interface Meaning {
    value: string,
    isGoogleTranslate: boolean,
    id_word?: number,
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

export type MeaningWithId = Meaning & {
    id: number,
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
    word: string,
    level: number,
    id_meaning: number,
};

export interface CreatedWordWithMeaning {
    createdWord: CreatedWord,
    meaning: MeaningWithId
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
    meanings: MeaningWithId[],
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

export type CarouselSnapAlign = 'start' | 'center' | 'end';

export type CarouselSettings = {
    itemsToShow: number,
    snapAlign: CarouselSnapAlign,
};

export type CarouselBreakpoints = {
    [breakpoint: number]: CarouselSettings,
};

export type DataAndLoaded<T> = {
    data: T,
    loaded: boolean,
};

export type UpdateMeaningPayload = {
    newMeaning: string,
    idMeaning: number,
    userLanguage: LanguageAbbrev,
};

export type EditMeaningEmitPayload = {
    newMeaning: string,
    idMeaning: number,
};

export type SelectAddOtherMeaningToWordPayload = {
    id_word: number,
    meaning: Meaning,
    to_language: LanguageAbbrev;
    word: string,
};

export type SelectAddOtherMeaningToWordResponse = Required<MeaningWithId> & {
    to_language: LanguageAbbrev,
};
