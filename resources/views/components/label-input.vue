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
    required: Boolean,
});
</script>

<template>
    <label class="d-block">
        {{ label }}
        <input
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :type="type"
            required
            class="form-control"
        >
    </label>
</template>
