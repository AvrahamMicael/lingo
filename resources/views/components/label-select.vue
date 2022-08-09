<script setup lang="ts">
import { OptionValueAndName } from '@/scripts/types';

const props = defineProps<{ options: OptionValueAndName[], current: string, label: string }>();

</script>

<template>
    <label class="d-block">
        {{ label }}
        <select @change="$emit('update:current', ($event.target as HTMLSelectElement).value)" class="form-control mb-2">
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                class="text-capitalize"
            >
                {{ option.name }}
            </option>
        </select>
    </label>
</template>
