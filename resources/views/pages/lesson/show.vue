<script setup lang="ts">
import { Lesson } from '@/scripts/types/index.js';
import CardBox from '@/views/components/card-box.vue';

defineProps<{ lesson: Lesson }>();
</script>

<template layout>
    <CardBox :header="lesson.title">
        <p class="mb-0">{{ lesson.body }}</p>
    </CardBox>
</template>
