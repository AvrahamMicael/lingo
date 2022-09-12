<script setup lang="ts">
import useRoute from '@/scripts/composables/useRoute';
import { LessonDisplay } from '@/scripts/types';
import { Inertia } from '@inertiajs/inertia';
import { PropType } from 'vue';
import CardBox from './card-box.vue';

const route = useRoute();

const props = defineProps({
    lesson: {
        type: Object as PropType<LessonDisplay>,
        required: true,
    },
    showImportedBy: Boolean,
});

const goToLesson = (): void => {
    Inertia.get(route('lesson.show', { id: props.lesson.id }));
};
</script>

<template>
    <CardBox
        :img-src="lesson.image ?? '/assets/img/img-unavailable.svg'"
        :img-height="154"
        @click="goToLesson"
        class="w-200px carousel__item"
        body-class="position-relative"
    >
        <img
            :src="`/assets/img/flags/${lesson.language}.svg`"
            :alt="`${lesson.language} language`"
            width="40"
            height="40"
            class="rounded-circle position-absolute top-0 bottom-0 start-0 my-auto ms-1 opacity-50"
        >
        <h5 class="card-title text-break mb-0 text-truncate">{{ lesson.title }}</h5>
        <small v-if="showImportedBy">Imported by <em>{{ lesson.username }}</em></small>
    </CardBox>
</template>

<style lang="css" scoped>
.carousel__item
{
    cursor: pointer;
}
.carousel__item:hover
{
    background-color: rgb(212, 212, 212);
}
</style>
