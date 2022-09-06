<script setup lang="ts">
import { EditMeaningEmitPayload, MeaningWithId } from '@/scripts/types';
import MeaningTextarea from './meaning-textarea.vue';

defineProps<{ meanings: MeaningWithId[] }>();

const emit = defineEmits({
    createMeaning(newMeaning: string) {
        return true;
    },
    editMeaning(editMeaningPayload: EditMeaningEmitPayload) {
        return true;
    },
});
</script>

<template>
    <ul v-if="meanings.length" class="mb-2">
        <li v-for="meaning in meanings" :key="meaning.id_word!">
            <MeaningTextarea
                :meaning="meaning"
                @edit-meaning="emit('editMeaning', $event)"
            />
        </li>
    </ul>
    <MeaningTextarea
        v-else
        placeholder="Type a new meaning here"
        @create-meaning="emit('createMeaning', $event)"
    />
</template>

<style lang="css" scoped>
ul
{
    padding: 0;
    list-style: none;
}
</style>
