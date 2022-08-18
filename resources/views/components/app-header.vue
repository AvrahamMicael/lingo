<script setup lang="ts">
import useRoute from '@/scripts/composables/useRoute';
import { useStore } from '@/scripts/store';
import { Link } from '@/scripts/types';
import { computed } from '@vue/reactivity';

const route = useRoute();

const { state } = useStore();

const nav_links = computed<Link[]>(() => [
    { name: 'Home', href: route('home') },
]);
</script>

<template>
    <header class="bg-light">
        <div class="container">
            <div class="row flex-wrap justify-content-center py-1">
                <div class="col-sm-6 row justify-content-sm-start justify-content-center">
                    <InertiaLink :href="route('home')" class="col-sm-2 text-decoration-none text-center link-warning fs-4 text-uppercase my-auto">
                        Lingo
                    </InertiaLink>
                    <nav class="offset-sm-1 col-sm-9 nav nav-pills d-flex justify-content-sm-start justify-content-center">
                        <li v-for="link in nav_links" :key="link.name" class="nav-item">
                            <InertiaLink :href="link.href" class="nav-link link-secondary">{{ link.name }}</InertiaLink>
                        </li>
                    </nav>
                </div>
                <div class="col-sm-6 d-flex align-items-center justify-content-sm-end justify-content-center">
                    <InertiaLink :href="route('lesson.create')" class="btn btn-dark">
                        + Import Lesson
                    </InertiaLink>

                    <div class="dropdown open mx-2">
                        <a class="text-decoration-none link-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ state.user.data.name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <InertiaLink :href="route('logout')" class="dropdown-item">Log out</InertiaLink>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </header>
</template>
