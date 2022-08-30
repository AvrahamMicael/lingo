<script setup lang="ts">
defineProps({
    header: String,
    footer: String,
    bodyClass: {
        type: String,
        default: '',
    },
    imgSrc: String,
    imgAlt: String,
    imgHeight: Number,
});
</script>

<template>
    <div class="card">
        <img
            v-if="imgSrc"
            :src="imgSrc"
            :alt="imgAlt"
            :height="imgHeight"
            class="card-img-top"
            :class="
                imgSrc == '/assets/img/img-unavailable.svg'
                    ? 'bg-grey'
                    : null
            "
        >
        <div v-if="header" class="card-header">{{ header }}</div>
        <div :class="`card-body ${bodyClass}`">
            <slot/>
        </div>
        <div v-if="footer" class="card-footer">{{ footer }}</div>
    </div>
</template>
