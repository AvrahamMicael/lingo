import { Language, LanguageAbbrev } from "../types";

export default function convertLanguageAbbrev(language: Language): LanguageAbbrev {
    switch (language) {
        case 'portuguese':
            return 'pt';
        case 'english':
            return 'en';
        case 'spanish':
            return 'es';
        case 'latin':
            return 'la';
    };
}
