<script setup lang="ts">
import LessonsCarousel from "../components/lessons-carousel.vue";
import { useStore } from "@/scripts/store";

const { getters } = useStore();
</script>

<template layout>
	<div>
		<LessonsCarousel
			title="My imported Lessons"
			:lessons-info="getters.userImportedLessonsInfo"
			no-lessons-message="You don't have imported lessons"
		/>
	</div>
</template>
