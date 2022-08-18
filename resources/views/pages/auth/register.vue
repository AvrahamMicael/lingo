<script setup lang="ts">
import LabelInput from '@/views/components/label-input.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { RegisterForm } from '../../../scripts/types/index';
import FormError from '@/views/components/form-error.vue';
import useRoute from '../../../scripts/composables/useRoute';
import SubmitBlockButton from '@/views/components/submit-block-button.vue';

const route = useRoute();

const registerForm = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const handleSubmit = (): void => {
    registerForm.post(route('register'), {
        onFinish: () => registerForm.reset('password', 'password_confirmation'),
    });
};
</script>

<template layout="auth">
    <form @submit.prevent="handleSubmit">
        <LabelInput label="Name:" v-model="registerForm.name" required/>
        <FormError :error="registerForm.errors.name"/>
        <LabelInput label="Email:" v-model="registerForm.email" required/>
        <FormError :error="registerForm.errors.email"/>
        <LabelInput label="Password:" v-model="registerForm.password" type="password" required/>
        <FormError :error="registerForm.errors.password"/>
        <LabelInput label="Confirm Password:" v-model="registerForm.password_confirmation" type="password" required/>
        <FormError :error="registerForm.errors.password_confirmation"/>

        <div class="text-center my-2">
            <InertiaLink :href="route('login')" class="small link-secondary text-decoration-none">
                Already have an account? Log in now!
            </InertiaLink>
        </div>

        <SubmitBlockButton name="Register" :disabled="registerForm.processing"/>
    </form>
</template>
