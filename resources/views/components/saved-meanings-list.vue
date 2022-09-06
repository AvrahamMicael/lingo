<script setup lang="ts">
import { Meaning } from '@/scripts/types';

defineProps<{ meanings: Meaning[] }>();

const emit = defineEmits({
    createMeaning(newMeaning: string) {
        return true;
    },
});
</script>

<template>
    <ul v-if="meanings.length" class="mb-2">
        <li v-for="meaning in meanings" :key="meaning.id_word!">
            <textarea
                type="text"
                placeholder="Type a new meaning here"
                rows="1"
                :value="meaning.value"
                class="form-control mb-2"
            ></textarea>
        </li>
    </ul>
    <textarea
        v-else
        type="text"
        placeholder="Type a new meaning here"
        rows="1"
        @keydown.enter="emit('createMeaning', ($event.target as HTMLTextAreaElement).value)"
        class="form-control mb-2"
    ></textarea>
</template>

<style lang="css" scoped>
ul
{
    padding: 0;
    list-style: none;
}
</style>
