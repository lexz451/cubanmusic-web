<template>
  <div class="home-page container">
    <section class="search">
      <div class="search-controls">
        <app-input
          type="search"
          placeholder="Artistas, Grupos, Bandas o Venues..."
        ></app-input>
        <button class="btn btn-primary" type="button">
          <font-awesome-icon icon="search" size="lg"></font-awesome-icon>
        </button>
      </div>
    </section>
    <div class="divider"></div>
    <section class="artists">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Artistas Individuales</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <div class="divider"></div>
    <section class="groups">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Grupos</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <div class="divider"></div>
    <section class="groups">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Venues</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <div class="divider"></div>
    <section class="groups">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Instituciones</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
  </div>
</template>

<script>
import AppSelect from '../components/select.vue';
import AppInput from '../components/input.vue';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel';
import { ref } from '@vue/reactivity';
import { onBeforeMount, onMounted } from '@vue/runtime-core';
import { fetchArtists } from '../data';

export default {
  components: {
    AppSelect,
    AppInput,
    Carousel,
    Navigation,
    Slide,
    Pagination
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: 'center'
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center'
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: 'start'
        }
      }
    };
  },
  async setup() {
    const artists = ref([]);
    const error = ref(null);
    const loading = ref(false);

    function later(delay, value) {
      return new Promise((resolve) => setTimeout(resolve, delay, value));
    }

    await later(5000, 1);

    async function fetchData() {
      loading.value = true;
      try {
        const res = await Promise.all([fetchArtists()]);
      } catch (error) {
        error.value = err;
      }
      loading.value = false;
    }

    return {
      artists,
      error,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2rem;
  position: relative;
  section:not(.carousel) {
    padding-bottom: 2rem;
  }
  .search {
    display: flex;
    justify-content: center;
    width: 100%;
    .search-controls {
      max-width: 900px;
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .form-control {
        flex-grow: 1;
        margin-right: 0.5rem;
      }
    }
  }
  .artists {
    .carousel {
      background-color: var(--surface);
      border-radius: 10px;
    }
    .carousel__item {
      background-color: var(--vc-clr-primary);
      color: var(--vc-clr-white);
      border-radius: 50%;
    }
  }
}
</style>
