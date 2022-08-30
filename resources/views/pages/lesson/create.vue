<script setup lang="ts">
import CardBox from '@/views/components/card-box.vue';
import LabelInput from '@/views/components/label-input.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { Lesson, OptionValueAndName } from '../../../scripts/types/index';
import LabelTextarea from '../../components/label-textarea.vue';
import FormError from '@/views/components/form-error.vue';
import useRoute from '@/scripts/composables/useRoute';
import LabelSelect from '@/views/components/label-select.vue';
import SubmitBlockButton from '@/views/components/submit-block-button.vue';
import LabelFileInput from '@/views/components/label-file-input.vue';

const availableLanguages: OptionValueAndName[] =[
	{ name: 'portuguese', value: 'pt' },
	{ name: 'english', value: 'en' },
	{ name: 'spanish', value: 'es' },
	{ name: 'latin', value: 'la' },
];

const lessonForm = useForm<Lesson & { image: File | null }>({
	title: '',
	body: '',
	language: 'pt',
	image: null,
});

const route = useRoute();

const handleSubmit = (): void => {
	lessonForm.post(route('lesson.store'));
};
</script>

<template layout>
	<form @submit.prevent="handleSubmit" class="row justify-content-center justify-content-md-between">
		<CardBox class="col-md-8 mb-4">
			<LabelInput label="Title:" v-model="lessonForm.title" required no-spell-check/>
			<FormError :error="lessonForm.errors.title"/>
			<LabelTextarea label="Content:" v-model="lessonForm.body" required no-spell-check/>
			<FormError :error="lessonForm.errors.body"/>
		</CardBox>

		<div class="col-md-3 mb-4">
			<CardBox>
				<LabelFileInput label="Lesson Image:" v-model="lessonForm.image"/>
				<FormError :error="lessonForm.errors.image" class="mb-2"/>
				<LabelSelect label="Language:" v-model:current="lessonForm.language" :options="availableLanguages"/>
				<FormError :error="lessonForm.errors.language" class="mb-2"/>
				<SubmitBlockButton name="Submit" :disabled="lessonForm.processing"/>
			</CardBox>
		</div>
	</form>
</template>
