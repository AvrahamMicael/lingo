<script setup lang="ts">
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import { CarouselSettings } from '@/scripts/types/index';
import RenderLessonBody from './render-lesson-body.vue';
import { onMounted, onUnmounted } from 'vue';
import removePxAndChangeToNumber from '@/scripts/functions/removePxChangeToNumber';
import { ref } from '@vue/runtime-core';
import vh from '@/scripts/functions/vh';

const props = defineProps<{ lessonBody: string }>();

const emit = defineEmits({
    checkWord(word: Lowercase<string>) {
        return true;
    },
});

const settings: CarouselSettings = {
    itemsToShow: 1,
    snapAlign: 'center',
};

const getTotalLinesAndLineHeight = (): { totalLines: number, lineHeight: number } => {
    const pLessonBody = document.querySelector('p.lesson-body') as HTMLParagraphElement;
    const p = document.createElement('p');
    p.innerHTML = props.lessonBody;
    p.style.display = 'inline';
    const div = document.createElement('div');
    div.style.transform = 'translateX(9999px)';
    div.style.width = window.getComputedStyle(pLessonBody).width;
    div.appendChild(p);
    document.body.insertBefore(div, document.body.children[0]);

    const totalLines: number = p.getClientRects().length;
    const lineHeight: number = removePxAndChangeToNumber(window.getComputedStyle(p).lineHeight);
    div.remove();
    return { totalLines, lineHeight };
};

const pLessonBodyMaxHeight = ref<number>(0);
const pTagsQty = ref<number>(1);

const divideLessonBody = (): void => {
    const { totalLines, lineHeight } = getTotalLinesAndLineHeight();
    const maxHeight: number = vh(79);

    const heightPerPage: number = maxHeight - ( maxHeight % lineHeight );
    const totalPages: number = Math.ceil( ( totalLines * lineHeight ) / heightPerPage );
    
    pTagsQty.value = totalPages;
    pLessonBodyMaxHeight.value = heightPerPage;

    setTimeout(() => {
        const pTags: HTMLParagraphElement[] = Array.from(document.querySelectorAll('p.lesson-body'));
        pTags.forEach((p, index) => {
            const scrollTop: number = index * heightPerPage;
            p.scrollTop = scrollTop;
            if(p.scrollTop < scrollTop)
            {
                const paddingBottom: number = heightPerPage - ( p.scrollTop % heightPerPage );
                p.style.paddingBottom = `${ paddingBottom }px`;
                p.scrollTop = scrollTop;
            }
        });
    }, 1);
};

onMounted(() => {
    divideLessonBody();
    window.addEventListener('resize', divideLessonBody);
});
onUnmounted(() => window.removeEventListener('resize', divideLessonBody));
</script>

<template>
    <Carousel :settings="settings">
        <Slide v-for="count in pTagsQty" :key="count">
            <RenderLessonBody
                :lesson-body="lessonBody"
                @checkWord="emit('checkWord', $event)"
                :style="`max-height: ${pLessonBodyMaxHeight}px;`"
            />
        </Slide>
        <template #addons>
            <Navigation/>
            <Pagination/>
        </template>
    </Carousel>
</template>
    
<style lang="css">
:root {
    /* Color */
    --vc-clr-primary: #642afb;
    --vc-clr-secondary: #8e98f3;
    --vc-clr-white: #ffffff;

    /* Icon */
    --vc-icn-width: 1.2em;

    /* Navigation */
    --vc-nav-width: 30px;
    --vc-nav-color: #ffffff;
    --vc-nav-background-color: rgba(192, 192, 192, 0.808);

    /* Pagination */
    --vc-pgn-width: 10px;
    --vc-pgn-height: 5px;
    --vc-pgn-margin: 5px;
    --vc-pgn-border-radius: 0;
    --vc-pgn-background-color: var(--vc-clr-secondary);
    --vc-pgn-active-color: var(--vc-clr-primary);
}
.carousel__prev,
.carousel__next {
    background-color: var(--vc-nav-background-color);
    border-radius: var(--vc-nav-width);
    width: var(--vc-nav-width);
    height: var(--vc-nav-width);
    text-align: center;
    font-size: calc(var(--vc-nav-width) * 2 / 3);
    padding: 0;
    color: var(--vc-nav-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 0;
    cursor: pointer;
}

.carousel__prev {
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
}

.carousel__next {
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
}

.carousel--rtl .carousel__prev {
    left: auto;
    right: 0;
    transform: translate(50%, -50%);
}

.carousel--rtl .carousel__next {
    right: auto;
    left: 0;
    transform: translate(-50%, -50%);
}
.carousel__pagination {
    display: flex;
    justify-content: center;
    list-style: none;
}
.carousel__pagination-button {
    margin: var(--vc-pgn-margin);
    width: var(--vc-pgn-width);
    height: var(--vc-pgn-height);
    border-radius: var(--vc-pgn-height);
    border: 0;
    cursor: pointer;
    background-color: var(--vc-pgn-background-color);
}

.carousel__pagination-button--active {
    background-color: var(--vc-pgn-active-color);
}
.carousel__slide {
    scroll-snap-stop: auto;
    flex-shrink: 0;
    margin: 0;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
}
.carousel {
    position: relative;
    text-align: center;
    box-sizing: border-box;
}

.carousel * {
    box-sizing: border-box;
}

.carousel__track {
    display: flex;
    margin: 0;
    padding: 0;
    position: relative;
}

.carousel__viewport {
    overflow: hidden;
}
.carousel__icon {
    width: var(--vc-icn-width);
    height: var(--vc-icn-width);
    fill: currentColor;
}

.carousel__prev--in-active,
.carousel__next--in-active {
    display: none;
}
</style>
