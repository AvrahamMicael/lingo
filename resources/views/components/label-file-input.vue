<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    modelValue: {
        type: Object as PropType<File | null>,
    },
    label: {
        type: String,
        required: true,
    },
    required: Boolean,
});
</script>
    
<template>
    <label class="d-block">
        {{ label }} <small v-if="!required" class="text-secondary">(optional)</small>
        <input
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).files![0] ?? null)"
            type="file"
            class="form-control"
            :required="required"
        >
    </label>
</template>
