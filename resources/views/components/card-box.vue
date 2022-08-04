<script setup lang="ts">
defineProps({
    header: String,
    footer: String,
});
</script>

<template>
    <div class="card">
        <div v-if="header" class="card-header">{{ header }}</div>
        <div class="card-body">
            <slot/>
        </div>
        <div v-if="footer" class="card-footer">{{ footer }}</div>
    </div>
</template>
