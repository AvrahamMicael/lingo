<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'Text',
    },
    noSpellCheck: Boolean,
    required: Boolean,
});
</script>

<template>
    <label class="d-block">
        {{ label }}
        <input
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :type="type"
            class="form-control"
            :spellcheck="!noSpellCheck"
            required
        >
    </label>
</template>
