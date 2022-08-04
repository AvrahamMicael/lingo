<script setup lang="ts">
defineProps({
    error: {
        required: true
    }
});
</script>

<template>
    <div v-if="error" class="bg-danger text-white text-center rounded">
        {{ error }}
    </div>
</template>
