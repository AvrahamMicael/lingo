<script setup lang="ts">
import LabelInput from '@/views/components/label-input.vue';
import { useForm } from '@inertiajs/inertia-vue3';
import { LoginForm } from '@/scripts/types/index';
import FormError from '@/views/components/form-error.vue';
import useRoute from '@/scripts/composables/useRoute';
import SubmitBlockButton from '@/views/components/submit-block-button.vue';

const route = useRoute();

const loginForm = useForm<LoginForm>({
    email: '',
    password: '',
});

const handleSubmit = (): void => {
    loginForm.post(route('login'), {
        onFinish: () => loginForm.reset('password'),
    });
};
</script>

<template layout="card">
    <form @submit.prevent="handleSubmit">
        <LabelInput label="Email:" type="email" v-model="loginForm.email" required/>
        <FormError :error="loginForm.errors.email"/>
        <LabelInput label="Password:" v-model="loginForm.password" type="password" required/>
        <FormError :error="loginForm.errors.password"/>

        <div class="text-center my-2">
            <InertiaLink :href="route('register')" class="small link-secondary text-decoration-none">
                Doesn't have an account? Register now!
            </InertiaLink>
        </div>

        <SubmitBlockButton name="Log in" :disabled="loginForm.processing"/>
    </form>
</template>
