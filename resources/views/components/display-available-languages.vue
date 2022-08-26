<script setup lang="ts">
import { LanguageAbbrev } from '@/scripts/types';

defineProps<{ activeLanguage: LanguageAbbrev }>();

const emit = defineEmits({
    changeLanguage(language: LanguageAbbrev) {
        return true;
    },
});

const languages: LanguageAbbrev[] = [ 'en', 'pt', 'es', 'la' ];
</script>

<template>
    <div class="row justify-content-evenly mt-3">
        <div
            v-for="language in languages"
            :key="language"
            class="col-sm-3 col-6 d-flex justify-content-center mb-3"
        >
            <img
                :src="`/assets/img/flags/${language}.svg`"
                :alt="`${language} flag`"
                width="100"
                height="100"
                @click="emit('changeLanguage', language)"
                type="button"
                :class="[
                    'rounded-circle',
                    language == activeLanguage
                        ? 'border border-5 border-info'
                        : null,
                ]"
            >
        </div>
    </div>
</template>
