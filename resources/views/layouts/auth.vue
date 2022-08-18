<script setup lang="ts">
import CardBox from '@/views/components/card-box.vue';
</script>

<template>
    <main class="vh-100 d-flex justify-content-center align-items-center">
        <CardBox class="w-400px">
            <div class="d-flex justify-content-center align-items-center">
                <div class="link-warning fs-4 text-uppercase">
                    Lingo
                </div>
            </div>
            <slot/>
        </CardBox>
    </main>
</template>
