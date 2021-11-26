<template>
  <div class="home-page container">
    <search></search>
    <div class="divider"></div>
    <section class="artists">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Artistas Individuales</h2>
        <router-link to="/artists">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="artist in artists" :key="artist.id">
          <artist-item :artist="artist"></artist-item>
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
        <router-link to="/groups">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="group in groups" :key="group.id">
          <group-item :group="group"></group-item>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <div class="divider"></div>
    <section class="venues">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Venues</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="venue in venues" :key="venue.id">
          <venue-item :venue="venue"></venue-item>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <div class="divider"></div>
    <section class="organizations">
      <div class="flex flex-align-center">
        <h2 class="flex-grow-1">Instituciones</h2>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="org in orgs" :key="org.id">
          <org-item :org="org"></org-item>
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
import { fetchList } from '../data';

import ArtistItem from '../components/artist_item.vue';
import GroupItem from '../components/group_item.vue';
import VenueItem from '../components/venue_item.vue';
import OrgItem from '../components/org_item.vue';
import Search from '../components/search.vue';
import { useFetchCache } from '../componsable/useFetch';

export default {
  components: {
    AppSelect,
    AppInput,
    Carousel,
    Navigation,
    Slide,
    Pagination,
    ArtistItem,
    GroupItem,
    VenueItem,
    OrgItem,
    Search
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
          itemsToShow: 3,
          snapAlign: 'center'
        },
        1024: {
          itemsToShow: 4
        },
        // 1024 and up
        1280: {
          itemsToShow: 5,
          snapAlign: 'center'
        }
      }
    };
  },
  async setup() {
    /*const artists = ref([]);
    const groups = ref([]);
    const venues = ref([]);
    const orgs = ref([]);
    const error = ref(null);

    async function fetchData() {
      try {
        const res = await Promise.all([
          fetchList("/artists"), 
          fetchList("/groups"),
          fetchList("/venues"),
          fetchList("/orgs")
        ]);
        if (res && res.length) {
          artists.value = res[0];
          groups.value = res[1];
          venues.value = res[2];
          orgs.value = res[3];
        }
      } catch (err) {
        error.value = err;
        console.error(err);
      }
    }

    await fetchData();

    return {
      artists,
      groups,
      venues,
      orgs,
      error
    };*/

    const artists = ref([]);
    const groups = ref([]);
    const venues = ref([]);
    const orgs = ref([]);

    const { data } = useFetchCache("artists", "/artists");

    console.log(data);

    return {
      artists,
      groups,
      venues,
      orgs,
    }

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
  .artists {
    .carousel {
      background-color: var(--surface);
      border-radius: 10px;
    }
  }
  .carousel {
    padding-left: 2rem;
      padding-right: 2rem;
  }
}
</style>
