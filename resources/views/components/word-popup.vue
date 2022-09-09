<script setup lang="ts">
defineProps<{ word: string }>();

const emit = defineEmits({
    toggle() {
        return true;
    },
});
</script>

<template>
    <teleport to='body'>
        <div v-if="word" @click.self="emit('toggle')" class="popup-outer">
            <div class="popup-inner">
                <slot/>
            </div>
        </div>
    </teleport>
</template>
