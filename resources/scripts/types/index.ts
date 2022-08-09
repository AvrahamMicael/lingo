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

export interface WordAndLanguage {
    word: string,
    language: Language,
};

export interface OptionValueAndName {
    value: string,
    name: string,
};

export interface Headers {
    "cache-control": string,
    connection: string,
    "content-type": string,
    date: string,
    "keep-alive": string,
    server: string,
    "transfer-encoding": string,
    vary: string,
    "x-powered-by": string,
};
