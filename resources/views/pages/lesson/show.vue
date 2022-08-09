<script setup lang="ts">
import { Lesson } from '@/scripts/types/index.js';
import CardBox from '@/views/components/card-box.vue';
import { onMounted, ref } from '@vue/runtime-core';
import v from 'voca';
import RenderLessonBody from '@/views/components/render-lesson-body.vue';
import WordPopup from '@/views/components/word-popup.vue';
import { computed } from '@vue/reactivity';
import axiosClient from '@/scripts/axios';
import useRoute from '@/scripts/composables/useRoute';
// import store from '@/scripts/store';

const route = useRoute();

const props = defineProps<{ lesson: Lesson }>();

const lesson_body_modified = ref<string>(props.lesson.body);

const replaceWordsWithSpan = (): void => {
    const lesson_words = v.words(v.lowerCase(props.lesson.body));
    const unique_words = [...new Set(lesson_words)];

    unique_words.forEach((uniq_word: string): void => {
        lesson_body_modified.value = v.replace(lesson_body_modified.value, new RegExp(`\\b${uniq_word}\\b`, 'gi'), `<span @click="checkWord" class="word-0">${uniq_word}</span>`);
    });
};

const clickedWord = ref<string>('');

const clickedWordSpans = computed<HTMLSpanElement[]>(() =>
    clickedWord.value == ''
    ? []
    : (Array.from(document.querySelectorAll('p.lesson-body span')) as HTMLSpanElement[])
        .filter(span => span.innerText == clickedWord.value)
);

const changeWordLevel = (level: number | string):void => {
    clickedWordSpans.value.forEach(span => span.className = `word-${level}`);
};

const checkedWordMeanings = ref<string[]>([]);

const checkWord = (word: string): void => {
    clickedWord.value = word;

    axiosClient.get<{ meanings: string[] }>(route('word.meanings', {
        from_language: props.lesson.language,
        to_language: 'en',
        word,
    }))
        .then(( { data } ) => checkedWordMeanings.value = checkedWordMeanings.value.concat(data.meanings))
        .catch(() => checkedWordMeanings.value.push('<span class="text-danger">Something went Wrong!</span>'));

    // store.dispatch('checkWord', { word, language: props.lesson.language });
};

const toggleWordPopup = (): void => {
    clickedWord.value = '';
    checkedWordMeanings.value = [];
};

const selectAddMeaning = (meaningIndex: number): void => {
    // ...
    const meaning = checkedWordMeanings.value.splice(meaningIndex, 1).at(0) as string;
    // store.dispatch('selectAddMeaning', { word, meaning });
};

onMounted(() => {
    replaceWordsWithSpan();
});
</script>

<template layout>
    <CardBox :header="lesson.title" body-class="lesson-card">
        <RenderLessonBody @checkWord="checkWord" :lesson_body="lesson_body_modified"/>

        <WordPopup :word="clickedWord">
            <CardBox>
                <button @click="toggleWordPopup" class="btn btn-sm btn-outline-secondary float-end d-flex align-items-center">
                    <img src="/assets/img/x.svg" alt="close">
                </button>

                <h5>{{ clickedWord }}</h5>
                <hr>

                <textarea rows="1" placeholder="Type a new meaning here" class="form-control mb-2"></textarea>

                <!-- <div>Saved Meanings</div>
                <div>meaning 1</div> -->

                <h5>Meanings</h5>

                <div
                    v-for="(meaning, i) in checkedWordMeanings"
                    :key="meaning"
                    type="button"
                    @click="selectAddMeaning(i)"
                    class="my-2"
                >
                    {{ meaning }}
                </div>

                <label class="d-block">
                    <h5>Notes</h5>
                    <textarea rows="1" class="form-control"></textarea>
                </label>
            </CardBox>
        </WordPopup>
    </CardBox>
</template>
