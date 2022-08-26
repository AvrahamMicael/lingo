<script setup lang="ts">
defineProps({
    disabled: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        default: 'Submit',
    },
    btnType: {
        type: String,
        default: 'success',
    },
});
</script>

<template>
    <div class="d-grid gap-1">
        <button type="submit" :disabled="disabled" :class="`btn btn-${btnType}`">
            {{ name }}
        </button>
    </div>
</template>
