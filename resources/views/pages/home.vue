<script setup lang="ts">
import LessonsCarousel from "../components/lessons-carousel.vue";
import { LessonDisplay } from "@/scripts/types";

defineProps<{
	lastOpenedLessons: LessonDisplay[],
	userImportedLessons: LessonDisplay[],
	otherUsersLessons: LessonDisplay[],
}>();
</script>

<template layout>
	<div>
		<LessonsCarousel
			title="Last Lessons"
			:lessons-info="lastOpenedLessons"
			disappear-if-lessons-not-found
		/>
		<LessonsCarousel
			title="My imported Lessons"
			:lessons-info="userImportedLessons"
			no-lessons-message="You don't have imported lessons"
		/>
		<LessonsCarousel
			title="Other Users' Lessons"
			:lessons-info="otherUsersLessons"
			disappear-if-lessons-not-found
		/>
	</div>
</template>
