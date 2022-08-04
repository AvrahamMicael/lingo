<script setup lang="ts">
import AppHeader from '@/views/components/app-header.vue';
</script>

<template>
	<div>
		<AppHeader/>

		<main class="container mt-4">
			<slot />
		</main>
	</div>
</template>
