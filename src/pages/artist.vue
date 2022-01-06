<template>
  <div class="artist-container py-5 container-lg">
    <section class="artist-details row">
      <div class="col-lg-4 pe-4">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <img class="artist-image img-thumbnail" :src="artistImage" />
          <span class="artist-roles text-primary mt-4">{{
            artist.jobRoles.join(', ')
          }}</span>
        </div>

        <div class="divider my-4"></div>
        <div class="d-flex flex-column">
          <small class="mb-1"
            >Nacimiento: <strong>{{ artist.birthDate || '-' }}</strong></small
          >
          <small class="mb-1"
            >Nacionalidad:
            <strong>{{ artist.nationality || '-' }}</strong></small
          >
          <small class="mb-1"
            >Residencia Actual: <strong>{{ artist.residencePlace?.name || '-' }}</strong></small
          >
          <small class="mb-1"
            >Años en activo: <strong>{{ (artist.activeSince || '-')  + ' / ' + (artist.activeUntil || '-') }}</strong></small
          >
          <small class="mb-1"
            >Instrumentos: <strong v-text="artistInst?.join(', ') || '-'"></strong
          ></small>
          <small class="mb-1"
            >Géneros: <strong v-text="artistGenres?.join(', ') || '-'"></strong
          ></small>
          <small class="mb-1">Centro de Estudios: <strong>-</strong></small>
          <div class="divider my-4"></div>
          <small class="mb-1"
            >ISNI: <strong>{{ artist.isniCode }}</strong></small
          >
          <small class="mb-1">IPI Code: <strong>-</strong></small>
          <small class="mb-1"
            >Web:
            <strong
              ><a :href="artist.website" target="_blank">{{
                artist.website
              }}</a></strong
            ></small
          >
        </div>
        <div class="artist-social d-flex flex-wrap justify-content-around my-4">
          <i class="fab fa-spotify fa-2x"></i>
          <i class="fab fa-youtube fa-2x"></i>
          <i class="fab fa-itunes fa-2x"></i>
          <i class="fab fa-soundcloud fa-2x"></i>
          <i class="fab fa-facebook fa-2x"></i>
          <i class="fab fa-twitter fa-2x"></i>
          <i class="fab fa-tiktok fa-2x"></i>
          <i class="fab fa-instagram fa-2x"></i>
        </div>
      </div>
      <div class="col-lg-8 ps-4">
        <h1 class="artist-name fw-bold">{{ artist.name }}</h1>
        <span class="artist-occupation">{{ artistJobTitle }}</span>
        <p class="artist-bio">
          <span v-if="artist.biography">{{ artist.biography }}</span>
          <span v-if="!artist.biography" class="text-muted"
            >Sin datos biográficos</span
          >
        </p>
        <div class="divider my-4"></div>
        <div class="artist-albums">
          <h4 class="fw-bold mb-3">Discografía</h4>
          <Carousel
            :settings="carouselConfig.settings"
            :breakpoints="carouselConfig.breakpoints"
          >
            <Slide v-for="album in artist.albums" :key="album.id">
              <album-item :album="album"></album-item>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <div class="divider my-4"></div>
        <div class="artist-quotes my-4">
          <h4 class="fw-bold">Quotes</h4>
          <div class="d-flex">
            <small
              class="text-muted"
              v-if="!artist.quotes || !artist.quotes.length"
              >No hay quotes para mostrar</small
            >
            <quote-item
              v-for="quote in artist.quotes"
              :key="quote.id"
              :quote="quote"
            ></quote-item>
          </div>
        </div>
        <div class="divider my-4"></div>
        <div class="artist-articles my-4">
          <h4 class="fw-bold">Artículos</h4>
          <div class="d-flex">
            <small
              class="text-muted"
              v-if="!artist.articles || !artist.articles.length"
              >No hay artículos para mostrar</small
            >
            <article-item
              v-for="article in artist.articles"
              :key="article.id"
              :article="article"
            ></article-item>
          </div>
        </div>
      </div>
    </section>
    <div class="divider my-4"></div>
    <section class="artist-related">
      <div class="flex">
        <h4 class="flex-grow-1">Artistas Relacionados</h4>
      </div>
      <div class="d-flex flex-wrap align-items-center">
        <span
          style="border-radius: 30px; min-width: 100px"
          class="me-2 bg-secondary px-2 py-1 text-center"
          v-for="rel in artist.relatedArtists"
          :key="rel"
        >
          {{ rel }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { fetch } from '../data';
import { decodeBase64Image } from '../utils';

import AppInput from '../components/input.vue';
import AlbumItem from '../components/album_item.vue';
import QuoteItem from '../components/quote_item.vue';
import ArticleItem from '../components/article_item.vue';

import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const carouselConfig = {
  settings: {
    itemsToShow: 1,
    snapAlign: 'center'
  },
  breakpoints: {
    576: {
      itemsToShow: 1,
      snapAlign: 'center'
    },
    768: {
      itemsToShow: 1.5,
      snapAlign: 'center'
    },
    992: {
      itemsToShow: 2.1,
      snapAlign: 'center'
    },
    1200: {
      itemsToShow: 2.5,
      snapAlign: 'center'
    }
  }
};

export default {
  props: ['id'],
  components: {
    AppInput,
    AlbumItem,
    QuoteItem,
    ArticleItem,
    Carousel,
    Navigation,
    Slide
  },
  data() {
    return {
      carouselConfig
    };
  },
  async setup({ id }) {
    const artist = ref(null);
    const error = ref(null);

    const artistImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return artist.value?.imageFile
        ? decodeBase64Image(
            artist.value.imageFile?.filedata,
            artist.value.imageFile?.filetype
          )
        : fallbackImage;
    });

    const artistInst = computed(() => {
      return artist.value?.instruments?.map(e => e.name);
    });
    
    const artistGenres = computed(() => {
      return artist.value?.genres?.map(e => e.name)
    })

    try {
      const data = await fetch(`/persons/${id}`);
      artist.value = data;
    } catch (e) {
      this.$log.error(e);
    }

    return {
      artist,
      artistImage,
      artistInst,
      artistGenres,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
.artist-container {
  .artist-image {
    object-fit: cover;
    object-position: center;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
}
</style>
