<script setup lang="ts">
defineProps<{ word: string }>();
</script>

<template>
    <teleport to='body'>
        <div v-if="word" class="popup-outer">
            <div class="popup-inner">
                <slot/>
            </div>
        </div>
    </teleport>
</template>
