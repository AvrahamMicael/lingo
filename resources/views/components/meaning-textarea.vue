<script setup lang="ts">
import { EditMeaningEmitPayload, MeaningWithId } from '@/scripts/types';

const props = defineProps<{ placeholder?: string, meaning?: MeaningWithId }>();

const emit = defineEmits({
    createMeaning(newMeaning: string) {
        return true;
    },
    editMeaning(editMeaningPayload: EditMeaningEmitPayload) {
        return true;
    },
});

const handleEmits = (ev: Event): void => {
    const textareaValue = (ev.target as HTMLTextAreaElement).value;
    if(props.meaning)
    {
        emit('editMeaning', { newMeaning: textareaValue, idMeaning: props.meaning.id });
    }
    else
    {
        emit('createMeaning', textareaValue);
    }
};
</script>

<template>
    <textarea
        type="text"
        :placeholder="placeholder"
        rows="1"
        :value="meaning?.value"
        @keydown.enter.prevent="handleEmits"
        class="form-control mb-2"
    ></textarea>
</template>
