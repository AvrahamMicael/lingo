<script setup lang="ts">
import { EditMeaningEmitPayload, Lesson, MeaningWithId, StoreWordPayload, WordInfo } from '@/scripts/types/index.js';
import CardBox from '@/views/components/card-box.vue';
import { ref } from '@vue/runtime-core';
import v from 'voca';
import RenderLessonBody from '@/views/components/render-lesson-body.vue';
import WordPopup from '@/views/components/word-popup.vue';
import { computed } from '@vue/reactivity';
import { watch, onBeforeMount } from 'vue';
import { useStore } from '@/scripts/store/index';
import { Meaning } from '@/scripts/types/index';
import { ActionType } from '@/scripts/store/actions';
import { MutationType } from '@/scripts/store/mutations';
import Spinner from '../../components/spinner.vue';
import SavedMeaningsList from '@/views/components/saved-meanings-list.vue';

const { getters, commit, dispatch } = useStore();

const props = defineProps<{ lesson: Lesson }>();

const lessonLanguageUserWords = computed<WordInfo[]>(() => {
    commit(MutationType.CreateUserLangIfDoesntExist, props.lesson.language);
    return getters.userLanguages[props.lesson.language]!.words;
});
const lesson_body_modified = ref<string>(props.lesson.body);
const is_lesson_body_modified_ready = ref<boolean>(false);

const replaceWordsWithSpan = (): void => {
    const lesson_words = v.words(v.lowerCase(props.lesson.body));
    const unique_words = [...new Set(lesson_words)];

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


const checkWord = (word: string): void => {
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
    dispatch(ActionType.SelectAddMeaning, {
        meaning,
        ...storeWordPayloadWithoutMeaning.value,
    })
        .then(( { data } ) => {
            changeWordLevel(data.word, data.level);
        });
    toggleWordPopup();
};



const createMeaning = (newMeaning: string): void => {
    dispatch(ActionType.SelectAddMeaning, {
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


const replaceWordsWithSpanIfUserLoaded = (): void => {
    if(getters.isUserLoaded) replaceWordsWithSpan();
};

watch(() => getters.isUserLoaded, replaceWordsWithSpanIfUserLoaded);

onBeforeMount(replaceWordsWithSpanIfUserLoaded);
</script>

<template layout>
    <CardBox :header="lesson.title" class="lesson-card" body-class="d-flex flex-column">
        <RenderLessonBody
            v-if="is_lesson_body_modified_ready"
            @checkWord="checkWord"
            :lesson_body="lesson_body_modified"
        />
        <Spinner v-else/>

        <WordPopup :word="checkedWord">
            <CardBox>
                <button @click="toggleWordPopup" class="btn btn-sm btn-outline-secondary float-end d-flex align-items-center">
                    <img src="/assets/img/x.svg" alt="close">
                </button>

                <h5>{{ checkedWord }}</h5>
                <hr>

                <SavedMeaningsList
                    :meanings="checkedWordSavedMeanings"
                    @create-meaning="createMeaning"
                    @edit-meaning="editMeaning"
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
