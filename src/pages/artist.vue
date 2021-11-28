<template>
  <div class="artist-container container">
    <section class="artist-details">
      <div class="artist-details--left">
        <img class="artist-image" :src="artistImage" />
        <span class="artist-roles">{{ artistRoles }}</span>
        <div class="divider"></div>
        <small
          >Nacimiento: <strong>{{ artist.birthDate }}</strong></small
        >
        <small
          >Nacionalidad: <strong>{{ artist.nationality || '-' }}</strong></small
        >
        <small
          >Residencia Actual: <strong>{{ artist.residence }}</strong></small
        >
        <small
          >Años en activo: <strong>{{ artist.yearsActive }}</strong></small
        >
        <small
          >Instrumentos: <strong v-text="artist.instruments.join(', ')"></strong
        ></small>
        <small
          >Géneros: <strong v-text="artist.genres.join(', ')"></strong
        ></small>
        <small>Centro de Estudios: <strong>-</strong></small>
        <div class="divider"></div>
        <small
          >ISNI: <strong>{{ artist.isni }}</strong></small
        >
        <small>IPI Code: <strong>-</strong></small>
        <small
          >Web:
          <strong
            ><a :href="artist.website" target="_blank">{{
              artist.website
            }}</a></strong
          ></small
        >
        <div class="artist-social">
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
      <div class="artist-details--right">
        <h1 class="artist-name">{{ artist.name }}</h1>
        <span class="artist-occupation">{{ artist.occupation }}</span>
        <p class="artist-bio">{{ artist.bio }}</p>
        <div class="artist-albums">
          <h3>Discografía</h3>
          <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="album in artist.albums" :key="album.id">
              <album-item :album="album"></album-item>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <div class="artist-quotes">
          <h3>Quotes</h3>
          <div class="flex">
            <small
              class="alert alert-no-data"
              v-if="!artist.quotes || !artist.quotes.length"
              ><i class="fas fa-exclamation"> </i>No hay quotes para
              mostrar</small
            >
            <quote-item
              v-for="quote in artist.quotes"
              :key="quote.id"
              :quote="quote"
            ></quote-item>
          </div>
        </div>
        <div class="artist-articles">
          <h3>Artículos</h3>
          <div class="flex">
            <small
              class="alert alert-no-data"
              v-if="!artist.articles || !artist.articles.length"
              ><i class="fas fa-exclamation"> </i>No hay artículos para
              mostrar</small
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
    <div class="divider"></div>
    <section class="artist-related">
      <div class="flex">
        <h3 class="flex-grow-1">Artistas Relacionados</h3>
        <router-link to="/">Explorar Categoría</router-link>
      </div>
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="album in artist.albums" :key="album.id">
          <album-item :album="album"></album-item>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { fetchById } from '../data';
import { decodeBase64Image } from '../utils';

import AppInput from '../components/input.vue';
import AlbumItem from '../components/album_item.vue';
import QuoteItem from '../components/quote_item.vue';
import ArticleItem from '../components/article_item.vue';

import { capitalize } from '@vue/shared';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { useFetchCache } from '../componsable/useApi';

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
      settings: {
        itemsToShow: 1,
        snapAlign: 'center'
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: 'center'
        },
        1024: {
          itemsToShow: 3
        }
      }
    };
  },
  async setup(props) {
    const artist = ref(null);
    const artistImage = computed(() => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return artist.value.image
        ? decodeBase64Image(artist.value.image.data, artist.value.image.type)
        : fallbackImage;
    });

    const artistRoles = computed(() => {
      return artist.value.roles && artist.value.roles.length
        ? artist.value.roles.map((e) => capitalize(e)).join(', ')
        : '';
    });

    const error = ref(null);

    if (props.id) {
      try {
        const _artist = await useFetchCache('/artists/' + props.id);
        artist.value = _artist.data.value;
      } catch (e) {
        error.value = e;
      }
    } else {
      console.error('No id!');
    }

    return {
      artist,
      artistImage,
      artistRoles,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
.artist-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2rem;
  position: relative;
  flex: 1 0 auto;

  .artist-related {
    .flex {
      align-items: center;
    }
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  .artist-details {
    display: flex;
    &--right {
      flex-grow: 1;
      .artist-occupation {
        color: var(--primary);
      }
      .artist-albums {
        margin-top: 2rem;
        .carousel {
          padding-left: 2rem;
          padding-right: 2rem;
        }
      }
      .artist-quotes {
        margin-top: 2rem;
      }

      .artist-articles {
        margin-top: 2rem;
      }
    }
    &--left {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      .artist-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      .artist-roles {
        margin-top: 1rem;
        color: var(--primary);
      }
      .divider {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      small {
        margin-bottom: 0.5rem;
      }
      .artist-social {
        margin-top: 1rem;
        display: inline-flex;
        flex-wrap: wrap;
        svg {
          margin-right: 1rem;
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
