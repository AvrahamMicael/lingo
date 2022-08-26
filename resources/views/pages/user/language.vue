<script setup lang="ts">
import { LanguageAbbrev } from '@/scripts/types';
import { useForm } from '@inertiajs/inertia-vue3';
import SubmitBlockButton from '@/views/components/submit-block-button.vue';
import useRoute from '@/scripts/composables/useRoute';
import DisplayAvailableLanguages from '@/views/components/display-available-languages.vue';

const route = useRoute();

const form = useForm<{ translation_language: LanguageAbbrev }>({
    translation_language: 'en',
});

const changeLanguage = (language: LanguageAbbrev): void => {
    if(!form.processing)
    {
        form.translation_language = language;
    }
};

const submit = (): void => {
    form.patch(route('user.language'));
};
</script>

<template layout="card">
    <form @submit.prevent="submit">
        <div class="text-center fs-5">
            Almost finished! We just need the language you want your lessons to be translated into.
            <!-- will be used as your display language as well -->
        </div>
        <DisplayAvailableLanguages
            :active-language="form.translation_language"
            @change-language="changeLanguage"
        />
        <SubmitBlockButton :disabled="form.processing"/>
    </form>
</template>
