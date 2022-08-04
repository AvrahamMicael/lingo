<script setup lang="ts">
import useRoute from '@/scripts/composables/useRoute';
import { Link } from '@/scripts/types';
import { computed } from '@vue/reactivity';

const route = useRoute();

const nav_links = computed<Link[]>(() => [
    { name: 'Home', href: route('home') },
]);
</script>

<template>
    <header class="bg-light fixed-top">
        <div class="container">
            <div class="row flex-wrap justify-content-center py-1">
                <div class="col-md-6 row">
                    <InertiaLink :href="route('home')" class="col-sm-2 text-decoration-none link-warning fs-4 text-uppercase my-auto">
                        Lingo
                    </InertiaLink>
                    <nav class="offset-sm-1 col-sm-9 nav nav-pills">
                        <li v-for="link in nav_links" :key="link.name" class="nav-item">
                            <InertiaLink :href="link.href" class="nav-link link-secondary">{{ link.name }}</InertiaLink>
                        </li>
                    </nav>
                </div>
                <div class="col-md-6 d-flex align-items-center justify-content-end">
                    <InertiaLink :href="route('lesson.create')" class="btn btn-dark">
                        + Import Lesson
                    </InertiaLink>
                </div>
            </div>
        </div>
    </header>
</template>
