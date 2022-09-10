<script setup lang="ts">
import { EditMeaningEmitPayload, MeaningWithId } from '@/scripts/types';
import MeaningTextarea from './meaning-textarea.vue';
import { ref } from '@vue/runtime-core';

defineProps<{ meanings: MeaningWithId[] }>();

const emit = defineEmits({
    createMeaning(newMeaning: string) {
        return true;
    },
    editMeaning(editMeaningPayload: EditMeaningEmitPayload) {
        return true;
    },
    deleteMeaning(id_meaning: number) {
        return true;
    },
});

const deleteIcon = ref<number>(-1);

const toggleDeleteIcon = (index: number = -1): void => {
    deleteIcon.value = index;
};
</script>

<template>
    <ul v-if="meanings.length" class="mb-2">
        <li
            v-for="(meaning, index) in meanings"
            :key="meaning.id_word!"
            class="position-relative"
            @mouseover="toggleDeleteIcon(index)"
            @mouseleave="toggleDeleteIcon()"
        >
            <Transition name="slide-opacity">
                <div v-show="deleteIcon == index" class="position-absolute top-0 bottom-0 my-auto end-0" style="height: fit-content; translate: -15px;">
                    <button @click="emit('deleteMeaning', meaning.id)" type="button" class="btn btn-sm btn-danger btn-delete-meaning">
                        <span class="sr-only">Delete Meaning</span>
                        <i class="fa-solid fa-x fa-sm"/>
                    </button>
                </div>
            </Transition>

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
