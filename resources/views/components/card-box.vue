<script setup lang="ts">
defineProps({
    header: String,
    footer: String,
    bodyClass: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="card">
        <div v-if="header" class="card-header">{{ header }}</div>
        <div :class="`card-body ${bodyClass}`">
            <slot/>
        </div>
        <div v-if="footer" class="card-footer">{{ footer }}</div>
    </div>
</template>
