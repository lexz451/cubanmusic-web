<template>
  <div class="home-page container-lg">
    <div class="alert alert-error" v-if="error">
      <i class="fas fa-exclamation"></i>
      <span>{{ error }}</span>
    </div>
    <template v-if="!error">
      <section class="artists">
        <div class="d-flex align-items-center mb-2">
          <h3 class="flex-grow-1 fw-bold">Artistas Individuales</h3>
          <router-link to="/artists">Explorar Categoría</router-link>
        </div>
        <Carousel
          :settings="carouselConfig.settings"
          :breakpoints="carouselConfig.breakpoints"
        >
          <Slide v-for="artist in artists" :key="artist.id">
            <artist-item :artist="artist"></artist-item>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
      <div class="divider my-4"></div>
      <section class="groups ">
        <div class="d-flex align-items-center mb-2">
          <h3 class="flex-grow-1 fw-bold">Grupos</h3>
          <router-link to="/groups">Explorar Categoría</router-link>
        </div>
        <Carousel
          :settings="carouselConfig.settings"
          :breakpoints="carouselConfig.breakpoints"
        >
          <Slide v-for="group in groups" :key="group.id">
            <group-item :group="group"></group-item>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
      <div class="divider my-4"></div>
      <section class="venues">
        <div class="d-flex align-items-center mb-2">
          <h3 class="flex-grow-1 fw-bold">Venues</h3>
          <router-link to="/">Explorar Categoría</router-link>
        </div>
        <Carousel
          :settings="carouselConfig.settings"
          :breakpoints="carouselConfig.breakpoints"
        >
          <Slide v-for="venue in venues" :key="venue.id">
            <venue-item :venue="venue"></venue-item>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
      <div class="divider my-4"></div>
      <section class="organizations">
        <div class="d-flex align-items-center mb-2">
          <h3 class="flex-grow-1 fw-bold">Instituciones</h3>
          <router-link to="/">Explorar Categoría</router-link>
        </div>
        <Carousel
          :settings="carouselConfig.settings"
          :breakpoints="carouselConfig.breakpoints"
        >
          <Slide v-for="org in orgs" :key="org.id">
            <org-item :org="org"></org-item>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>
    </template>
  </div>
</template>

<script>
import AppSelect from '../components/select.vue';
import AppInput from '../components/input.vue';

import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import ArtistItem from '../components/artist_item.vue';
import GroupItem from '../components/group_item.vue';
import VenueItem from '../components/venue_item.vue';
import OrgItem from '../components/org_item.vue';
import { ref } from 'vue-demi';
import { fetch } from '../data';

const carouselConfig = {
  settings: {
    itemsToShow: 1,
    snapAlign: 'center'
  },
  breakpoints: {
    576: {
      itemsToShow: 2,
      snapAlign: 'center'
    },
    768: {
      itemsToShow: 3,
      snapAlign: 'center'
    },
    992: {
      itemsToShow: 3,
      snapAlign: 'center'
    },
    1200: {
      itemsToShow: 4,
      snapAlign: 'center'
    }
  }
};

export default {
  components: {
    AppSelect,
    AppInput,
    Carousel,
    Navigation,
    Slide,
    ArtistItem,
    GroupItem,
    VenueItem,
    OrgItem
  },
  data() {
    return {
      carouselConfig
    };
  },
  async setup() {
    const artists = ref([]);
    const groups = ref([]);
    const venues = ref([]);
    const orgs = ref([]);
    const error = ref(null);

    try {
      const data = await Promise.all([
        fetch('/persons'),
        fetch('/groups'),
        fetch('/venues'),
        fetch('/organizations')
      ]);
      artists.value = data[0];
      groups.value = data[1];
      venues.value = data[2];
      orgs.value = data[3];
    } catch (e) {
      console.error(e);
      error.value = e;
    }

    return {
      artists,
      groups,
      venues,
      orgs,
      error
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
  flex: 1 0 auto;
  .artists .carousel {
    background-color: var(--surface);
    border-radius: 0.35rem;
    padding: 1rem;
  }
}
</style>
