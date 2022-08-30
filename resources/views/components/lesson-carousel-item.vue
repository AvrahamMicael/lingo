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
    >
        <h5 class="card-title">{{ lesson.title }}</h5>
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
