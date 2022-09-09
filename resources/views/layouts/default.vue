<script setup lang="ts">
import { useStore } from '@/scripts/store';
import AppHeader from '@/views/components/app-header.vue';
import { onBeforeMount } from 'vue';
import { ActionType } from '@/scripts/store/actions';

const { dispatch, getters } = useStore();

onBeforeMount(() => {
	if(!getters.isUserLoaded) dispatch(ActionType.SetUser);
});
</script>

<template>
	<div>
		<AppHeader/>
		<main class="container-md mt-4">
			<slot />
		</main>
	</div>
</template>
