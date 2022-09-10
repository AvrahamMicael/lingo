<script setup lang="ts">
import { EditMeaningEmitPayload, Lesson, MeaningWithId, StoreWordPayload, WordInfo } from '@/scripts/types/index.js';
import CardBox from '@/views/components/card-box.vue';
import { ref } from '@vue/runtime-core';
import v from 'voca';
import WordPopup from '@/views/components/word-popup.vue';
import { computed } from '@vue/reactivity';
import { watch, onBeforeMount, onUnmounted } from 'vue';
import { useStore } from '@/scripts/store/index';
import { Meaning } from '@/scripts/types/index';
import { ActionType } from '@/scripts/store/actions';
import { MutationType } from '@/scripts/store/mutations';
import Spinner from '../../components/spinner.vue';
import SavedMeaningsList from '@/views/components/saved-meanings-list.vue';
import LessonBodyCarousel from '../../components/lesson-body-carousel.vue';

const { getters, commit, dispatch } = useStore();

const props = defineProps<{ lesson: Lesson }>();

const lessonLanguageUserWords = computed<WordInfo[]>(() => {
    commit(MutationType.CreateUserLangIfDoesntExist, props.lesson.language);
    return getters.userLanguages[props.lesson.language]!.words;
});
const lesson_body_modified = ref<string>(props.lesson.body);
const is_lesson_body_modified_ready = ref<boolean>(false);

const unique_words: string[] = (() => {
    const lesson_words = v.words(v.lowerCase(props.lesson.body));
    return [...new Set(lesson_words)];
})();

const replaceWordsWithSpan = (): void => {
    unique_words.forEach((uniq_word: string): void => {
        const wordLevel: number = lessonLanguageUserWords.value.find((wordInfo: WordInfo) => wordInfo.word == uniq_word)?.level
            ?? 0;
        lesson_body_modified.value = v.replace(
            lesson_body_modified.value,
            new RegExp(`\\b${uniq_word}\\b`, 'gi'),
            `<span @click="checkWord" class="word-${wordLevel}">${uniq_word}</span>`
        );
    });
    is_lesson_body_modified_ready.value = true;
};


const checkedWord = ref<string>('');
const checkedWordInfo = computed<WordInfo | null>(() => getters.userLanguages[props.lesson.language]!.words.find(wordInfo => wordInfo.word == checkedWord.value) ?? null);
const checkedWordMeanings = ref<Meaning[]>([]);
const checkedWordSavedMeanings = computed<MeaningWithId[]>(() => getters.userLanguages[props.lesson.language]!.words.find(wordInfo => wordInfo.word == checkedWord.value)?.meanings ?? []);

const lessonWordsSpans = computed<HTMLSpanElement[]>(() => 
    Array.from(document.querySelectorAll('div.card-body p.lesson-body span')) as HTMLSpanElement[]
);

const wordSpans = (word: string): HTMLSpanElement[] => 
    lessonWordsSpans.value
        .filter(span => span.innerText == word);

const changeWordLevel = (word: string, level: number): void => {
    wordSpans(word)
        .forEach(span => {
            span.className = `word-${level}`;
        });
};


const checkWord = (word: Lowercase<string>): void => {
    checkedWord.value = word;

    dispatch(ActionType.CheckWord, {
        word,
        from_language: props.lesson.language,
        to_language: getters.userTranslationLanguage,
    })
        .then(( { data } ) => {
            //check if is still the same word
            if(checkedWord.value == word)
            {
                checkedWordMeanings.value = checkedWordMeanings.value.concat(data.meanings)
            }
        });
};


const toggleWordPopup = (): void => {
    checkedWord.value = '';
    checkedWordMeanings.value = [];
};


const storeWordPayloadWithoutMeaning = computed<Omit<StoreWordPayload, 'meaning'>>(() => ({
    word: checkedWord.value,
    from_language: props.lesson.language,
    to_language: getters.userTranslationLanguage,
}));

const selectAddMeaning = (meaningIndex: number): void => {
    const meaning: Meaning = checkedWordMeanings.value.splice(meaningIndex, 1).at(0)!;

    if(checkedWordInfo.value?.id)
    {
        dispatch(ActionType.SelectAddOtherMeaningToWord, {
            id_word: checkedWordInfo.value.id,
            meaning,
            to_language: props.lesson.language,
            word: checkedWord.value,
        });
    }
    else
    {
        dispatch(ActionType.SelectAddMeaningToNewWord, {
            meaning,
            ...storeWordPayloadWithoutMeaning.value,
        })
            .then(( { data } ) => {
                changeWordLevel(data.word, data.level);
            });
        toggleWordPopup();
    }
};



const createMeaning = (newMeaning: string): void => {
    dispatch(ActionType.SelectAddMeaningToNewWord, {
        meaning: {
            value: newMeaning,
            isGoogleTranslate: false,
        },
        ...storeWordPayloadWithoutMeaning.value,
    })
        .then(( { data } ) => {
            changeWordLevel(data.word, data.level);
        });
    toggleWordPopup();
};


const editMeaning = ({ newMeaning, idMeaning }: EditMeaningEmitPayload): void => {
    dispatch(ActionType.UpdateMeaning, {
        newMeaning,
        idMeaning,
        userLanguage: props.lesson.language,
    });
};

const deleteMeaning = (id_meaning: number): void => {
    dispatch(ActionType.DeleteMeaning, { id_meaning, language: props.lesson.language });
};


const speech = (): void => {
    if (!('speechSynthesis' in window))
    {
        alert("Sorry, your browser doesn't support text to speech!");
        return;
    }
    if(props.lesson.language == 'la') alert('Latin is not available to speech!');
    const msg = new SpeechSynthesisUtterance();
    msg.lang = props.lesson.language;
    msg.text = checkedWord.value;
    window.speechSynthesis.speak(msg);
};


const replaceWordsWithSpanIfUserLoaded = (): void => {
    if(getters.isUserLoaded) replaceWordsWithSpan();
};

watch(() => getters.isUserLoaded, replaceWordsWithSpanIfUserLoaded);

onBeforeMount(() => {
    replaceWordsWithSpanIfUserLoaded();
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflow = 'auto';
});
</script>

<template layout>
    <CardBox :header="lesson.title" class="lesson-card">
        <LessonBodyCarousel
            v-if="is_lesson_body_modified_ready"
            @checkWord="checkWord"
            :lesson-body="lesson_body_modified"
        />
        <Spinner v-else/>

        <WordPopup @toggle="toggleWordPopup" :word="checkedWord">
            <CardBox>
                <button @click="toggleWordPopup" type="button" class="btn btn-sm btn-outline-secondary float-end d-flex align-items-center">
                    <img src="/assets/img/x.svg" alt="close">
                </button>

                <div class="d-flex">
                    <button @click="speech" type="button" class="btn btn-sm btn-outline-secondary">
                        <span class="sr-only">Audio Speech</span>
                        <i class="fa-solid fa-volume-high"/>
                    </button>
                    <h5 class="d-inline my-auto ms-1">{{ checkedWord }}</h5>
                </div>
                <hr class="my-2">

                <SavedMeaningsList
                    :meanings="checkedWordSavedMeanings"
                    @create-meaning="createMeaning"
                    @edit-meaning="editMeaning"
                    @delete-meaning="deleteMeaning"
                />

                <h5>Meanings</h5>

                <div
                    v-for="(meaning, i) in checkedWordMeanings"
                    :key="meaning.value"
                    type="button"
                    @click="selectAddMeaning(i)"
                    class="my-2"
                >
                    {{ meaning.value }}
                </div>

                <label class="d-block">
                    <h5>Notes</h5>
                    <textarea rows="1" class="form-control"></textarea>
                </label>
            </CardBox>
        </WordPopup>
    </CardBox>
</template>
