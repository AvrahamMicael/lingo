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
        <textarea
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            cols="30"
            rows="10"
            class="form-control"
            :spellcheck="!noSpellCheck"
            required
        ></textarea>
    </label>
</template>
