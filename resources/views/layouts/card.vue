<script setup lang="ts">
import useRoute from '@/scripts/composables/useRoute';
import CardBox from '@/views/components/card-box.vue';

const route = useRoute();
</script>

<template>
    <main class="vh-100 d-flex justify-content-center align-items-center">
        <CardBox
            :class="[
                route().current('user.language')
                    ? 'min-w-430px'
                    : 'w-400px'
            ]"
        >
            <div class="d-flex justify-content-center align-items-center">
                <div class="link-warning fs-4 text-uppercase">
                    Lingo
                </div>
            </div>
            <slot/>
        </CardBox>
    </main>
</template>
