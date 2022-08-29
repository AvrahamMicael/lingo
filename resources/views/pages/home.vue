<script setup lang="ts">
import LessonsCarousel from "../components/lessons-carousel.vue";
import { onBeforeMount, ref } from 'vue';
import { LessonWithAllData } from "@/scripts/types";
import { useStore } from "@/scripts/store";
import { ActionType } from "@/scripts/store/actions";

const { dispatch } = useStore();

const userLessons = ref<LessonWithAllData[]>([]);

onBeforeMount(() => {
	dispatch(ActionType.GetUserLessons)
		.then(({ data }) => {
			userLessons.value = data;
		})
		.catch(error => console.log(error));
});
</script>

<template layout>
	<div>
		<LessonsCarousel title="My imported Lessons" :lessons="userLessons"/>
	</div>
</template>
