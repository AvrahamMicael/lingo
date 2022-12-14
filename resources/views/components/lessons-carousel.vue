<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { CarouselSettings, CarouselBreakpoints, LessonDisplay } from '@/scripts/types/index';
import LessonCarouselItem from './lesson-carousel-item.vue';
import { PropType } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  lessonsInfo: {
    type: Object as PropType<LessonDisplay[]>,
    required: true,
  },
  noLessonsMessage: {
    type: String,
    default: 'Lessons not found',
  },
  showImportedBy: Boolean,
  disappearIfLessonsNotFound: Boolean,
});

const settings: CarouselSettings = {
  itemsToShow: 1,
  snapAlign: 'center',
};

const breakpoints: CarouselBreakpoints = {
  340: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  424: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
  768: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  992: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
  1200: {
    itemsToShow: 6,
    snapAlign: 'start',
  },
};
</script>

<template>
  <section v-if="lessonsInfo.length || !disappearIfLessonsNotFound" class="mb-2">
    <h4>{{ title }}</h4>
    <Carousel v-if="lessonsInfo.length" :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="lesson in lessonsInfo" :key="lesson.id">
        <LessonCarouselItem :lesson="lesson" :show-imported-by="showImportedBy"/>
      </Slide>
      <template #addons>
        <Navigation/>
      </template>
    </Carousel>
    <div v-else class="alert alert-info text-center" role="alert">
      <strong>{{ noLessonsMessage }}</strong>
    </div>
  </section>
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
