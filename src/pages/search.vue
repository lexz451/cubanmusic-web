<template>
  <div class="search-results">
    <small class="search-results-label"
      >Mostrando {{ count }} resultados para: {{ query }}</small
    >
    <div class="search-results-content">
      <template v-for="item in results" :key="item.id + item.name">
        <artist-item :fullWidth="true" :artist="item.data" v-if="item.type == 'info.cubanmusic.cubanmusicapi.model.Person'"></artist-item>
        <div v-if="item.type == 'Group'" class="group-item">
          <img :src="item.image" />
          <div class="group-info">
            <h3>{{ item.name }}</h3>
            <span class="details">
              
            </span>
          </div>
        </div>
        <div class="divider"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import ArtistItem from '../components/artist_item.vue';
import { decodeBase64Image } from '../utils';
import { fetch } from '../data';

export default {
  props: [],
  async setup() {
    const query = ref('');
    const error = ref(null);
    const results = ref([]);

    const { query: queryParams } = useRoute()
    query.value = queryParams.query;

    const getImage = (file) => {
      const fallbackImage = new URL(
        '../assets/images/default-image.jpg',
        import.meta.url
      );
      return file ? decodeBase64Image(file.filedata, file.filetype) : fallbackImage;
    };

    try {
      const data = await fetch(`/search?query=${encodeURIComponent(query.value)}`);
      results.value = data;
    } catch (e) {
      console.error(e);
      error.value = e;
    }

    return {
      query,
      results,
      getImage
    }
  },
  components: {
    ArtistItem
  }
};
</script>

<style lang="scss" scoped>
.search-results {
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;

  &-label {
    color: rgba($color: #000000, $alpha: 0.6);
    margin-top: 0.5rem;
    margin-left: 2rem;
  }

  &-content {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    flex-grow: 1;
    width: 60%;
    .artist-item {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      margin-bottom: 1rem;
      margin-top: 1rem;
      img {
        width: 200px;
        height: auto;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        margin-right: 1rem
      }
      .artist-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 24px;
          margin-bottom: 0.5rem;
        }
        .details {
          margin-bottom: 0.2rem;
        }
        .occupation {
          color: var(--primary);
        }
      }
    }
    .group-item {
      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>
