<script setup lang="ts">
import CardBox from '@/views/components/card-box.vue';
import LabelInput from '@/views/components/label-input.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { Lesson } from '../../../scripts/types/index';
import LabelTextarea from '../../components/label-textarea.vue';
import FormError from '@/views/components/form-error.vue';
import useRoute from '@/scripts/composables/useRoute';

const lessonForm = useForm<Lesson>({
	title: '',
	body: '',
});

const route = useRoute();

const handleSubmit = (): void => {
	lessonForm.post(route('lesson.store'));
};
</script>

<template layout>
	<form @submit.prevent="handleSubmit" class="row justify-content-center justify-content-md-between">
		<CardBox class="col-md-8 mb-4">
			<LabelInput label="Title:" v-model="lessonForm.title" required/>
			<FormError :error="lessonForm.errors.title"/>
			<LabelTextarea label="Content:" v-model="lessonForm.body" required/>
			<FormError :error="lessonForm.errors.body"/>
		</CardBox>

		<div class="col-md-3 mb-4">
			<CardBox>
				<div class="d-grid gap-2">
					<button :disabled="lessonForm.processing" type="submit" class="btn btn-success">
						Submit
					</button>
				</div>
			</CardBox>
		</div>
	</form>
</template>
